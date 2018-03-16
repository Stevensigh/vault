import fs from 'fs';
import CryptographyClient from 'server/clients/cryptography';
import DBClient from 'server/clients/db';

const {
  SALT_FILE_PATH = '.salt',
  DB_HOST = 'localhost',
  DB_PORT = 3306,
  DB_NAME = 'vault',
  DB_USER = 'vault',
  DB_PASS = '',
} = process.env;

export default class Context {
  constructor() {
    this.crypto = new CryptographyClient({
      salt: fs.readFileSync(SALT_FILE_PATH).toString('utf8'),
    });
    this.db = new DBClient({
      host: DB_HOST,
      port: DB_PORT,
      name: DB_NAME,
      user: DB_USER,
      pass: DB_PASS,
    });
  }
}
