import BaseLogic from 'server/logic/base';
import {
  CODE_NONEXISTENT_SECRET,
  CODE_READ_SECRET_ERROR,
  CODE_SECRET_DECRYPT_ERROR,
  CODE_WRITE_SECRET_ERROR,
  CODE_DUPLICATE_SECRET_ERROR,
  CODE_DELETE_SECRET_ERROR,
} from 'shared/constants/error';

export default class SecretsLogic extends BaseLogic {
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
        status: 409,
        code: CODE_DUPLICATE_SECRET_ERROR,
        message: 'A secret with this name already exists.',
      },
      default: {
        code: CODE_WRITE_SECRET_ERROR,
        message: 'There was an undefined error when trying to write a new secret.',
      },
    };

    const secret = { ...details, secret: encrypted };

    return this.ctx.manager.secrets.addSecret(secret, (err, addedRow) => {
      if (err) {
        return cb(errors[err.code] || errors.default);
      }

      return cb(null, {
        id: addedRow.insertId,
        name: details.name,
        identity: details.identity,
        link: details.link,
        notes: details.notes,
      });
    });
  }

  /**
   * Delete a specific secret by ID.
   *
   * @param {Number} id ID of the unprotected secret to delete.
   * @param {Function} cb Callback invoked on completion.
   */
  deleteSecretByID(id, cb) {
    return this.ctx.manager.secrets.deleteSecret(id, (err) => {
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
    return this.ctx.manager.secrets.deleteAllSecrets(false, (err) => {
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
    return this._getSecretByParam('id', id, password, cb);
  }

  /**
   * Retrieve and decrypt a specific secret by name.
   *
   * @param {String} name Name of the secret to read (case sensitive).
   * @param {String} password Master decryption password.
   * @param {Function} cb Callback invoked on completion with the secret details and decrypted
   *                      secret string contents.
   */
  getSecretByName(name, password, cb) {
    return this._getSecretByParam('name', name, password, cb);
  }

  /**
   * Retrieve a list of all secrets and their properties. Note that this will *not* decrypt the
   * selected secrets.
   *
   * @param {Function} cb Callback invoked on completion with a list of secrets.
   */
  getAllSecrets(cb) {
    return this.ctx.manager.secrets.getAllSecrets((err, results) => {
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

  /**
   * General-purpose function to retrieve a secret by a specific parameter value.
   *
   * @param {String} param The secret search parameter: one of 'id' or 'name'.
   * @param {String|Number} value The value of the search parameter.
   * @param {String} password Master decryption password.
   * @param {Function} cb Callback invoked on completion with the secret details and decrypted
   *                      secret string contents.
   * @private
   */
  _getSecretByParam(param, value, password, cb) {
    const lookupFunc = {
      id: this.ctx.manager.secrets.getSecretByID.bind(this.ctx.manager.secrets),
      name: this.ctx.manager.secrets.getSecretByName.bind(this.ctx.manager.secrets),
    };

    return lookupFunc[param](value, (err, [row]) => {
      if (err) {
        return cb({
          code: CODE_READ_SECRET_ERROR,
          message: 'There was an undefined error when trying to retrieve a single secret by ID.',
        });
      }

      if (!row) {
        return cb({
          status: 404,
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
        id: details.id,
        name: details.name,
        identity: details.identity,
        link: details.link,
        timestamp: details.timestamp,
        secret: decrypted,
        notes: details.notes,
      });
    });
  }
}
