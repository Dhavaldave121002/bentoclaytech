import fs from 'fs';
import path from 'path';

function walkDir(dir, ext) {
  const results = [];
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory() && !['node_modules', 'dist', '.git'].includes(item)) {
      results.push(...walkDir(full, ext));
    } else if (stat.isFile() && ext.some(e => full.endsWith(e))) {
      results.push(full);
    }
  }
  return results;
}

const files = walkDir('src', ['.jsx', '.js', '.ts', '.tsx']);
let totalFixed = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;
  
  // Fix mojibake sequences
  // â„¢ (U+00E2 U+0084 U+00A2) -> ™
  content = content.replaceAll('\u00e2\u0084\u00a2', '\u2122');
  // â€" (U+00E2 U+0080 U+0093) -> –
  content = content.replaceAll('\u00e2\u0080\u0093', '\u2013');
  // â€" (U+00E2 U+0080 U+0094) -> —
  content = content.replaceAll('\u00e2\u0080\u0094', '\u2014');
  // â€™ (U+00E2 U+0080 U+0099) -> '
  content = content.replaceAll('\u00e2\u0080\u0099', '\u2019');
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    totalFixed++;
    console.log('Fixed: ' + file.replace(process.cwd() + '\\', ''));
  }
}

console.log('Total files fixed: ' + totalFixed);
