import { TYPES } from "./types";

//state: { notify: {}, auth: {}, cart: [], modal: {},orders: [], users: [] }
const reducers = (state, action) => {
  switch (action.type) {
    case TYPES.NOTIFY:
      return {
        ...state,
        notify: action.payload,
      };
    case TYPES.AUTH:
      return {
        ...state,
        auth: action.payload,
      };
    case TYPES.ADD_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case TYPES.ADD_MODAL:
      return {
        ...state,
        modal: action.payload,
      };
    case TYPES.ADD_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case TYPES.ADD_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case TYPES.ADD_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
};

export default reducers;
