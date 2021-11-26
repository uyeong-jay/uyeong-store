import React from "react";
import Link from "next/link";

const User = ({ user, index, state, dispatch }) => {
  const { auth } = state;

  const { _id, avatar, name, email, admin, role, root } = user;

  return (
    <tr style={{ cursor: "pointer" }}>
      <th>{index + 1}</th>
      <th>{_id}</th>
      <th>
        <img
          src={avatar}
          alt={avatar}
          style={{
            width: "30px",
            height: "30px",
            overflow: "hidden",
            objectFit: "cover",
          }}
        />
      </th>
      <th>{name}</th>
      <th>{email}</th>
      <th>
        {role === "admin" ? (
          root ? (
            <i className="fas fa-check text-success">&nbsp;Root</i>
          ) : (
            <i className="fas fa-check text-success"></i>
          )
        ) : (
          <i className="fas fa-times text-danger"></i>
        )}
      </th>
      <th>
        <Link
          href={
            //root: super-user
            //auth.user.email: 현재 로그인 되어있는 이메일,
            //user.email: 목록의 이메일,
            auth.user.root && auth.user.email !== email
              ? `/edit_user/${_id}`
              : "#!"
          }
        >
          <a>
            <i className="fas fa-edit text-info"></i>
          </a>
        </Link>
        {auth.user.root && auth.user.email !== email ? (
          <i
            className="fas fa-trash-alt text-danger ml-3"
            title="Remove"
            // Modal 적용
            data-toggle="modal"
            data-target="#exampleModal"
          ></i>
        ) : (
          <i className="fas fa-trash-alt text-danger ml-3" title="Remove"></i>
        )}
      </th>
    </tr>
  );
};

export default User;
