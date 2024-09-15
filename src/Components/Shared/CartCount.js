// cartUtils.js (a separate utility file)

import axios from "axios";

export const fetchCartItems = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:5000/orderItem?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return [];
  }
};
