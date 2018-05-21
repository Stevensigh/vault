import BaseLogic from 'server/logic/base';
import SecretsManager from 'server/managers/secrets';
import { VERIFY_KEY } from 'server/constants/auth';
import {
  CODE_MASTER_DECRYPTION_PASSWORD_INCORRECT,
  CODE_AUTHENTICATION_ERROR,
  CODE_CHANGE_PASSWORD_ERROR,
  CODE_DELETE_SECRET_ERROR,
} from 'shared/constants/error';

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
        return cb({
          code: CODE_AUTHENTICATION_ERROR,
          message: 'An error occurred when reading the master password verification key.',
        });
      }

      if (!secret) {
        return cb({
          code: CODE_AUTHENTICATION_ERROR,
          message: 'The master password verification key does not exist. ' +
            'Vault does not seem to be have been configured on the server yet.',
        });
      }

      const decryptVerify = this.ctx.crypto.decrypt(secret, password);

      if (decryptVerify !== VERIFY_KEY) {
        return cb({
          status: 401,
          code: CODE_MASTER_DECRYPTION_PASSWORD_INCORRECT,
          message: 'The supplied master password is incorrect.',
        });
      }

      return cb();
    });
  }

  setVerification(password, cb) {
    const encryptVerify = this.ctx.crypto.encrypt(VERIFY_KEY, password);

    // Changing the master password invalidates all previous passwords.
    // Wipe all user-created secrets.
    return this.manager.deleteAllSecrets(false, (deleteErr) => {
      if (deleteErr) {
        return cb({
          code: CODE_DELETE_SECRET_ERROR,
          message: 'There was an error while deleting all existing secrets. Try again?',
        });
      }

      return this.manager.setEncVerify(encryptVerify, (setVerifyErr) => {
        if (setVerifyErr) {
          return cb({
            code: CODE_CHANGE_PASSWORD_ERROR,
            message: 'An error occurred when trying to update the password. Try again?',
          });
        }

        return cb();
      });
    });
  }
}
