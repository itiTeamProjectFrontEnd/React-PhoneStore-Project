import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import "react-toastify/dist/ReactToastify.css";
import "../../Styles/loginPage.css";

const Login = ({ setIsLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  }, []);

  const proceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      fetch("http://localhost:5000/User/" + username)
      .then((res) => {
        return res.json();
      })
        .then((resp) => {
          if (Object.keys(resp).length === 0) {
            toast.error("Please Enter valid username");
          } else {
            if (resp.password === password) {
              toast.success("Success");
              localStorage.setItem("username", username);
              setIsLogin(true);
              navigate("/Home");
            } else {
              toast.error("Please Enter valid credentials");
            }
          }
        })
        .catch((err) => {
          toast.error("Login Failed due to :" + err.message);
        });
    }
  };

  const validate = () => {
    let result = true;
    if (username === "" || username === null) {
      result = false;
      toast.warning("Please Enter Username");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Please Enter Password");
    }
    return result;
  };

  const handleGoogleSuccess = (response) => {
    console.log("Google response", response);
    // Implement the logic to handle Google login
  };

  const handleFacebookSuccess = (response) => {
    console.log("Facebook response", response);
    // Implement the logic to handle Facebook login
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Sign In</h2>
        <form onSubmit={proceedLogin}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Login
          </button>
          <p>or</p>
          <div className="social-login-buttons">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onFailure={(error) => toast.error("Google login failed: " + error.message)}
              buttonText="Login with Google"
            />
            {/* Add Facebook login button if you have it */}
          </div>
          <p>
            New user? <Link to="/Signin" className="link">Sign Up</Link>
          </p>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
