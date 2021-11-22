import React from "react";
import Link from "next/link";

const Order = ({ order }) => {
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
  const { _id, createdAt, totalPrice, delivered } = order;
  return (
    <tr>
      {/* id (+ Link - detail order) */}
      <td className="p-2">
        <Link href={`/order/${_id}`}>
          <a>{_id}</a>
        </Link>
      </td>

      {/* date */}
      <td className="p-2">{new Date(createdAt).toLocaleDateString()}</td>

      {/* totalprice */}
      <td className="p-2">${totalPrice}</td>

      {/* delivered (+ fontawesome icons - check, times)*/}
      <td className="p-2">
        {delivered ? (
          <i className="fas fa-check text-success"></i>
        ) : (
          <i className="fas fa-times text-danger"></i>
        )}
      </td>
    </tr>
  );
};

export default Order;
