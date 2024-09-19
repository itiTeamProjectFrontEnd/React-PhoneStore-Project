import "./App";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "../node_modules/react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProductsContextProvider } from "./ContextAPIs/ProductsContext.jsx";
import Home from "./Components/Home";
import Footer from "./Components/Shared/Footer";
import Navbar from "./Components/Shared/Navbar";
import Register from "./Components/Users/Register.jsx";
import Login from "./Components/Users/Login";
import Profile from "./Components/Cart";
import Shop from "./Components/CRUD/Shop";
import Details from "./Components/CRUD/Details";
import EditProduct from "./Components/CRUD/EditProduct";
import AddProduct from "./Components/CRUD/addProduct";
import Aboutus from "./Components/Aboutus.jsx";
import Contactus from "./Components/Contactus.jsx";
import Notfound from "./Components/NotFound";
import ScrollToTop from './Components/ScrollToTop.jsx';
import UserManagement from "./Components/CRUD/UserManagement.jsx";

function App() {
  const [isLogin, setIsLogin] = useState(localStorage.getItem("username"));

  return (
    <Router>
      <ScrollToTop />
      <ProductsContextProvider>
        {<Navbar isLogin={isLogin} setIsLogin={setIsLogin} />}
        <Routes>
          {["Home", "/"].map((path, index) => (
            <Route path={path} element={<Home />} key={index} />
          ))}
          <Route path="/Login" element={<Login setIsLogin={setIsLogin} />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/cart" element={<Profile />} />
          <Route path="shop" element={<Shop />} />
          <Route path="shop/:id" element={<Details />} />
          <Route path="edit/:id" element={<EditProduct />} />
          <Route path="addProduct" element={<AddProduct />} />
          <Route path="Aboutus" element={<Aboutus />} />             
          <Route path="Contactus" element={<Contactus />} />
          <Route path="/User Management" element={<UserManagement />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
        {<Footer />}
      </ProductsContextProvider>
    </Router>
  );
};

export default App;