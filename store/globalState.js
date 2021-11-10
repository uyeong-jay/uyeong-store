//contxet 생성 , useReducer 생성
import { createContext, useReducer, useEffect } from 'react';
import reducers from './reducers';
import { getData } from '../utils/fetchData';
import { TYPES } from './types';

//context 담기
export const DataContext = createContext();

//provider 생성
export const DataProvider = ({ children }) => {
  const initialState = { notify: {}, auth: {} };

  //useReducer
  const [state, dispatch] = useReducer(reducers, initialState);

  
  //firstLogin이 존재할시: token, user정보를 auth에 다시 넣어주기
  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    
    if (firstLogin) {
      getData('auth/accessToken').then((res) => {

        if (res.err) return localStorage.removeItem("firstLogin");
        return dispatch({ type: TYPES.AUTH, payload: {
          token: res.access_token,
          user: res.user
        }});

      });
    }
  },[])


  return (
    //context + provider
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
