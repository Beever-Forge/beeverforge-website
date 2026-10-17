from playwright.sync_api import sync_playwright
from pathlib import Path

out = Path('review')
out.mkdir(exist_ok=True)
with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    for version in ('v1', 'v2', 'v3'):
        if not Path(version, 'index.html').exists():
            continue
        for name, width, height in (('desktop', 1440, 900), ('mobile', 390, 844)):
            page = browser.new_page(viewport={'width': width, 'height': height}, device_scale_factor=1)
            errors = []
            page.on('pageerror', lambda error: errors.append(str(error)))
            response = page.goto(f'http://127.0.0.1:8765/{version}/', wait_until='networkidle')
            timing = page.evaluate('''() => {const n=performance.getEntriesByType('navigation')[0];return {domContentLoaded:Math.round(n.domContentLoadedEventEnd),load:Math.round(n.loadEventEnd),transferBytes:Math.round(performance.getEntriesByType('resource').reduce((x,r)=>x+r.transferSize,0))}}''')
            reload_response = page.reload(wait_until='networkidle')
            assert reload_response.status == 200, (version, name, 'reload', reload_response.status)
            page.screenshot(path=str(out / f'{version}-{name}.png'), full_page=True)
            links = page.locator('a[href]').evaluate_all('(nodes) => nodes.map(n => n.getAttribute("href"))')
            broken_anchors = [link for link in links if link.startswith('#') and page.locator(link).count() == 0]
            images = page.locator('img').evaluate_all('(nodes) => nodes.map(n => ({src:n.currentSrc,ok:n.complete && n.naturalWidth>0,alt:n.hasAttribute("alt")}))')
            assert response.status == 200, (version, name, response.status)
            assert not page.evaluate('document.documentElement.scrollWidth > innerWidth'), (version, name, 'horizontal overflow')
            assert page.locator('h1').count() == 1
            assert page.locator('meta[name="robots"]').get_attribute('content').startswith('noindex')
            assert page.locator('html').get_attribute('lang') == 'en'
            form = page.locator('[data-inquiry-form]')
            assert form.count() == 1
            assert form.get_attribute('data-endpoint') == 'https://beeverforge-contact.80-pereira.workers.dev/contact'
            assert form.get_attribute('data-source') == version
            assert not broken_anchors, broken_anchors
            assert all(image['ok'] and image['alt'] for image in images), images
            assert not errors, errors
            if name == 'mobile':
                button = page.locator('.menu-button')
                button.click()
                assert button.get_attribute('aria-expanded') == 'true'
                page.keyboard.press('Escape')
                assert button.get_attribute('aria-expanded') == 'false'
            if version == 'v2':
                tabs = page.get_by_role('tab')
                tabs.nth(2).click()
                assert tabs.nth(2).get_attribute('aria-selected') == 'true'
                assert 'structured requirements' in page.locator('#stage-panel').inner_text().lower()
            if version == 'v1' and name == 'desktop':
                page.route('https://beeverforge-contact.80-pereira.workers.dev/contact', lambda route: route.fulfill(status=202, content_type='application/json', body='{"ok":true}', headers={'access-control-allow-origin':'http://127.0.0.1:8765'}))
                form.locator('[name=name]').fill('Preview Test')
                form.locator('[name=email]').fill('preview@example.com')
                form.locator('[name=company]').fill('Example Company')
                form.locator('[name=message]').fill('Checking the existing contact form flow.')
                form.locator('button[type=submit]').click()
                page.wait_for_url('**/thank-you/')
                assert page.locator('h1').count() == 1
            print(version, name, 'HTTP', response.status, 'images',len(images),'anchors',len(links),'timing_ms',timing,'errors', errors)
            page.close()
    browser.close()
