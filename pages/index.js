import { useState, useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { DataContext } from "../store/globalState";
import { TYPES } from "../store/types";
import { getData } from "../utils/fetchData";
import ProductItem from "../components/product/ProductItem";

// 첫 페이지: 나열된 product들
const Home = (props) => {
  const [products, setProducts] = useState(props.products);
  const [isCheck, setIsCheck] = useState(false);

  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  const router = useRouter();

  //체크 토글
  const onChangeCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    }); //각각 체크
    setProducts([...products]); //반영
  };

  //전체 체크 토글
  const onChangeCheckAll = () => {
    setIsCheck(!isCheck); //체크박스 체크
    products.forEach((product) => {
      product.checked = !isCheck;
    }); //전체 체크
    setProducts([...products]); //반영
  };

  const onClickDeleteProducts = () => {
    let deleteArr = [];
    products.forEach((product) => {
      if (product.checked) {
        deleteArr.push({
          data: "",
          id: product._id,
          title: "Selected Products",
          content: "Do you want to delete selected products?",
          type: TYPES.PRODUCT,
        });
      }
    });

    dispatch({ type: TYPES.MODAL, payload: deleteArr });
  };

  return (
    <div>
      <Head>
        <title>UYeong Mall</title>
      </Head>

      {/* admin - check box, button */}
      {auth.user?.role === "admin" ? (
        <div className="btn btn-danger  mt-3" style={{ marginBottom: "-10px" }}>
          <input
            style={{
              width: "20px",
              height: "20px",
              transform: "translateY(6px)",
            }}
            type="checkbox"
            checked={isCheck}
            onChange={onChangeCheckAll}
          />
          <button
            className="btn btn-danger px-4"
            data-toggle="modal"
            data-target="#exampleModal"
            onClick={onClickDeleteProducts}
          >
            DELETE ALL
          </button>
        </div>
      ) : null}
      <div className="products">
        {products.length === 0 ? (
          <h2>No Products</h2>
        ) : (
          products.map((product) => (
            <ProductItem
              key={product._id}
              product={product}
              products={products}
              onChangeCheck={onChangeCheck}
            />
          ))
        )}
      </div>
    </div>
  );
};

//Server Side rendering
export async function getServerSideProps() {
  const res = await getData("product");
  // console.log(res); //서버측 렌더링이기 때문에 console이 아닌 터미널에 찍힘

  return {
    props: {
      products: res.products,
      result: res.result,
    }, // will be passed to the page component as props
  };
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
