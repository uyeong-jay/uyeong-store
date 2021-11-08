import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NavBar = () => {
  const router = useRouter();
  //pathname(string): 현재경로
  const isActive = rt => rt === router.pathname ? " active" :  ""

  return (
    // 부트스트랩 ver 4 - navbar
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand">UYeong-Mall</a>
      </Link>

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNavDropdown" style={{ justifyContent: 'end' }}>

        <ul className="navbar-nav">
          {/* isActive(): " active" or "" */}
          <li className={"nav-item" + isActive('/cart')}>
            <Link href="/cart">
              {/* font awesome - cart (+ aria-hidden ) */}
              <a className="nav-link"><i className="fas fa-shopping-cart" aria-hidden="true"></i> Cart</a>
            </Link>
          </li>

          <li className={"nav-item" + isActive('/signin')}>
            <Link href="/signin">
              {/* font awesome - user (+ aria-hidden )*/}
              <a className="nav-link"><i className="fas fa-user" aria-hidden="true"></i> Sign in</a>
            </Link>
          </li>

          {/* <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              User Name
            </a>

            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a className="dropdown-item" href="#">Profile</a>
              <a className="dropdown-item" href="#">Logout</a>
            </div>
          </li> */}
        </ul>
        
      </div>

    </nav>
  );
};

export default NavBar;
