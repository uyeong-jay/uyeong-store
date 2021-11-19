import React, { useEffect, useRef } from "react";
import { postData } from "../utils/fetchData";
import { TYPES } from "../store/types";

const PaypalBtn = ({ totalPrice, address, mobile, state, dispatch }) => {
  const refPayPalBtn = useRef();
  const { cart, auth, orders } = state;

  useEffect(() => {
    paypal
      .Buttons({
        createOrder: function (data, actions) {
          // This function sets up the details of the transaction, including the amount and line item details.
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: totalPrice,
                },
              },
            ],
          });
        },

        onApprove: function (data, actions) {
          // This function captures the funds from the transaction.

          //결제 완료 전 로딩화면
          dispatch({ type: TYPES.NOTIFY, payload: { loading: true } });

          //결제 완료 후 실행 함수
          return actions.order.capture().then(function (details) {
            // This function shows a transaction success message to your buyer.

            //결제 후 응답 받기
            postData(
              "order",
              { address, mobile, cart, totalPrice },
              auth.token
            ).then((res) => {
              //console.log(res); >> { msg: "", newOrder: {user, address, mobile, cart, totalPrice} }

              if (res.err)
                return dispatch({
                  type: TYPES.NOTIFY,
                  payload: { error: res.err },
                }); //에러 메세지

              dispatch({ type: TYPES.ADD_CART, payload: [] }); //카트 비우기

              dispatch({
                type: TYPES.ADD_ORDERS,
                payload: [...orders, res.newOrder],
              }); //새주문 >> 주문목록에 추가

              return dispatch({
                type: TYPES.NOTIFY,
                payload: { success: res.msg },
              }); //성공 메세지
            });
          });
        },
      })
      .render(refPayPalBtn.current);
    //This function displays Smart Payment Buttons on your web page.
  }, []);

  return <div ref={refPayPalBtn}></div>;
};

export default PaypalBtn;
