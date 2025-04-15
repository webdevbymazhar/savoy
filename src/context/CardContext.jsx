"use client"
import { createContext, useContext, useEffect, useState } from 'react';

// Create a cart context for global state management
const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  const addToCart = (product, quantity, selectedColor) => {
    setCart(prevCart => {
      // Check if item already exists in cart
      const existingItemIndex = prevCart.findIndex(
        item => item.id === product._id && item.color === selectedColor
      );
      
      if (existingItemIndex > -1) {
        // Update quantity if item exists
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      } else {
        // Add new item
        return [...prevCart, {
          id: product._id,
          title: product.title,
          price: product.price,
          image: product.image[0],
          color: selectedColor,
          quantity: quantity,
          stock: product.stock
        }];
      }
    });
    
    // Open cart drawer when adding items
    setIsCartOpen(true);
  };
  
  const removeFromCart = (itemId, color) => {
    setCart(prevCart => prevCart.filter(
      item => !(item.id === itemId && item.color === color)
    ));
  };
  
  const updateQuantity = (itemId, color, newQuantity) => {
    setCart(prevCart => prevCart.map(item => 
      (item.id === itemId && item.color === color)
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };
  
  const clearCart = () => {
    setCart([]);
  };
  
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };
  
  // Create value object with all cart functions and state
  const value = {
    cart,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export default CartProvider;