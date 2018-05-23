import fs from 'fs';
import CryptographyClient from 'server/clients/cryptography';
import DBClient from 'server/clients/db';
import AuthLogic from 'server/logic/auth';
import SecretsLogic from 'server/logic/secrets';
import SecretsManager from 'server/managers/secrets';

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
    this.logic = this._initLogicModules();
    this.manager = this._initManagerModules();
  }

  _initLogicModules() {
    return {
      auth: new AuthLogic(this),
      secrets: new SecretsLogic(this),
    };
  }

  _initManagerModules() {
    return {
      secrets: new SecretsManager(this),
    };
  }
}
