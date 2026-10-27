const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const viteBin = path.join(rootDir, 'node_modules', 'vite', 'bin', 'vite.js');

console.log('--- 1. Running Vite Production Build ---');
cp.execSync(`"${process.execPath}" "${viteBin}" build`, { stdio: 'inherit', cwd: rootDir });
const distDir = path.join(rootDir, 'dist');
const zipName = 'hostinger-upload-bentoclay.zip';
const targetZip = path.join(rootDir, zipName);

if (fs.existsSync(targetZip)) {
  fs.unlinkSync(targetZip);
}

console.log('--- 2. Compressing dist/ contents for Hostinger public_html ---');
const psCommand = `Get-ChildItem -Path '${distDir}\\*' -Force | Compress-Archive -DestinationPath '${targetZip}' -Force`;
cp.execSync(`powershell -NoProfile -Command "${psCommand}"`, { stdio: 'inherit' });

// Also create bentoclay-build-production.zip copy
const aliasZip = path.join(rootDir, 'bentoclay-build-production.zip');
fs.copyFileSync(targetZip, aliasZip);

const sizeMB = (fs.statSync(targetZip).size / (1024 * 1024)).toFixed(2);
console.log(`\nSUCCESS! Created Hostinger ready ZIP archive:`);
console.log(`File: ${targetZip}`);
console.log(`Size: ${sizeMB} MB`);
console.log(`\nInstructions for Hostinger / cPanel:`);
console.log(`1. Go to Hostinger File Manager -> public_html`);
console.log(`2. Upload '${zipName}'`);
console.log(`3. Right click -> Extract directly inside public_html`);
console.log(`4. Done! All routes, HTTPS, caching & analytics will work automatically.`);
