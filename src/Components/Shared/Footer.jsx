import React, { Fragment } from "react";
import { Link } from "react-router-dom";
// import style from "../../Styles/Navbar.module.css";
import  styles from "../../Styles/Footer.module.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

function Footer  ({ isLogin, setIsLogin }) {
  const handleSignOut = () => {
    localStorage.removeItem("username");
    setIsLogin(false);
  };

  return (
    <Fragment>
      <footer className={styles.footer}>
      <div className={`${styles.container} me-5`}>
        <div className={styles.row}>
          
          <div className={styles.footercol}>
            <h4>company</h4>
            <ul className={styles.ul}>
            <li>
              <Link
                aria-current="page"
                to="/Home"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/shop">
                Books
              </Link>
            </li>
            {localStorage.getItem("username") === "rewaa" ? (
              <li className="nav-item">
                <Link
                  to="/addProduct"
                >
                  Add Book
                </Link>
              </li>
            ) : (
              ""
            )}
            
            {!isLogin ? (
              <>
                <li className="nav-item">
                  <Link
                    to="/Login"
                  >
                    Sign In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/Signin"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link
                  onClick={handleSignOut}
                  to="/Home"
                >
                  Sign Out
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link
                to="/contactus"
              >
                Contact Us
              </Link>
            </li>
  

            </ul>
          </div>
          <div className={styles.footercol}>
            <h4>get help</h4>
            <ul>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">shipping</a></li>
              <li><a href="#">returns</a></li>
              <li><a href="#">order status</a></li>
              <li><a href="#">payment options</a></li>
            </ul>
          </div>
          <div className={styles.footercol}>
            <h4>follow us</h4>
            <div className={styles.sociallinks}>
              <a href="https://www.facebook.com/login/"><i className="fab fa-facebook-f"></i></a>
              <a href="https://x.com/i/flow/login?input_flow_data=%7B%22requested_variant%22%3A%22eyJteCI6IjIifQ%3D%3D%22%7D"><i className="fab fa-twitter"></i></a>
              <a href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a>
              <a href="https://www.linkedin.com/feed/"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
      </div>
  </footer>
    </Fragment>
  );

};

export default Footer;
