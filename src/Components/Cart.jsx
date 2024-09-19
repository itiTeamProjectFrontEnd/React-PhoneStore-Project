import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import style from "../Styles/Signin.module.css";
import market from "../Images/market.png"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductsContext from "../ContextAPIs/ProductsContext";

const Profile = () => {
  // const productsUrl = "http://localhost:3004/orderItem";
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId"); // Retrieve the userId from localStorage
    loadItems(userId);
  }, []);

  const loadItems = async (userId) => {
    try {
      const result = await fetchCartItems(userId); // Use the function with userId
      setItems(result);

      let totalPrice = 0;
      result.forEach((item) => {
        totalPrice += item.qty * Number(item.price);
      });
      setTotal(totalPrice.toFixed(2));
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  let{ fetchCartItems , setNumOfitems } = useContext(ProductsContext)

  const deleteOrder = async (id) => {
    let isDelete = window.confirm(
      "Are you sure? This item will be removed from your order!"
    );
    if (isDelete) {
      try {
        await axios.delete(`http://localhost:3004/orderItem/${id}`);
        const userId = localStorage.getItem("userId");
        loadItems(userId);
      } catch (error) {
        console.error("Error deleting item:", error);
      }
      await fetchCartItems()
    }
  };

  const handleCheckout = async (event) => {
    event.preventDefault();

    // Validate form data
    const { userName, email, address, cardNumber, expiry, cvv } = formData;
    if (!userName || !email || !address || !cardNumber || !expiry || !cvv) {
      alert("Please fill out all fields before checking out.");
      return;
    }

    if (items.length === 0) {
      alert("You need to order at least one product before checking out.");
      return;
    }

    let isCheckout = window.confirm("Are you sure you want to checkout?");
    if (isCheckout) {
      try {
        for (let item of items) {
          await axios.delete(`http://localhost:3004/orderItem/${item.id}`);
        }
        setNumOfitems(0);
        setItems([]);
        setTotal(0);

        setFormData({
          userName: '',
          email: '',
          address: '',
          cardNumber: '',
          expiry: '',
          cvv: ''
        });
        toast.success("Your order has been processed successfully!", {
          position: "top-right",
          theme: "light",
          autoClose: 3000,
        });
      } catch (error) {
        console.error("Error during checkout:", error);
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const incDec = async (qty, id, action, title, price, image) => {
    let newQty = qty;
    if (action === "dec") {
      newQty = qty > 1 ? qty - 1 : 1;
    } else {
      if (qty < 20) {
        newQty += 1;
      } else {
        alert("Quantity cannot exceed 20!");
        return;
      }
    }

    const order = { title, price, qty: newQty, image, userId: localStorage.getItem("userId") };
    try {
      await axios.put(`http://localhost:3004/orderItem/${id}`, order);
      const userId = localStorage.getItem("userId");
      loadItems(userId);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };
  return (
    <div className="container">
      <ToastContainer/>
      <div className="row ">
        <div className="col-8">
          {items.length === 0 ? (
            <div className="text-center">
            <img src={market} className="mt-5" alt="market" style={{ width: '350px', height: 'auto' , backgroundcolor:"white" }} />
            <h3 className="mb-5">You Cart Is Currently Empty.</h3>
          </div>
          ) : (
            <table className="table mt-4" style={{ margin: "15px" }}>
              <thead className="table-light">
                <tr>
                  <th className="text-center">Phone</th>
                  <th className="text-center">Name</th>
                  <th className="text-center">Quantity</th>
                  <th className="text-center">Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="text-center">
                      <img src={item.image} className={style.imgtable} alt="" />
                    </td>
                    <td className="text-center">{item.title}</td>
                    <td className="text-center">
                      <button
                        className={`${style.incbutton} rounded-2`}
                        onClick={() =>
                          incDec(
                            item.qty,
                            item.id,
                            "dec",
                            item.title,
                            item.price,
                            item.image
                          )
                        }
                      >
                        -
                      </button>
                      <input
                        type="text"
                        className={style.qtybuton}
                        value={item.qty}
                        readOnly
                      />
                      <button
                        className={`${style.incbutton} rounded-2`}
                        onClick={() =>
                          incDec(
                            item.qty,
                            item.id,
                            "inc",
                            item.title,
                            item.price,
                            item.image
                          )
                        }
                      >
                        +
                      </button>
                    </td>
                    <td className="text-center">{item.price}</td>
                    <td className="text-center">
                      <button
                        type="button"
                        className={`${style.delbtn} btn-close`}
                        aria-label="Close"
                        onClick={() => deleteOrder(item.id)}
                      ></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div
          className="col-3"
          style={{
            backgroundColor: "#fff",
            marginLeft: "30px",
            width: "390px",
            height: "700px",
          }}
        >
          <form className="row g-3 needs-validation" noValidate onSubmit={handleCheckout}>
            <div className={style.card}>
              <h1 style={{ color: "#1f2478", fontSize: "35px" }}>
                Customer Data
              </h1>
              <hr />

              <div className="col-md-12">
                <p  className="text mb-1">
                  User Name
                </p>
                <input
                  type="text"
                  className="form-control mb-2"
                  id="userName"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-12">
                <p className="text mb-1">
                  Email
                </p>
                <input
                  type="email"
                  className="form-control mb-2"
                  id="inputEmail4"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-12">
                <p  className="text mb-1">
                  Address
                </p>
                <input
                  type="text"
                  className="form-control mb-2"
                  name="address"
                  placeholder="1234 Main St"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-12 position-relative ">
                <p className="text mb-1">
                  Card Number
                </p>
                  <input
                    type="text"
                    className="form-control mb-2"
                    name="cardNumber"
                    aria-describedby="validationTooltipUsernamePrepend"
                    required
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                  />
              </div>
              <div className="col-12">
                <div className="d-flex flex-row">
                  <div className="col-6 pe-2">
                    <div className="d-flex flex-column">
                      <p className="text mb-1">Expiry</p>
                      <input
                        className="form-control "
                        type="text"
                        name="expiry"
                        placeholder="MM/YYYY"
                        value={formData.expiry}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-6 ps-2">
                    <div className="d-flex flex-column">
                      <p className="text mb-1">CVV/CVC</p>
                      <input
                        className="form-control pt-2"
                        type="password"
                        name="cvv"
                        placeholder="***"
                        value={formData.cvv}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <hr />
              <h5 style={{ color: "rgb(31, 55, 82)", fontSize: "18px" }}>
                Total Cost = {total}$
              </h5>
              <div className="col-12 mt-2">
                <button
                  type="submit"
                  className={style.checkout}
                  disabled={items.length === 0}
                >
                  Checkout
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;