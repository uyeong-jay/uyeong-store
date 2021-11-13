import React, { useContext } from 'react';
import Head from 'next/head';
import { DataContext } from '../store/globalState';
import CartItem from '../components/cart/CartItem';

const Cart = () => {
  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;



  
  return (
    <div className="row mx-auto">
      <Head>
        <title>Cart</title>
      </Head>
      {
        cart.length <= 0 
        // image-empty_cart
        ? (<img className="d-block mx-auto img-responsive w-50 my-5" src="/empty_cart.png" alt="empty_cart" />)
        : (
          <>
            <div className="col-md-8 table-responsive my-3 text-secondary">
              {/* cart-title */}
              <h2 className="text-uppercase">Shopping Cart</h2>
              {/* cart-table */}
              <table className="table my-3">
                <tbody>{cart.map((item) => (<CartItem key={item._id} item={item} cart={cart} dispatch={dispatch} />))}</tbody>
              </table>
            </div>

            <div className="col-md-4 text-secondary">
              <form>
                <h2>Shopping</h2>

                <label>Address</label>
                <input />

                <label>Mobile</label>
                <input />
              </form>
            </div>
          </>
        )
      }
    </div>
  );
};

export default Cart;
