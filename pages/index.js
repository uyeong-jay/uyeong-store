import React, { useState } from "react";
import Head from 'next/head';
import { getData } from '../utils/fetchData';
import ProductItem from '../components/product/ProductItem';

// 첫 페이지: 나열된 product들이 보임
const Home = (props) => {
  const [products, serProducts] = useState(props.products);


  return (
    <div className="products">
      <Head>
        <title>UYeong Mall</title>
      </Head>
      {
        products.length === 0
        ? (<h2>No Products</h2>)
        : (products.map((product) => (<ProductItem key={product._id} product={product} />)))
      }
    </div>
  );
};



//Server Side rendering
export async function getServerSideProps() {
  const res = await getData('product'); 
  // console.log(res); //서버측 렌더링이기 때문에 console이 아닌 터미널에 찍힘
  return {
    props: {
      products: res.products,
      result: res.result
    }, // will be passed to the page component as props
  }
}

// 데이터 구조
// {
//   status: 'success',
//   result: 3,
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
//   ]
// }

export default Home;
