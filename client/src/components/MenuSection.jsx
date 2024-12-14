/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

function MenuSection({ title, menus, addToCart, showDetails }) {
  return (
    <div className="container w-full mx-auto py-8 sm:py-10 md:py-14 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 bg-slate-200">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 text-center">
        {title}
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {menus.map((menu) => (
          <div
            key={menu.id}
            className="border bg-white rounded-lg shadow-md overflow-hidden 
              transition-transform transform hover:scale-105 
              flex flex-col items-center text-center"
          >
            <img
              src={menu.image_url}
              alt={menu.food_name}
              className="w-full h-32 sm:h-36 md:h-40 object-cover"
            />
            <div className="p-3 sm:p-4 w-full flex-grow flex flex-col">
              <h2 className="text-sm sm:text-base font-bold mb-1">
                {menu.food_name}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 font-semibold mb-2">
                Rp. {menu.price}
              </p>
              <div className="flex justify-between mt-auto space-x-2">
                <button
                  className="flex-1 px-2 py-1 text-xs sm:text-sm 
                    bg-blue-500 text-white rounded 
                    hover:bg-blue-600 transition-colors"
                  onClick={() => showDetails(menu)}
                >
                  Detail
                </button>
                <button
                  className="flex-1 px-2 py-1 text-xs sm:text-sm 
                    bg-green-500 text-white rounded 
                    hover:bg-green-600 transition-colors"
                  onClick={() => addToCart(menu)}
                >
                  Bungkus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuSection;