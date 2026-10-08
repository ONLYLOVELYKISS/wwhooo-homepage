// Tracks whether the visitor has already passed the entry gate in this session.
//
// Kept in its own module so the view layer can render the correct initial state
// (locked vs unlocked) without importing the interaction code, and so switching
// language no longer has to reload the page and re-lock the visitor.

const KEY = 'wwhooo-entered';

export const hasEntered = () => {
  try {
    return sessionStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
};

export const markEntered = () => {
  try {
    sessionStorage.setItem(KEY, '1');
  } catch {
    /* private mode: the gate simply shows again on the next load */
  }
};

export const clearEntered = () => {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
};
