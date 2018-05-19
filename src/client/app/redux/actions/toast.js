import uuid from 'uuid/v4';

export const SHOW_TOAST = 'SHOW_TOAST';
export const HIDE_TOAST = 'HIDE_TOAST';

const DEFAULT_TOAST_DURATION = 5000;

/**
 * Action factory for displaying a toast by recording it in the store.
 *
 * @param {String} toastID Unique ID of this toast.
 * @param {String} text Toast text.
 * @param {String} type One of 'success', 'warn', or 'error' describing the type of toast.
 */
export const showToast = (toastID, text, type) => ({
  type: SHOW_TOAST,
  payload: { toastID, text, type },
});

/**
 * Action factory for hiding a specific toast.
 *
 * @param {String} toastID Unique ID of the toast to hide.
 */
export const hideToast = (toastID) => ({
  type: HIDE_TOAST,
  payload: { toastID },
});

/**
 * Generate a limited-duration toast. This allows asynchronous "stacking" of multiple, temporally
 * overlapping toasts.
 *
 * @param {String} type One of 'success', 'warn', or 'error' describing the type of toast.
 * @return {Function} Thunk factory that takes parameters text, the toast text, and duration,
 *                    the number of milliseconds that the toast will be displayed.
 */
const generateToast = (type) => (text, duration = DEFAULT_TOAST_DURATION) => (dispatch) => {
  const toastID = uuid();
  dispatch(showToast(toastID, text, type));
  setTimeout(() => dispatch(hideToast(toastID)), duration);
};

/**
 * Convenience toast generation functions bound to specific variants of toast types.
 */
export const toast = {
  success: generateToast('success'),
  warn: generateToast('warn'),
  error: generateToast('error'),
};
