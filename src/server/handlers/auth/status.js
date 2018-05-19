import { route } from 'supercharged/server';
import BaseHandler from 'server/handlers/base';
import { requireAuth } from 'server/middleware/auth';

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
}
