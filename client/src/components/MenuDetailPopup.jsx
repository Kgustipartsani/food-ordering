/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const MenuDetailPopup = ({ selectedMenu, onClose, onAddToCart }) => {
  if (!selectedMenu) return null; 

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-4 sm:p-6 rounded shadow-lg max-w-md w-full">
        <h2 className="text-lg font-bold mb-2">{selectedMenu.food_name}</h2>
        <img
          src={selectedMenu.image_url}
          alt={selectedMenu.food_name}
          className="w-full h-60 sm:h-80 object-cover rounded mb-4"
        />
        <p className="text-sm text-gray-700 mb-4">{selectedMenu.description || 'Deskripsi tidak tersedia.'}</p>
        <p className="text-sm font-semibold text-gray-800">Rp. {selectedMenu.price}</p>
        <div className="mt-4 flex gap-4">
          <button
            className="px-3 py-2 bg-green-500 text-white rounded text-sm hover:bg-green-600"
            onClick={onAddToCart}
          >
            Bungkus
          </button>
          <button
            className="px-3 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600"
            onClick={onClose}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuDetailPopup;
