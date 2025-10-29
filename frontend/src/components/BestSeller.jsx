import React, { useContext, useEffect, useState, useRef } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestSeller);
    setBestSeller(bestProduct);
  }, [products]);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="my-10 relative">
      {/* Title */}
      <div className="py-8 text-3xl text-center">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs text-gray-600 sm:text-sm md:text-base">
          Top-rated and trusted, our Best Sellers combine Quality, Style, and
          Great value.
        </p>
      </div>

      {/* Slider */}
      <div className="relative group">
        {/* Arrows */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-20 opacity-50 group-hover:opacity-100 transition"
        >
          <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
        </button>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-20 opacity-50 group-hover:opacity-100 transition"
        >
          <ChevronRightIcon className="w-6 h-6 text-gray-700" />
        </button>

        {/* Gradient hints */}
        <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
        <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>

        {/* Scrollable container */}
        <div
          ref={sliderRef}
          className="flex overflow-x-auto scroll-smooth space-x-4 px-4 no-scrollbar"
        >
          {bestSeller.map((item) => (
            <div
              key={item._id}
              className="flex-shrink-0 w-48 sm:w-56 md:w-60 lg:w-64"
            >
              <ProductItem
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Optional hint */}
      <p className="text-sm text-gray-500 text-center mt-2">
        Swipe or use arrows to see more
      </p>
    </div>
  );
};

export default BestSeller;
