import ErrorHandler from 'server/handlers/error';
import FrontendHandler from 'server/handlers/frontend';
import AuthPasswordHandler from 'server/handlers/auth/password';
import AuthStatusHandler from 'server/handlers/auth/status';
import SecretsHandler from 'server/handlers/secrets';

export default [
  AuthPasswordHandler,
  AuthStatusHandler,
  SecretsHandler,
  FrontendHandler,
  ErrorHandler,
];
