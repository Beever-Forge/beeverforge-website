import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const source = await readFile(`${root}final-preview/index.html`, 'utf8');
const lines = (await readFile(`${root}scripts/translations.tsv`, 'utf8')).trim().split('\n');
const translations = new Map(lines.map((line, index) => {
  const columns = line.split('\t');
  if (columns.length !== 3) throw new Error(`Translation line ${index + 1} needs three columns`);
  return [columns[0], { es: columns[1], pt: columns[2] }];
}));
const locales = {
  en: { path: '/', lang: 'en', og: 'en_US', title: 'BeeverForge — From idea to engineered software', description: 'Connect business needs to prototypes, requirements, portfolio context, architecture and LLM-agent software delivery. Explore Community and Enterprise.', formPending: 'Sending your inquiry…', formError: 'We could not send your inquiry. Please try again or email contact@beeverforge.com.', formUnavailable: 'The inquiry form is being prepared. Please email contact@beeverforge.com.', thanksTitle: 'Thank you — BeeverForge', thanksEyebrow: 'Enterprise inquiry', thanksHeading: 'Thanks for getting in touch.', thanksBody: 'Your inquiry has been submitted. We’ll respond to the email address you provided.', thanksBack: 'Return to BeeverForge ↗' },
  es: { path: '/es/', lang: 'es', og: 'es_ES', title: 'BeeverForge — De la idea al software desarrollado', description: 'Conecte necesidades de negocio con prototipos, requisitos, portafolio, arquitectura y desarrollo por agentes LLM. Conozca Community y Enterprise.', formPending: 'Enviando su consulta…', formError: 'No pudimos enviar su consulta. Inténtelo de nuevo o escriba a contact@beeverforge.com.', formUnavailable: 'El formulario no está disponible. Escriba a contact@beeverforge.com.', thanksTitle: 'Gracias — BeeverForge', thanksEyebrow: 'Consulta sobre Enterprise', thanksHeading: 'Gracias por contactarnos.', thanksBody: 'Su consulta fue enviada. Responderemos a la dirección de correo que indicó.', thanksBack: 'Volver a BeeverForge ↗' },
  pt: { path: '/pt/', lang: 'pt-BR', og: 'pt_BR', title: 'BeeverForge — Da ideia ao software desenvolvido', description: 'Conecte necessidades de negócio a protótipos, requisitos, portfólio, arquitetura e desenvolvimento por agentes de LLM. Conheça Community e Enterprise.', formPending: 'Enviando sua mensagem…', formError: 'Não conseguimos enviar sua mensagem. Tente novamente ou escreva para contact@beeverforge.com.', formUnavailable: 'O formulário está indisponível. Escreva para contact@beeverforge.com.', thanksTitle: 'Obrigado — BeeverForge', thanksEyebrow: 'Mensagem sobre a Enterprise', thanksHeading: 'Obrigado pelo contato.', thanksBody: 'Sua mensagem foi enviada. Responderemos ao endereço de e-mail informado.', thanksBack: 'Voltar à BeeverForge ↗' },
};
function replaceRequired(html, oldText, newText) {
  if (!html.includes(oldText)) throw new Error(`Missing source marker: ${oldText}`);
  return html.replace(oldText, newText);
}
function localizeText(html, locale) {
  if (locale === 'en') return html;
  const allowed = new Set([locales[locale].title, 'English', 'Español', 'Português', 'Prototype Builder', 'Portfolio Manager', 'Virtual Architect', 'contact@beeverforge.com']);
  html = html.replace(/>([^<>]+)</g, (match, content) => {
    const trimmed = content.trim();
    const entry = translations.get(trimmed);
    if (!entry) {
      if (/^[A-Za-zÀ-ÿ]/.test(trimmed) && !allowed.has(trimmed) && !trimmed.startsWith('try{')) throw new Error(`Missing ${locale} translation: ${trimmed}`);
      return match;
    }
    return `>${content.replace(trimmed, entry[locale])}<`;
  });
  return html;
}
function buildPage(locale) {
  const l = locales[locale];
  let html = source.replace('<html lang="en">', `<html lang="${l.lang}">`);
  html = replaceRequired(html, '<meta name="robots" content="noindex,follow">', '<meta name="robots" content="index,follow,max-image-preview:large">');
  html = html.replace(/<meta name="description" content="[^"]+">/, `<meta name="description" content="${l.description}">`);
  html = html.replace(/<title>[^<]+<\/title>/, `<title>${l.title}</title>`);
  html = html.replace(/<meta property="og:locale" content="[^"]+">/, `<meta property="og:locale" content="${l.og}">`);
  html = html.replace(/<meta property="og:title" content="[^"]+">/, `<meta property="og:title" content="${l.title}">`);
  html = html.replace(/<meta property="og:description" content="[^"]+">/, `<meta property="og:description" content="${l.description}">`);
  html = replaceRequired(html, '<meta name="twitter:card" content="summary_large_image">', `<meta name="twitter:card" content="summary_large_image">\n  <link rel="canonical" href="https://beeverforge.com${l.path}">\n  <meta property="og:url" content="https://beeverforge.com${l.path}">\n  <link rel="alternate" hreflang="en" href="https://beeverforge.com/">\n  <link rel="alternate" hreflang="es" href="https://beeverforge.com/es/">\n  <link rel="alternate" hreflang="pt-BR" href="https://beeverforge.com/pt/">\n  <link rel="alternate" hreflang="x-default" href="https://beeverforge.com/">`);
  html = replaceRequired(html, 'href="/final-preview/" aria-label="BeeverForge preview home"', `href="${l.path}" aria-label="BeeverForge home"`);
  html = replaceRequired(html, 'Final design preview · not indexed', 'The next chapter of OpenFactory');
  html = replaceRequired(html, 'data-success-url="/thank-you/"', `data-success-url="${l.path}thank-you/" data-pending-message="${l.formPending}" data-error-message="${l.formError}" data-unavailable-message="${l.formUnavailable}"`);
  html = replaceRequired(html, 'placeholder="What do you want to build, and how does your team work today?"', `placeholder="${locale === 'es' ? '¿Qué quiere construir y cómo trabaja hoy su equipo?' : locale === 'pt' ? 'O que você quer construir e como sua equipe trabalha hoje?' : 'What do you want to build, and how does your team work today?'}"`);
  html = html.replace(/(<option value="\/(?:es\/|pt\/)?") selected>/g, '$1>');
  html = replaceRequired(html, `<option value="${l.path}">`, `<option value="${l.path}" selected>`);
  if (locale !== 'en') html = localizeText(html, locale);
  html = html.replace('aria-label="Main navigation"', `aria-label="${locale === 'es' ? 'Navegación principal' : locale === 'pt' ? 'Navegação principal' : 'Main navigation'}"`)
    .replace('aria-label="Footer links"', `aria-label="${locale === 'es' ? 'Enlaces del pie de página' : locale === 'pt' ? 'Links do rodapé' : 'Footer links'}"`)
    .replace('aria-label="The four connected decisions"', `aria-label="${locale === 'es' ? 'Cuatro decisiones conectadas' : locale === 'pt' ? 'Quatro decisões conectadas' : 'The four connected decisions'}"`)
    .replace('aria-label="Enterprise product lifecycle"', `aria-label="${locale === 'es' ? 'Ciclo de vida del producto Enterprise' : locale === 'pt' ? 'Ciclo de vida do produto Enterprise' : 'Enterprise product lifecycle'}"`)
    .replace('aria-label="Capability comparison table, horizontally scrollable on small screens"', `aria-label="${locale === 'es' ? 'Tabla de comparación, desplazable horizontalmente en pantallas pequeñas' : locale === 'pt' ? 'Tabela de comparação, com rolagem horizontal em telas pequenas' : 'Capability comparison table, horizontally scrollable on small screens'}"`)
    .replace('aria-label="BeeverForge home"', `aria-label="${locale === 'es' ? 'Inicio de BeeverForge' : locale === 'pt' ? 'Página inicial da BeeverForge' : 'BeeverForge home'}"`)
    .replace('aria-label="Language"', `aria-label="${locale === 'es' ? 'Idioma' : locale === 'pt' ? 'Idioma' : 'Language'}"`)
    .replace('aria-label="Open menu"', `aria-label="${locale === 'es' ? 'Abrir menú' : locale === 'pt' ? 'Abrir menu' : 'Open menu'}"`)
    .replace('aria-label="Switch to light mode"', `aria-label="${locale === 'es' ? 'Cambiar al modo claro' : locale === 'pt' ? 'Mudar para o modo claro' : 'Switch to light mode'}"`);
  return html;
}
function thanksPage(locale) {
  const l = locales[locale];
  return `<!doctype html><html lang="${l.lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>${l.thanksTitle}</title><link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/assets/final.css"><script>try{document.documentElement.dataset.theme=localStorage.getItem('beeverforge-theme')==='light'?'light':'dark'}catch{document.documentElement.dataset.theme='dark'}</script></head><body class="thanks-body"><main class="shell thanks-content"><a href="${l.path}" aria-label="BeeverForge"><img src="/assets/logo-dark.svg" alt="BeeverForge" width="240" height="74"></a><p class="eyebrow">${l.thanksEyebrow}</p><h1>${l.thanksHeading}</h1><p>${l.thanksBody}</p><a class="button button-gold" href="${l.path}">${l.thanksBack}</a></main><script src="/assets/final.js" defer></script></body></html>`;
}
for (const [locale, l] of Object.entries(locales)) {
  const directory = `${root}${l.path}`;
  await mkdir(directory, { recursive: true });
  await writeFile(`${directory}index.html`, buildPage(locale));
  await mkdir(`${directory}thank-you/`, { recursive: true });
  await writeFile(`${directory}thank-you/index.html`, thanksPage(locale));
}
const retiredConcept = (version) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><meta http-equiv="refresh" content="0;url=/"><link rel="canonical" href="https://beeverforge.com/"><title>BeeverForge — website</title><script>location.replace('/')</script></head><body><main><h1>BeeverForge has a new home.</h1><p>The ${version.toUpperCase()} concept has been replaced by the website.</p><p><a href="/">Visit BeeverForge</a></p></main></body></html>`;
await Promise.all(['v1', 'v2'].map((version) => writeFile(`${root}${version}/index.html`, retiredConcept(version))));
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${Object.values(locales).map(l => `  <url><loc>https://beeverforge.com${l.path}</loc>${Object.entries(locales).map(([code, alt]) => `<xhtml:link rel="alternate" hreflang="${alt.lang}" href="https://beeverforge.com${alt.path}"/>`).join('')}<xhtml:link rel="alternate" hreflang="x-default" href="https://beeverforge.com/"/></url>`).join('\n')}\n</urlset>\n`;
await writeFile(`${root}sitemap.xml`, sitemap);
console.log('Built English, Spanish and Portuguese static pages and localized confirmation pages.');
