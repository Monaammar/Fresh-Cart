import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./../../assets/images/icon.png";
import style from './Navbar.module.css'
// import {
//   CounterContextProvider,
//   counterContext,
// } from "../../Context/CounterContext";
import { userContext } from "./../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

function Navbar() {
  // let { counter } = useContext(counterContext);
  const { userToken, setUserToken } = useContext(userContext);
  const { numberOfCartItems } = useContext(CartContext);
  let navigate = useNavigate();

  function LogOut() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/LogIn");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand px-2 mb-0" href="#">
          <img src={logo} alt="" className="w-25  mb-0" />
          <span className="h3 bold">Fresh Cart</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {userToken ? (
            <ul className={`navbar-nav me-auto mb-2 mb-lg-0 m-auto  ${style.test}`}>
              <li className="nav-item ">
                <Link to="Home" className={`nav-link active ${style.test}`}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="Cart" className={`nav-link  ${style.test}`}>
                  Cart
                </Link>
              </li>
              <li class="nav-item">
                <Link to="Wishlist"  className={`nav-link  ${style.test}`}>
                  Wish List
                </Link>
              </li>
              <li class="nav-item">
                <Link to="Products"  className={`nav-link  ${style.test}`}>
                  Products
                </Link>
              </li>
              <li class="nav-item">
                <Link to="Categories"  className={`nav-link  ${style.test}`}>
                  Categories
                </Link>
              </li>
              <li class="nav-item">
                <Link to="Brands" className={`nav-link  ${style.test}`}>
                  Brands
                </Link>
              </li>
            </ul>
          ) : (
            ""
          )}
          <ul className="d-flex list-unstyled mb-0">
           
            {userToken ? (
              <>
                <span className="position-relative mx-2">
                  <Link to={"/cart"} className="">
                    <div className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                      {numberOfCartItems}
                      {console.log(numberOfCartItems)}
                    </div>{" "}
                    <i className="mx-2 fa-solid fa-cart-shopping text-black"></i>
                  </Link>
                </span>
                <li
                  className={`text-decotation-none text-black mx-2 log ${style.log}`}
                  onClick={() => {
                    LogOut();
                  }}
                >
                  LogOut
                </li>
              </>
            ) : (
              <>
               
                  <li className="nav-item mx-2 ">
                    <div>
                      <Link to="Register"  className={`${style.test}`}>
                        Register
                      </Link>
                    </div>
                  </li>

                  <li className="nav-item mx-2">
                    <div>
                      <Link to="LogIn" className={`${style.test}`}>
                        LogIn
                      </Link>
                    </div>
                  </li>
               
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
