import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../Styles/loginPage.css";

const Signin = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({
    id: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const navigate = useNavigate();

  const isValidate = () => {
    let isProceed = true;
    let newErrors = {
      id: "",
      password: "",
      confirmPassword: "",
      email: "",
    };

    // Validate ID
    if (!id) {
      isProceed = false;
      newErrors.id = "ID is required";
    }

    // Validate Email
    if (!email) {
      isProceed = false;
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      isProceed = false;
      newErrors.email = "Email must be a valid email address";
    }

   // Validate Password
  if (!password) {
    isProceed = false;
    newErrors.password = "Password is required";
  } else if (password.length < 8) {
    isProceed = false;
    newErrors.password = "Password must be at least 8 characters";
  } else if (!/[A-Z]/.test(password)) {
    isProceed = false;
    newErrors.password = "Password must contain at least one uppercase letter";
  } else if (!/[a-z]/.test(password)) {
    isProceed = false;
    newErrors.password = "Password must contain at least one lowercase letter";
  } else if (!/[0-9]/.test(password)) {
    isProceed = false;
    newErrors.password = "Password must contain at least one number";
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    isProceed = false;
    newErrors.password = "Password must contain at least one special character";
  }

  // Validate Confirm Password
  if (!confirmPassword) {
    isProceed = false;
    newErrors.confirmPassword = "Confirm Password is required";
  } else if (confirmPassword !== password) {
    isProceed = false;
    newErrors.confirmPassword = "Passwords do not match";
  }

    setErrors(newErrors);

    if (!isProceed) {
      toast.warning("Please correct the errors and try again.");
    }

    return isProceed;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidate()) {
      const regObj = {
        id,
        password,
        email,
        phone,
        address,
      };

      fetch("http://localhost:5000/User", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(regObj),
      })
        .then((res) => {
          toast.success("Registered successfully.");
          navigate("/Login");
        })
        .catch((err) => {
          toast.error("Failed :" + err.message);
        });
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-form">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className={`form-group ${errors.id ? 'error' : ''}`}>
            <input
              type="text"
              placeholder="Name"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
            {errors.id && <span className="error-message">{errors.id}</span>}
          </div>
          <div className={`form-group ${errors.email ? 'error' : ''}`}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className={`form-group ${errors.password ? 'error' : ''}`}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          <div className={`form-group ${errors.confirmPassword ? 'error' : ''}`}>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-button">Register</button>
        </form>
        <p>
          Already a member? <Link to="/Login" className="link">Login</Link>
        </p>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Signin;
