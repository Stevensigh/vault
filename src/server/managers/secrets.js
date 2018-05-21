import BaseManager from 'server/managers/base';
import { VERIFY_KEY } from 'server/constants/auth';

export default class SecretsManager extends BaseManager {
  /**
   * Retrieve the encrypted contents of the verification key, if available.
   *
   * @param {Function} cb Callback invoked with (err, encrypted secret).
   */
  getEncVerify(cb) {
    const sql = `
      SELECT *
      FROM secret
      WHERE name = ?
    `;

    return this.ctx.db.exec(sql, [VERIFY_KEY], (err, [entry]) => {
      if (err) {
        return cb(err);
      }

      return cb(null, (entry || {}).secret);
    });
  }

  /**
   * Set the encrypted verification key.
   *
   * @param {String} encryptedVerification Plaintext verification key encrypted with the master
   *                                       password.
   * @param {Function} cb Callback invoked with (err).
   */
  setEncVerify(encryptedVerification, cb) {
    // Add a new entry if it doesn't exist; otherwise, update the existing verification secret
    const sql = `
      INSERT INTO secret (protected, timestamp, name, secret)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE timestamp = VALUES(timestamp), secret = VALUES(secret)
    `;

    const values = [
      true,
      Date.now(),
      VERIFY_KEY,
      encryptedVerification,
    ];

    return this.ctx.db.exec(sql, values, cb);
  }

  /**
   * Retrieve a secret entry by ID.
   *
   * @param {Number} id ID of the secret.
   * @param {Function} cb Callback invoked with (err, row).
   */
  getSecretByID(id, cb) {
    const sql = `
      SELECT *
      FROM secret
      WHERE id = ?
    `;

    const values = [id];

    return this.ctx.db.exec(sql, values, cb);
  }

  /**
   * Get a list of all non-protected secrets.
   *
   * @param {Function} cb Callback invoked with (err, rows).
   */
  getAllSecrets(cb) {
    const sql = `
      SELECT *
      FROM secret
      WHERE protected = ?
    `;

    const values = [false];

    return this.ctx.db.exec(sql, values, cb);
  }

  /**
   * Add a new secret.
   *
   * @param {Object} details Object describing the properties of the new entry.
   * @param {Function} cb Callback invoked with (err).
   */
  addSecret(details, cb) {
    const sql = `
      INSERT INTO secret (timestamp, name, identity, link, secret, notes)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
      Date.now(),
      details.name,
      details.identity || null,
      details.link || null,
      details.secret,
      details.notes || null,
    ];

    return this.ctx.db.exec(sql, values, cb);
  }

  /**
   * Delete an unprotected secret by ID.
   *
   * @param {Number} id ID of the secret to delete.
   * @param {Function} cb Callback invoked with (err).
   */
  deleteSecret(id, cb) {
    const sql = `
      DELETE FROM secret
      WHERE id = ? AND protected = ?
    `;

    const values = [id, false];

    return this.ctx.db.exec(sql, values, cb);
  }

  /**
   * Delete all known secrets.
   *
   * @param {Boolean} includeProtected True to delete all secrets; false to only delete
   *                                   non-protected secrets.
   * @param {Function} cb Callback invoked with (err).
   */
  deleteAllSecrets(includeProtected, cb) {
    const sql = `
      DELETE FROM secret
      WHERE protected = ? OR protected = ?
    `;

    const values = [false, includeProtected];

    return this.ctx.db.exec(sql, values, cb);
  }
}
