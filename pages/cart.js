import React, { useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { DataContext } from '../store/globalState';
import CartItem from '../components/cart/CartItem';

const Cart = () => {
  const { state, dispatch } = useContext(DataContext);
  const { auth, cart } = state;



  
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

              <h3>Total: <span className="text-info">$0</span></h3>

              <Link href={auth.user ? '#' : '/signin'}>
                <a className="btn btn-dark my-2 text-capitalize">Proceed with payment</a>
              </Link>
            </div>
          </>
        )
      }
    </div>
  );
};

export default Cart;
