/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

function ShoppingCart({ cart, removeItem, closeCart, totalPrice, checkout, clearCart }) {
  return (
    <div className="fixed right-0 top-0 h-full w-80 sm:w-96 bg-slate-300 shadow-lg 
      px-4 sm:px-6 md:px-10 py-4 sm:py-6 shadow-black mt-12 md:mt-16 lg:mt16 overflow-y-auto">
      <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="text-sm sm:text-base">No items in the cart.</p>
      ) : (
        <ul className="space-y-3 sm:space-y-4 rounded-md">
          {cart.map((item, index) => (
            <li 
              key={index} 
              className="border bg-white rounded p-3 sm:p-4 shadow flex items-center gap-3 sm:gap-4"
            >
              <img
                src={item.image_url}
                alt={item.food_name}
                className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-semibold">{item.food_name}</h3>
                <p className="text-xs sm:text-sm text-gray-600">Rp. {item.price}</p>
              </div>
              <button
                className="px-2 py-1 text-xs sm:text-sm bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => removeItem(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-3 sm:mt-4 text-right">
        <p className="text-sm sm:text-base font-semibold">
          Total Price: {totalPrice}
        </p>
      </div>
      <div className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
        <button
          className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base 
       bg-blue-500 text-white rounded 
          ${cart.length === 0 ? ' opacity-50' : 'hover:bg-blue-600'}`}
          onClick={cart.length > 0 ? () => { checkout(); clearCart(); } : null}  // Menambahkan clearCart saat checkout
          disabled={cart.length === 0}
        >
          Checkout
        </button>

        <button
          className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base 
            bg-gray-700 text-white rounded hover:bg-gray-800"
          onClick={closeCart}
        >
          Close Cart
        </button>
      </div>
    </div>
  );
}

export default ShoppingCart;
