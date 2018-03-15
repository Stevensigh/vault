import dotenv from 'dotenv';
import Express from 'express';
import { supercharge } from 'supercharged/server';

dotenv.config();

const main = () => {
  const { PORT = 3000 } = process.env;

  const app = Express();

  supercharge(app, []);

  app.listen(PORT);
};

main();
