import React from "react";
import OrderItem from "./OrderItem";
import PaypalBtn from "../PaypalBtn";

const OrderDetail = ({ order, state, dispatch }) => {
  // order 데이터
  // { _id: "619248f315ba1dc07bdded38"
  //  address: ""
  //  mobile: ""
  //  cart: [{…}]
  //  user: { ~ }
  //  totalPrice: 8
  //  paid: false
  //  delivered: false
  //  createdAt: ""
  //  updatedAt: ""
  //  __v: 0 }

  const { auth } = state;

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

  if (!auth.user) return null; //최초 렌더링시는 auth.user를 받아오기 전
  return (
    <div className="row justify-content-center" style={{ margin: "20px auto" }}>
      <div className="my-3" style={{ maxWidth: "600px" }}>
        {/* title */}
        <h2 className="text-uppercase text-break">Order&nbsp;{_id}</h2>

        {/* delivery-info */}
        <div className="my-5 text-secondary">
          <h3 className="my-3">Delivery</h3>
          <p>Name:&nbsp;{user.name}</p>
          <p>Email:&nbsp;{user.email}</p>
          <p>Address:&nbsp;{address}</p>
          <p>Mobile:&nbsp;{mobile}</p>
        </div>

        {/* check-delivered */}
        <div
          className={`alert ${
            delivered ? "alert-success" : "alert-danger"
          } justify-content-between align-items-center`}
          role="alert"
          style={{ marginTop: "-30px", marginBottom: "50px" }}
        >
          {delivered ? `Deliverd on ${updatedAt}` : "Not Delivered"}
        </div>

        {/* Payment - info */}
        <div className="text-secondary">
          <h3 className="my-3">Payment</h3>
          <p>Method: {method}</p>
          <p>Payment ID: {paymentId}</p>
        </div>
        <div
          className={`alert ${
            paid ? "alert-success" : "alert-danger"
          } justify-content-between align-items-center`}
          role="alert"
          style={{ marginBottom: "50px" }}
        >
          {paid ? `Paid On ${dateOfPayment}` : "Not Paid"}
        </div>

        {/* 경계선 */}
        <hr style={{ border: 0, height: "3px", background: "#ccc" }} />

        {/* Order Items-info */}
        <div>
          <h3 className="text-uppercase">Order Items</h3>
          {cart.map((item) => (
            <OrderItem key={item._id} item={item} />
          ))}
        </div>

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
