import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import style from "../../Styles/Navbar.module.css";
import logo from "../../Images/mobile-store-ecommerce-svgrepo-com.png";
import ProductsContext from "../../ContextAPIs/ProductsContext";


export default function Navbar({ isLogin, setIsLogin }) {



  const handleSignOut = async () => {
    
    const cartItems = await fetchCartItems();
      
    
    for (let item of cartItems) {
      await axios.delete(`http://localhost:3004/orderItem/${item.id}`);
    }

    setNumOfitems(0);
    
    localStorage.removeItem("username");
    setIsLogin(false);
  };

  let { numOfitems, setNumOfitems, fetchCartItems } = useContext(ProductsContext)


  useEffect(() => {
    const getCartItems = async () => {
      const items = await fetchCartItems();
      setNumOfitems(items.length);
    };
    getCartItems();
  }, []);

  const [scrolledDown, setScrolledDown] = useState(false)
  const [isToggle, setIsToggle] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolledDown(true);
      } else {
        setScrolledDown(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (

    <nav
      className={`navbar navbar-expand-lg sticky-top top-0 w-100 ${scrolledDown ? style.scrolled : style.notScrolled}`}

    >
      <div className={`container-fluid px-5 `}>
        <Link className="navbar-brand" to="/Home">
          <img
            src={logo}
            alt=""
            width="60px"
          />
        </Link>
        <Link className="navbar-brand" to="/Home"
          aria-current="page"
        >
          <h3 className={style.logonav}>Tech Heaven</h3>
        </Link>
        <span className="text-light">
        </span>
        <button
          className={`${style.navbartoggler} navbar-toggler`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon "></span>
        </button>
        <div className="collapse navbar-collapse bg-white rounded " id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto gap-4 gap-lg-5 me-6 text-center  ">
            <li className="nav-item">
              <Link
                className={`${style.link} text-decoration-none`}
                aria-current="page"
                to="/Home"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`${style.link} text-decoration-none`} to="/shop">
                Shop
              </Link>
            </li>

            {/* (admin access only) */}
            {localStorage.getItem("username") === "admin" ? (
              <>
              <li className="nav-item">
                <Link
                  to="/addProduct"
                  className={`${style.link} text-decoration-none`}
                >
                  Products
                </Link>
              </li>
              <li className="nav-item">
                  <Link
                    to="/User Management"
                    className={`${style.link} text-decoration-none ms-3`}
                  >
                    Users
                  </Link>
              </li>
              </>
            ) : (
              ""
            )}

            <li className="nav-item">
              <Link
                to="/Aboutus"
                className={`${style.link} text-decoration-none`}
              >
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/Contactus"
                className={`${style.link} text-decoration-none`}
              >
                Contact Us
              </Link>
            </li>

          </ul>
          {localStorage.getItem("username") ? (
            <>
              <div className={`${style.roro}  d-flex  align-items-center`}>
                <li className="nav-item me-lg-3 ms-lg-5 mt-2 mt-lg-0 mb-md-2 mb-sm-2 mb-2 text-center" style={{ position: 'relative' }}>
                  <Link to="/cart" className={`${style.link} text-decoration-none`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      className="bi bi-cart3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                    {numOfitems > 0 && (
                      <span className={style.cartItemCount}>{numOfitems}</span>
                    )}
                  </Link>
                </li>
                <div className={`d-flex mt-2 mt-lg-0 mb-2 mb-lg-0 mb-md-2 mb-sm-2 mb-2 position-relative align-items-center ${style.toggleExpand}`} onClick={() => setIsToggle(!isToggle)}>
                  <div className="icon rounded-pill bg-main d-flex justify-content-center me-2 align-items-center"
                    style={{ width: "28px", height: "28px" }}
                  >
                    <i className="fa-solid fa-user text-white"></i>
                  </div>
                  <div className="name  d-flex align-items-center">
                    <span className="me-2 fs-5">{localStorage.getItem("username")}</span>
                  </div>
                  <div className={`${style.box} position-absolute ${isToggle ? "" : 'd-none'}  rounded-2 top-100 mt-2 end-0 px-2 py-2`} >
                    <li className="nav-item py-1">
                      <Link
                        onClick={handleSignOut}
                        to="/Home"
                        className={`${style.link} text-decoration-none fs-6`}
                      >
                        Sign Out
                      </Link>
                    </li>
                  </div>
                </div>
              </div>
            </>

          ) : (
            <>
              <div className="text-center  d-lg-flex">
                <li className="nav-item my-lg-0 my-3">
                  <Link
                    to="/Login"
                    className={`${style.link1} text-decoration-none me-3`}
                  >
                    Sign In
                  </Link>
                </li>
                <li className="nav-item mb-lg-0 mb-2">
                  <Link
                    to="/Register"
                    className={`${style.link} text-decoration-none`}
                  >
                    Register
                  </Link>
                </li>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
