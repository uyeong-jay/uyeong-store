import { useContext, useState } from "react";
import Head from "next/head";
import { DataContext } from "../store/globalState";
import { updateItem } from "../store/actions";
import { TYPES } from "../store/types";
import { putData, postData } from "../utils/fetchData";
import Category from "../components/category/category";

const Categories = () => {
  const { state, dispatch } = useContext(DataContext);
  const { auth, categories } = state;

  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const onClickCreate = async () => {
    //admin일때
    if (auth.user.role !== "admin")
      return dispatch({
        type: TYPES.NOTIFY,
        payload: { error: "Authentication is not vaild." },
      });

    //name이 채워져 있지 않을 때
    if (!name)
      return dispatch({
        type: TYPES.NOTIFY,
        payload: { error: "Please fill in the name field" },
      });

    dispatch({ type: TYPES.NOTIFY, payload: { loading: true } }); //로딩

    let res; //res를 활용하기 위해 fetch대신 async/await 사용
    if (id) {
      res = await putData(`categories/${id}`, { name }, auth.token);
      // console.log(res.category); // category: {  name: "", _id: "", createdAt: "", updatedAt: "", __v: 0 }

      if (res.err)
        return dispatch({
          type: TYPES.NOTIFY,
          payload: { error: res.err },
        }); //에러

      dispatch(updateItem(categories, id, res.category, TYPES.CATEGORIES)); //categories중 하나(category)를  res.category로 변경(업데이트)
    } else {
      res = await postData("categories", { name }, auth.token);
      // console.log(res.newCategory); // newCategory: {  name: "", _id: "", createdAt: "", updatedAt: "", __v: 0 }

      if (res.err)
        return dispatch({
          type: TYPES.NOTIFY,
          payload: { error: res.err },
        }); //에러

      dispatch({
        type: TYPES.CATEGORIES,
        payload: [...categories, res.newCategory],
      }); //categories에 newCategory추가
    }

    setName(""); //input 초기화
    setId(""); //id 초기화

    return dispatch({
      type: TYPES.NOTIFY,
      payload: { success: res.msg },
    }); //성공
  };

  const onClickEditCategory = (category) => {
    // console.log(category); // category: {  name: "", _id: "", createdAt: "", updatedAt: "", __v: 0 }
    setName(category.name);
    setId(category._id);
  };

  return (
    <div className="col-md-6 mx-auto">
      <Head>
        <title>Categories</title>
      </Head>

      <div className="input-group my-4">
        {/* category 입력창 */}
        <input
          className="form-control"
          type="text"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Add a new category"
        />

        {/* button - creat, update  */}
        <button className="btn btn-info ml-2" onClick={onClickCreate}>
          {id ? "Update" : "Create"}
        </button>
      </div>

      {/* category */}
      {categories.map((category) => (
        <Category
          key={category._id}
          state={state}
          dispatch={dispatch}
          category={category}
          onClickEditCategory={onClickEditCategory}
        />
      ))}
    </div>
  );
};

export default Categories;
