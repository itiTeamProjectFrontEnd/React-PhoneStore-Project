import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "../Styles/home.module.css";
import main from "../Styles/shop.module.css";
import image2 from "../Images/mopp.svg";
import quality from "../Images/quality.svg";
import testimonial from "../Images/testimonial.svg";
import customer from "../Images/customer.svg";
import warranty from "../Images/warranty.svg";
import ProductCard from "../Components/CRUD/ProductCard";
import PostsContext from "../ContextAPIs/ProductsContext";

export default function Home() {

  const { products, getProducts, deleteProduct } = useContext(PostsContext);

  const topProducts = products?.slice(0, 3);

  const headerStyle = {
  };


  return (
    <div className={style.bkg} >
      <div className={` ${style.imgcard}`}>
      <div className={style.overlay}></div>
        <div className={`${style.parentt} col-md-5`}>
          <h1 className={`${style.title} text-uppercase`}>
           Welcome to our store
          </h1>
          <p className={`${style.par}`}>Your one-stop destination for quality products</p>
          <div className=" text-center">
            <Link className={style.link3} to="/Shop">Explore Now</Link>
          </div>
        </div>
            </div>


     
      <div className={`container m-auto p-5 mb-5`}>
        <div >
          <h1 className={`text-center mb-5`}>Our Products</h1>
        </div>
        <div className="row g-4 justify-content-between">
          {topProducts?.map((prodcutItem) => (
            <ProductCard
              getProducts={getProducts}
              deleteProduct={deleteProduct}
              key={prodcutItem.id}
              product={prodcutItem}
            />
          ))}
        </div>
        <div className=" text-center">
            <Link className={`${style.link3} mt-4`} to="/Shop">Explore More Products</Link>
          </div>
      </div>

      <div className={style.about}>
        <img src={image2} alt="A decorative shelf with books" class='col-md-7' />
        <div className={style.text} class='col-md-5 contianer'>
          <h3 className={style.h3text}>
           About US
          </h3>
          <p className={style.textp}>
          At Tech Haven, we are committed to bringing you the latest smartphones, accessories,
           and tech solutions all in one place. With a focus on quality, affordability, and customer satisfaction,
            we strive to provide the best products and services tailored to your mobile needs.
           Whether you're upgrading your device or looking for expert advice, we're here to help you stay connected.
          </p>
          <div className=" text-center">
            <Link className={style.link3} to="/Shop">Shop Now</Link>
          </div>
        </div>
      </div>

        <div className={`${style.whychooseus} py-5`}>
        <h1 className={`text-center mb-2`}>Why Choose Us?</h1>
        <div className={`card-deck container m-auto p-5 ${style.cardds}`}>
          <div className={`card ${style.cardcont}`}>
            <div class="card-body py-4 text-center">
              <img src={customer} alt="icons" />
              <h5 class={`card-title mt-3 ${style.cardh}`}>24 hours customer service</h5>
              <p class="card-text">Our dedicated support team is available to assist you with any question from product selection to
               troubleshooting We pride ourselves on fast response times personalized solutions,, and a hassle-free return policy. With knowledgeable staff and ongoing support,
                we ensure that every customer enjoys a seamless. </p>
            </div>
          </div>
          <div className={`card ${style.cardcont}`}>
            <div class="card-body py-4 text-center">
              <img src={testimonial} alt="icons" />
              <h5 class={`card-title mt-3 ${style.cardh}`}>testimonial</h5>
              <p class="card-text">Our customers consistently share positive feedback about our high-quality products, exceptional customer service, and seamless shopping experience. From quick deliveries to expert advice, their reviews reflect the trust and satisfaction we've built over time.</p>
            </div>
          </div>
          <div className={`card ${style.cardcont}`}>
            <div class="card-body py-4 text-center">
              <img src={quality} alt="icons" />
              <h5 class={`card-title mt-3 ${style.cardh}`}>A Commitment to Quality</h5>
              <p class="card-text"> We carefully select top-tier smartphones and accessories from trusted brands to ensure reliability and performance. Each product undergoes rigorous testing to meet the highest industry standards, so our customers can enjoy cutting-edge technology with peace of mind. Our commitment to quality means you always get the best.</p>
            </div>
          </div>
          <div className={`card ${style.cardcont}`}>
            <div class="card-body py-4 text-center">
              <img src={warranty} alt="icons" />
              <h5 class={`card-title mt-3 ${style.cardh}`}>Warranty included</h5>
              <p class="card-text">we offer comprehensive warranties on all our products to give you complete peace of mind. Our warranty covers manufacturing defects and ensures that you receive support in case of any issues. Whether it's a smartphone or an accessory, we've got you covered with hassle-free repairs or replacements. Your satisfaction and protection are our priority.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}