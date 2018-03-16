import BaseLogic from 'server/logic/base';
import SecretsManager from 'server/managers/secrets';

export const VERIFY_PLAIN_TEXT = '_vault_verify';

export default class AuthLogic extends BaseLogic {
  constructor(ctx) {
    super(ctx);

    this.manager = new SecretsManager(ctx);
  }

  verify(password, cb) {
    return this.manager.getEncVerify((err, secret) => {
      if (err) {
        return cb(err);
      }

      const decryptVerify = this.ctx.crypto.decrypt(secret, password);

      if (decryptVerify !== VERIFY_PLAIN_TEXT) {
        return cb(new Error('Failed to verify password.'));
      }

      return cb();
    });
  }

  setVerification(password, cb) {
    const encryptVerify = this.ctx.crypto.encrypt(VERIFY_PLAIN_TEXT, password);

    return this.manager.setEncVerify(encryptVerify, cb);
  }
}
