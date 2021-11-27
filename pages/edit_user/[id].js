import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { DataContext } from "../../store/globalState";
import { TYPES } from "../../store/types";
import { patchData } from "../../utils/fetchData";
import { updateItem } from "../../store/actions";

const EditUser = () => {
  const { state, dispatch } = useContext(DataContext);
  const { auth, users } = state;

  const [editUser, setEditUser] = useState([]);
  const [checkAdmin, setCheckAdmin] = useState(false);

  const router = useRouter();
  const { id } = router.query;
  // console.log(editUser); // { 유저정보 } >> 빈 배열에 객체, 배열요소 등 넣기

  useEffect(() => {
    // user >> _id, avatar, name, email, admin, role, root
    users.forEach((user) => {
      //여러 user._id 중 해당 페이지의 id
      if (user._id === id) {
        setEditUser(user);
        setCheckAdmin(user.role === "admin" ? true : false);
      }
    });
  }, [users]);

  //admin 토글
  const onChangeCheck = () => {
    setCheckAdmin(!checkAdmin);
  };

  //role 변경하기
  const onClickUpdate = () => {
    let role = checkAdmin ? "admin" : "user";

    dispatch({ type: TYPES.NOTIFY, payload: { loading: true } }); //로딩

    //role보내기
    patchData(`user/${editUser._id}`, { role }, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: TYPES.NOTIFY, payload: { error: res.err } }); //에러

      //role 변경 >> admin or user
      dispatch(
        updateItem(users, editUser._id, { ...editUser, role }, TYPES.ADD_USERS)
      );

      return dispatch({ type: TYPES.NOTIFY, payload: { success: res.msg } }); //성공
    });
  };

  return (
    <div className="edit_user">
      <Head>
        <title>Edit User</title>
      </Head>

      <div className="col-md-4 mx-auto my-4">
        <h3 className="text-uppercase text-secondary">Edit user</h3>

        <div className="form-group">
          <label htmlFor="name" className="d-block">
            Name
          </label>
          <input type="text" id="name" defaultValue={editUser.name} disabled />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="d-block">
            Email
          </label>
          <input
            type="email"
            id="email"
            defaultValue={editUser.email}
            disabled
          />
        </div>

        <div className="form-group">
          <input
            type="checkbox"
            id="isAdmin"
            checked={checkAdmin}
            onChange={onChangeCheck}
            style={{ width: "20px", height: "20px" }}
          />
          <label
            htmlFor="isAdmin"
            style={{ transform: "translate(4px, -3px)" }}
          >
            Admin
          </label>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <button className="btn btn-info" onClick={onClickUpdate}>
            Update
          </button>

          <button className="btn btn-info" onClick={() => router.back()}>
            {/* fontawesome - long-arrow (+ aria-hidden ) */}
            <i className="fas fa-long-arrow-alt-left" aria-hidden="true"></i>
            &nbsp;Go&nbsp;Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
