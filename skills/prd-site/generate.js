#!/usr/bin/env node
/*
 * prd-site generator — assembles the static site from the template + a data.js.
 * Usage: node generate.js <data.js> <outDir>
 *   <data.js>  a file defining window.__PRD__ and window.__ARCH__
 *   <outDir>   destination folder (created if missing)
 * Produces: <outDir>/index.html, support.js, engine.js, data.js, .nojekyll,
 *           README.md, serve.sh, publish.sh, .github/workflows/deploy.yml
 *
 * The viewer is a four-file design: index.html (shell + styles) loads support.js
 * (the runtime), data.js (window.__PRD__ / window.__ARCH__ — the only file that
 * changes per project), and engine.js (the renderer). Only data.js is swapped;
 * the other three are copied verbatim from the template.
 */
const fs = require('fs');
const path = require('path');

const dataPath = process.argv[2];
const outDir = process.argv[3];
if (!dataPath || !outDir) { console.error('Usage: node generate.js <data.js> <outDir>'); process.exit(1); }

const tpl = path.join(__dirname, 'template');

// 1. Validate the data.js parses and defines both globals.
const win = {};
try { new Function('window', fs.readFileSync(dataPath, 'utf8'))(win); }
catch (e) { console.error('data.js does not parse:', e.message); process.exit(1); }
for (const k of ['__PRD__', '__ARCH__']) {
  if (!win[k]) { console.error('data.js is missing window.' + k); process.exit(1); }
}

// 2. Copy template tree, substituting the provided data.js.
fs.mkdirSync(path.join(outDir, '.github', 'workflows'), { recursive: true });
const copy = (rel, src) => fs.copyFileSync(src || path.join(tpl, rel), path.join(outDir, rel));
copy('index.html');
copy('support.js');
copy('engine.js');
fs.copyFileSync(dataPath, path.join(outDir, 'data.js'));
copy('.nojekyll');
copy('README.md');
copy('serve.sh');
copy('publish.sh');
copy('.github/workflows/deploy.yml');

console.log('Generated site in ' + outDir);
console.log('  PRD sections : ' + Object.keys(win.__PRD__).length);
console.log('  ARCH sections: ' + Object.keys(win.__ARCH__).length);
