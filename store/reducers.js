import { TYPES } from "./types";


//state: { notify: {}, auth: {} }
const reducers = (state, action) => {
  switch (action.type) {
    case TYPES.NOTIFY:
      return {
        ...state,
        notify: action.payload
      };
    case TYPES.AUTH:
      return {
        ...state,
        auth: action.payload
      };
    default:
      return state;
  };
};

export default reducers;