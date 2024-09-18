import React, { useEffect, useRef, useState, useContext } from "react";
import ProductsContext from "../../ContextAPIs/ProductsContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { TableContainer } from '@mui/material';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import ProductTable from "./ProductTable";

function AddProducts() {
  const inputRef = useRef(null);
  const navigator = useNavigate();

  const [product, setProduct] = useState({
    id: Math.random().toString(36).substring(2, 9),
    name: "",
    price: "",
    discount: "",
    description: "",
    stock: "",
    brand:"",
    thumbnail:
      "https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/plp/phones-20230509/nova-series/nova12-i.png",
    category: "",
  });

  const { addProduct,deleteProduct,products } = useContext(ProductsContext);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = (e) => {
    if(e.target.name=="price"||e.target.name=="discount"||e.target.name=="stock"){
      e.target.value = parseInt(e.target.value)
    }
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
      name: "",
      price: "",
      discount: "",
      description: "",
      stock: "",
      brand:"",
      thumbnail:
        "https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/plp/phones-20230509/nova-series/nova12-i.png",
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
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="title"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    ref={inputRef}
                    placeholder="Enter name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="brand" className="form-label">
                    Brand
                  </label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="brand"
                    name="brand"
                    value={product.brand}
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
                  <label htmlFor="discount" className="form-label">
                    Discount Percentage
                  </label>
                  <input
                    required
                    type="number"
                    className="form-control"
                    id="discountPercentage"
                    name="discount"
                    value={product.discount}
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
                  className="btn w-100 btn-primary"
                  style={{
                    color: "white",
                    transition:
                      "background-color 0.3s ease, transform 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#347ce6";
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#0d6efd";
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
        <ProductTable 
        Products={products}
        deleteProduct={deleteProduct}/>
    </section>
  );
}

export default AddProducts;
export {TableContainer};
