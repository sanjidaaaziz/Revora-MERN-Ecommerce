import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

const ProfilePage = () => {
  const { backendUrl, navigate } = useContext(ShopContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 State for editing profile
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editContact, setEditContact] = useState("");

  // 🔹 State for password change
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // ✅ Fetch user profile
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No token found. Please login again.");
        navigate("/login");
        return;
      }

      const response = await axios.get(`${backendUrl}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data?.user) {
        setUser(response.data.user);
        setEditName(response.data.user.name);
        setEditEmail(response.data.user.email);
        setEditContact(response.data.user.contact || "");
      } else {
        toast.error("Failed to fetch user profile.");
      }
    } catch (error) {
      console.error("Profile fetch error:", error);
      toast.error("Failed to fetch profile. Please login again.");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle profile update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${backendUrl}/api/user/profile`,
        {
          name: editName,
          email: editEmail,
          contact: editContact, // ✅ Include contact/phone
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Profile updated successfully!");
      setUser(response.data.user);
      setEditName(response.data.user.name);
      setEditEmail(response.data.user.email);
      setEditContact(response.data.user.contact || "");
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(error.response?.data?.message || "Profile update failed!");
    }
  };

  // ✅ Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${backendUrl}/api/user/password`,
        { current: currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(response.data.message || "Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      console.error("Password update error:", error);
      toast.error(error.response?.data?.message || "Password update failed!");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center mt-20 text-gray-600">Loading...</div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center mt-20 text-gray-600">
        No user data available.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow-md space-y-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">My Profile</h2>

      {/* 🔹 Profile Info Update */}
      <form onSubmit={handleUpdateProfile} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600">Name</label>
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600">Email</label>
          <input
            type="email"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* 🔹 Contact / Phone Number */}
        <div>
          <label className="block text-sm text-gray-600">Contact</label>
          <input
            type="text"
            value={editContact}
            onChange={(e) => setEditContact(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Phone number"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Update Profile
        </button>
      </form>

      {/* 🔹 Change Password Section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mt-8 mb-4">
          Change Password
        </h3>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
