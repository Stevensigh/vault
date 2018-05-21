// The client-supplied master decryption password is incorrect.
export const CODE_MASTER_DECRYPTION_PASSWORD_INCORRECT = 1;

// The client attempted to access an authenticated resource without a valid session.
export const CODE_SESSION_UNAUTHENTICATED = 2;

// The session cookie supplied by the client has expired.
export const CODE_SESSION_EXPIRED = 3;

// An undefined session registration error occurred.
export const CODE_SESSION_ERROR = 4;

// An error occurred during the authentication process.
export const CODE_AUTHENTICATION_ERROR = 5;

// An error occurred when trying to change the password.
export const CODE_CHANGE_PASSWORD_ERROR = 6;

// Generic database error when attempting to read secrets.
export const CODE_READ_SECRET_ERROR = 7;

// The requested secret does not exist.
export const CODE_NONEXISTENT_SECRET = 8;

// Error during decryption of the selected secret.
export const CODE_SECRET_DECRYPT_ERROR = 9;

// Generic database error when attempting to write secrets.
export const CODE_WRITE_SECRET_ERROR = 10;

// A secret with this name already exists.
export const CODE_DUPLICATE_SECRET_ERROR = 11;

// Generic database error when attempting to delete secrets.
export const CODE_DELETE_SECRET_ERROR = 12;
