import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { TYPES } from "../../store/types";

const DropdownMenu = ({ auth, dispatch }) => {
  const router = useRouter();

  //로그아웃
  const onClickLogout = () => {
    Cookies.remove("refreshtoken", { path: "api/auth/accessToken" }); //유저 쿠키 삭제
    localStorage.removeItem("firstLogin"); //스토리지 삭제
    dispatch({ type: TYPES.AUTH, payload: {} }); //유저 인증 정보 초기화
    dispatch({
      type: TYPES.NOTIFY,
      payload: { success: "Logged out!" },
    }); //성공메세지
    return router.push("/"); //홈으로 리다이렉트
  };

  // admin전용 메뉴 (admin으로 로그인시 보임)
  const adminMenu = () => {
    return (
      <>
        <Link href="/users">
          <a className="dropdown-item">Uers</a>
        </Link>
        <Link href="/create">
          <a className="dropdown-item">Create</a>
        </Link>
        <Link href="/categories">
          <a className="dropdown-item">Categories</a>
        </Link>
      </>
    );
  };

  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        href="#"
        id="navbarDropdownMenuLink"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {/* user image */}
        <img
          src={auth.user.avatar}
          alt={auth.user.avatar}
          style={{
            width: "20px",
            height: "20px",
            marginRight: "4px",
            marginBottom: "3px",
          }}
        />
        {/* user name */}
        {auth.user.name}
      </a>

      <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
        {/* Profile */}
        <Link href="/profile">
          <a className="dropdown-item">Profile</a>
        </Link>

        {/* + Admin-menu */}
        {auth.user.role === "admin" && adminMenu()}

        {/* 경계선 */}
        <div className="dropdown-divider"></div>

        {/* Logout */}
        <button className="dropdown-item" type="button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </li>
  );
};

export default DropdownMenu;
