import React from 'react';
import NavBar from './NavBar'; //Layout에 navbar 포함 시키기
import Notify from './Notify'; //알림 연결
import Modal from './Modal'; //모달 연결

const Layout = ({ children }) => {
  return (
    // container: 중앙위치시키기 + width 조절
    <div className="container">
      <NavBar />
      <Notify />
      <Modal />
      {children}
    </div>
  );
};

export default Layout;
