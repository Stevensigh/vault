import ErrorHandler from 'server/handlers/error';
import FrontendHandler from 'server/handlers/frontend';
import LoginVerifyHandler from 'server/handlers/login/verify';
import LoginPasswordHandler from 'server/handlers/login/password';
import LoginStatusHandler from 'server/handlers/login/status';

export default [
  LoginVerifyHandler,
  LoginPasswordHandler,
  LoginStatusHandler,
  FrontendHandler,
  ErrorHandler,
];
