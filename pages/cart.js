import React, { useContext } from 'react';
import Head from 'next/head';
import { DataContext } from '../store/globalState';

const Cart = () => {
  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;



  
  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      {
        cart.length <= 0 
        ? (<img className="d-block mx-auto img-responsive w-50 my-5" src="/empty_cart.png" alt="empty_cart" />)
        : (<h2>Cart</h2>)
      }
    </>
  );
};

export default Cart;
