import axios from "axios";
import React, { useId, useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ProductTable from "./ProductTable";
import { useContext } from "react";
import ProductsContext from "../../ContextAPIs/ProductsContext";

function EditProducts() {
  let { deleteProduct, products, getProducts } = useContext(ProductsContext);

  const inputRef = useRef(null);
  const [prdct, setPrdct] = useState({
    id: useId(),
    name: "",
    price: 0,
    discount: 0,
    description: "",
    brand: "",
    stock: 0,
    thumbnail:
      "https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/plp/phones-20230509/nova-series/nova12-i.png",
    category: "",
  });
  const navigator = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3004/products/${id}`);
        setPrdct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrdct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`http://localhost:3004/products/${prdct.id}`, prdct);
      toast.success("Product Edited Successfully", {
        position: "bottom-right",
        theme: "light",
        autoClose: 3000,
      });
      setTimeout(() => {
        navigator("/addProduct");
      }, 2000);
      getProducts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="bg-gray">
      <ToastContainer />
      <div className="container p-3 p-md-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="p-3 p-md-4 shadow-sm bg-white rounded-5">
              <h1 className="text-center">Edit Product</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={prdct.name}
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
                    value={prdct.price}
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
                    id="discount"
                    name="discount"
                    value={prdct.discount}
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
                    value={prdct.stock}
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
                    value={prdct.category}
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
                    value={prdct.description}
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
                    value={prdct.thumbnail}
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
                  Edit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
          <ProductTable Products={products} deleteProduct={deleteProduct} />
    </section>
  );
}

export default EditProducts;
