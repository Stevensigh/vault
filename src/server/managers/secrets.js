import BaseManager from 'server/managers/base';

const VERIFY_KEY = '_vault_verify';

export default class SecretsManager extends BaseManager {
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

      if (!entry) {
        return cb(new Error('Verification secret does not exist!'));
      }

      return cb(null, entry.secret);
    });
  }

  setEncVerify(encryptedVerification, cb) {
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
}
