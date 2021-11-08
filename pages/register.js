import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import valid from '../utils/valid';

const Register = () => {
  const initialState = { name: '', email: '', password: '', cf_password: '' };
  const [userData, setUserData] = useState(initialState);
  const { name, email, password, cf_password } = userData;

  const onChangeInput = (e) => {
    const { name, value } = e.currentTarget; //input속성 target
    setUserData({ ...userData, [name]: value });
    // ex) 이메일 제출시 > "email": userData.eamil
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errMsg = valid(name, email, password, cf_password);
    if (errMsg) console.log(errMsg);
  };

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>

      {/* 부트스트랩 ver 4 - form */}
      <form className='mx-auto my-4' style={{ maxWidth: '500px' }} onSubmit={onSubmit}>

        {/* class, for >> className, htmlFor */}

        {/* 이름 */}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="name" className="form-control" id="name" name="name" value={name} onChange={onChangeInput} />
        </div>

        {/* 이메일 */}
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={email} onChange={onChangeInput} />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>

        {/* 비밀번호 */}
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={password} onChange={onChangeInput} />
        </div>

        {/* 비밀번호 확인 */}
        <div className="form-group">
          <label htmlFor="exampleInputPassword2">Confirm Password</label>
          <input type="password" className="form-control" id="exampleInputPassword2" name="cf_password" value={cf_password} onChange={onChangeInput} />
        </div>

        {/* primary >> dark*/}
        <button type="submit" className="btn btn-dark w-100">Register</button>
        <p className="my-2">Already have an account?
          <Link href="/signin"><a style={{ color: "blue" }}> Login Now</a></Link>
        </p>
      </form>    

    </>
  );
};

export default Register;

