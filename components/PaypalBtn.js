import React, { useEffect, useRef, useContext } from "react";
import { patchData } from "../utils/fetchData";
import { DataContext } from "../store/globalState";
import { TYPES } from "../store/types";
import { updateItem } from "../store/actions";

const PaypalBtn = ({ order }) => {
  const refPayPalBtn = useRef();
  const { state, dispatch } = useContext(DataContext);
  const { auth, orders } = state;

  useEffect(() => {
    paypal
      .Buttons({
        createOrder: function (data, actions) {
          // This function sets up the details of the transaction, including the amount and line item details.
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: order.totalPrice,
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

            // console.log(details);
            // {
            //    create_time: "2021-11-23T06:22:56Z"
            //    id: ""
            //    intent: "CAPTURE"
            //    links: [{…}]
            //    payer: {name: {…}, email_address: '', payer_id: '', address: {…}}
            //    purchase_units: [{…}]
            //    status: "COMPLETED"
            //    update_time: "2021-11-23T06:23:07Z"
            // }
            const { create_time, payer } = details;

            //결제 후 응답 받기
            patchData(
              `order/payment/${order._id}`,
              { paymentId: payer.payer_id },
              auth.token
            ).then((res) => {
              if (res.err)
                return dispatch({
                  type: TYPES.NOTIFY,
                  payload: { error: res.err },
                }); //에러 메세지

              dispatch(
                updateItem(
                  orders,
                  order._id,
                  {
                    ...order,
                    paid: true,
                    dateOfpayment: create_time,
                    paymentId: payer.payer_id,
                    method: "Paypal",
                  },
                  TYPES.ADD_ORDERS
                )
              ); //paid, dateOfpayment 변경 / paymentId, method 추가

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
