import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductsContext = createContext();


export const ProductsContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [numOfitems, setNumOfitems] = useState(0);
  const { children } = props;
  const navigate = useNavigate();
  
  const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage

  const getProducts = () => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };

  const getProductById = (productId) => {
    axios
      .get(`http://localhost:5000/products/${productId}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };

  const deleteProduct = (productId) => {
    axios
      .delete(`http://localhost:5000/products/${productId}`)
      .then(() => getProducts())
      .catch((err) => console.log(err));
  };

  const addProduct = (product) => {
    axios.post(`http://localhost:5000/products`, product)
      .then(() => {
        getProducts();
      })
      .catch((err) => console.log(err));
  };
  const editProduct = (id,product) => {
    axios.patch(`http://localhost:5000/products/${id}`, product)
      .then(() => {
        getProducts();
      })
      .catch((err) => console.log(err));
  };

  

  const getUserSpecificOrders = () => {
    // Fetch orders specific to the logged-in user
    return axios.get(`http://localhost:5000/orderItem?userId=${userId}`)
      .then(res => res.data)
      .catch(err => console.log(err));
  };

   const fetchCartItems = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/orderItem`);
      console.log(response.data.length);
      setNumOfitems(response.data.length)
      return response.data;
    } catch (error) {
      console.error('Error fetching cart items:', error);
      return [];
    }
   }
   const addItem = async (title, price, image) => {
    
    const result = await axios.get("http://localhost:5000/orderItem");
    const existingItem = result.data.find(item => item.title === title);
    
    if (existingItem) {
      // Update quantity of the existing item
      existingItem.qty += 1;
      await axios.put(`http://localhost:5000/orderItem/${existingItem.id}`, existingItem);
    } else {
      // Add a new item to the cart
      const order = { title, price, qty: 1, image };
      await axios.post("http://localhost:5000/orderItem", order);
      
    }
    await fetchCartItems()
}


  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        getProducts,
        getProductById,
        deleteProduct,
        addProduct,
        getUserSpecificOrders, // Provide this function to other components
        editProduct,
        addItem,numOfitems,setNumOfitems,fetchCartItems
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
