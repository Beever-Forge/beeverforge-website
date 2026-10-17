import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const preview = await readFile(`${root}final-preview/index.html`, 'utf8');

const replacements = [
  ['<meta name="robots" content="noindex,follow">', '<meta name="robots" content="index,follow,max-image-preview:large">'],
  ['<title>BeeverForge — From idea to engineered software</title>', '<title>BeeverForge — From idea to engineered software</title>\n  <link rel="canonical" href="https://beeverforge.com/">\n  <meta property="og:url" content="https://beeverforge.com/">'],
  ['href="/final-preview/" aria-label="BeeverForge preview home"', 'href="/" aria-label="BeeverForge home"'],
  ['Final design preview · not indexed', 'The next chapter of OpenFactory'],
];

let html = preview;
for (const [oldText, newText] of replacements) {
  if (!html.includes(oldText)) throw new Error(`Expected preview marker not found: ${oldText}`);
  html = html.replace(oldText, newText);
}
await writeFile(`${root}index.html`, html);
const retiredConcept = (version) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><meta http-equiv="refresh" content="0;url=/"><link rel="canonical" href="https://beeverforge.com/"><title>BeeverForge — final website</title><script>location.replace('/')</script></head><body><main><h1>BeeverForge has a new home.</h1><p>The ${version.toUpperCase()} concept has been replaced by the final website.</p><p><a href="/">Visit BeeverForge</a></p></main></body></html>`;
await Promise.all(['v1', 'v2'].map((version) => writeFile(`${root}${version}/index.html`, retiredConcept(version))));
console.log('Built the approved-design homepage from the final preview source.');
