import React from "react";
import OrderItem from "./OrderItem";

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

  const { auth, orders } = state;

  const { _id, address, mobile, user, cart, delivered, updatedAt } = order;

  if (!auth.user) return null; //최초 렌더링시는 auth.user를 받아오기 전
  return (
    <div className="row justify-content-center" style={{ margin: "20px auto" }}>
      <div className="my-3" style={{ maxWidth: "600px" }}>
        {/* title */}
        <h2 className="text-uppercase text-break">Order:&nbsp;{_id}</h2>

        {/* shipping-info */}
        <div className="my-5 text-secondary">
          <h3 className="my-3">Shipping</h3>
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

        <hr style={{ border: 0, height: "3px", background: "#ccc" }} />

        {/* Order Items-info */}
        <div>
          <h3 className="text-uppercase">Order Items</h3>
          {cart.map((item) => (
            <OrderItem key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
