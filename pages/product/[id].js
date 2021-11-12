import React, { useState, useContext } from "react";
import Head from 'next/head';
import { getData } from '../../utils/fetchData';
import { DataContext } from '../../store/globalState';
import { addToCart } from '../../store/actions';

const DetailProduct = (props) => {
  const [product, setProduct] = useState(props.product);
  const [tab, setTab] = useState(0); //첫이미지: image[0]

  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;



  const isActive = (index) => {
    //tab: 변하는 값, index: 고정 값
    if (tab === index) return "active";
    return "";
  };
 
  return (
    <div className="row detail-product">

      <Head>
        <title>Detail Product</title>
      </Head>

      {/* Image */}
      <div className="col-md-6">
        {/* main image */}
        <img src={product.images[tab].url} alt={product.images[tab].url} 
        className="d-block img-thumbnail rounded mt-4 w-100" 
        style={{ height: '350px' }} />

        {/* secondary image */}
        <div className="row mx-0" style={{ cursor: 'pointer' }}>
          {product.images.map((img, index) => (
            <img key={index} src={img.url} alt={img.url} 
            className={`img-thumbnail rounded ${isActive(index)}`} 
            style={{ width: '20%', height: '80px' }} 
            onClick={() => setTab(index)} />
          ))}
        </div>
      </div>


      {/* Info */}
      <div className="col-md-6 mt-3">
        {/* title */}
        <h2 className="text-uppercase">{product.title}</h2>

        {/* price */}
        <h5 className="text-danger">${product.price}</h5>

        {/* stock && sold (+ 양쪽으로 배치) */}
        <div className="row justify-content-between mx-0">
          {
            product.inStock > 0
            ? (<h6 className="text-danger">In Stock: {product.inStock}</h6>)
            : (<h6 className="text-danger">Out Stock</h6>)
          }
          <h6 className="text-danger">Sold: {product.sold}</h6>
        </div>

        {/* description */}
        <p className="my-4">{product.description}</p>

        {/* button */}
        <button type="button" className="btn btn-primary d-block my-3 px-5" onClick={() => dispatch(addToCart(product, cart))}>Buy</button>
      </div>

    </div>
  );
};


//Server Side rendering
export async function getServerSideProps({ params: { id } }) {
  // console.log(context.params); //{ id: '618b6f0411620e27043a7307' }
  const res = await getData(`product/${id}`);

  return {
    props: { product: res.product }, // will be passed to the page component as props
  }
}

// res 데이터 구조
// {
//   product: {
//     _id: '618b6f0411620e27043a7307',
//     images: [ [Object], [Object] ],
//     checked: false,
//     inStock: 500,
//     sold: 0,
//     title: 'Lorem',
//     price: 5,
//     description: '~',
//     category: '5faa35a88fdff228384d51d8'
//   }
// }


export default DetailProduct;