import React, { useContext, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { DataContext } from '../store/globalState';
import CartItem from '../components/cart/CartItem';
import { getData } from '../utils/fetchData';
import { TYPES } from '../store/types';

const Cart = () => {
  const { state, dispatch } = useContext(DataContext);
  const { auth, cart } = state;


  const totalPrice = useMemo(() => {
    return cart.reduce((prev, item) => prev + (item.price * item.quantity),0);
  },[cart]);


  //카트 데이터 최신화 유지(데이터를 직접 바꿔도 최신화 유지가능)
  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem('user_cart'));//배열
    if (localCart && localCart.length > 0) {
      let newArr = [];
      const newCartData = async () => {

        for (const item of localCart) { //cart product 하나하나 최신화
          const res = await getData(`product/${item._id}`); //{ product: ~ }
          const { _id, title, images, price, inStock } = res.product;
          if (inStock > 0) { //inStock이 0 이면 빈배열 그대로 반환
            newArr.push({ _id, title, images, price, inStock, quantity: (item.quantity > inStock ? 1 : item.quantity) });
          };
        }

        dispatch({ type: TYPES.ADD_CART, payload: newArr });
      };
      newCartData();
    };
  },[]);

  
  return (
    <div className="row mx-auto">
      <Head>
        <title>Cart</title>
      </Head>
      {
        cart.length <= 0 
        // empty_cart-image
        ? (<img className="d-block mx-auto img-responsive w-50 my-5" src="/empty_cart.png" alt="empty_cart" />)
        : (
          <>
            {/* cart-table */}
            <div className="col-md-8 table-responsive my-3 text-secondary">
              <h2 className="text-uppercase">Shopping Cart</h2>

              <table className="table my-3">
                <tbody>{cart.map((item) => (<CartItem key={item._id} item={item} cart={cart} dispatch={dispatch} />))}</tbody>
              </table>
            </div>


            {/* cart-shopping-form */}
            <div className="col-md-4 text-right text-uppercase text-secondary">
              <form>
                <h2>Shopping</h2>
                <label htmlFor="address">Address</label>
                <input type="text" name="address" id="address" className="form-control mb-2" />
                <label htmlFor="mobile">Mobile</label>
                <input type="text" name="mobile" id="mobile" className="form-control mb-2" />
              </form>

              <h3>Total:&nbsp;&nbsp;<span className="text-info">${totalPrice}&nbsp;</span></h3>

              <Link href={auth.user ? '#' : '/signin'}>
                <a className="btn btn-success my-2 text-capitalize">Proceed with payment</a>
              </Link>
            </div>
          </>
        )
      }
    </div>
  );
};

export default Cart;
