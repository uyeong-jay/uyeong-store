import React from 'react';
import NavBar from './NavBar'; //Layout에 navbar 포함 시키기

const Layout = ({ children }) => {
  return (
    // container: 중앙위치시키기 + width 조절
    <div className="container">
      <NavBar />
      {children}
    </div>
  );
};

export default Layout;
