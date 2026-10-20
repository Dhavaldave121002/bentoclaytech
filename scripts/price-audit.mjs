/**
 * COMPLETE PRICE AUDIT SCRIPT — Bento Clay Tech
 * Scans all source files, JSON-LD, components, data files
 * for price-related content and reports every location.
 */
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();

function walkDir(dir, extensions) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    try {
      const stat = fs.statSync(full);
      if (stat.isDirectory() && !['node_modules', 'dist', '.git', 'coverage'].includes(item)) {
        results.push(...walkDir(full, extensions));
      } else if (stat.isFile() && extensions.some(e => full.endsWith(e))) {
        results.push(full);
      }
    } catch {}
  }
  return results;
}

// Price patterns to detect
const PRICE_PATTERNS = [
  { label: 'Dollar price',    re: /\$\s*\d[\d,.]*/g },
  { label: 'Price field',     re: /"price"\s*:\s*["']?[\d.]+["']?/g },
  { label: 'lowPrice field',  re: /"lowPrice"\s*:\s*["']?[\d.]+["']?/g },
  { label: 'highPrice field', re: /"highPrice"\s*:\s*["']?[\d.]+["']?/g },
  { label: 'priceRange',      re: /"priceRange"\s*:\s*"[^"]+"/g },
  { label: 'offerCount',      re: /"offerCount"\s*:\s*["']?\d+["']?/g },
  { label: 'USD amount',      re: /USD\s+[\d,]+/g },
  { label: 'per MT price',    re: /\d+\s*(USD|usd|INR|inr|EUR|eur)\s*(?:\/|\s*per)\s*MT/gi },
  { label: 'AggregateOffer',  re: /AggregateOffer/g },
];

const allFiles = [
  ...walkDir(path.join(ROOT, 'src'), ['.jsx', '.js', '.ts', '.tsx', '.json']),
  ...walkDir(path.join(ROOT, 'public'), ['.txt', '.json', '.xml', '.html']),
  path.join(ROOT, 'index.html'),
].filter(f => fs.existsSync(f));

const results = [];

for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  for (const { label, re } of PRICE_PATTERNS) {
    re.lastIndex = 0;
    lines.forEach((line, idx) => {
      re.lastIndex = 0;
      if (re.test(line)) {
        results.push({
          file: file.replace(ROOT + path.sep, ''),
          line: idx + 1,
          label,
          content: line.trim().substring(0, 120)
        });
      }
    });
  }
}

// Deduplicate by file+line
const seen = new Set();
const unique = results.filter(r => {
  const key = r.file + ':' + r.line;
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});

console.log('='.repeat(80));
console.log('BENTO CLAY TECH — COMPLETE PRICE AUDIT REPORT');
console.log('='.repeat(80));
console.log(`Total locations found: ${unique.length}\n`);

const byFile = {};
for (const r of unique) {
  if (!byFile[r.file]) byFile[r.file] = [];
  byFile[r.file].push(r);
}

for (const [file, items] of Object.entries(byFile)) {
  console.log(`\n📄 ${file}`);
  for (const item of items) {
    console.log(`   L${item.line} [${item.label}]: ${item.content}`);
  }
}

console.log('\n' + '='.repeat(80));
console.log('END OF AUDIT REPORT');
