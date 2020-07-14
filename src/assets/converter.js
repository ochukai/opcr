const webp = require('webp-converter');
const path = require('path');
const fse = require('fs-extra');

async function convert(from, to, name) {
  const toName = path.join(toDir, to, `${name}.png`);
  const result = await webp.dwebp(from, toName, '-o');
}

const fromDir = path.join(__dirname, 'images');
const toDir = path.join(__dirname, 'png-images');

async function readDir(dir) {
  const pas = fse.readdirSync(dir);

  for (let i = 0; i < pas.length; i ++) {
    const ele = pas[i];

    const innerDir = path.join(dir, ele);
    const info = fse.statSync(innerDir);
    if (info.isDirectory()) {
      readDir(innerDir);
    } else {
      console.log('file', innerDir);

      const [name, suffix] = ele.split('.');
      if (suffix === 'webp') {
        const cds = dir.split('\\');
        await convert(innerDir, cds.pop(), name);
      }
    }
  }
}

readDir(fromDir);

