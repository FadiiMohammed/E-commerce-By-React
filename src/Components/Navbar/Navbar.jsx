import { useContext } from "react";
import Logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";

// import styles from "./Navbar.module.css";

export default function Navbar({ userData, logOut }) {
  let { getLoggedUserCart } = useContext(cartContext);

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={Logo} alt="" />
          </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            {userData !== null ? (
              <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" to="/" aria-current="page">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="cart">
                    Cart
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="products">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="categories">
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="brands">
                    Brands
                  </Link>
                </li>
              </ul>
            ) : null}

            <ul className="navbar-nav ms-auto mt-2 mt-lg-0 d-flex align-items-center">
              <li className="nav-item">
                <Link className="nav-link position-relative" to="cart">
                  {/* <span className="text-main fw-bold position-absolute top-0 translate-middle-y">
                    0
                  </span> */}
                  <i className="fas fa-cart-shopping text-main fs-3"></i>
                </Link>
              </li>
              <li className="nav-item d-flex align-items-center">
                <i className="fab mx-2 fa-facebook"></i>
                <i className="fab mx-2 fa-twitter"></i>
                <i className="fab mx-2 fa-tiktok"></i>
                <i className="fab mx-2 fa-instagram"></i>
                <i className="fab mx-2 fa-youtube"></i>
              </li>
              {userData === null ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="register">
                      Register
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="signIn">
                      Sign In
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item cursor-pointer">
                  <span onClick={logOut} className="nav-link">
                    LogOut
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
