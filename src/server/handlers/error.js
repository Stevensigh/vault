import { route } from 'supercharged/server';
import { CODE_NOT_FOUND } from 'supercharged/shared/constants/error';
import BaseHandler from 'server/handlers/base';

@route('*')
export default class ErrorHandler extends BaseHandler {
  post() {
    return this._errorResponse();
  }

  put() {
    return this._errorResponse();
  }

  delete() {
    return this._errorResponse();
  }

  _errorResponse() {
    return this.error({
      status: 404,
      message: 'Route not found.',
      code: CODE_NOT_FOUND,
    });
  }
}
