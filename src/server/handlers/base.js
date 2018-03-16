import { HTTPHandler } from 'supercharged/server';

export default class BaseHandler extends HTTPHandler {
  constructor(req, res, ctx) {
    super(req, res);

    this.ctx = ctx;
  }
}
