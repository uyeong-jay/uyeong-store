import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { DataContext } from "../../store/globalState";

const EditUser = () => {
  const { state, dispatch } = useContext(DataContext);
  const { auth, users } = state;

  const [editUser, setEditUser] = useState([]);
  const [checkAdmin, setCheckAdmin] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    //  user >> _id, avatar, name, email, admin, role, root
    //여러개 중 하나
    users.forEach((user) => {
      if (user._id === id) {
        setEditUser(user);
        setCheckAdmin(user.role === "admin" ? true : false);
      }
    });
  }, []);

  return (
    <div className="profile edit_user">
      <Head>
        <title>Edit User</title>
      </Head>

      <button className="btn btn-info" onClick={() => router.back()}>
        <i className="fas fa-long-arrow-alt-left">&nbsp;Go&nbsp;Back</i>
      </button>
    </div>
  );
};

export default EditUser;
