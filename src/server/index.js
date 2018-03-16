import Express from 'express';
import Raven from 'raven';
import { supercharge } from 'supercharged/server';
import cookieParser from 'cookie-parser';
import Context from 'server/context';
import handlers from 'server/handlers';

const {
  PORT = 3000,
  SENTRY_SERVER_DSN,
} = process.env;

const main = () => {
  Raven.config(SENTRY_SERVER_DSN).install();

  const app = Express();
  const ctx = new Context();

  app.use(Raven.requestHandler());
  app.use(cookieParser());
  supercharge(app, handlers, {
    createHandler: (HandlerClass) => (...args) => new HandlerClass(...args, ctx),
  });
  app.use(Raven.errorHandler());

  app.listen(PORT);
};

main();
