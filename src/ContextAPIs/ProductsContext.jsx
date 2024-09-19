import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductsContext = createContext();


export const ProductsContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [numOfitems, setNumOfitems] = useState(0);
  const [users, setUsers] = useState([]);  // Users state
  const { children } = props;
  const navigate = useNavigate();
  
  const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage

  const getProducts = () => {
    axios
      .get("http://localhost:3004/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };

  const getProductById = (productId) => {
    axios
      .get(`http://localhost:3004/products/${productId}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };

  const deleteProduct = (productId) => {
    if(window.confirm('Are you sure you want to delete this product')){
    axios
      .delete(`http://localhost:3004/products/${productId}`)
      .then(() => getProducts())
      .catch((err) => console.log(err));
  }};

  const addProduct = (product) => {
    axios.post(`http://localhost:3004/products`, product)
      .then(() => {
        getProducts();
      })
      .catch((err) => console.log(err));
  };
  const editProduct = (id,product) => {
    axios.patch(`http://localhost:3004/products/${id}`, product)
      .then(() => {
        getProducts();
      })
      .catch((err) => console.log(err));
  };

  

  const getUserSpecificOrders = () => {
    // Fetch orders specific to the logged-in user
    return axios.get(`http://localhost:3004/orderItem?userId=${userId}`)
      .then(res => res.data)
      .catch(err => console.log(err));
  };

   const fetchCartItems = async () => {
    try {
      const response = await axios.get(`http://localhost:3004/orderItem`);
      console.log(response.data.length);
      setNumOfitems(response.data.length)
      return response.data;
    } catch (error) {
      console.error('Error fetching cart items:', error);
      return [];
    }
   }
   const addItem = async (title, price, image) => {
    
    const result = await axios.get("http://localhost:3004/orderItem");
    const existingItem = result.data.find(item => item.title === title);
    
    if (existingItem) {
      // Update quantity of the existing item
      existingItem.qty += 1;
      await axios.put(`http://localhost:3004/orderItem/${existingItem.id}`, existingItem);
    } else {
      // Add a new item to the cart
      const order = { title, price, qty: 1, image };
      await axios.post("http://localhost:3004/orderItem", order);
      
    }
    await fetchCartItems()
}

const getUsers = () => {
  axios
    .get("http://localhost:3004/User") // Fetching the users from the "User" array
    .then((res) => setUsers(res.data))
    .catch((err) => console.log(err));
};

// **Delete a user by ID**
const deleteUser = (userId) => {
  axios
    .delete(`http://localhost:3004/User/${userId}`)
    .then(() => getUsers())  // Refresh user list after deletion
    .catch((err) => console.log(err));
};

// **Edit user data by ID**
const editUser = (userId, updatedUserData) => {
  axios
    .patch(`http://localhost:3004/User/${userId}`, updatedUserData)
    .then(() => {
      getUsers(); // Refresh users after editing
    })
    .catch((err) => console.log(err));
};

  useEffect(() => {
    getProducts();
    getUsers();  // Fetch users when the component is mounted
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
        addItem,numOfitems,setNumOfitems,fetchCartItems,
        users,
        getUsers,
        deleteUser, // Expose deleteUser to other components
        editUser // Expose editUser to other components
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
