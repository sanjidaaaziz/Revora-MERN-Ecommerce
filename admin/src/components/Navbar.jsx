import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Navbar = ({ setToken }) => {
  return (
    <div className="top-0 left-0 z-50 w-full transition-all duration-300 bg-white bg-opacity-50  backdrop-blur-md">
      <div className="flex items-center py-5 px-[4%] justify-between">
        <Link to={"/"}>
          <img className="w-44" src={assets.logo} alt="Trendify" />
        </Link>
        <button
          onClick={() => setToken("")}
          className="px-5 py-2 text-xs text-white bg-purple rounded-full sm:px-7 sm:text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
