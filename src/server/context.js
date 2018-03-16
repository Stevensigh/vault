import fs from 'fs';
import CryptographyClient from 'server/clients/cryptography';

const {
  SALT_FILE_PATH = '.salt',
} = process.env;

export default class Context {
  constructor() {
    this.crypto = new CryptographyClient({
      salt: fs.readFileSync(SALT_FILE_PATH).toString('utf8'),
    });
  }
}
