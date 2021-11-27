import React, { useContext, useState } from "react";
import Head from "next/head";
import { DataContext } from "../store/globalState";
import { TYPES } from "../store/types";
import { postData } from "../utils/fetchData";

const Categories = () => {
  const { state, dispatch } = useContext(DataContext);
  const { auth, categories } = state;

  const [name, setName] = useState("");

  const onClickCreate = async () => {
    //admin일때
    if (auth.user.role !== "admin")
      return dispatch({
        type: TYPES.NOTIFY,
        payload: { error: "Authentication is not vaild." },
      });

    //name이 채워 졌을때
    if (!name)
      return dispatch({
        type: TYPES.NOTIFY,
        payload: { error: "Please fill in the name field" },
      });

    dispatch({ type: TYPES.NOTIFY, payload: { loading: true } }); //로딩

    const res = await postData("categories", { name }, auth.token);
    // console.log(res.newCategory); // newCategory: {  name: "", _id: "", createdAt: "", updatedAt: "", __v: 0 }

    if (res.err)
      return dispatch({
        type: TYPES.NOTIFY,
        payload: { error: res.err },
      }); //에러

    dispatch({
      type: TYPES.ADD_CATEGORIES,
      payload: [...categories, res.newCategory],
    }); //categories에 newCategory추가

    setName(""); //input 초기화

    return dispatch({
      type: TYPES.NOTIFY,
      payload: { success: res.msg },
    }); //성공
  };

  return (
    <div className="col-md-6 mx-auto">
      <Head>
        <title>Categories</title>
      </Head>

      <div className="input-group mb-3">
        <input
          className="form-control"
          type="text"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Add a new category"
        />

        <button className="btn btn-secondary ml-2" onClick={onClickCreate}>
          Create
        </button>
      </div>

      {categories.map((category) => (
        <div className="card" key={category._id}>
          <div className="card-body d-flex justify-content-between">
            {category.name}
            <div style={{ cursor: "pointer" }}>
              <i className="fas fa-edit mr-3 text-info"></i>
              <i className="fas fa-trash-alt text-danger"></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
