export const SET_DECRYPTION_PASSWORD = 'SET_DECRYPTION_PASSWORD';

/**
 * Save the master decryption password.
 *
 * @param {String} password Master decryption password presented during login.
 * @return {Object} Action for saving the master decryption password.
 */
export const setDecryptionPassword = (password) => ({
  type: SET_DECRYPTION_PASSWORD,
  payload: { password },
});
