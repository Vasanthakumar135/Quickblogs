import React from "react";
import logo from "../assets/logo.svg";

const Footer = () => {
  return (
    <footer className="bg-[#f8f9fd] border-t border-gray-100 pt-12 sm:pt-16 pb-6 mt-16">
      <div className="mx-8 sm:mx-20 xl:mx-32 flex flex-col md:flex-row justify-between items-start gap-10 pb-12">
        {/* Left Section: Logo & Description */}
        <div className="max-w-md">
          <img src={logo} alt="Quickblog" className="w-36 sm:w-44 mb-4" />
          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum unde
            quaerat eveniet cumque accusamus atque qui error quo enim fugiat?
          </p>
        </div>

        {/* Right Section: Link Columns */}
        <div className="flex flex-wrap gap-12 sm:gap-16 lg:gap-24">
          {/* Quick Links Column */}
          <div>
            <h3 className="font-semibold text-gray-800 text-xs sm:text-sm mb-4">
              Quick Links
            </h3>
            <ul className="flex flex-col space-y-2 text-xs sm:text-sm text-gray-500">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Best Sellers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Offers &amp; Deals
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Need Help Column */}
          <div>
            <h3 className="font-semibold text-gray-800 text-xs sm:text-sm mb-4">
              Need help?
            </h3>
            <ul className="flex flex-col space-y-2 text-xs sm:text-sm text-gray-500">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Delivery Information
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Return &amp; Refund Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Payment Methods
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Track your Order
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us Column */}
          <div>
            <h3 className="font-semibold text-gray-800 text-xs sm:text-sm mb-4">
              Follow Us
            </h3>
            <ul className="flex flex-col space-y-2 text-xs sm:text-sm text-gray-500">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-gray-200/80 pt-5 text-center">
        <p className="text-gray-500 text-[11px] sm:text-xs">
          Copyright 2025 © QuickBlog All Right Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;