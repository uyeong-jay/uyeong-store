//contxet 생성 , useReducer 생성
import { createContext, useReducer } from 'react';
import reducers from './reducers';

//context 담기
export const DataContext = createContext();

//provider 생성
export const DataProvider = ({ children }) => {
  const initialState = { notify: {}, auth: {} };

  //useReducer
  const [state, dispatch] = useReducer(reducers, initialState);

  return (
    //context + provider
    <DataContext.Provider value={[ state, dispatch ]}>
      {children}
    </DataContext.Provider>
  );
};
