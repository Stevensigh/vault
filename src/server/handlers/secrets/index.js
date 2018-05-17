import { route, withSchema } from 'supercharged/server';
import BaseHandler from 'server/handlers/base';
import SecretsLogic from 'server/logic/secrets';
import { requireAuth } from 'server/middleware/auth';

class SecretsBaseHandler extends BaseHandler {
  constructor(req, res, ctx) {
    super(req, res, ctx);

    this.logic = new SecretsLogic(ctx);
  }
}

@route('/api/secrets')
export default class SecretsHandler extends SecretsBaseHandler {
  /**
   * Read a specific secret if an ID is supplied, or retrieve a list of all secrets.
   */
  @requireAuth
  @withSchema({
    properties: {
      id: {
        type: 'number',
        min: 1,
      },
    },
  })
  get({ id = null }, password) {
    if (id === null) {
      return this.logic.getAllSecrets((err, secrets) => {
        if (err) {
          return this.error(err);
        }

        return this.success({ data: secrets });
      });
    }

    return this.logic.getSecretByID(id, password, (err, secret) => {
      if (err) {
        return this.error(err);
      }

      return this.success({ data: secret });
    });
  }

  /**
   * Create a new secret.
   */
  @requireAuth
  @withSchema({
    properties: {
      name: {
        type: 'string',
        minLength: 1,
        maxLength: 255,
      },
      identity: {
        type: 'string',
        minLength: 1,
      },
      link: {
        type: 'string',
        pattern: 'http(s?)://.+',
      },
      secret: {
        type: 'string',
        minLength: 1,
      },
    },
    required: ['name', 'secret'],
  })
  post({ name, identity, link, secret }, password) {
    return this.logic.addSecret({ name, identity, link, secret }, password, (err) => {
      if (err) {
        return this.error(err);
      }

      return this.success({
        data: {
          name,
          identity,
          link,
        },
        message: 'The new secret was added successfully.',
      });
    });
  }

  /**
   * Delete a specific secret if an ID is supplied, or delete all secrets.
   */
  @requireAuth
  @withSchema({
    properties: {
      id: {
        type: 'number',
        min: 1,
      },
    },
  })
  delete({ id = null }) {
    if (id === null) {
      return this.logic.deleteAllSecrets((err) => {
        if (err) {
          return this.error(err);
        }

        return this.success({
          message: 'All secrets successfully deleted.',
        });
      });
    }

    return this.logic.deleteSecretByID(id, (err) => {
      if (err) {
        return this.error(err);
      }

      return this.success({
        message: 'Deleted secret successfully.',
        data: { id },
      });
    });
  }
}
