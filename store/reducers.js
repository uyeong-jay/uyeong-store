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
    case TYPES.CART:
      return {
        ...state,
        cart: action.payload,
      };
    case TYPES.MODAL:
      return {
        ...state,
        modal: action.payload,
      };
    case TYPES.ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case TYPES.USERS:
      return {
        ...state,
        users: action.payload,
      };
    case TYPES.CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case TYPES.PRODUCT:
      return {
        ...state,
        isRefreshing: action.payload,
      };
    default:
      return state;
  }
};

export default reducers;
