export const SEND_USER_EMAIL = 'SEND_USER_EMAIL';
export const SEND_USER_NAME = 'SEND_USER_NAME';

export const sendUserEmail = (email) => ({ type: SEND_USER_EMAIL, payload: email });

export const sendUserName = (name) => ({ type: SEND_USER_NAME, payload: name });
