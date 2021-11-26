import React, { useContext } from "react";
import Head from "next/head";
import { DataContext } from "../store/globalState";
import User from "../components/user/user";

const Users = () => {
  const { state, dispatch } = useContext(DataContext);
  const { users } = state;

  return (
    <div className="table-responsive">
      <Head>
        <title>Users</title>
      </Head>

      <table className="table w-100">
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Avartar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <User
              key={user._id}
              user={user}
              index={index}
              state={state}
              dispatch={dispatch}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
