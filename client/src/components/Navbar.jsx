/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

function Navbar({ cartCount, toggleCart }) {
  return (
    <nav className="bg-gray-500 text-white p-3 sm:p-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center">
        <h1 className="text-base sm:text-lg md:text-xl font-bold ml-2 sm:ml-4">
          NasBox.id
        </h1>
      </div>
      
      <div className="flex items-center">
        <button
          className="relative px-2 sm:px-3 py-1 sm:py-2 bg-gray-800 rounded-full hover:bg-gray-700 flex items-center justify-center"
          onClick={toggleCart}
        >
          <i className="fas fa-shopping-cart text-white text-base sm:text-lg md:text-xl"></i>
          {cartCount > 0 && (
            <span className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;