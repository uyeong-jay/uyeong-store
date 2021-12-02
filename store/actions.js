import { TYPES } from "./types";

export const addToCart = (product, cart) => {
  //product: 제품하나{}, cart: 제품들[]
  //살려는 제품의 재고가 없을때 에러 메세지
  if (product.inStock <= 0) {
    return {
      type: TYPES.NOTIFY,
      payload: { error: "This product is out of stock." },
    };
  }

  //cart안에 하나라도 같은 제품이 없어야 true 반환
  const checkCart = cart.every((item) => item._id !== product._id);
  if (!checkCart) {
    return {
      type: TYPES.NOTIFY,
      payload: { error: "The product has been added to cart." },
    };
  }

  //cart에 product추가(+ product에 quantity 추가)
  return {
    type: TYPES.CART,
    payload: [...cart, { ...product, quantity: 1 }],
  };
};

//count quantity
export const count = (cart, productId, sign) => {
  const newCart = [...cart];

  if (sign === "-")
    newCart.filter((item) => item._id === productId)[0].quantity -= 1;

  if (sign === "+")
    newCart.filter((item) => item._id === productId)[0].quantity += 1;

  return { type: TYPES.CART, payload: newCart };
};

//delete item
export const deleteItem = (data, productId, type) => {
  const newData = data.filter((item) => item._id !== productId); //인자로 들어온 item 외 나머지를 반환
  return { type, payload: newData }; //type: type
};

//update item
export const updateItem = (data, productId, post, type) => {
  const newData = data.map((item) => (item._id === productId ? post : item)); //post: { ~ }

  return { type, payload: newData };
};
