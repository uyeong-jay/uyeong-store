import { useState, useContext, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { DataContext } from "../store/globalState";
import { TYPES } from "../store/types";
import { getData } from "../utils/fetchData";
import ProductItem from "../components/product/ProductItem";
import { filterSearch } from "../utils/filterSearch";

// 첫 페이지: 나열된 product들
const Home = (props) => {
  const [products, setProducts] = useState(props.products);
  const [isCheck, setIsCheck] = useState(false);
  const [page, setPage] = useState(1);

  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  const router = useRouter();

  console.log(Object.keys(router.query));

  //products 업데이트
  useEffect(() => {
    setProducts(props.products);
    //products X, props.products O
  }, [props.products]);

  //query가 없으면 항상 1 page
  useEffect(() => {
    if (Object.keys(router.query).length <= 0) setPage(1);
  }, [router.query]);

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

  // delete all 버튼 클릭시
  const onClickDeleteProducts = () => {
    let deleteArr = [];

    // check 된 것들 배열에 담기
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

    //배열 modal로 전달
    if (deleteArr.length > 0)
      return dispatch({ type: TYPES.MODAL, payload: deleteArr });
  };

  // load more 클릭시
  const onClickLoadmore = () => {
    setPage(page + 1);
    filterSearch({ router, page: page + 1 });
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

      {/* Products */}
      <div className="products">
        {products.length === 0 ? (
          // No products
          <h2>No Products</h2>
        ) : (
          // Products
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

      {/* Load more button */}
      {props.result < page * 3 ? (
        ""
      ) : (
        <button
          className="btn btn-outline-info d-block mx-auto mb-4"
          onClick={onClickLoadmore}
        >
          Load more
        </button>
      )}
      {/* 18 props: {
        products: [
            {
              _id: '61ac6c7399767bd7b7d26f4f',
              title: '123',
              price: 1,
              description: '123123',
              content: '123123123',
              images: [Array],
              category: '61a767670d208d123219aa42',
              checked: false,
              inStock: 2,
              sold: 0,
              createdAt: '2021-12-05T07:38:27.688Z',
              updatedAt: '2021-12-05T07:38:27.688Z',
              __v: 0
            }
        ],
        result: 1
      } */}
    </div>
  );
};

//Server Side rendering
export async function getServerSideProps({ query }) {
  const page = query.page || 1;
  console.log("13. page:", page);

  const category = query.category || "all";
  console.log("14. category:", category);

  const sort = query.sort || "";
  console.log("15. sort:", sort);

  const search = query.search || "all";
  console.log("16. search:", search);

  const res = await getData(
    `product?limit=${
      page * 3
    }&category=${category}&sort=${sort}&title=${search}`
  );

  // console.log(res); //서버측 렌더링이기 때문에 console이 아닌 터미널에 찍힘
  // 17. res: {
  //   status: 'success',
  //   result: 1,
  //   products: [
  //     {
  //       _id: '61ac6c7399767bd7b7d26f4f',
  //       title: '123',
  //       price: 1,
  //       description: '123123',
  //       content: '123123123',
  //       images: [Array],
  //       category: '61a767670d208d123219aa42',
  //       checked: false,
  //       inStock: 2,
  //       sold: 0,
  //       createdAt: '2021-12-05T07:38:27.688Z',
  //       updatedAt: '2021-12-05T07:38:27.688Z',
  //       __v: 0
  //     }
  //   ]
  // }

  return {
    props: {
      products: res.products,
      result: res.result,
    }, // will be passed to the page component as props
  };
}

export default Home;
