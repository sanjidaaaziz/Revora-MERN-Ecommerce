// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { backendUrl, currency } from "../App";
// import { toast } from "react-toastify";

// const List = ({ token }) => {
//   const [listProducts, setListProducts] = useState([]);
//   const [editProductData, setEditProductData] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [deleteProductData, setDeleteProductData] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);

//   // Fetch all products
//   const fetchListProducts = async () => {
//     try {
//       const response = await axios.get(`${backendUrl}/api/product/list`);
//       if (response.data.success) {
//         setListProducts(response.data.products);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to fetch products");
//     }
//   };

//   // Remove product
//   const removeProduct = async (id) => {
//     try {
//       const response = await axios.post(
//         `${backendUrl}/api/product/remove`,
//         { id },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (response.data.success) {
//         await fetchListProducts();
//         return true;
//       } else {
//         toast.error(response.data.message);
//         return false;
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to remove product");
//       return false;
//     }
//   };

//   // Open edit modal
//   const openEditModal = (product) => {
//     setEditProductData({ ...product });
//     setShowEditModal(true);
//   };

//   // Handle input changes
//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditProductData({ ...editProductData, [name]: value });
//   };

//   // Remove image (mark as removed)
//   const removeImage = (index) => {
//     const updatedImages = [...editProductData.image];
//     updatedImages[index] = null;
//     setEditProductData({ ...editProductData, image: updatedImages });
//   };

//   useEffect(() => {
//     fetchListProducts();
//   }, []);

//   return (
//     <div className="flex flex-col gap-2">
//       <p className="mb-2">All Products List</p>

//       {/* Table Header */}
//       <div className="hidden md:grid grid-cols-[0.5fr_1fr_1.5fr_0.5fr_0.5fr_0.5fr] items-center py-1 px-2 border bg-gray-200 text-sm">
//         <b>Image</b>
//         <b>Name</b>
//         <b>Category</b>
//         <b>Price</b>
//         <b className="text-center">Edit</b>
//         <b className="text-center">Delete</b>
//       </div>

//       {/* Products List */}
//       {listProducts.map((item) => (
//         <div
//           className="grid grid-cols-[0.5fr_1fr_1.5fr_0.5fr_0.5fr_0.5fr] items-center gap-2 py-1 px-2 border text-sm"
//           key={item._id}
//         >
//           <img className="w-12" src={item.image[0]} alt="Product" />
//           <p className="text-left">{item.name}</p>
//           <p>{item.category}</p>
//           <p>{currency(item.price)}</p>

//           {/* Edit button */}
//           <button
//             onClick={() => openEditModal(item)}
//             className="text-center text-blue-500 font-bold px-2 py-1 border rounded hover:bg-blue-100"
//           >
//             Edit
//           </button>

//           {/* Delete button */}
//           <button
//             onClick={() => {
//               setDeleteProductData(item);
//               setShowDeleteModal(true);
//             }}
//             className="text-center text-red-500 font-bold px-2 py-1 border rounded hover:bg-red-100"
//           >
//             Delete
//           </button>
//         </div>
//       ))}

//       {/* Edit Modal */}
//       {showEditModal && editProductData && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
//           <div className="bg-white p-6 rounded shadow-lg w-96 max-h-[90vh] overflow-y-auto">
//             <h2 className="text-xl mb-4">Edit Product</h2>

//             {/* Name */}
//             <label className="block mb-2">
//               Name:
//               <input
//                 className="border p-1 w-full"
//                 name="name"
//                 value={editProductData.name}
//                 onChange={handleEditChange}
//               />
//             </label>

//             {/* Category */}
//             <label className="block mb-2">
//               Category:
//               <input
//                 className="border p-1 w-full"
//                 name="category"
//                 value={editProductData.category}
//                 onChange={handleEditChange}
//               />
//             </label>

//             {/* Price */}
//             <label className="block mb-2">
//               Price:
//               <input
//                 className="border p-1 w-full"
//                 type="number"
//                 name="price"
//                 value={editProductData.price}
//                 onChange={handleEditChange}
//               />
//             </label>

//             {/* Images */}
//             <label className="block mb-2">
//               Images:
//               {[1, 2, 3, 4].map((num, index) => (
//                 <div key={num} className="mb-3 relative">
//                   {/* Upload input */}
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) =>
//                       setEditProductData({
//                         ...editProductData,
//                         [`image${num}`]: e.target.files[0],
//                       })
//                     }
//                     className="border p-1 w-full"
//                   />

//                   {/* Preview Image */}
//                   {editProductData[`image${num}`] &&
//                     typeof editProductData[`image${num}`] !== "string" && (
//                       <img
//                         src={URL.createObjectURL(
//                           editProductData[`image${num}`]
//                         )}
//                         alt={`Preview ${num}`}
//                         className="w-20 mt-1 border"
//                       />
//                     )}

