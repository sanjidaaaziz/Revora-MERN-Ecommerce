import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Get token from navigation or localStorage
  const initialToken = location.state?.token || localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);

  const [summary, setSummary] = useState(() => {
    // Load cached summary instantly if available
    const cached = localStorage.getItem("adminSummary");
    return cached
      ? JSON.parse(cached)
      : { totalUsers: 0, totalOrders: 0, totalProducts: 0 };
  });

  const fetchSummary = async (authToken) => {
    if (!authToken) return;
    try {
      const response = await axios.get(`${backendUrl}/api/user/admin/summary`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (response.data.success) {
        const data = response.data.summary || response.data;
        const newSummary = {
          totalUsers: data.totalUsers || 0,
          totalOrders: data.totalOrders || 0,
          totalProducts: data.totalProducts || 0,
        };
        setSummary(newSummary);
        localStorage.setItem("adminSummary", JSON.stringify(newSummary)); // ✅ Cache latest data
      } else {
        toast.error(response.data.message || "Failed to load summary");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Fetch when token is ready
  useEffect(() => {
    if (token) fetchSummary(token);
  }, [token]);

  // Watch for token updates from Login or other tabs
  useEffect(() => {
    const handleStorageChange = () => {
      const newToken = localStorage.getItem("token");
      if (newToken && newToken !== token) setToken(newToken);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [token]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 border rounded shadow bg-white">
          <h3 className="text-gray-500 mb-2">Total Users</h3>
          <p className="text-3xl font-bold">{summary.totalUsers}</p>
        </div>
        <div className="p-6 border rounded shadow bg-white">
          <h3 className="text-gray-500 mb-2">Total Orders</h3>
          <p className="text-3xl font-bold">{summary.totalOrders}</p>
        </div>
        <div className="p-6 border rounded shadow bg-white">
          <h3 className="text-gray-500 mb-2">Total Products</h3>
          <p className="text-3xl font-bold">{summary.totalProducts}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
