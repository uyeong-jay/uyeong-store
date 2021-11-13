import React from 'react';
import Link from 'next/link';

const CartItem = ({ item, cart, dispatch }) => {
  return (
    <tr>
      {/* cart-item-image */}
      <td style={{ width: '100px', overflow: 'hidden' }}>
        <img src={item.images[0].url} alt={item.images[0].url} className="img-thumbnail rounded" 
        style={{ minWidth: '80px', height: '80px' }}/>
      </td>

      {/* cart-item-title */}
      <td style={{ minWidth: '200px' }}>
        <h5 className="text-capitalize text-secondary my-2">
          <Link href={`/product/${item._id}`}><a>{item.title}</a></Link>
        </h5>
        <h6 className="text-danger">${item.quantity * item.price}</h6>
        {
          item.inStock > 0
          ? (<p className="text-danger">In Stock: {item.inStock}</p>)
          : (<p className="text-danger">Out Stock</p>)
        }
      </td>
    </tr>
  );
};

export default CartItem;