//                   {/* Existing image with delete option */}
//                   {!editProductData[`image${num}`] &&
//                     editProductData.image &&
//                     editProductData.image[index] && (
//                       <div className="relative w-fit mt-1">
//                         <img
//                           src={editProductData.image[index]}
//                           alt={`Current ${num}`}
//                           className="w-20 border"
//                         />
//                         <button
//                           type="button"
//                           onClick={(e) => {
//                             e.stopPropagation(); // ✅ prevents file input click
//                             removeImage(index);
//                           }}
//                           className="absolute -top-0 -right-0 bg-red-500 text-white rounded w-5 h-5 flex items-center justify-center text-xs"
//                         >
//                           ✕
//                         </button>
//                       </div>
//                     )}
//                 </div>
//               ))}
//             </label>

//             <div className="flex justify-end gap-2 mt-4">
//               <button
//                 className="px-4 py-2 bg-gray-300 rounded"
//                 onClick={() => setShowEditModal(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 bg-blue-500 text-white rounded"
//                 onClick={async () => {
//                   try {
//                     const formData = new FormData();
//                     formData.append("_id", editProductData._id);
//                     formData.append("name", editProductData.name);
//                     formData.append("category", editProductData.category);
//                     formData.append("price", editProductData.price);

//                     // append new + existing + removed info
//                     for (let i = 1; i <= 4; i++) {
//                       const img = editProductData[`image${i}`];
//                       if (img && typeof img !== "string") {
//                         formData.append(`image${i}`, img);
//                       } else if (editProductData.image[i - 1]) {
//                         formData.append(
//                           `existingImage${i}`,
//                           editProductData.image[i - 1]
//                         );
//                       } else {
//                         formData.append(`existingImage${i}`, ""); // removed
//                       }
//                     }

//                     const response = await axios.post(
//                       `${backendUrl}/api/product/update`,
//                       formData,
//                       {
//                         headers: {
//                           Authorization: `Bearer ${token}`,
//                           "Content-Type": "multipart/form-data",
//                         },
//                       }
//                     );

