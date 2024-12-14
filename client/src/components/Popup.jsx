/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

function Popup({ message, closePopup }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full text-center">
        <h2 className="text-xl font-semibold">{message}</h2>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={closePopup}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Popup;
