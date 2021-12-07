import Link from "next/link";

const OrderItem = ({ item }) => {
  const { _id, images, price, quantity, title } = item;

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
        <Link href={`/product/${_id}`}>
          <a>{title}</a>
        </Link>
      </h5>

      {/* item-price */}
      <span className="text-info m-0">
        ${price} x {quantity} = ${price * quantity}
      </span>
    </div>
  );
};

export default OrderItem;
