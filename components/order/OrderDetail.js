import React from "react";
import OrderItem from "./OrderItem";
import PaypalBtn from "../PaypalBtn";
import { patchData } from "../../utils/fetchData";
import { updateItem } from "../../store/actions";
import { TYPES } from "../../store/types";

const OrderDetail = ({ order, state, dispatch }) => {
  const { auth, orders } = state;

  const {
    _id,
    address,
    mobile,
    user,
    cart,
    delivered,
    updatedAt,
    paid,
    totalPrice,
    dateOfPayment,
    paymentId,
    method,
  } = order;

  const onClickDelivered = (order) => {
    dispatch({ type: TYPES.NOTIFY, payload: { loading: true } }); //로딩

    //result 데이터 가져오기
    patchData(`order/delivered/${order._id}`, null, auth.token).then((res) => {
      // console.log(res); //msg, result

      if (res.err)
        return dispatch({ type: TYPES.NOTIFY, payload: { error: res.err } }); //에러

      const { paid, dateOfPayment, method, delivered } = res.result;

      //order에 result 내용들 추가
      dispatch(
        updateItem(
          orders,
          order._id,
          {
            ...order,
            paid,
            dateOfPayment,
            method,
            delivered,
          },
          TYPES.ORDERS
        )
      ); //update order

      return dispatch({ type: TYPES.NOTIFY, payload: { success: res.msg } }); //성공
    });
  };

  return (
    <div className="row justify-content-center" style={{ margin: "20px auto" }}>
      <div className="my-3" style={{ maxWidth: "600px" }}>
        {/* title */}
        <h2 className="text-uppercase text-break">Order&nbsp;{_id}</h2>

        {/* delivery-info */}
        <div className="my-5 text-secondary">
          <h3 className="my-3">Delivery</h3>
          <p>
            Name:&nbsp;<em>{user.name}</em>
          </p>
          <p>
            Email:&nbsp;<em>{user.email}</em>
          </p>
          <p>
            Address:&nbsp;<em>{address}</em>
          </p>
          <p>
            Mobile:&nbsp;<em>{mobile}</em>
          </p>
        </div>

        {/* check-delivered */}
        <div
          className={`alert ${
            delivered ? "alert-success" : "alert-danger"
          } d-flex justify-content-between align-items-center`}
          role="alert"
          style={{ marginTop: "-30px", marginBottom: "50px" }}
        >
          {delivered ? `Delivered on ${updatedAt}` : "Not Delivered"}
          {auth.user.role === "admin" && !delivered && (
            <button
              className="btn btn-info"
              onClick={() => onClickDelivered(order)}
            >
              Mark as delivered
            </button>
          )}
        </div>

        {/* payment - info */}
        <div className="text-secondary">
          <h3 className="my-3">Payment</h3>
          {method && (
            <p>
              Method:&nbsp;<em>{method}</em>
            </p>
          )}
          {paymentId && (
            <p>
              Payment ID:&nbsp;<em>{paymentId}</em>
            </p>
          )}
        </div>
        <div
          className={`alert ${
            paid ? "alert-success" : "alert-danger"
          } justify-content-between align-items-center`}
          role="alert"
          style={{ marginBottom: "50px" }}
        >
          {paid ? `Paid on ${dateOfPayment}` : "Not Paid"}
        </div>

        {/* 경계선 */}
        <hr style={{ border: 0, height: "3px", background: "#ccc" }} />

        {/* order items-info */}
        <div>
          <h3 className="text-uppercase">Order Items</h3>
          {cart.map((item) => (
            <OrderItem key={item._id} item={item} />
          ))}
        </div>

        {/* paid && user일때  */}
        {!paid && auth.user.role !== "admin" && (
          <div className="float-right my-4">
            <h3 className="float-right mb-4 text-uppercase text-info">
              Total:&nbsp;${totalPrice}&nbsp;
            </h3>
            <PaypalBtn order={order} />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
