import { FETCH_MESSAGES, POST_MESSAGE } from '../actions/index';

// eslint-disable-next-line
export default function(state = null, action) {
  switch (action.type) {
    case FETCH_MESSAGES:
      return action.payload;
    case POST_MESSAGE:
      return [...state, action.payload];
    default:
      return state;
  }
}