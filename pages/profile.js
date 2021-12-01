import React, { useContext, useState, useEffect } from "react";
import Head from "next/head";
import { DataContext } from "../store/globalState";
import { TYPES } from "../store/types";
import valid from "../utils/valid";
import { patchData } from "../utils/fetchData";
import { imageUpload } from "../utils/imageUpload";
import Orders from "../components/profile/Orders";

const profile = () => {
  const initialState = {
    avatar: "",
    name: "",
    password: "",
    cf_password: "",
  };
  const [userData, setUserData] = useState(initialState);
  const { avatar, name, password, cf_password } = userData;

  const { state, dispatch } = useContext(DataContext);
  const { auth, notify } = state;
  // console.log(auth.user); //avatar: "", email: "", name: "", role: ""

  //유저 이름 자동 채우기
  useEffect(() => {
    if (auth.user) return setUserData({ ...userData, name: auth.user.name });
  }, [auth.user]);

  //input 데이터 저장
  const onChangeInput = (e) => {
    const { value, name } = e.currentTarget;
    setUserData({ ...userData, [name]: value }); //input 데이터 각각 저장
    return dispatch({ type: TYPES.NOTIFY, payload: {} }); //notify 메세지 초기화
  };

  //password 업데이트 함수
  const updatePassword = () => {
    dispatch({ type: TYPES.NOTIFY, payload: { loading: true } }); //로딩

    //새password 보내고 응답 받기
    patchData("user/resetPassword", { password }, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: TYPES.NOTIFY, payload: { error: res.err } }); //실패
      return dispatch({ type: TYPES.NOTIFY, payload: { success: res.msg } }); //성공
    });
  };

  //유저 정보 업데이트 함수
  const updateUserInfo = async () => {
    dispatch({ type: TYPES.NOTIFY, payload: { loading: true } }); //로딩

    let media;

    //avatar존재시 imageUpload 유틸에 avatar파일 객체로 전달
    if (avatar) media = await imageUpload([avatar]);
    // console.log(typeof [avatar]); //object
    // [avatar]: [ 0: {name: "", ...} ] >>  유사배열(객체)안 이미지 정보(객체)
    // 데이터를 받아오면: console.log(media); // [ {public_id: "" url: ""}, ... ]
    // >> cloud에 저장된후, 반환값 media에 저장

    patchData(
      "user",
      { name, avatar: avatar ? media[0].url : auth.user.avatar }, //name, avatar 전달
      auth.token
    ).then((res) => {
      if (res.err)
        return dispatch({ type: TYPES.NOTIFY, payload: { error: res.err } }); //에러

      // 유저 인증정보 상태 데이터 업데이트 하기 (+ 토큰 다시 넣어주기)
      dispatch({
        type: TYPES.AUTH,
        payload: { token: auth.token, user: res.user },
      });

      return dispatch({ type: TYPES.NOTIFY, payload: { success: res.msg } }); //성공
    });
  };

  //프로필 업데이트( with updatePassword, updateUserInfo)
  const onClickUpdate = (e) => {
    //input에 password가 입력되어 있을때
    if (password) {
      const errMsg = valid(name, auth.user.email, password, cf_password); //유효성 검사
      if (errMsg)
        return dispatch({ type: TYPES.NOTIFY, payload: { error: errMsg } });
      updatePassword();
    }

    //avatar에 file이 있거나, 이름을 바꿨을때
    if (avatar || name !== auth.user.name) updateUserInfo();
  };

  //프로필사진 업로드
  const onChangeAvatar = (e) => {
    // console.log(e.currentTarget.files); //{ file: {name: "", size: num, type: "", ...} }

    const file = e.currentTarget.files[0];

    //파일 선택 에러
    if (!file)
      return dispatch({
        type: TYPES.NOTIFY,
        payload: { error: "No files selected!." },
      });

    //파일 크기 에러
    if (file.size > 1024 * 1024)
      return dispatch({
        type: TYPES.NOTIFY,
        payload: { error: "The image size must be less than 1MB." },
      });

    //파일 확장자 에러
    if (file.type !== "image/jpg" && file.type !== "image/png")
      return dispatch({
        type: TYPES.NOTIFY,
        payload: { error: "Image format is incorrect." },
      });

    //파일 avatar에 저장
    setUserData({ ...userData, avatar: file });
  };

  if (!auth.user) return null; // !로그인 시 null
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

          {/* avatar-image (+ 화면에 표시 >> DomString) */}
          <div className="avatar">
            <img
              src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
              onLoad={() => URL.revokeObjectURL(avatar)}
              alt="user-avatar"
            />
            <span>
              <i className="fas fa-camera"></i>
              <p>Change</p>
              <input
                type="file"
                name="file"
                id="file_up"
                accept="image/*"
                onChange={onChangeAvatar}
              />
            </span>
          </div>

          {/* name */}
          <div className="form-group my-4">
            <label htmlFor="name">Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              id="name"
              placeholder="Your name"
              value={name}
              onChange={onChangeInput}
            />
          </div>

          {/* email */}
          <div className="form-group my-4">
            <label htmlFor="email">Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              id="email"
              placeholder="Your name"
              disabled={true}
              defaultValue={auth.user.email}
            />
          </div>

          {/* password */}
          <div className="form-group my-4">
            <label htmlFor="password">New Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              id="password"
              placeholder="Your new password"
              value={password}
              onChange={onChangeInput}
            />
          </div>

          {/* comfirm password */}
          <div className="form-group my-4">
            <label htmlFor="cf_password">Confirm New Password</label>
            <input
              className="form-control"
              type="password"
              name="cf_password"
              id="cf_password"
              placeholder="Confirm new password"
              value={cf_password}
              onChange={onChangeInput}
            />
          </div>

          {/* Update-button (+ loading중 일때는 disabled )*/}
          <button
            className="btn btn-info"
            disabled={notify.loading}
            onClick={onClickUpdate}
          >
            Update
          </button>
        </div>

        {/* Order */}
        <div className="col-md-8">
          <Orders />
        </div>
      </section>
    </div>
  );
};

export default profile;
