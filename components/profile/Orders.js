import { useContext } from "react";
import { DataContext } from "../../store/globalState";
import Order from "./Order";

const Orders = () => {
  const { state } = useContext(DataContext);
  const { orders } = state;

  return (
    <>
      <h3 className="text-center text-uppercase">Orders</h3>
      <div className="table-responsive my-3">
        <table
          className="table-bordered table-hover w-100"
          style={{ minWidth: "600px" }}
        >
          <thead className="bg-light">
            <tr>
              <th className="p-2">Id</th>
              <th className="p-2">Date</th>
              <th className="p-2">Total Price</th>
              <th className="p-2">Delivered</th>
              <th className="p-2">Paid</th>
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
