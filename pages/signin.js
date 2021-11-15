import React, { useState, useContext, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router'
import Cookies from 'js-cookie';
import { DataContext } from '../store/globalState';
import { TYPES } from '../store/types';
import { postData } from '../utils/fetchData';

const Signin = () => {
  const initialState = { email: '', password: '' };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const {state, dispatch} = useContext(DataContext);
  const { auth } = state;

  const router = useRouter();

  

  const onChangeInput = (e) => {
    const { name, value } = e.currentTarget; //input속성 target
    setUserData({ ...userData, [name]: value });
    // ex) 이메일 제출시 "email": userData.eamil 를 현객체에 추가

    //토스트 메세지 초기화
    return dispatch({ type: TYPES.NOTIFY, payload: {} });
  };


  const onSubmit = async (e) => {
    e.preventDefault();

    //loading 
    dispatch({ type: TYPES.NOTIFY, payload: { loading: true } });


    // fetchData에게 전달후 응답 받아오기
    const res = await postData('auth/signin', userData);// 유저 로그인 실패, 성공 응답(res)
    //error
    if (res.err) return dispatch({ type: TYPES.NOTIFY, payload: { error: res.err } });
    //success
    dispatch({ type: TYPES.NOTIFY, payload: { success: res.msg } });


    //accesstoken && user정보 auth에 넣기
    dispatch({ type: TYPES.AUTH, payload: {
      token: res.access_token,
      user: res.user
    } });

    
    //refreshtoken을 Cookie에 저장
    Cookies.set('refreshtoken', res.refresh_token, {
      path: 'api/auth/accessToken',
      expires: 7
    });


    //위 과정이 다끝나면 localStorage에 표기
    localStorage.setItem('firstLogin',  true);
  };


  //인증이 완료되면(인증에 정보가 들어오면) 홈으로 리다이렉트
  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push("/");
  },[auth]);


  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>

      {/* 부트스트랩 ver 4 - form */}
      <form className='mx-auto my-4' onSubmit={onSubmit} style={{ maxWidth: '500px' }}>
        {/* class, for >> htmlFor, className */}

        {/* 이메일 */}
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={email} onChange={onChangeInput} />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>

        {/* 비밀번호 */}
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name="password" value={password} onChange={onChangeInput} />
        </div>

        {/* 로그인 버튼 */}
        {/* primary >> dark*/}
        <button type="submit" className="btn btn-dark w-100">Login</button>
        <p className="my-2">You don't have an account?
          <Link href="/register"><a style={{ color: "blue" }}> Register Now</a></Link>
        </p>
      </form>    

    </>
  );
};

export default Signin;
