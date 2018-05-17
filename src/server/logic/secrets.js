import BaseLogic from 'server/logic/base';
import SecretsManager from 'server/managers/secrets';
import {
  CODE_NONEXISTENT_SECRET,
  CODE_READ_SECRET_ERROR,
  CODE_SECRET_DECRYPT_ERROR,
  CODE_WRITE_SECRET_ERROR,
  CODE_DUPLICATE_SECRET_ERROR,
  CODE_DELETE_SECRET_ERROR,
} from 'shared/constants/error';

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

    const errors = {
      ER_DUP_ENTRY: {
        code: CODE_DUPLICATE_SECRET_ERROR,
        message: 'A secret with this name already exists.',
      },
      default: {
        code: CODE_WRITE_SECRET_ERROR,
        message: 'There was an undefined error when trying to write a new secret.',
      },
    };

    return this.manager.addSecret({ ...details, secret: encrypted }, (err) => {
      if (err) {
        return cb(errors[err.code] || errors.default);
      }

      return cb();
    });
  }

  /**
   * Delete a specific secret by ID.
   *
   * @param {Number} id ID of the unprotected secret to delete.
   * @param {Function} cb Callback invoked on completion.
   */
  deleteSecretByID(id, cb) {
    return this.manager.deleteSecret(id, (err) => {
      if (err) {
        return cb({
          code: CODE_DELETE_SECRET_ERROR,
          message: 'There was an undefined error when trying to delete a single secret by ID.',
        });
      }

      return cb();
    });
  }

  /**
   * Delete all known unprotected secrets.
   *
   * @param {Function} cb Callback invoked on completion.
   */
  deleteAllSecrets(cb) {
    return this.manager.deleteAllSecrets(false, (err) => {
      if (err) {
        return cb({
          code: CODE_DELETE_SECRET_ERROR,
          message: 'There was an undefined error when trying to delete all secrets.',
        });
      }

      return cb();
    });
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
        return cb({
          code: CODE_READ_SECRET_ERROR,
          message: 'There was an undefined error when trying to retrieve a single secret by ID.',
        });
      }

      if (!row) {
        return cb({
          code: CODE_NONEXISTENT_SECRET,
          message: 'The requested secret does not exist.',
        });
      }

      const { secret, ...details } = row;

      const decrypted = this.ctx.crypto.decrypt(secret, password);
      if (!decrypted) {
        return cb({
          code: CODE_SECRET_DECRYPT_ERROR,
          message: 'Failed to decrypt the secret with the supplied decryption password.',
        });
      }

      return cb(null, {
        name: details.name,
        identity: details.identity,
        link: details.link,
        timestamp: details.timestamp,
        secret: decrypted,
      });
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
        return cb({
          code: CODE_READ_SECRET_ERROR,
          message: 'There was an undefined error when trying to retrieve a list of all secrets.',
        });
      }

      const formatted = results
        .map(({ id, name, identity, link, timestamp }) =>
          ({ id, name, identity, link, timestamp }));

      return cb(null, formatted);
    });
  }
}