//                     if (response.data.success) {
//                       toast.success("Product updated successfully");
//                       setShowEditModal(false);
//                       setEditProductData(null);
//                       fetchListProducts();
//                     } else {
//                       toast.error(response.data.message);
//                     }
//                   } catch (error) {
//                     console.error(error);
//                     toast.error("Failed to update product");
//                   }
//                 }}
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && deleteProductData && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded shadow-lg w-80">
//             <h2 className="text-lg font-bold mb-4">Delete Product</h2>
//             <p className="mb-4">
//               Are you sure you want to delete "{deleteProductData.name}"?
//             </p>
//             <div className="flex justify-end gap-2">
//               <button
//                 className="px-4 py-2 bg-gray-300 rounded"
//                 onClick={() => setShowDeleteModal(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 bg-red-500 text-white rounded"
//                 onClick={async () => {
//                   const success = await removeProduct(deleteProductData._id);
//                   if (success) toast.success("Product deleted successfully");
//                   setShowDeleteModal(false);
//                   setDeleteProductData(null);
//                 }}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default List;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [listProducts, setListProducts] = useState([]);
  const [editProductData, setEditProductData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteProductData, setDeleteProductData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Fetch all products
  const fetchListProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setListProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products");
    }
  };

  // Remove product
  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        await fetchListProducts();
        return true;
      } else {
        toast.error(response.data.message);
        return false;
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove product");
      return false;
    }
  };

  // Open edit modal
  const openEditModal = (product) => {
    setEditProductData({ ...product });
    setShowEditModal(true);
  };

  // Handle input changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProductData({ ...editProductData, [name]: value });
  };

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setEditProductData({ ...editProductData, [name]: checked });
  };

  // Remove image (mark as removed)
  const removeImage = (index) => {
    const updatedImages = [...editProductData.image];
    updatedImages[index] = null;
    setEditProductData({ ...editProductData, image: updatedImages });
  };

  useEffect(() => {
    fetchListProducts();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <p className="mb-2">All Products List</p>

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-[0.5fr_1fr_1.5fr_0.5fr_0.5fr_0.5fr] items-center py-1 px-2 border bg-gray-200 text-sm">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>

        <b className="text-center">Edit</b>
        <b className="text-center">Delete</b>
      </div>

      {/* Products List */}
      {listProducts.map((item) => (
        <div
          className="grid grid-cols-[0.5fr_1fr_1.5fr_0.5fr_0.5fr_0.5fr] items-center gap-2 py-1 px-2 border text-sm"
          key={item._id}
        >
          <img className="w-12" src={item.image[0]} alt="Product" />
          <p className="text-left">{item.name}</p>
          <p>{item.category}</p>
          <p>{currency(item.price)}</p>

          {/* Edit button */}
          <button
            onClick={() => openEditModal(item)}
            className="text-center text-blue-500 font-bold px-2 py-1 border rounded hover:bg-blue-100"
          >
            Edit
          </button>

          {/* Delete button */}
          <button
            onClick={() => {
              setDeleteProductData(item);
              setShowDeleteModal(true);
            }}
            className="text-center text-red-500 font-bold px-2 py-1 border rounded hover:bg-red-100"
          >
            Delete
          </button>
        </div>
      ))}

      {/* Edit Modal */}
      {showEditModal && editProductData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
          <div className="bg-white p-6 rounded shadow-lg w-96 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl mb-4">Edit Product</h2>

            {/* Name */}
            <label className="block mb-2">
              Name:
              <input
                className="border p-1 w-full"
                name="name"
                value={editProductData.name}
                onChange={handleEditChange}
              />
            </label>

            {/* Category */}
            <label className="block mb-2">
              Category:
              <input
                className="border p-1 w-full"
                name="category"
                value={editProductData.category}
                onChange={handleEditChange}
              />
            </label>

            {/* Best Seller Checkbox */}
            <label className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                name="bestseller"
                checked={editProductData.bestSeller || false} // ← use backend field
                onChange={(e) =>
                  setEditProductData({
                    ...editProductData,
                    bestSeller: e.target.checked, // update same field
                  })
                }
              />
              <span>Add to Best Seller</span>
            </label>

            {/* Price */}
            <label className="block mb-2">
              Price:
              <input
                className="border p-1 w-full"
                type="number"
                name="price"
                value={editProductData.price}
                onChange={handleEditChange}
              />
            </label>

            {/* Images */}
            <label className="block mb-2">
              Images:
              {[1, 2, 3, 4].map((num, index) => (
                <div key={num} className="mb-3 relative">
                  {/* Upload input */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setEditProductData({
                        ...editProductData,
                        [`image${num}`]: e.target.files[0],
                      })
                    }
                    className="border p-1 w-full"
                  />

                  {/* Preview Image */}
                  {editProductData[`image${num}`] &&
                    typeof editProductData[`image${num}`] !== "string" && (
                      <img
                        src={URL.createObjectURL(
                          editProductData[`image${num}`]
                        )}
                        alt={`Preview ${num}`}
                        className="w-20 mt-1 border"
                      />
                    )}

                  {/* Existing image with delete option */}
                  {!editProductData[`image${num}`] &&
                    editProductData.image &&
                    editProductData.image[index] && (
                      <div className="relative w-fit mt-1">
                        <img
                          src={editProductData.image[index]}
                          alt={`Current ${num}`}
                          className="w-20 border"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(index);
                          }}
                          className="absolute -top-0 -right-0 bg-red-500 text-white rounded w-5 h-5 flex items-center justify-center text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                </div>
              ))}
            </label>

            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={async () => {
                  try {
                    const formData = new FormData();
                    formData.append("_id", editProductData._id);
                    formData.append("name", editProductData.name);
                    formData.append("category", editProductData.category);
                    formData.append("price", editProductData.price);
                    formData.append(
                      "bestSeller",
                      editProductData.bestSeller ? "true" : "false"
                    );

                    // append new + existing + removed info
                    for (let i = 1; i <= 4; i++) {
                      const img = editProductData[`image${i}`];
                      if (img && typeof img !== "string") {
                        formData.append(`image${i}`, img);
                      } else if (editProductData.image[i - 1]) {
                        formData.append(
                          `existingImage${i}`,
                          editProductData.image[i - 1]
                        );
                      } else {
                        formData.append(`existingImage${i}`, "");
                      }
                    }

                    const response = await axios.post(
                      `${backendUrl}/api/product/update`,
                      formData,
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                          "Content-Type": "multipart/form-data",
                        },
                      }
                    );

                    if (response.data.success) {
                      toast.success("Product updated successfully");
                      setShowEditModal(false);
                      setEditProductData(null);
                      fetchListProducts();
                    } else {
                      toast.error(response.data.message);
                    }
                  } catch (error) {
                    console.error(error);
                    toast.error("Failed to update product");
                  }
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && deleteProductData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Delete Product</h2>
            <p className="mb-4">
              Are you sure you want to delete "{deleteProductData.name}"?
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={async () => {
                  const success = await removeProduct(deleteProductData._id);
                  if (success) toast.success("Product deleted successfully");
                  setShowDeleteModal(false);
                  setDeleteProductData(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
