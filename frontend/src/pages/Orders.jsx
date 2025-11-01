import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, userId, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    if (!token || !userId) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        { userId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        // Keep the orders as whole objects, do NOT split items
        setOrderData(response.data.orders.reverse());
      }
    } catch (error) {
      console.error("Failed to load orders:", error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token, userId]);

  return (
    <div className="pt-16 border-t">
      <div className="text-2xl">
        <Title text1={"YOUR"} text2={"ORDERS"} />
      </div>

      {orderData.length === 0 && (
        <p className="mt-10 text-center text-gray-500">No orders found</p>
      )}

      {orderData.length > 0 && (
        <div className="hidden md:grid grid-cols-[2fr_1fr] font-medium text-gray-600 border-b pb-2 mt-6">
          <p>Ordered Item</p>
          <p className="text-center-right">Order Tracking</p>
        </div>
      )}

      <div>
        {orderData.map((order, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 py-6 text-gray-700 border-b md:grid md:grid-cols-[2fr_1fr] md:items-start"
          >
            {/* Ordered Items */}
            <div className="flex flex-col gap-4 text-sm">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-start gap-6">
                  <img
                    className="w-20 sm:w-24 rounded-md object-cover"
                    src={item.image[0]}
                    alt="Product"
                  />
                  <div>
                    <p className="font-medium sm:text-base">{item.name}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-1 text-sm sm:text-base text-gray-700">
                      <p>
                        {currency}
                        {item.price}
                      </p>
                      <p>Qty: {item.quantity}</p>
                      <p>Size: {item.size}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Order info */}
              {/* Order info */}
              <div className="flex flex-col gap-1 text-sm mt-2">
                <p>
                  Date:{" "}
                  <span className="text-gray-400">
                    {new Date(order.date).toDateString()}
                  </span>
                </p>
                <p>
                  Payment Method:{" "}
                  <span className="text-gray-400">{order.paymentMethod}</span>
                </p>
                <p>
                  Payment Status:{" "}
                  <span className="text-gray-400">{order.paymentStatus}</span>
                </p>
                <p>
                  Total Payment:{" "}
                  <span className="font-semibold text-gray-700">
                    {currency} {order.amount}
                  </span>
                </p>
              </div>
            </div>

            {/* Order Tracking Progress */}
            <div className="w-full md:w-[400px] bg-gray-50 p-4 rounded-xl shadow-sm">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Delivery Progress
              </h3>
              <div className="relative border-l-2 border-gray-200 ml-4">
                {[
                  {
                    label: "Order Placed",
                    desc: "Your order has been placed successfully.",
                  },
                  { label: "Packing", desc: "We’re packing your items." },
                  { label: "Shipped", desc: "Your package is on its way." },
                  {
                    label: "Out for Delivery",
                    desc: "Our rider is on the way to you.",
                  },
                  {
                    label: "Delivered",
                    desc: "Your order has been delivered.",
                  },
                ].map((stage, i) => {
                  const stages = [
                    "Order Placed",
                    "Packing",
                    "Shipped",
                    "Out for Delivery",
                    "Delivered",
                  ];
                  const currentIndex = stages.indexOf(order.status);
                  const active = i <= currentIndex;

                  return (
                    <div key={i} className="relative pl-6 pb-6 last:pb-0">
                      {/* Dot / Check icon */}
                      <div
                        className={`absolute -left-[9px] top-[2px] h-4 w-4 rounded-full flex items-center justify-center border-2 ${
                          active
                            ? "bg-green-500 border-green-500 text-white"
                            : "bg-white border-gray-300"
                        }`}
                      >
                        {active && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-2.5 w-2.5"
                            viewBox="0 0 20 20"
                            fill="white"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293A1 1 0 103.293 10.707l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>

                      {/* Stage text */}
                      <div className="ml-2">
                        <p
                          className={`font-medium text-sm ${
                            active ? "text-green-600" : "text-gray-500"
                          }`}
                        >
                          {stage.label}
                        </p>
                        <p
                          className={`text-xs mt-0.5 ${
                            active ? "text-gray-600" : "text-gray-400"
                          }`}
                        >
                          {stage.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-center text-sm mt-3">
                <span className="text-gray-600">Current Status:</span>{" "}
                <span className="font-semibold text-green-600">
                  {order.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
