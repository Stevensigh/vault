import crypto from 'crypto';
import {
  CODE_SESSION_UNAUTHENTICATED,
  CODE_SESSION_EXPIRED,
} from 'shared/constants/error';

const {
  SESSION_EXPIRY_INTERVAL = 3600,
  SESSION_COOKIE_NAME = 'vault-sid',
} = process.env;

// In-memory record of session cookies and passwords
const sessions = {};

/**
 * Decorator to require authentication on a route.
 */
export const requireAuth = (target, key, descriptor) => {
  const wrappedFunc = descriptor.value;

  // eslint-disable-next-line no-param-reassign
  descriptor.value = function abortOnUnauthenticatedRequest() {
    const sid = this.req.cookies[SESSION_COOKIE_NAME];

    if (!sid || !sessions[sid]) {
      return this.error({
        status: 401,
        code: CODE_SESSION_UNAUTHENTICATED,
        message: 'No user is currently authenticated in the session.',
      });
    }

    const { password, expiry } = sessions[sid];

    if (Date.now() >= expiry) {
      delete sessions[sid];
      return this.error({
        status: 401,
        code: CODE_SESSION_EXPIRED,
        message: 'Your authenticated session has expired; please login again.',
      });
    }

    return wrappedFunc.call(this, password);
  };

  return descriptor;
};

/**
 * Create a session with the specified master password.
 *
 * @param {String} password Master password, as plain text.
 * @param {Function} cb Callback function invoked after session key generation, called with
 *                      (err, session ID). The caller should pass the session ID string to the
 *                      client as an authentication token.
 */
export const createSession = (password, cb) => crypto.randomBytes(512, (err, buf) => {
  if (err) {
    return cb(err);
  }

  const sid = buf.toString('hex');
  if (sessions[sid]) {
    // This session ID already exists; try again
    return createSession(password, cb);
  }

  sessions[sid] = { password, expiry: Date.now() + (SESSION_EXPIRY_INTERVAL * 1000) };

  return cb(null, sid);
});

/**
 * Invalidate an existing session.
 *
 * @param {String} sid Session ID associated with the session.
 */
export const invalidateSession = (sid) => {
  delete sessions[sid];
};