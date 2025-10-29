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
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              paymentStatus: order.paymentStatus,
              date: order.date,
            });
          });
        });
        setOrderData(allOrdersItem.reverse());
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

      {/* Empty State */}
      {orderData.length === 0 && (
        <p className="mt-10 text-center text-gray-500">No orders found</p>
      )}

      {/* Column Titles for Desktop */}
      {orderData.length > 0 && (
        <div className="hidden md:grid grid-cols-[2fr_1fr] font-medium text-gray-600 border-b pb-2 mt-6">
          <p>Ordered Item</p>
          <p className="text-right">Order Status</p>
        </div>
      )}

      {/* Orders List */}
      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 py-4 text-gray-700 border-b md:grid md:grid-cols-[2fr_1fr] md:items-center"
          >
            {/* Ordered Item */}
            <div className="flex items-start gap-6 text-sm">
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
                <p className="mt-1 text-sm">
                  Date:{" "}
                  <span className="text-gray-400">
                    {new Date(item.date).toDateString()}
                  </span>
                </p>
                <p className="mt-1 text-sm">
                  Payment Method:{" "}
                  <span className="text-gray-400">{item.paymentMethod}</span>
                </p>
                <p className="mt-1 text-sm">
                  Payment Status:{" "}
                  <span className="text-gray-400">{item.paymentStatus}</span>
                </p>
              </div>
            </div>

            {/* Order Status */}
            <div className="flex items-center justify-between md:justify-end gap-2">
              {/* Label for Mobile */}
              <p className="text-gray-500 text-sm font-medium md:hidden">
                Order Status:
              </p>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
