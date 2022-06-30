import { SEND_USER_EMAIL, SEND_USER_NAME } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEND_USER_EMAIL:
    return {
      ...state,
      gravatarEmail: action.payload,
    };
  case SEND_USER_NAME:
    return {
      ...state,
      name: action.payload,
    };
  default:
    return state;
  }
};

export default player;
