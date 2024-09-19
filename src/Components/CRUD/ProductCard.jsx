import React, { useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "../../Styles/shop.module.css";
import ProductsContext from "../../ContextAPIs/ProductsContext";
import { toast, ToastContainer } from "react-toastify";

export default function ProductCard({
  product,
  deleteProduct,
 
}) {

  let navigator = useNavigate()

  let {addItem}= useContext(ProductsContext)
  const addItemToCart = async (title, price, image) => {
    if(!localStorage.getItem("username")){
      navigator('/login')
      return
    }
    await addItem(title,price,image)
    toast.success("Product Added Successfully To Your Cart", {
      position: "top-right",
      theme: "light",
      autoClose: 3000,
      className: style.noShadowToast, // Apply the custom style
    });

    } 
  

  const handleDelete = (e) => {
    e.stopPropagation();
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (confirmed) {
      deleteProduct(product.id);
    }
  };

  return (
    <div className="col-md-4">
      <ToastContainer/>
      <div className={`card py-3 rounded-3 ${style.ay}`} key={product.id}>
        <div className="position-relative">
          {localStorage.getItem('username') === 'admin' && (
            <button
              className={`p-2 btn-close ${style.closeButton} position-absolute`}
              onClick={handleDelete}
            />
          )}
          <Link to={`/shop/${product.id}`}>
            <img
              src={product.thumbnail}
              className={"card-img-top object-fit-cover"}
              alt="Product-img"
              height="300"
            />
          </Link>
        </div>
        <div className={"card-body text-center"}>
          <h5 className={`card-title ${style.head}`}>{product.name}</h5>
          <p className={`card-text text-dark fw-bold`}>
            ${(
              product.price -
              (product.price * product.discount) / 100
            ).toFixed(2)}
            {product.discount > 0 && (
              <span className={style.discount}>$ {product.price}</span>
            )}
          </p>
          <p className={`card-text text-dark fw-bold`}>
            {product.brand}
          </p>
          {localStorage.getItem('username') === 'admin' && (
            <Link to={`/edit/${product.id}`} className={`btn btn-dark px-5 ${style.pbtn}`}>
              Edit
            </Link>
          )}
          <button
            className={`btn btn-dark w-50 mx-auto ms-1 ${style.pbtn}`}
            onClick={() =>
              addItemToCart(product.name, product.price, product.thumbnail)
            }
          >
            Add To Cart
          </button>
        </div>
      </div>

    </div>
  );
}