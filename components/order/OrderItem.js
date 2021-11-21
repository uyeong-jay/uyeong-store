import React from "react";
import Link from "next/link";

const OrderItem = ({ item }) => {
  const { _id, images, inStock, price, quantity, sold, title } = item;

  return (
    <div
      className="row justify-content-between align-items-center mx-0 p-2"
      style={{ maxWidth: "550px" }}
    >
      {/* item-image */}
      <img
        src={images[0].url}
        alt={images[0].url}
        className="border border-4 border-info rounded"
        style={{ width: "50px", height: "45px", objectFit: "cover" }}
      />

      {/* item-title */}
      <h5 className="flex-fill px-3 m-0  text-secondary">
        <Link href={`/product/${item._id}`}>
          <a>{title}</a>
        </Link>
      </h5>

      {/* item-price */}
      <span className="text-info m-0">
        ${item.price} x {item.quantity} = ${item.price * item.quantity}
      </span>
    </div>
  );
};

export default OrderItem;
