import { useContext } from "react";
import Link from "next/link";
import { DataContext } from "../../store/globalState";
import { addToCart } from "../../store/actions";
import { TYPES } from "../../store/types";

const ProductItem = ({ product, products, onChangeCheck }) => {
  const { state, dispatch } = useContext(DataContext);
  const { auth, cart } = state; //[ product:{제품정보}, ... ]

  const { _id, images, title, price, inStock, description, checked } = product;

  const onClickCart = () => {
    //성공메세지
    dispatch({
      type: TYPES.NOTIFY,
      payload: { success: "added to cart" },
    });
    //카트에 더하기
    return dispatch(addToCart(product, cart));
  };

  //user전용 버튼
  const userLink = () => {
    return (
      <>
        {/* View -link */}
        <Link href={`/product/${_id}`}>
          <a className="btn btn-info" style={{ marginRight: "5px", flex: 1 }}>
            View
          </a>
        </Link>

        {/* Cart -button */}
        <button
          className="btn btn-success"
          style={{ marginLeft: "5px", flex: 1 }}
          disabled={inStock === 0 ? true : false}
          onClick={onClickCart}
        >
          Cart
        </button>
      </>
    );
  };

  //admin전용 버튼
  const adminLink = () => {
    return (
      <>
        {/* Edit */}
        <Link href={`/create/${_id}`}>
          <a className="btn btn-info" style={{ marginRight: "5px", flex: 1 }}>
            Edit
          </a>
        </Link>

        {/* Delete */}
        <button
          className="btn btn-danger"
          style={{ marginLeft: "5px", flex: 1 }}
          data-toggle="modal"
          data-target="#exampleModal"
          onClick={() =>
            dispatch({
              type: TYPES.MODAL,
              payload: [
                {
                  data: "",
                  id: _id,
                  title: title,
                  content: "Do you want to delete this product?",
                  type: TYPES.PRODUCT,
                },
              ],
            })
          }
        >
          Delete
        </button>
      </>
    );
  };

  return (
    // bootstrap 4 - card
    <div className="card" style={{ width: "18rem" }}>
      {/* amdin - check box */}
      {auth.user?.role === "admin" ? (
        <input
          className="position-absolute"
          style={{ width: "20px", height: "20px" }}
          type="checkbox"
          checked={checked}
          onChange={() => onChangeCheck(_id)}
        />
      ) : null}

      {/* image */}
      <img className="card-img-top" src={images[0].url} alt={images[0].url} />

      {/* card- body */}
      <div className="card-body">
        {/* title (+text-capitalize: 첫글자만 대문자로)*/}
        <h5 className="card-title text-capitalize">{title}</h5>

        {/* price && stock (+ 양쪽으로 배치) */}
        <div className="row justify-content-between mx-0">
          <h6 className="text-danger">${price}</h6>
          {inStock > 0 ? (
            <h6 className="text-danger">In Stock: {inStock}</h6>
          ) : (
            <h6 className="text-danger">Out Stock</h6>
          )}
        </div>

        {/* description */}
        <p className="card-text">{description.substr(0, 80) + "..."}</p>

        {/* button - View, Buy (+ 양쪽으로 배치) */}
        <div className="row justify-content-between mx-0">
          {/* !auth.user로 role 유무 에러 해결 */}
          {!auth.user || auth.user.role !== "admin" ? userLink() : adminLink()}
        </div>
      </div>
    </div>
  );
};

//데이터 구조
//   products: [
//     {
//       _id: '618b6f0411620e27043a7307',
//       images: [Array]>>[ {"public_id":~, "url":~}, ... ],
//       checked: false,
//       inStock: 500,
//       sold: 0,
//       title: 'Lorem',
//       price: 5,
//       description: "~"
//     },
//     ...

export default ProductItem;
