import { useContext } from "react";
import Head from "next/head";
import { DataContext } from "../store/globalState";
import User from "../components/user/user";

const Users = () => {
  const { state, dispatch } = useContext(DataContext);
  const { auth, users } = state;

  if (!auth.user) return null; //인증된 유저만
  return (
    <div className="table-responsive">
      <Head>
        <title>Users</title>
      </Head>

      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">ID</th>
            <th scope="col">Avartar</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Admin</th>
            <th scope="col">Edit/Delete</th>
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
