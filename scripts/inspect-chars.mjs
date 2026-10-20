import fs from 'fs';

let c = fs.readFileSync('src/components/PageSEO.jsx', 'utf8');
const lines = c.split('\n');
const l18 = lines[17];

const hexCodes = [];
for (let i = 0; i < Math.min(l18.length, 120); i++) {
  hexCodes.push(l18.charCodeAt(i).toString(16).padStart(4, '0'));
}
console.log('Line 18 hex:', hexCodes.join(' '));
