import { route, withSchema } from 'supercharged/server';
import BaseHandler from 'server/handlers/base';
import { requireAuth, invalidateSession, DEFAULT_SESSION_COOKIE_NAME } from 'server/middleware/auth';

const {
  SESSION_COOKIE_NAME = DEFAULT_SESSION_COOKIE_NAME,
} = process.env;

@route('/api/auth/password')
export default class AuthPasswordHandler extends BaseHandler {
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
    return this.ctx.logic.auth.setVerification(password, (err) => {
      if (err) {
        return this.error(err);
      }

      // Invalidate the session associated with the old cookie, which uses the old password
      invalidateSession(this.req.cookies[SESSION_COOKIE_NAME]);

      return this.success({
        message: 'Password updated successfully.',
      });
    });
  }
}
