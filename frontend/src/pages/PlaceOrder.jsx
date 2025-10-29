import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
    userId,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please login to place an order");
      navigate("/login");
      return;
    }

    let orderItems = [];

    // Prepare items array
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          const itemInfo = structuredClone(
            products.find((product) => product._id === itemId)
          );
          if (itemInfo) {
            itemInfo.size = size;
            itemInfo.quantity = cartItems[itemId][size];
            orderItems.push(itemInfo);
          }
        }
      }
    }

    if (orderItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const orderData = {
      address: formData,
      items: orderItems,
      amount: getCartAmount() + delivery_fee,
    };

    try {
      if (method === "cod") {
        const response = await axios.post(
          `${backendUrl}/api/order/place`,
          orderData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          toast.success("Order placed successfully!");
          setCartItems({});
          navigate("/orders"); // Go to orders page after success
        } else {
          toast.error(response.data.message || "Order failed");
        }
      } else {
        toast.error("Payment method not implemented yet");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col justify-between gap-4 pt-5 sm:flex-row sm:pt-14 min-h-[80vh] border-t"
    >
      {/* Left Side: Delivery Info */}
      <div className="flex flex-col w-full gap-4 sm:max-w-[480px]">
        <div className="my-3 text-xl sm:text-2xl">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>
        <div className="flex gap-3">
          <input
            required
            name="firstName"
            value={formData.firstName}
            onChange={onChangeHandler}
            placeholder="First Name"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-2 focus:border-purple"
          />
          <input
            required
            name="lastName"
            value={formData.lastName}
            onChange={onChangeHandler}
            placeholder="Last Name"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-2 focus:border-purple"
          />
        </div>
        <input
          required
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
          placeholder="Email Address"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-2 focus:border-purple"
        />
        <input
          required
          name="street"
          value={formData.street}
          onChange={onChangeHandler}
          placeholder="Street"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-2 focus:border-purple"
        />
        <div className="flex gap-3">
          <input
            required
            name="city"
            value={formData.city}
            onChange={onChangeHandler}
            placeholder="City"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-2 focus:border-purple"
          />
          <input
            required
            name="state"
            value={formData.state}
            onChange={onChangeHandler}
            placeholder="State"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-2 focus:border-purple"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            name="zipcode"
            value={formData.zipcode}
            onChange={onChangeHandler}
            placeholder="Zip Code"
            type="number"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-2 focus:border-purple"
          />
          <input
            required
            name="country"
            value={formData.country}
            onChange={onChangeHandler}
            placeholder="Country"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-2 focus:border-purple"
          />
        </div>
        <input
          required
          name="phone"
          value={formData.phone}
          onChange={onChangeHandler}
          placeholder="Phone"
          type="number"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-2 focus:border-purple"
        />
      </div>

      {/* Right Side: Cart Total & Payment */}
      <div className="mt-8 sm:mt-0">
        <CartTotal />
        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHODS" />
          <div className="flex flex-col gap-3 lg:flex-row mt-4">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 p-2 px-3 border cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-600" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="Stripe" />
            </div>
            {/* <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 p-2 px-3 border cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-600" : ""
                }`}
              ></p>
              <img
                className="h-5 mx-4"
                src={assets.razorpay_logo}
                alt="RazorPay"
              />
            </div> */}
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 p-2 px-3 border cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-600" : ""
                }`}
              ></p>
              <p className="mx-4 text-sm font-medium text-gray-500">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full mt-8 text-end">
            <button
              type="submit"
              className="px-16 py-3 text-sm text-white bg-purple active:bg-gray-800"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
