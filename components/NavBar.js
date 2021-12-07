import { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { DataContext } from "../store/globalState";
import DropdownMenu from "./menu/DropdownMenu";

const NavBar = () => {
  const { state, dispatch } = useContext(DataContext);
  const { auth, cart } = state;

  const router = useRouter();

  //pathname(string): 현재경로
  const isActive = (rt) => (rt === router.pathname ? "active" : "");

  return (
    // 부트스트랩 ver 4 - navbar
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand">UYeong-Shop</a>
      </Link>

      {/* Toggle-Button*/}
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="collapse navbar-collapse"
        id="navbarNavDropdown"
        style={{ justifyContent: "end" }}
      >
        <ul className="navbar-nav p-1">
          {/* Cart */}
          {/* isActive(): " active" or "" */}
          <li className={`nav-item ${isActive("/cart")}`}>
            <Link href="/cart">
              {/* font awesome - cart (+ aria-hidden ) */}
              <a className="nav-link">
                <i
                  className="fas fa-shopping-cart"
                  aria-hidden="true"
                  style={{ position: "relative" }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: "-10px",
                      right: "-10px",
                      padding: "3px 6px",
                      background: "#ed143dc2",
                      borderRadius: "50%",
                      color: "white",
                      fontSize: "14px",
                    }}
                  >
                    {cart.length}
                  </span>
                </i>{" "}
                Cart
              </a>
            </Link>
          </li>

          {
            //Object.keys(obj): obj의 key들만 모아서 배열로 반환
            Object.keys(auth).length === 0 ? ( //인증 정보 유무
              //인증 전: Sign-in
              <li className={"nav-item" + isActive("/signin")}>
                <Link href="/signin">
                  {/* font awesome - user (+ aria-hidden )*/}
                  <a className="nav-link ml-1">
                    <i className="fas fa-user" aria-hidden="true"></i> Sign in
                  </a>
                </Link>
              </li>
            ) : (
              //인증 후: Dropdown-menu
              <DropdownMenu auth={auth} dispatch={dispatch} />
            )
          }
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
