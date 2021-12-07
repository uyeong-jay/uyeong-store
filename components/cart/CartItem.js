import Link from "next/link";
import { count } from "../../store/actions";
import { TYPES } from "../../store/types";

const CartItem = ({ item, cart, dispatch }) => {
  return (
    <tr>
      {/* cart-item-image */}
      <td style={{ width: "100px", overflow: "hidden" }}>
        <img
          src={item.images[0].url}
          alt={item.images[0].url}
          className="img-thumbnail"
          style={{ minWidth: "80px", height: "80px" }}
        />
      </td>

      {/* cart-item-info */}
      <td style={{ minWidth: "300px" }}>
        <h5 className="text-capitalize text-secondary">
          <Link href={`/product/${item._id}`}>
            <a>{item.title}</a>
          </Link>
        </h5>
        <h6 className="text-danger">${item.quantity * item.price}</h6>
        {item.inStock > 0 ? (
          <p className="text-danger">In Stock: {item.inStock}</p>
        ) : (
          <p className="text-danger">Out Stock</p>
        )}
      </td>

      {/* cart-count-quantity */}
      <td className="align-middle" style={{ minWidth: "110px" }}>
        <button
          type="button"
          className="btn btn-outline-secondary"
          style={{ width: "30px", height: "30px", padding: 0 }}
          onClick={() => dispatch(count(cart, item._id, "-"))}
          disabled={item.quantity <= 1 ? true : false}
        >
          -
        </button>

        <span className="mx-2">{item.quantity}</span>

        <button
          type="button"
          className="btn btn-outline-secondary"
          style={{ width: "30px", height: "30px", padding: 0 }}
          onClick={() => dispatch(count(cart, item._id, "+"))}
          disabled={item.quantity >= item.inStock ? true : false}
        >
          +
        </button>
      </td>

      {/* delete icon - cart */}
      <td className="align-middle" style={{ width: "20px", cursor: "pointer" }}>
        {/* font awesome - delete (+ aria-hidden ) (+ Modal 컴포넌트 적용)*/}
        <i
          className="fas fa-trash-alt text-danger"
          title="Remove"
          aria-hidden="true"
          data-toggle="modal"
          data-target="#exampleModal"
          style={{ fontSize: "18px" }}
          onClick={() =>
            dispatch({
              type: TYPES.MODAL,
              payload: [
                {
                  data: cart,
                  id: item._id,
                  title: item.title,
                  content: "Do you want to delete this item?",
                  type: TYPES.CART,
                },
              ],
            })
          } //icon클릭시: cart전체, 제품id, 제품title type전달
        ></i>
      </td>
    </tr>
  );
};

export default CartItem;
