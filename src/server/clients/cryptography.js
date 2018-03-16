import crypto from 'crypto';

/**
 * Client for encrypting and decrypting plain-text strings with a salted password.
 */
export default class CryptographyClient {
  /**
   * Create an instance of the encryption/decryption client.
   *
   * @param {String} algorithm Encryption algorithm to use.
   * @param {Number} iterations Number of iterations to use when salting the password.
   * @param {String} salt Salt to use when generating the encryption key from a string password.
   */
  constructor({ algorithm = 'aes-256-cbc', iterations = 100000, salt }) {
    this.algorithm = algorithm;
    this.iterations = iterations;
    this.salt = salt;
  }

  /**
   * Encrypt a string with an arbitrary-length plain-text password.
   *
   * @param {String} text Text to encrypt.
   * @param {String} password Password that, when combined with a salt, generates the key used for
   *                          encrypting the plain text.
   * @return {String} Encrypted string as hex.
   */
  encrypt(text, password) {
    const cipher = crypto.createCipher(this.algorithm, this._deriveKey(password));

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted;
  }

  /**
   * Decrypt an encrypted hex string with the password used during encryption.
   *
   * @param {String} text Encrypted text as a hex string.
   * @param {String} password Password used for encrypting the original plain text.
   * @return {String|null} Original plain text if the decryption was successful; null otherwise.
   */
  decrypt(text, password) {
    const decipher = crypto.createDecipher(this.algorithm, this._deriveKey(password));

    try {
      let decrypted = decipher.update(text, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    } catch (e) {
      // Decryption failure; likely bad password
      return null;
    }
  }

  /**
   * Derive an AES key from an arbitrary-length password and a salt.
   *
   * @param {String} password String password.
   * @return {Buffer} Buffer instance representing the AES encryption key.
   * @private
   */
  _deriveKey(password) {
    return crypto.pbkdf2Sync(password, this.salt, this.iterations, 256 / 8, 'sha512');
  }
}
