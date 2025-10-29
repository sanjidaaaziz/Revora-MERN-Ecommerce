// import React, { useEffect, useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const backendUrl = import.meta.env.VITE_BACKEND_URL;

//   // Fetch all users
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await fetch(`${backendUrl}/api/user/all`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         const data = await res.json();
//         if (data.success) setUsers(data.users);
//         else toast.error(data.message);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//         toast.error("Failed to fetch users");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, [backendUrl]);

//   // Toast-style confirmation
//   const confirmAction = (message, onConfirm) => {
//     toast.info(
//       <div>
//         <p>{message}</p>
//         <div className="flex gap-2 mt-2">
//           <button
//             onClick={() => {
//               onConfirm();
//               toast.dismiss();
//             }}
//             className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
//           >
//             Yes
//           </button>
//           <button
//             onClick={() => toast.dismiss()}
//             className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//           >
//             No
//           </button>
//         </div>
//       </div>,
//       { autoClose: false, closeOnClick: false }
//     );
//   };

//   // Delete user
//   const handleDelete = (id) => {
//     confirmAction("Are you sure you want to delete this user?", async () => {
//       try {
//         const res = await fetch(`${backendUrl}/api/user/${id}`, {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         const data = await res.json();
//         if (data.success) {
//           setUsers(users.filter((user) => user._id !== id));
//           toast.success("User deleted successfully");
//         } else {
//           toast.error(data.message);
//         }
//       } catch (error) {
//         console.error(error);
//         toast.error("Failed to delete user");
//       }
//     });
//   };

//   // Block / Unblock user
//   const handleBlock = async (id) => {
//     try {
//       const res = await fetch(`${backendUrl}/api/user/block/${id}`, {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       const data = await res.json();
//       if (data.success) {
//         setUsers(
//           users.map((user) =>
//             user._id === id ? { ...user, isBlocked: data.user.isBlocked } : user
//           )
//         );
//         toast.success(data.message);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to update user status");
//     }
//   };

//   if (loading) return <p className="text-center mt-10">Loading users...</p>;

//   return (
//     <div className="p-6">
//       {/* Toast container */}
//       <ToastContainer position="top-right" autoClose={3000} />

//       <h2 className="text-2xl font-semibold mb-4">Registered Users</h2>
//       {users.length === 0 ? (
//         <p>No users found.</p>
//       ) : (
//         <div className="overflow-x-auto border rounded-lg">
//           <table className="min-w-full border-collapse">
//             <thead>
//               <tr className="bg-gray-100 border-b">
//                 <th className="text-left px-4 py-2">#</th>
//                 <th className="text-left px-4 py-2">Name</th>
//                 <th className="text-left px-4 py-2">Email</th>
//                 <th className="text-left px-4 py-2">Contact</th>
//                 <th className="text-left px-4 py-2">Role</th>
//                 <th className="text-left px-4 py-2">Status</th>
//                 <th className="text-left px-4 py-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user, index) => (
//                 <tr
//                   key={user._id}
//                   className={`border-b hover:bg-gray-50 ${
//                     user.isBlocked ? "bg-red-100" : ""
//                   }`}
//                 >
//                   <td className="px-4 py-2">{index + 1}</td>
//                   <td className="px-4 py-2">{user.name}</td>
//                   <td className="px-4 py-2">{user.email}</td>
//                   <td className="px-4 py-2">{user.contact}</td>
//                   <td className="px-4 py-2 capitalize">{user.role}</td>
//                   <td className="px-4 py-2">
//                     {user.isBlocked ? "Blocked" : "Active"}
//                   </td>
//                   <td className="px-4 py-2 flex gap-2">
//                     <button
//                       onClick={() => handleBlock(user._id)}
//                       className={`px-3 py-1 rounded text-white ${
//                         user.isBlocked
//                           ? "bg-green-500 hover:bg-green-600"
//                           : "bg-yellow-500 hover:bg-yellow-600"
//                       }`}
//                     >
//                       {user.isBlocked ? "Unblock" : "Block"}
//                     </button>
//                     <button
//                       onClick={() => handleDelete(user._id)}
//                       className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Users;
import React, { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteUserData, setDeleteUserData] = useState(null);
  const [blockUserData, setBlockUserData] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/user/all`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        if (data.success) setUsers(data.users);
        else alert(data.message);
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [backendUrl]);

  // Delete user
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${backendUrl}/api/user/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setUsers(users.filter((user) => user._id !== id));
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete user");
    } finally {
      setDeleteUserData(null);
    }
  };

  // Block / Unblock user
  const handleBlock = async (id) => {
    try {
      const res = await fetch(`${backendUrl}/api/user/block/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setUsers(
          users.map((user) =>
            user._id === id ? { ...user, isBlocked: data.user.isBlocked } : user
          )
        );
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update user status");
    } finally {
      setBlockUserData(null);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading users...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Registered Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="text-left px-4 py-2">#</th>
                <th className="text-left px-4 py-2">Name</th>
                <th className="text-left px-4 py-2">Email</th>
                <th className="text-left px-4 py-2">Contact</th>
                <th className="text-left px-4 py-2">Role</th>
                <th className="text-left px-4 py-2">Status</th>
                <th className="text-left px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className={`border-b hover:bg-gray-50 ${
                    user.isBlocked ? "bg-red-100" : ""
                  }`}
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.contact}</td>
                  <td className="px-4 py-2 capitalize">{user.role}</td>
                  <td className="px-4 py-2">
                    {user.isBlocked ? "Blocked" : "Active"}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => setBlockUserData(user)}
                      className={`px-3 py-1 rounded text-white ${
                        user.isBlocked
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-yellow-500 hover:bg-yellow-600"
                      }`}
                    >
                      {user.isBlocked ? "Unblock" : "Block"}
                    </button>
                    <button
                      onClick={() => setDeleteUserData(user)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteUserData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Delete User</h2>
            <p className="mb-4">
              Are you sure you want to delete "{deleteUserData.name}"?
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setDeleteUserData(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={() => handleDelete(deleteUserData._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Block/Unblock Confirmation Modal */}
      {blockUserData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">
              {blockUserData.isBlocked ? "Unblock User" : "Block User"}
            </h2>
            <p className="mb-4">
              Are you sure you want to{" "}
              {blockUserData.isBlocked ? "unblock" : "block"} "
              {blockUserData.name}"?
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setBlockUserData(null)}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 text-white rounded ${
                  blockUserData.isBlocked ? "bg-green-500" : "bg-yellow-500"
                }`}
                onClick={() => handleBlock(blockUserData._id)}
              >
                {blockUserData.isBlocked ? "Unblock" : "Block"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
