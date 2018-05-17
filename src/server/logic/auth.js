import BaseLogic from 'server/logic/base';
import SecretsManager from 'server/managers/secrets';
import { VERIFY_KEY } from 'server/constants/auth';

export default class AuthLogic extends BaseLogic {
  constructor(ctx) {
    super(ctx);

    this.manager = new SecretsManager(ctx);
  }

  /**
   * Verify that the supplied master password is correct.
   *
   * @param {String} password Plain-text password supplied by the client.
   * @param {Function} cb Function invoked with an error if the verification fails.
   */
  verify(password, cb) {
    return this.manager.getEncVerify((err, secret) => {
      if (err) {
        return cb(err);
      }

      const decryptVerify = this.ctx.crypto.decrypt(secret, password);

      if (decryptVerify !== VERIFY_KEY) {
        return cb(new Error('Failed to verify password.'));
      }

      return cb();
    });
  }

  setVerification(password, cb) {
    const encryptVerify = this.ctx.crypto.encrypt(VERIFY_KEY, password);

    // Changing the master password invalidates all previous passwords.
    // Wipe all user-created secrets.
    return this.manager.deleteAllSecrets(false, (err) => {
      if (err) {
        return cb(err);
      }

      return this.manager.setEncVerify(encryptVerify, cb);
    });
  }
}
