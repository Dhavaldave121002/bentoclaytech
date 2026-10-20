import fs from 'fs';

let c = fs.readFileSync('src/components/PageSEO.jsx', 'utf8');

// Fix remaining: 0x00E2 0x20AC 0x201D = â€" -> – (en-dash)
const endash_bad = '\u00e2\u20ac\u201d';
const endash_good = '\u2013';
c = c.replaceAll(endash_bad, endash_good);

// Also handle 0x00E2 0x20AC 0x201C = â€œ -> " (left double quote)
const ldquote_bad = '\u00e2\u20ac\u201c';
const ldquote_good = '\u201c';
c = c.replaceAll(ldquote_bad, ldquote_good);

// 0x00E2 0x20AC 0x2122 = â€™ -> ' (right single quote / apostrophe)
const rsquote_bad = '\u00e2\u20ac\u2122';
const rsquote_good = '\u2019';
c = c.replaceAll(rsquote_bad, rsquote_good);

fs.writeFileSync('src/components/PageSEO.jsx', c, 'utf8');

// Verify
const remaining = (c.split('\u00e2')).length - 1;
console.log('Remaining 0xE2 chars:', remaining);
console.log('Done.');
