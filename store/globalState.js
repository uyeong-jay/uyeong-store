//contxet 생성 , useReducer 생성
import { createContext, useReducer, useEffect } from "react";
import reducers from "./reducers";
import { getData } from "../utils/fetchData";
import { TYPES } from "./types";

//context 담기
export const DataContext = createContext();

//provider 생성
export const DataProvider = ({ children }) => {
  //글로벌 state
  const initialState = {
    notify: {}, // { loading: "", success: "", error: "" }
    auth: {}, // { user: {유저정보}, token: "" }
    cart: [], // [ {product정보}, ... ]
    modal: {}, // { data: [], id: "", title: "" }
    orders: [], // [ {order정보}, ... ]
    users: [], // [ {user정보}, ... ]
    categories: [], // [ {category정보}, ... ]
  };

  //useReducer
  const [state, dispatch] = useReducer(reducers, initialState);
  const { cart, auth } = state;

  //-------------localStorage 정보 유지-------------
  //스토리지에 firstLogin이 존재할시: auth정보 다시dispatch >> 새로고침시에도 유저 정보 유지
  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");

    if (firstLogin) {
      getData("auth/accessToken").then((res) => {
        if (res.err) return localStorage.removeItem("firstLogin");
        return dispatch({
          type: TYPES.AUTH,
          payload: {
            token: res.access_token,
            user: res.user,
          },
        });
      });

      getData("categories").then((res) => {
        if (res.err)
          return dispatch({ type: TYPES.NOTIFY, payload: { error: res.err } });

        return dispatch({
          type: TYPES.ADD_CATEGORIES,
          payload: res.categories,
        });
      });
    }
  }, []);

  //스토리지에 user_cart가 존재할시: cart정보 다시dispatch >> 새로고침시에도 유저 cart 정보 유지
  useEffect(() => {
    const user_cart = JSON.parse(localStorage.getItem("user_cart")); //user_cart: [ product:{제품정보}, ... ]

    if (user_cart)
      return dispatch({ type: TYPES.ADD_CART, payload: user_cart });
  }, []);

  //초기 user_cart 생성 후, cart에 변화있을 때마다 스토리지에 바뀐 cart 저장
  useEffect(() => {
    localStorage.setItem("user_cart", JSON.stringify(cart));
  }, [cart]);

  //token이 다시 넣어질때 마다 주문목록(orders) 상태 데이터 업데이트
  //+ admin으로 로그인 한 경우 유저정보(users) 상태 데이터 업데이트
  //+ 로그아웃시 데이터 초기화
  useEffect(() => {
    if (auth.token) {
      getData("order", auth.token).then((res) => {
        if (res.err)
          return dispatch({ type: TYPES.NOTIFY, payload: { error: res.err } });

        return dispatch({ type: TYPES.ADD_ORDERS, payload: res.orders }); //orders: [주문된 목록]
      });

      if (auth.user.role === "admin") {
        getData("user", auth.token).then((res) => {
          // console.log(res); // { users : [ { email: '', name: '', ... }} ]}
          if (res.err)
            return dispatch({
              type: TYPES.NOTIFY,
              payload: { error: res.err },
            }); //에러

          return dispatch({ type: TYPES.ADD_USERS, payload: res.users }); //유저정보 users상태 데이터에 넣기
        });
      }
    } else {
      //위의 조건에 맞지 않을 경우(ex 로그아웃시)
      dispatch({ type: TYPES.ADD_ORDERS, payload: [] }); //orders 데이터 초기화
      return dispatch({ type: TYPES.ADD_USERS, payload: [] }); //users 데이터 초기화
    }
  }, [auth.token]);

  return (
    //context + provider
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
