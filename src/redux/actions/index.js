export const SEND_USER_EMAIL = 'SEND_USER_EMAIL';
export const SEND_USER_NAME = 'SEND_USER_NAME';
export const SEND_USER_SCORE = 'SEND_USER_SCORE';
export const CLEAR_STATE = 'CLEAR_STATE';

export const sendUserEmail = (email) => ({ type: SEND_USER_EMAIL, payload: email });

export const sendUserName = (name) => ({ type: SEND_USER_NAME, payload: name });

export const sendUserScore = (score) => ({ type: SEND_USER_SCORE, payload: score });

export const clearState = ({ type: CLEAR_STATE });
