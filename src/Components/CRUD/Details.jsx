import React, { useContext, useEffect, useState } from "react";
import style from "../../Styles/details.module.css";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import ProductsContext from "../../ContextAPIs/ProductsContext";
import { toast, ToastContainer } from "react-toastify";
function Details() {
  let [product, setProduct] = useState({});
  const { id } = useParams();
  let { addItem } = useContext(ProductsContext);
 

  let navigator = useNavigate()

  const addItemm = async (name, price, image) => {
    if(!localStorage.getItem("username")){
      navigator('/login')
      return
    }
    await addItem(name,price,image)
    toast.success("Product Added Successfully To Your Cart", {
      position: "bottom-right",
      theme: "light",
      autoClose: 3000,
      className: style.noShadowToast, // Apply the custom style
    });

    } 
  
  useEffect(() => {
    axios
      .get(`http://localhost:3004/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className={style.detailsContainer}>
        <ToastContainer/>
      <div className={style.imageContainer}>
        <img
          src={product.thumbnail}
          alt="Product"
          className={style.productImage}
        />
      </div>
      <div className={style.details}>
        <h2 className={style.productTitle}>{product.title}</h2>
        {product.discount > 0 && (
          <span className={style.discountBadge}>
            {product.discount}% Off
          </span>
        )}
        <div className={style.priceSection}>
          <p className={style.price}>
            $
            {(
              product.price -
              (product.price * product.discount) / 100
            ).toFixed(2)}
          </p>
          {product.discountPercentage > 0 && (
            <span className={style.discountedPrice}>${product.price}</span>
          )}
        </div>
        <p className={style.description}>{product.description}</p>
        <hr />
        <p
          className={`${style.stock} ${
            product.stock === 0 ? style.outOfStock : ""
          }`}
        >
          {product.stock > 0 ? `In Stock: ${product.stock}` : "Out Of Stock"}
        </p>
        <p className={style.category}>Category: {product.category}</p>
        <button
          style={{ backgroundColor:"#0D3B66" }}
          className={`${style.button}`}
          onClick={() =>
            addItemm(product.name, product.price, product.thumbnail)
          }
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default Details;
