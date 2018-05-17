import BaseLogic from 'server/logic/base';
import SecretsManager from 'server/managers/secrets';

export default class SecretsLogic extends BaseLogic {
  constructor(ctx) {
    super(ctx);

    this.manager = new SecretsManager(ctx);
  }

  /**
   * Add a new secret.
   *
   * @param {Object} details Properties of the new entry.
   * @param {String} password Master encryption password.
   * @param {Function} cb Callback invoked on completion.
   */
  addSecret(details, password, cb) {
    const encrypted = this.ctx.crypto.encrypt(details.secret, password);
    return this.manager.addSecret({ ...details, secret: encrypted }, cb);
  }

  /**
   * Delete all known unprotected secrets.
   *
   * @param {Function} cb Callback invoked on completion.
   */
  deleteAllSecrets(cb) {
    return this.manager.deleteAllSecrets(false, cb);
  }

  /**
   * Retrieve and decrypt a specific secret by ID.
   *
   * @param {Number} id ID of the secret to read.
   * @param {String} password Master decryption password.
   * @param {Function} cb Callback invoked on completion with the secret details and decrypted
   *                      secret string contents.
   */
  getSecretByID(id, password, cb) {
    return this.manager.getSecretByID(id, (err, [row]) => {
      if (err) {
        return cb(err);
      }

      if (!row) {
        return cb(new Error('ID does not exist.'));
      }

      const { secret, ...details } = row;

      const decrypted = this.ctx.crypto.decrypt(secret, password);
      if (!decrypted) {
        return cb(new Error('Failure during password decryption.'));
      }

      return cb(null, { ...details, secret: decrypted });
    });
  }

  /**
   * Retrieve a list of all secrets and their properties. Note that this will *not* decrypt the
   * selected secrets.
   *
   * @param {Function} cb Callback invoked on completion with a list of secrets.
   */
  getAllSecrets(cb) {
    return this.manager.getAllSecrets((err, results) => {
      if (err) {
        return cb(err);
      }

      const formatted = results
        .map(({ id, name, identity, link }) => ({ id, name, identity, link }));

      return cb(null, formatted);
    });
  }
}
