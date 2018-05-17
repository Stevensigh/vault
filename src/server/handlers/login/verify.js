import { route, withSchema } from 'supercharged/server';
import BaseHandler from 'server/handlers/base';
import AuthLogic from 'server/logic/auth';
import {
  createSession,
  DEFAULT_SESSION_EXPIRY_INTERVAL,
  DEFAULT_SESSION_COOKIE_NAME,
} from 'server/middleware/auth';
import { CODE_SESSION_ERROR } from 'shared/constants/error';

const {
  SESSION_EXPIRY_INTERVAL = DEFAULT_SESSION_EXPIRY_INTERVAL,
  SESSION_COOKIE_NAME = DEFAULT_SESSION_COOKIE_NAME,
} = process.env;

@route('/api/login/verify')
export default class LoginVerifyHandler extends BaseHandler {
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
    const auth = new AuthLogic(this.ctx);

    return auth.verify(password, (verifyErr) => {
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
}
