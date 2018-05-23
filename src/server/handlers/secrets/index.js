import { route, withSchema } from 'supercharged/server';
import BaseHandler from 'server/handlers/base';
import { requireAuth } from 'server/middleware/auth';

@route('/api/secrets')
export default class SecretsHandler extends BaseHandler {
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
      return this.ctx.logic.secrets.getAllSecrets((err, secrets) => {
        if (err) {
          return this.error(err);
        }

        return this.success({ data: secrets });
      });
    }

    return this.ctx.logic.secrets.getSecretByID(id, password, (err, secret) => {
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
      notes: {
        type: 'string',
        minLength: 1,
      },
    },
    required: ['name', 'secret'],
  })
  post({ name, identity = null, link = null, secret, notes = null }, password) {
    const secretDetails = { name, identity, link, secret, notes };

    return this.ctx.logic.secrets.addSecret(secretDetails, password, (err, entry) => {
      if (err) {
        return this.error(err);
      }

      return this.success({
        data: entry,
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
      return this.ctx.logic.secrets.deleteAllSecrets((err) => {
        if (err) {
          return this.error(err);
        }

        return this.success({
          message: 'All secrets successfully deleted.',
        });
      });
    }

    return this.ctx.logic.secrets.deleteSecretByID(id, (err) => {
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
