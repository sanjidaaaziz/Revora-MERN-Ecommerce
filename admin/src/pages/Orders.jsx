import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  // Fetch all orders
  const fetchAllOrders = async () => {
    if (!token) return null;

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Update order status
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        {
          orderId,
          status: event.target.value,
        },
        { headers: { Authorization: `Bearer ${token}` } } // ✅ fixed
      );

      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Update payment status
  const paymentHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/payment-status",
        {
          orderId,
          paymentStatus: event.target.value,
        },
        {
          headers: { Authorization: `Bearer ${token}` }, // ✅ must be admin token
        }
      );

      if (response.data.success) {
        toast.success("Payment status updated");
        await fetchAllOrders();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4">All Orders</h3>
      <div>
        {orders.map((order, index) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
            key={index}
          >
            <img className="w-12" src={assets.parcel_icon} alt="" />

            {/* Order Items & Address */}
            <div>
              <div>
                {order.items.map((item, i) => (
                  <p className="py-0.5" key={i}>
                    {item.name} x {item.quantity} <span>{item.size}</span>
                    {i !== order.items.length - 1 && ","}
                  </p>
                ))}
              </div>
              <p className="mt-3 mb-2 font-medium">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div>
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>

            {/* Order Info */}
            <div>
              <p className="text-sm sm:text-[15px]">
                Items: {order.items.length}
              </p>
              <p className="mt-2">Method: {order.paymentMethod}</p>

              {/* Payment Status */}
              <div className="mt-2">
                <label className="font-semibold mr-2">Payment:</label>
                <select
                  onChange={(event) => paymentHandler(event, order._id)}
                  value={
                    order.paymentStatus || (order.payment ? "Paid" : "Pending")
                  }
                  className="p-1 text-sm border rounded"
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>

              <p className="mt-2">
                Date: {new Date(order.date).toDateString()}
              </p>
            </div>

            {/* Amount */}
            <p className="text-sm sm:text-[15px]">
              ${currency}
              {order.amount}
            </p>

            {/* Order Status */}
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className="p-2 font-semibold"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
