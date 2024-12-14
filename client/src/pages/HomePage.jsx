/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Popup from '../components/Popup';
import ShoppingCart from '../components/ShoppingCart';
import MenuSection from '../components/MenuSection';
import MenuDetailPopup from '../components/MenuDetailPopup';
import Footer from '../components/Footer';
import supabase from '../services/supabaseClient';

function HomePage() {
  const [menus, setMenus] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const foodMenus = menus.filter((menu) => menu.category === 'food');
  const drinkMenus = menus.filter((menu) => menu.category === 'drink');

  const showDetails = (menu) => {
    setSelectedMenu(menu); 
  };

  
  useEffect(() => {
    // Fungsi untuk mengambil data menu dari Supabase
    const fetchMenus = async () => {
      try {
        const { data, error } = await supabase
          .from('menus')  // Nama tabel yang ada di Supabase
          .select('*');   // Ambil semua data dari tabel

        if (error) {
          throw error;  // Tangani error jika ada
        }

        setMenus(data);  // Menyimpan data yang diterima ke state
      } catch (err) {
        console.error('Error fetching menus:', err.message); // Menampilkan error jika terjadi masalah
      }
    };

    fetchMenus();  // Panggil fungsi untuk mengambil data
  }, []);

  
  const addToCart = (menu) => {
    setCart((prevCart) => [...prevCart, menu]);
    setPopupMessage(`${menu.food_name} telah ditambahkan ke keranjang`);
    setIsPopupVisible(true);

    
    setTimeout(() => {
      setIsPopupVisible(false);
    }, 5000);
  };

  
  const calculateTotalPrice = () => {
    const total = cart.reduce((sum, menu) => sum + parseFloat(menu.price), 0);
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0, 
    }).format(total).replace(/,00$/, '.000'); 
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      setPopupMessage('Keranjang Anda kosong, silakan tambahkan menu terlebih dahulu.');
      setIsPopupVisible(true);
      return;
    }

    setPopupMessage('Menu berhasil dipesan');
    setIsPopupVisible(true);
  };
  
  const removeFromCart = (indexToRemove) => {
    setCart((prevCart) => prevCart.filter((_, index) => index !== indexToRemove));
  };

  const clearCart = () => {
    setCart([]);  // Mengosongkan array cart
  };
  

  return (
    <div className="relative">
      
      <Navbar cartCount={cart.length} toggleCart={() => setIsCartOpen(!isCartOpen)} />
      
      {isPopupVisible && (
        <Popup message={popupMessage} closePopup={() => setIsPopupVisible(false)} />
      )}

      <MenuSection
        title="Menu Makanan"
        menus={foodMenus}
        addToCart={addToCart}
        showDetails={showDetails} 
      />
      <MenuSection
        title="Menu Minuman"
        menus={drinkMenus}
        addToCart={addToCart}
        showDetails={showDetails}  
      />

      {selectedMenu && (
        <MenuDetailPopup
          selectedMenu={selectedMenu}
          onClose={() => setSelectedMenu(null)}  
          onAddToCart={() => addToCart(selectedMenu)}  
        />
      )}

      {isCartOpen && (
        <ShoppingCart
          cart={cart}
          removeItem={removeFromCart}
          closeCart={() => setIsCartOpen(false)}
          totalPrice={calculateTotalPrice()}
          checkout={handleCheckout}
          clearCart={clearCart}
        />
      )}

      <Footer />
    </div>
  );
}

export default HomePage;
