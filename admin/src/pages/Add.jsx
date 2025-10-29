import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("bestSeller", bestSeller);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        resetForm();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const resetForm = () => {
    setImage1(null);
    setImage2(null);
    setImage3(null);
    setImage4(null);
    setName("");
    setDescription("");
    setCategory("");
    setPrice("");
    setSizes([]);
    setBestSeller(false);
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-start w-full gap-3"
    >
      <div>
        <p className="mb-2 text-lg ">Upload Product Image(s)</p>
        <div className="flex gap-2">
          {[image1, image2, image3, image4].map((img, idx) => (
            <label key={idx} htmlFor={`image${idx + 1}`}>
              <img
                className="w-20 cursor-pointer"
                src={!img ? assets.upload_area : URL.createObjectURL(img)}
                alt="Upload Images"
              />
              <input
                onChange={(e) => {
                  if (idx === 0) setImage1(e.target.files[0]);
                  if (idx === 1) setImage2(e.target.files[0]);
                  if (idx === 2) setImage3(e.target.files[0]);
                  if (idx === 3) setImage4(e.target.files[0]);
                }}
                type="file"
                id={`image${idx + 1}`}
                hidden
                accept="image/*"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="w-full mt-2">
        <p className="mb-2 text-lg">Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Enter Product Name"
          required
        />
      </div>

      <div className="w-full mt-2">
        <p className="mb-2 text-lg">Product Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full px-3 py-2 max-w-[500px]"
          placeholder="Enter Product Description"
          required
        />
      </div>

      <div className="w-full mt-2">
        <p className="mb-2 text-lg">Product Category</p>
        <input
          type="text"
          placeholder="Enter Product Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 max-w-[500px]"
          required
        />
      </div>

      <div className="w-full mt-2">
        <p className="mb-2 text-lg">Product Price</p>
        <input
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          className="w-full px-3 py-2 max-w-[500px]"
          type="number"
          placeholder="Enter Product Price"
          required
        />
      </div>

      <div>
        <p className="mb-2 text-lg">Product Sizes</p>
        <div className="flex gap-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((item) => item !== size)
                    : [...prev, size]
                )
              }
            >
              <p
                className={`${
                  sizes.includes(size) ? "bg-purple text-white" : "bg-gray-200"
                } px-3 py-1 cursor-pointer`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          id="bestSeller"
          checked={bestSeller}
          onChange={() => setBestSeller((prev) => !prev)}
        />
        <label htmlFor="bestSeller" className="ml-2 cursor-pointer">
          Add to Best Seller
        </label>
      </div>

      <div className="flex flex-col w-full gap-2 sm:flex-row sm:gap-8">
        <button type="submit" className="px-5 py-2 mt-2 text-white bg-purple">
          Add Product
        </button>
        <button
          type="button"
          className="px-5 py-2 mt-2 text-white bg-purple"
          onClick={resetForm}
        >
          Reset Details
        </button>
      </div>
    </form>
  );
};

export default Add;
