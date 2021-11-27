import React from "react";
import Link from "next/link";
import { TYPES } from "../../store/types";

const User = ({ user, index, state, dispatch }) => {
  const { auth, users } = state;

  const { _id, avatar, name, email, role, root } = user;

  if (!auth.user.root) return null;
  return (
    <tr>
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
        {/* admin(+root), admin, user 각각 표시 */}
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
      <th style={{ cursor: "pointer" }}>
        {/* edit_user link */}
        <Link
          href={
            //root: super-user
            //auth.user.email: 현재 로그인 되어있는 이메일
            //user.email: 목록의 이메일
            //관리자 이메일만 edit_user에 접근 가능
            (auth.user.root && auth.user.email) !== email
              ? `/edit_user/${_id}`
              : "#!"
          }
        >
          <a>
            <i className="fas fa-edit text-info" title="Edit"></i>
          </a>
        </Link>

        {/* delete icon - user */}
        {(auth.user.root && auth.user.email) !== email ? (
          <i
            className="fas fa-trash-alt text-danger ml-3"
            title="Remove"
            // Modal 적용
            data-toggle="modal"
            data-target="#exampleModal"
            onClick={() =>
              dispatch({
                type: TYPES.ADD_MODAL,
                payload: {
                  data: users,
                  id: user._id,
                  title: user.name,
                  type: TYPES.ADD_USERS,
                },
              })
            }
          ></i>
        ) : null}
      </th>
    </tr>
  );
};

export default User;
