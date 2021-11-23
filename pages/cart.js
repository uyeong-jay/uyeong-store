import React, { useContext, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import CartItem from "../components/cart/CartItem";
import { DataContext } from "../store/globalState";
import { TYPES } from "../store/types";
import { getData, postData } from "../utils/fetchData";

const Cart = () => {
  const { state, dispatch } = useContext(DataContext);
  const { auth, cart, orders } = state;

  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [callback, setCallback] = useState(false);

  const router = useRouter();

  //카트에 넣은 제품들 총 가격 반환 함수
  const totalPrice = useMemo(() => {
    return cart.reduce((prev, item) => prev + item.price * item.quantity, 0);
  }, [cart]);

  //카트 데이터 최신화 유지(데이터를 직접 바꿔도 최신화 유지가능)(+ callback에 변화가 있을때 마다)
  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("user_cart")); //배열
    if (localCart && localCart.length > 0) {
      let newArr = [];
      const newCartData = async () => {
        //cart product 하나하나 최신화
        for (const item of localCart) {
          const res = await getData(`product/${item._id}`); //{ product: ~ }
          const { _id, title, images, price, inStock, sold } = res.product;
          if (inStock > 0) {
            //inStock이 0 이면 빈배열 그대로 반환
            newArr.push({
              _id,
              title,
              images,
              price,
              inStock,
              sold,
              quantity: item.quantity > inStock ? 1 : item.quantity,
            });
          }
        }

        return dispatch({ type: TYPES.ADD_CART, payload: newArr });
      };
      newCartData();
    }
  }, [callback]);

  //결제 버튼 클릭
  const onClickPayment = async () => {
    //주소, 번호 기입확인
    if (!address || !mobile) {
      return dispatch({
        type: TYPES.NOTIFY,
        payload: { error: "Please add your address and mobile" },
      });
    }

    let newCart = [];
    for (let item of cart) {
      const res = await getData(`product/${item._id}`);

      //재고가 더 많을때 새카트에 상품 넣기
      if (res.product.inStock - item.quantity >= 0) {
        newCart.push(item);
      }
    }

    //newCart[]에 상품이 넣어지지 않았을 시
    if (newCart.length < cart.length) {
      setCallback(!callback); //데이터 최신화
      return dispatch({
        type: "NOTIFY",
        payload: {
          error: "The product is out of stock or the quantity is insufficient.",
        },
      });
    }

    dispatch({ type: "NOTIFY", payload: { loading: true } }); //로딩

    postData("order", { address, mobile, cart, totalPrice }, auth.token).then(
      (res) => {
        //console.log(res); >> { msg: "", newOrder: {user, address, mobile, cart, totalPrice} }

        if (res.err)
          return dispatch({
            type: TYPES.NOTIFY,
            payload: { error: res.err },
          }); //에러 메세지

        dispatch({ type: TYPES.ADD_CART, payload: [] }); //카트 비우기

        const newOrder = {
          ...res.newOrder,
          user: auth.user,
        }; //user에 id대신 유저 정보(auth.user) 넣기

        dispatch({
          type: TYPES.ADD_ORDERS,
          payload: [...orders, newOrder],
        }); //주문목록에 newOrder추가

        dispatch({
          type: TYPES.NOTIFY,
          payload: { success: res.msg },
        }); //주문 성공 메세지

        //새로 주문한 상품 페이지로 리다이렉트
        return router.push(`/order/${res.newOrder._id}`);
      }
    );
  };

  return (
    <div className="row mx-auto">
      <Head>
        <title>Cart</title>
      </Head>
      {cart.length <= 0 ? (
        // empty_cart-image
        <img
          className="d-block mx-auto img-responsive w-50 my-5"
          src="/empty_cart.png"
          alt="empty_cart"
        />
      ) : (
        <>
          {/* cart-table */}
          <div className="col-md-8 table-responsive my-3 text-secondary">
            <h2 className="text-uppercase">Shopping Cart</h2>

            <table className="table my-3">
              <tbody>
                {cart.map((item) => (
                  <CartItem
                    key={item._id}
                    item={item}
                    cart={cart}
                    dispatch={dispatch}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <div className="col-md-4 text-right text-uppercase text-secondary">
            {/* cart-shopping-form */}
            <form>
              <h2>Shopping</h2>

              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                className="form-control mb-2"
                value={address}
                onChange={(e) => setAddress(e.currentTarget.value)}
              />

              <label htmlFor="mobile">Mobile</label>
              <input
                type="text"
                name="mobile"
                id="mobile"
                className="form-control mb-2"
                value={mobile}
                onChange={(e) => setMobile(e.currentTarget.value)}
              />
            </form>

            {/* total price */}
            <h3>
              Total:&nbsp;&nbsp;
              <span className="text-info">${totalPrice}&nbsp;</span>
            </h3>

            <Link href={auth.user ? "#!" : "/signin"}>
              <a
                className="btn btn-success my-2 text-capitalize"
                onClick={onClickPayment}
              >
                Proceed with payment
              </a>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
