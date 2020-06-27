const fs = require('fs-extra');
const path = require('path');
const stringify = require("json-stringify-pretty-compact");

function readDirSync(dir, type) {
  const maps = {};
  const results = fs.readdirSync(dir);
  results.forEach(ele => {
    if (type === 'unit'
      && (ele.startsWith('2') || ele.startsWith('0'))
    ) {
      return;
    }

    const info = fs.statSync(path.join(dir, ele));
    if (!info.isDirectory()) {
      const key = ele.split('.')[0];
      const value = `require('../assets/images/${type}/${ele}')`;
      maps[key] = value;
    }
  });

  let jsonValue = stringify(maps, {
    maxLength: 999
  });

  jsonValue = jsonValue.replace(/\"require/ig, 'require');
  jsonValue = jsonValue.replace(/\)\"/ig, ')');
  jsonValue = `const images = ${jsonValue};\n\nexport default images as { [key: string]: any };`;

  fs.writeFileSync(
    path.join(__dirname, 'src', 'components', `${type}Images.ts`),
    jsonValue
  );
}

const items = [
  'unit',
  'equipment',
  'item',
  'skill',
];

items.forEach(item => {
  const sp = path.join(__dirname, 'src', 'assets', 'images', item);
  readDirSync(sp, item);
});
