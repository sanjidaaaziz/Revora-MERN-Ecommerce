// import { createContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import * as jwt_decode from "jwt-decode";
// // ✅ decode JWT token

// export const ShopContext = createContext();

// const ShopContextProvider = ({ children }) => {
//   const currency = "$";
//   const delivery_fee = 10;
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;

//   const [search, setSearch] = useState("");
//   const [showSearch, setShowSearch] = useState(false);
//   const [cartItems, setCartItems] = useState({});
//   const [products, setProducts] = useState([]);
//   const [token, setToken] = useState("");
//   const [userId, setUserId] = useState("");

//   const navigate = useNavigate();

//   // Add token & userId from localStorage on mount
//   useEffect(() => {
//     const savedToken = localStorage.getItem("token");
//     if (savedToken) {
//       setToken(savedToken);
//       try {
//         const decoded = jwt_decode(savedToken);
//         setUserId(decoded.id); // assuming JWT payload has "id"
//         getUserCart(savedToken);
//       } catch (error) {
//         console.error("JWT decode error:", error);
//       }
//     }
//   }, []);

//   // Fetch products from backend
//   const getProductsData = async () => {
//     try {
//       const response = await axios.get(`${backendUrl}/api/product/list`);
//       if (response.data.success) {
//         setProducts(response.data.products);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     getProductsData();
//   }, []);

//   // Get cart from backend
//   const getUserCart = async (token) => {
//     try {
//       const response = await axios.post(
//         `${backendUrl}/api/cart/get`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       if (response.data.success) {
//         setCartItems(response.data.cartData);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error.message);
//     }
//   };

//   // Add item to cart
//   const addToCart = async (itemId, size) => {
//     if (!size) {
//       toast.error("Please Select a Size");
//       return;
//     } else {
//       toast.success("Item Added To The Cart");
//     }

//     const cartData = structuredClone(cartItems);

//     if (cartData[itemId]) {
//       cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
//     } else {
//       cartData[itemId] = { [size]: 1 };
//     }

//     setCartItems(cartData);

//     if (token) {
//       try {
//         await axios.post(
//           `${backendUrl}/api/cart/add`,
//           { itemId, size },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//       } catch (error) {
//         console.error(error);
//         toast.error(error.message);
//       }
//     }
//   };

//   // Update cart item quantity
//   const updateQuantity = async (itemId, size, quantity) => {
//     const cartData = structuredClone(cartItems);

//     if (quantity === 0) {
//       delete cartData[itemId][size];
//       if (Object.keys(cartData[itemId]).length === 0) {
//         delete cartData[itemId];
//       }
//       toast.success("Item Removed From The Cart");
//     } else {
//       cartData[itemId][size] = quantity;
//     }

//     setCartItems(cartData);

//     if (token) {
//       try {
//         await axios.post(
//           `${backendUrl}/api/cart/update`,
//           { itemId, size, quantity },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//       } catch (error) {
//         console.error(error);
//         toast.error(error.message);
//       }
//     }
//   };

//   // Get total cart count
//   const getCartCount = () => {
//     let totalCount = 0;
//     for (const itemId in cartItems) {
//       for (const size in cartItems[itemId]) {
//         totalCount += cartItems[itemId][size];
//       }
//     }
//     return totalCount;
//   };

//   // Get total cart amount
//   const getCartAmount = () => {
//     let totalAmount = 0;
//     for (const itemId in cartItems) {
//       const itemInfo = products.find((p) => p._id === itemId);
//       if (itemInfo) {
//         for (const size in cartItems[itemId]) {
//           totalAmount += itemInfo.price * cartItems[itemId][size];
//         }
//       }
//     }
//     return totalAmount;
//   };

//   const value = {
//     products,
//     currency,
//     delivery_fee,
//     search,
//     setSearch,
//     showSearch,
//     setShowSearch,
//     cartItems,
//     setCartItems,
//     addToCart,
//     updateQuantity,
//     getCartCount,
//     getCartAmount,
//     navigate,
//     backendUrl,
//     token,
//     setToken,
//     userId, // ✅ now available globally
//   };

//   return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
// };

// export default ShopContextProvider;
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [orders, setOrders] = useState([]); // ✅ global orders

  const navigate = useNavigate();

  // Add token & userId from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      try {
        const decoded = jwtDecode(savedToken);
        setUserId(decoded.id);
        getUserCart(savedToken);
        loadOrders(savedToken, decoded.id); // load orders on mount
      } catch (error) {
        console.error("JWT decode error:", error);
      }
    }
  }, []);

  // Fetch products
  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  // Get cart
  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // Load orders
  const loadOrders = async (tokenParam = token, userIdParam = userId) => {
    if (!tokenParam || !userIdParam) return;
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        { userId: userIdParam },
        { headers: { Authorization: `Bearer ${tokenParam}` } }
      );
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            });
          });
        });
        setOrders(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error("Failed to load orders:", error);
    }
  };

  // Add to cart
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please Select a Size");
      return;
    } else {
      toast.success("Item Added To The Cart");
    }

    const cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    }
  };

  // Update quantity
  const updateQuantity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItems);

    if (quantity === 0) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
      toast.success("Item Removed From The Cart");
    } else {
      cartData[itemId][size] = quantity;
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, size, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        totalCount += cartItems[itemId][size];
      }
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const itemInfo = products.find((p) => p._id === itemId);
      if (itemInfo) {
        for (const size in cartItems[itemId]) {
          totalAmount += itemInfo.price * cartItems[itemId][size];
        }
      }
    }
    return totalAmount;
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    updateQuantity,
    getCartCount,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
    userId,
    orders, // ✅ orders globally
    loadOrders, // ✅ refresh orders
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
