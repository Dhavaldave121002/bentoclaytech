import fs from 'fs';
import path from 'path';

const indexPath = path.resolve(process.cwd(), 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// Replace all garbled multi-byte characters and Mojibake sequences
const replacements = [
  { pattern: /â„¢/g, replacement: '™' },
  { pattern: /India\?Ts/g, replacement: "India's" },
  { pattern: /India\?Ts/g, replacement: "India's" },
  { pattern: /â€¢/g, replacement: '•' },
  { pattern: /ðŸ“ž/g, replacement: '📞' },
  { pattern: /âœ‰ï¸/g, replacement: '✉️' },
  { pattern: /ðŸ’¬/g, replacement: '💬' },
  { pattern: /ðŸ“/g, replacement: '📍' },
  { pattern: /ðŸ”¬/g, replacement: '🔬' },
  { pattern: /ðŸ›¢ï¸/g, replacement: '🛢️' },
  { pattern: /ðŸ“–/g, replacement: '📖' },
  { pattern: /ðŸ¤–/g, replacement: '🤖' },
  { pattern: /ðŸ“„/g, replacement: '📄' },
  { pattern: /API Spec 13A Section 12 Certified\./g, replacement: 'API Spec 13A Section 12 Compliant.' },
  { pattern: /American Petroleum Institute certified drilling clay/g, replacement: 'API Spec 13A Section 12 drilling clay manufactured to international oilfield standards' },
  { pattern: /<span>Certified API Spec 13A Section 12<\/span>/g, replacement: '<span>Compliant with API Spec 13A Section 12</span>' },
  { pattern: /<span class="product-type">API CERTIFIED<\/span>/g, replacement: '<span class="product-type">API 13A COMPLIANT</span>' }
];

for (const r of replacements) {
  html = html.replace(r.pattern, r.replacement);
}

// Clean concise meta keywords
const cleanKeywords = 'Bento Clay Tech, Bentoclay, Attapulgite powder manufacturer India, API 13A Section 12 drilling clay, Salt Gel attapulgite, Premium 325 mesh attapulgite, Flux Fine 200 foundry clay, Attapulgite granules 1-5mm, Palygorskite manufacturer Gujarat, CAS 12174-11-7 exporter, HS Code 25084000, drilling mud viscosifier, Bhavnagar mineral plant, Mundra port mineral export';
html = html.replace(/<meta\s+name="keywords"\s+content="[^"]+"\s*\/>/, `<meta name="keywords" content="${cleanKeywords}" />`);

// Save cleanly in UTF-8
fs.writeFileSync(indexPath, html, 'utf8');
console.log('✓ index.html successfully cleaned and converted to proper UTF-8!');
