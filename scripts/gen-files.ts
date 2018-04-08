// tslint:disable:no-console
// tslint:disable:no-relative-imports

import * as fs from 'fs';
import * as path from 'path';
import * as ejs from 'ejs';
import * as globby from 'globby';

import { toAlias } from './utils';

console.log(path.extname('@void/controls/basic/button/VdButton.vue'));

/**
 * Auto generate index files.
 */
globby.sync('src/**/*.ejs').forEach(template => {
  ejs.renderFile(template, { globby, path, toAlias }, (error, str) => {
    const file: string = template.replace(/\.ejs$/, '');
    const oldContent: string = fs.readFileSync(file).toString();
    const newContent: string = `// Do not edit this file. It is script generated.\n// Template: ${template}\n\n${str}`;
    if (oldContent !== newContent) {
      fs.writeFileSync(file, newContent);
    }
  });
});
