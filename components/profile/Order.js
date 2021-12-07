import Link from "next/link";

const Order = ({ order }) => {
  const { _id, createdAt, totalPrice, delivered, paid } = order;
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

      {/* paid (+ fontawesome icons - check, times)*/}
      <td className="p-2">
        {paid ? (
          <i className="fas fa-check text-success"></i>
        ) : (
          <i className="fas fa-times text-danger"></i>
        )}
      </td>
    </tr>
  );
};

export default Order;
