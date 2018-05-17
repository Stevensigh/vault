import mysql from 'mysql';

/**
 * Proxying client to MySQL.
 */
export default class DBClient {
  /**
   * Create a MySQL client instance.
   *
   * @param {String} host Hostname of the database.
   * @param {Number} port Port of the database.
   * @param {String} name Database name.
   * @param {String} user Database username.
   * @param {String} pass Corresponding database user password.
   */
  constructor({ host, port, name, user, pass }) {
    this.conn = mysql.createConnection({
      host,
      port,
      user,
      password: pass,
      database: name,
    });
    this.conn.connect();
  }

  exec(...args) {
    return this.conn.query(...args);
  }

  close() {
    return this.conn.end();
  }
}
