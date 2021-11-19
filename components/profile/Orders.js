import React, { useContext } from "react";
import { DataContext } from "../../store/globalState";
import Order from "./Order";

const Orders = () => {
  const { state, dispatch } = useContext(DataContext);
  const { orders } = state;

  return (
    <>
      <h3 className="text-center text-uppercase">Orders</h3>
      <div className="my-3">
        <table
          className="table-bordered table-hover w-100"
          style={{ minWidth: "600px" }}
        >
          <thead className="bg-light">
            <tr>
              <td className="p-2">Id</td>
              <td className="p-2">Date</td>
              <td className="p-2">Total</td>
              <td className="p-2">Delivered</td>
              <td className="p-2">Action</td>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <Order key={order._id} order={order} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Orders;
