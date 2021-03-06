import { route, withSchema } from 'supercharged/server';
import BaseHandler from 'server/handlers/base';
import {
  createSession,
  invalidateSession,
  requireAuth,
  DEFAULT_SESSION_COOKIE_NAME,
  DEFAULT_SESSION_EXPIRY_INTERVAL,
} from 'server/middleware/auth';
import { CODE_SESSION_ERROR } from 'shared/constants/error';

const {
  SESSION_EXPIRY_INTERVAL = DEFAULT_SESSION_EXPIRY_INTERVAL,
  SESSION_COOKIE_NAME = DEFAULT_SESSION_COOKIE_NAME,
} = process.env;

@route('/api/auth/status')
export default class AuthStatusHandler extends BaseHandler {
  /**
   * Check if the client-supplied session is properly authenticated.
   */
  @requireAuth
  get() {
    return this.success({
      message: 'The session is authenticated.',
    });
  }

  /**
   * Verify the master password and generate an in-memory session, communicated via a cookie, if the
   * password is valid.
   */
  @withSchema({
    properties: {
      password: {
        type: 'string',
        minLength: 1,
      },
    },
    required: ['password'],
  })
  post({ password }) {
    return this.ctx.logic.auth.verify(password, (verifyErr) => {
      if (verifyErr) {
        return this.error(verifyErr);
      }

      return createSession(password, (sessionErr, sid) => {
        if (sessionErr) {
          return this.error({
            status: 500,
            code: CODE_SESSION_ERROR,
            message: 'There was an error generating an authentication cookie for this session. ' +
            'Try again.',
          });
        }

        const cookieOpts = { maxAge: SESSION_EXPIRY_INTERVAL * 1000, httpOnly: true };
        this.res.cookie(SESSION_COOKIE_NAME, sid, cookieOpts);

        return this.success();
      });
    });
  }

  /**
   * Log out the currently authenticated user.
   */
  @requireAuth
  delete() {
    invalidateSession(this.req.cookies[SESSION_COOKIE_NAME]);

    return this.success();
  }
}
