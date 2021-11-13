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

      {/* cart-item-info */}
      <td style={{ minWidth: '200px' }}>
        <h5 className="text-capitalize text-secondary">
          <Link href={`/product/${item._id}`}><a>{item.title}</a></Link>
        </h5>
        <h6 className="text-danger">${item.quantity * item.price}</h6>
        {
          item.inStock > 0
          ? (<p className="text-danger">In Stock: {item.inStock}</p>)
          : (<p className="text-danger">Out Stock</p>)
        }
      </td>

      {/* cart-count-quantity */}
      <td className="align-middle" style={{ minWidth: '150px' }}>
        <button type="button" className="btn btn-outline-secondary" style={{ width:'30px', height: '30px', padding: 0 }}>-</button>
        <span className="mx-2">{item.quantity}</span>
        <button type="button" className="btn btn-outline-secondary" style={{ width:'30px', height: '30px', padding: 0 }}>+</button>
      </td>
      
      {/* cart-delete-icon */}
      <td className="align-middle" style={{ minWidth: '50px', cursor: 'pointer' }}>
        {/* font awesome - delete (+ aria-hidden ) */}
        <i className="far fa-trash-alt text-danger" aria-hidden='true'></i>
      </td>

    </tr>
  );
};

export default CartItem;
