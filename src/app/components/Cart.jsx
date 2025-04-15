import { useCart } from '@/context/CardContext';
import {  Minus, Plus, ShoppingCart, X } from 'lucide-react';
import Link from 'next/link';
import React from 'react'


const Cart = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();
  
  if (!isCartOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto shadow-xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Your Cart ({getCartCount()} items)</h2>
          <button onClick={() => setIsCartOpen(false)} className="p-1 rounded-full hover:bg-gray-200">
            <X size={24} />
          </button>
        </div>
        
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <ShoppingCart size={64} className="text-gray-300 mb-4" />
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <div className="p-4">
            {cart.map((item, index) => (
              <div key={`${item.id}-${item.color}-${index}`} className="flex items-center py-4 border-b">
                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                <div className="ml-4 flex-1">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-600">Color: 
                    <span className="ml-1 inline-block w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                  </p>
                  <div className="flex items-center mt-2">
                    <button 
                      onClick={() => updateQuantity(item.id, item.color, Math.max(1, item.quantity - 1))}
                      className="p-1 border rounded-md"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.color, Math.min(item.stock, item.quantity + 1))}
                      className="p-1 border rounded-md"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  <button 
                    onClick={() => removeFromCart(item.id, item.color)}
                    className="text-red-500 text-sm mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            
            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between font-semibold text-lg mb-4">
                <span>Subtotal:</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <Link href="/checkout">
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800"
                >
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart

