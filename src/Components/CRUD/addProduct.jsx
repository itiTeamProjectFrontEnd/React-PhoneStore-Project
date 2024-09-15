import React, { useEffect, useRef, useState, useContext } from "react";
import ProductsContext from "../../ContextAPIs/ProductsContext";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../Styles/AddProduct.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddProducts() {
  const inputRef = useRef(null);
  const navigator = useNavigate();

  const [product, setProduct] = useState({
    id: Math.random().toString(36).substring(2, 9),
    title: "",
    price: "",
    discountPercentage: "",
    description: "",
    stock: "",
    thumbnail:
      "https://bookworlduae.com/cdn/shop/files/image_150a4245-3d0a-4d54-82e4-42be85df7332.jpg?v=1687797780&width=713",
    category: "",
  });

  const { addProduct } = useContext(ProductsContext);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    
    e.preventDefault();
    addProduct(product);
    toast.success("Product Added Successfully", {
      position: "top-right",
      theme: "light",
      autoClose: 3000,
    });
    setTimeout(() => {
      navigator("/shop");
    }, 2000);

    setProduct({
      id: Math.random().toString(36).substring(2, 9),
      title: "",
      price: "",
      discountPercentage: "",
      description: "",
      stock: "",
      thumbnail:
        "https://bookworlduae.com/cdn/shop/files/IMG-0742.jpg?v=1723547578&width=713",
      category: "",
    });
  };

  return (
    <section className="bg-gray">
      <ToastContainer/>
      <div className="container p-3 p-md-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="p-4 shadow-sm bg-white rounded-3">
              <h1 className="text-center h2 text-uppercase text-main fw-semibold">
                Add Product
              </h1>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={product.title}
                    onChange={handleChange}
                    ref={inputRef}
                    placeholder="Enter name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    placeholder="Enter price"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="discountPercentage" className="form-label">
                    Discount Percentage
                  </label>
                  <input
                    required
                    type="number"
                    className="form-control"
                    id="discountPercentage"
                    name="discountPercentage"
                    value={product.discountPercentage}
                    onChange={handleChange}
                    placeholder="Enter discount percentage"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="stock" className="form-label">
                    Quantity
                  </label>
                  <input
                    required
                    type="number"
                    className="form-control"
                    id="stock"
                    name="stock"
                    value={product.stock}
                    onChange={handleChange}
                    placeholder="Enter quantity"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="category"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    placeholder="Enter category"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    placeholder="Enter description"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="thumbnail" className="form-label">
                    Image Url
                  </label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="thumbnail"
                    name="thumbnail"
                    value={product.thumbnail}
                    onChange={handleChange}
                    placeholder="Enter image url"
                  />
                </div>
                <button
                  type="submit"
                  className="btn w-100"
                  style={{
                    backgroundColor: "#d18ef4",
                    color: "white",
                    transition:
                      "background-color 0.3s ease, transform 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#b06bd4";
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#d18ef4";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  Add
                </button>
              </form>
             
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddProducts;
