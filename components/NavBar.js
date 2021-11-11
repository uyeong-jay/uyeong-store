import React, { useContext } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { DataContext } from '../store/globalState';
import { TYPES } from '../store/types';

const NavBar = () => {
  const router = useRouter();
  //pathname(string): 현재경로
  const isActive = (rt) => rt === router.pathname ? "active" :  "";

  const {state, dispatch} = useContext(DataContext);
  const { auth } = state;


  const onClickLogout = () => {
    Cookies.remove('refreshtoken', { path: 'api/auth/accessToken' });
    localStorage.removeItem('firstLogin');
    dispatch({ type: TYPES.AUTH, payload: {} });
    dispatch({ type: TYPES.NOTIFY, payload: { success: 'Logged out!' } })
  };

  return (
    // 부트스트랩 ver 4 - navbar
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand">UYeong-Mall</a>
      </Link>

      {/* Toggle-Button*/}
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNavDropdown" style={{ justifyContent: 'end' }}>

        <ul className="navbar-nav">

          {/* Cart */}
          {/* isActive(): " active" or "" */}
          <li className={`nav-item ${isActive('/cart')}`}>
            <Link href="/cart">
              {/* font awesome - cart (+ aria-hidden ) */}
              <a className="nav-link"><i className="fas fa-shopping-cart" aria-hidden="true"></i> Cart</a>
            </Link>
          </li>

          {
            //Object.keys(obj): obj의 key들만 모아서 배열로 반환
            Object.keys(auth).length === 0 //인증 정보 유무
            ? (
              // Sign-in 
              <li className={"nav-item" + isActive('/signin')}>
                <Link href="/signin">
                  {/* font awesome - user (+ aria-hidden )*/}
                  <a className="nav-link"><i className="fas fa-user" aria-hidden="true"></i> Sign in</a>
                </Link>
              </li>
            ) : (
              // Dropdown-menu
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img src={auth.user.avatar} alt={auth.user.avatar} 
                  style={{ width: '20px', height: '20px', marginRight: '4px', marginBottom: '3px'}} />
                  {auth.user.name}
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <a className="dropdown-item" href="#">Profile</a>
                  <button className="dropdown-item" type="button" onClick={onClickLogout}>Logout</button>
                </div>
              </li>
            )
          }

        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
