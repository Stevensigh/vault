/* eslint-disable no-console */

const crypto = require('crypto');
const fs = require('fs');

const { SALT_FILE_PATH = '.salt' } = process.env;

const main = () => {
  if (fs.existsSync(SALT_FILE_PATH)) {
    console.log('Salt already exists on disk; skipping generation.');
    return;
  }

  crypto.randomBytes(1024, (err, buf) => {
    if (err) {
      throw err;
    }

    fs.writeFileSync(SALT_FILE_PATH, buf.toString('hex'));
    console.log('New salt generated and written to disk.');
  });
};

main();
