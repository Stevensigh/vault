import dotenv from 'dotenv';
import Express from 'express';
import Raven from 'raven';
import { supercharge } from 'supercharged/server';
import handlers from 'server/handlers';

dotenv.config();

const main = () => {
  const { PORT = 3000, SENTRY_SERVER_DSN } = process.env;

  Raven.config(SENTRY_SERVER_DSN).install();

  const app = Express();

  app.use(Raven.requestHandler());
  supercharge(app, handlers);
  app.use(Raven.errorHandler());

  app.listen(PORT);
};

main();
