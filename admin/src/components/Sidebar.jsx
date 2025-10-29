import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          className={
            "flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l bg-white  "
          }
          to={"/dashboard"}
        >
          <img
            className="w-6 h-6"
            src={assets.dashboard_icon}
            alt="Add Items"
          />
          <p className="hidden  md:block">Admin Dashboard</p>
        </NavLink>
        <NavLink
          className={
            "flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l bg-white  "
          }
          to={"/add"}
        >
          <img className="w-6 h-6" src={assets.add_icon} alt="Add Items" />
          <p className="hidden  md:block">Add Items</p>
        </NavLink>
        <NavLink
          className={
            "flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l bg-white"
          }
          to={"/list"}
        >
          <img className="w-6 h-6" src={assets.parcel_icon} alt="List Items" />
          <p className="hidden md:block">List Items</p>
        </NavLink>
        <NavLink
          className={
            "flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l bg-white"
          }
          to={"/orders"}
        >
          <img className="w-6 h-6" src={assets.order_icon} alt="Add Products" />
          <p className="hidden md:block">View Orders</p>
        </NavLink>
        <NavLink
          className={
            "flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l bg-white"
          }
          to={"/users"}
        >
          <img className="w-6 h-6" src={assets.user_icon} alt="All users" />
          <p className="hidden md:block">Users</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
