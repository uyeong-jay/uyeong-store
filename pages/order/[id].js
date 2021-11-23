import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../store/globalState";
import Head from "next/head";
import { useRouter } from "next/router";
import OrderDetail from "../../components/order/OrderDetail";

const DetailOrder = () => {
  const { state, dispatch } = useContext(DataContext);
  const { orders } = state;

  const router = useRouter();
  // console.log(router); //back, push, query, route, pathname...

  const [newOrders, setNewOrders] = useState([]);

  //해당id의 주문정보를 orders 데이터가 바뀔때 마다 업데이트
  useEffect(() => {
    //order._id(여러개), router.query.id(하나)
    const newArr = orders.filter((order) => order._id === router.query.id);
    setNewOrders(newArr); // newArr: [{해당id의 주문정보}]
  }, [orders]);

  return (
    <div className="my-3">
      <Head>
        <title>Detail Order</title>
      </Head>

      <div>
        {newOrders.map((order) => (
          <OrderDetail
            key={order._id}
            order={order}
            state={state}
            dispatch={dispatch}
          />
        ))}
      </div>

      {/* 뒤로가기 버튼 */}
      <div
        className="row justify-content-end"
        style={{
          maxWidth: "559px",
          margin: "20px auto",
        }}
      >
        {/* fontawsome - long arrow (+ aria-hidden="true") */}
        <button className="btn btn-dark mt-1" onClick={() => router.back()}>
          <i className="fas fa-long-arrow-alt-left" aria-hidden="true"></i>
          &nbsp;&nbsp;Go&nbsp;Back
        </button>
      </div>
    </div>
  );
};

export default DetailOrder;
