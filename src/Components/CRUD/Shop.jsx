import React, { useContext, useState } from "react";
import style from "../../Styles/shop.module.css";
import ProductCard from "./ProductCard";
import ProductContext from "../../ContextAPIs/ProductsContext";

function Shop() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { products, getProducts, deleteProduct } = useContext(ProductContext);


  const uniqueCategories = [...new Set(products.map(product => product.category))];

  console.log("Unique categories:", uniqueCategories);

  const filteredProducts = products.filter((product) => {
    const matchesSearchTerm =
      searchTerm === "" || product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "" || product.category === selectedCategory;
    return matchesSearchTerm && matchesCategory;
  });
  return (
    <div className={` ${style.templateContainer} py-5`}>
      <div className="container m-auto  p-3">
        <div className={` mb-3 ${style.fform}`}>
        <div className="w-50 ps-3 rounded-2">
          
        <input
            className={`form-control ${style.sform}`}
            id="searchInput"
            type="search"
            placeholder="Search here..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

         <div className="w-50 ps-3 rounded-2">
         <select
            className={`form-select ${style.sform2}`}
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            <option value="">All</option>
            {uniqueCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
         </div>
        </div>

        <div className={`row g-4 py-5`}>
          {filteredProducts.map((productItem) => (
            <ProductCard
              getProducts={getProducts}
              deleteProduct={deleteProduct}
              key={productItem.id}
              product={productItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shop;
