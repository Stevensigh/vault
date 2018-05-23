/* eslint-disable no-console */

import fs from 'fs';
import path from 'path';
import Context from 'server/context';

const main = () => {
  const ctx = new Context();
  const schema = fs.readFileSync(path.join(__dirname, './db/schema.sql')).toString('utf-8');

  ctx.db.exec(schema, (err) => {
    if (err) {
      throw err;
    }

    console.log('Successfully created Vault database tables.');
    ctx.db.close();
  });
};

main();
