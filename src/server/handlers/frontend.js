import fs from 'fs';
import { route } from 'supercharged/server';
import BaseHandler from 'server/handlers/base';

@route('*')
export default class FrontendHandler extends BaseHandler {
  get() {
    this.res.setHeader('Content-Type', 'text/html');
    fs.createReadStream('dist/index.html').pipe(this.res);
  }
}
