import "./App";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "../node_modules/react-toastify/dist/ReactToastify.css";
import React , {useState} from "react";
import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";
import { ProductsContextProvider } from "./ContextAPIs/ProductsContext.jsx";
import Home from "./Components/Home";
import Footer from "./Components/Shared/Footer";
import Navbar from "./Components/Shared/Navbar";
import Signin from "./Components/Users/Signin.jsx";
import Login from "./Components/Users/Login";
import Profile from "./Components/Cart";
import Shop from "./Components/CRUD/Shop";
import Details from "./Components/CRUD/Details";
import EditProduct from "./Components/CRUD/EditProduct";
import AddProduct from "./Components/CRUD/addProduct";
import Contactus from "./Components/Contactus.jsx";
import Notfound from "./Components/NotFound";
import ScrollToTop from './Components/ScrollToTop.jsx';

function App () {
  const [isLogin, setIsLogin] = useState(localStorage.getItem("username"));

  return (
    <Router>
      <ScrollToTop />
      <ProductsContextProvider>
        { <Navbar isLogin={isLogin} setIsLogin={setIsLogin} />}
        <Routes>
          {["Home", "/"].map((path, index) => (
            <Route path={path} element={<Home />} key={index} />
          ))}
          <Route path="/Login" element={<Login setIsLogin={setIsLogin} />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/cart" element={<Profile />} />
          <Route path="shop" element={<Shop />} />
          <Route path="shop/:id" element={<Details />} />
          <Route path="edit/:id" element={<EditProduct />} />
          <Route path="addProduct" element={<AddProduct />} />
          <Route path="contactus" element={<Contactus />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
        {<Footer />}
      </ProductsContextProvider>
    </Router>
  );
};

export default App;