import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <Link to="/">
            <img
              src={assets.logo}
              className="w-32 mb-5 cursor-pointer"
              alt="Trendify"
            />
          </Link>
          <p className="w-full text-gray-600 md:w-2/3 text-justify">
            Thank you for choosing Revora! We’re committed to delivering the
            newest trends and premium quality products. Stay connected with us
            on social media for updates on arrivals, exclusive deals, and more.
            Need help or have questions? Our friendly support team is ready to
            assist. Subscribe to our newsletter for special discounts and early
            access to promotions. Your style journey begins now—let’s make it
            memorable!
          </p>
        </div>

        <div>
          <p className="mb-5 text-xl font-medium">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/about">
              <li>About Us</li>
            </Link>
            <Link to="/contact">
              <li>Contact</li>
            </Link>
            <Link to="/privacy">
              <li>Privacy & Policy</li>
            </Link>
          </ul>
        </div>

        <div>
          <p className="mb-5 text-xl font-medium">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+11-235-696-557</li>
            <li>support@revora.com</li>
            <li>sanjidaaziz5@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          &copy; {new Date().getFullYear()} Sanjida Aziz. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
