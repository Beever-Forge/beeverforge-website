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
            page.screenshot(path=str(out / f'{version}-{name}.png'), full_page=True)
            links = page.locator('a[href]').evaluate_all('(nodes) => nodes.map(n => n.getAttribute("href"))')
            broken_anchors = [link for link in links if link.startswith('#') and page.locator(link).count() == 0]
            images = page.locator('img').evaluate_all('(nodes) => nodes.map(n => ({src:n.currentSrc,ok:n.complete && n.naturalWidth>0,alt:n.hasAttribute("alt")}))')
            assert response.status == 200, (version, name, response.status)
            assert not page.evaluate('document.documentElement.scrollWidth > innerWidth'), (version, name, 'horizontal overflow')
            assert page.locator('h1').count() == 1
            assert page.locator('meta[name="robots"]').get_attribute('content').startswith('noindex')
            assert not broken_anchors, broken_anchors
            assert all(image['ok'] and image['alt'] for image in images), images
            assert not errors, errors
            timing = page.evaluate('''() => {const n=performance.getEntriesByType('navigation')[0];return {domContentLoaded:Math.round(n.domContentLoadedEventEnd),load:Math.round(n.loadEventEnd),transferBytes:Math.round(performance.getEntriesByType('resource').reduce((x,r)=>x+r.transferSize,0))}}''')
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
                assert 'lista estruturada' in page.locator('#stage-panel').inner_text().lower()
            print(version, name, 'HTTP', response.status, 'images',len(images),'anchors',len(links),'timing_ms',timing,'errors', errors)
            page.close()
    browser.close()
