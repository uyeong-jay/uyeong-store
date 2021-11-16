import React, { useContext, useState } from "react";
import Head from "next/head";
import { DataContext } from "../store/globalState";

const profile = () => {
  const initialState = {
    avatar: "",
    name: "",
    password: "",
    cf_password: "",
  };

  const [data, setData] = useState(initialState);
  const { avatar, name, password, cf_password } = data;

  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  if (!auth.user) return null; //최초 렌더링시는 auth.user를 받아오기 전
  return (
    <div className="profile">
      <Head>
        <title>Profile</title>
      </Head>

      <section className="row my-3 text-secondary">
        {/* Profile */}
        <div className="col-md-4">
          {/* title */}
          <h3 className="text-center text-uppercase">
            {auth.user.role === "user" ? "User Profile" : "Admin Profile"}
          </h3>

          {/*  */}
          <div className="avatar">
            <img src={auth.user.avatar} alt={auth.user.avatar} />
            <span>
              <i className="fas fa-camera"></i>
              <p>Change</p>
              <input type="file" name="file" id="file_up" />
            </span>
          </div>

          {/* name */}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              id="name"
              placeholder="Your name"
              value={name}
            />
          </div>

          {/* email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              className="form-control"
              type="text"
              name="email"
              id="email"
              placeholder="Your name"
              disabled={true}
              defaultValue={auth.user.email}
            />
          </div>

          {/* password */}
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <input
              className="form-control"
              type="text"
              name="password"
              id="password"
              placeholder="Your new password"
            />
          </div>

          {/* comfirm password */}
          <div className="form-group">
            <label htmlFor="cf_password">Confirm New Password</label>
            <input
              className="form-control"
              type="text"
              name="cf_password"
              id="cf_password"
              placeholder="Confirm new password"
            />
          </div>

          {/* Update button */}
          <button className="btn btn-info">Update</button>
        </div>

        {/* Order */}
        <div className="col-md-8">
          <h3 className="text-center text-uppercase">Orders</h3>
        </div>
      </section>
    </div>
  );
};

export default profile;
