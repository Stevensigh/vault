import { route, withSchema } from 'supercharged/server';
import BaseHandler from 'server/handlers/base';
import AuthLogic from 'server/logic/auth';
import { requireAuth, invalidateSession, DEFAULT_SESSION_COOKIE_NAME } from 'server/middleware/auth';
import { CODE_CHANGE_PASSWORD_ERROR } from 'shared/constants/error';

const {
  SESSION_COOKIE_NAME = DEFAULT_SESSION_COOKIE_NAME,
} = process.env;

@route('/api/login/password')
export default class LoginPasswordHandler extends BaseHandler {
  /**
   * Change the master password.
   */
  @requireAuth
  @withSchema({
    properties: {
      password: {
        type: 'string',
        minLength: 1,
      },
    },
    required: ['password'],
  })
  put({ password }) {
    const auth = new AuthLogic(this.ctx);

    return auth.setVerification(password, (err) => {
      if (err) {
        return this.error({
          status: 500,
          code: CODE_CHANGE_PASSWORD_ERROR,
          message: 'An error occurred when trying to update the password. Try again?',
        });
      }

      // Invalidate the session associated with the old cookie, which uses the old password
      invalidateSession(this.req.cookies[SESSION_COOKIE_NAME]);

      return this.success({
        message: 'Password updated successfully.',
      });
    });
  }
}
