"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { Check, CreditCard, Truck, DollarSign, Loader2 } from 'lucide-react';
import { useCart } from '@/context/CardContext';

export default function Checkout() {
  const { cart, getCartTotal, clearCart } = useCart();
  const router = useRouter();
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [shippingCost, setShippingCost] = useState(8);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    sameAsBilling: true,
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZipCode: '',
    saveInfo: false,
    agreeToTerms: false,
    cardNumber: '',
    expirationDate: '',
    cvv: ''
  });
  
  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      router.push('/');
    }
  }, [cart, router]);
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle different input types
    const inputValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: inputValue
    }));
    
    // Handle "same as billing" checkbox
    if (name === 'sameAsBilling' && checked) {
      setFormData(prev => ({
        ...prev,
        billingAddress: prev.address,
        billingCity: prev.city,
        billingState: prev.state,
        billingZipCode: prev.zipCode
      }));
    }
  };
  
  const handleShippingChange = (method) => {
    setShippingMethod(method);
    setShippingCost(method === 'express' ? 15 : 8);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.agreeToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    // Calculate order totals
    const subtotal = getCartTotal();
    const tax = subtotal * 0.07; // 7% tax
    const total = subtotal + shippingCost + tax;
    
    // Prepare shipping address according to schema
    const shippingAddress = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode
    };
    
    // Prepare billing address
    const billingAddress = formData.sameAsBilling 
      ? shippingAddress 
      : {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          address: formData.billingAddress,
          city: formData.billingCity,
          state: formData.billingState,
          zipCode: formData.billingZipCode
        };
    
    // Prepare the order data
    const orderData = {
      customer: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email
      },
      items: cart.map(item => ({
        productId: item.id, // Add the required productId field
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        color: item.color,
        image: item.image
      })),
      shippingMethod,
      shippingCost,
      shippingAddress,
      billingAddress,
      paymentMethod,
      subtotal,
      tax,
      total
    };
    
    try {
      // Send order data to API
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to place order');
      }
      
      // Store order ID in session storage for confirmation page
      sessionStorage.setItem('lastOrder', JSON.stringify(result.order));
      
      // Clear cart and redirect to confirmation page
      clearCart();
      router.push('/thankyou');
      
    } catch (err) {
      console.error('Order submission error:', err);
      setError(err.message || 'An error occurred while placing your order. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Calculate order totals
  const subtotal = getCartTotal();
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + shippingCost + tax;
  
  const CustomCheckbox = ({ id, name, checked, onChange, label }) => (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <input 
          type="checkbox" 
          id={id} 
          name={name}
          checked={checked} 
          onChange={onChange}
          className="opacity-0 absolute h-5 w-5 cursor-pointer" 
        />
        <div className={`border-2 rounded-md border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center focus-within:border-blue-500 ${checked ? 'bg-gray-900 border-gray-900' : 'bg-white'}`}>
          <Check className={`w-3 h-3 text-white fill-current ${checked ? 'block' : 'hidden'}`} />
        </div>
      </div>
      <label htmlFor={id} className="text-sm cursor-pointer">{label}</label>
    </div>
  );
  
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-6">Checkout</h1>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side - Form */}
          <div className="w-full lg:w-2/3">
            <form onSubmit={handleSubmit}>
              {/* Shipping Information */}
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">ZIP Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                {/* Checkbox for same billing address */}
                <CustomCheckbox 
                  id="sameAsBilling" 
                  name="sameAsBilling" 
                  checked={formData.sameAsBilling} 
                  onChange={handleInputChange}
                  label="Billing address same as shipping address"
                />
              </div>
              
              {/* Billing Address (only show if sameAsBilling is false) */}
              {!formData.sameAsBilling && (
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h2 className="text-xl font-semibold mb-4">Billing Address</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">Address</label>
                      <input
                        type="text"
                        name="billingAddress"
                        value={formData.billingAddress}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">City</label>
                      <input
                        type="text"
                        name="billingCity"
                        value={formData.billingCity}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">State</label>
                        <input
                          type="text"
                          name="billingState"
                          value={formData.billingState}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">ZIP Code</label>
                        <input
                          type="text"
                          name="billingZipCode"
                          value={formData.billingZipCode}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Shipping Options */}
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h2 className="text-xl font-semibold mb-4">Shipping Method</h2>
                
                <div className="space-y-3">
                  <div className={`border-2 p-4 rounded-lg cursor-pointer ${shippingMethod === 'standard' ? 'border-gray-900' : 'border-gray-200'}`}
                       onClick={() => handleShippingChange('standard')}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${shippingMethod === 'standard' ? 'border-gray-900' : 'border-gray-300'}`}>
                          {shippingMethod === 'standard' && <div className="w-3 h-3 bg-gray-900 rounded-full"></div>}
                        </div>
                        <div className="flex items-center gap-2">
                          <Truck size={20} />
                          <span className="font-medium">Standard Shipping</span>
                        </div>
                      </div>
                      <span className="font-semibold">$8.00</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-10 mt-1">Delivery in 3-5 business days</p>
                  </div>
                  
                  <div className={`border-2 p-4 rounded-lg cursor-pointer ${shippingMethod === 'express' ? 'border-gray-900' : 'border-gray-200'}`}
                       onClick={() => handleShippingChange('express')}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${shippingMethod === 'express' ? 'border-gray-900' : 'border-gray-300'}`}>
                          {shippingMethod === 'express' && <div className="w-3 h-3 bg-gray-900 rounded-full"></div>}
                        </div>
                        <div className="flex items-center gap-2">
                          <Truck size={20} />
                          <span className="font-medium">Express Shipping</span>
                        </div>
                      </div>
                      <span className="font-semibold">$15.00</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-10 mt-1">Delivery in 1-2 business days</p>
                  </div>
                </div>
              </div>
              
              {/* Payment Method */}
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                
                <div className="space-y-3">
                  <div className={`border-2 p-4 rounded-lg cursor-pointer ${paymentMethod === 'card' ? 'border-gray-900' : 'border-gray-200'}`}
                       onClick={() => setPaymentMethod('card')}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-gray-900' : 'border-gray-300'}`}>
                          {paymentMethod === 'card' && <div className="w-3 h-3 bg-gray-900 rounded-full"></div>}
                        </div>
                        <div className="flex items-center gap-2">
                          <CreditCard size={20} />
                          <span className="font-medium">Credit/Debit Card</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Cash on Delivery Payment Option */}
                  <div className={`border-2 p-4 rounded-lg cursor-pointer ${paymentMethod === 'cod' ? 'border-gray-900' : 'border-gray-200'}`}
                       onClick={() => setPaymentMethod('cod')}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cod' ? 'border-gray-900' : 'border-gray-300'}`}>
                          {paymentMethod === 'cod' && <div className="w-3 h-3 bg-gray-900 rounded-full"></div>}
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign size={20} />
                          <span className="font-medium">Cash on Delivery</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 ml-10 mt-1">Pay with cash when your order is delivered</p>
                  </div>
                  
                  {paymentMethod === 'card' && (
                    <div className="ml-10 mt-3 space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Card Number</label>
                        <input
                          type="text" 
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          placeholder="1234 5678 9012 3456"
                          required={paymentMethod === 'card'}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Expiration Date</label>
                          <input
                            type="text" 
                            name="expirationDate"
                            value={formData.expirationDate}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="MM/YY"
                            required={paymentMethod === 'card'}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">CVV</label>
                          <input
                            type="text" 
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="123"
                            required={paymentMethod === 'card'}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Additional options */}
              <div className="bg-gray-50 p-6 rounded-lg mb-6 space-y-4">
                <CustomCheckbox 
                  id="saveInfo" 
                  name="saveInfo" 
                  checked={formData.saveInfo} 
                  onChange={handleInputChange}
                  label="Save this information for next time"
                />
                
                <CustomCheckbox 
                  id="agreeToTerms" 
                  name="agreeToTerms" 
                  checked={formData.agreeToTerms} 
                  onChange={handleInputChange}
                  label="I agree to the terms and conditions"
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-black text-white font-medium py-3 rounded-md hover:bg-gray-800 flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Place Order'
                )}
              </button>
            </form>
          </div>
          
          {/* Right side - Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-16">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="max-h-80 overflow-y-auto mb-4">
                {cart.map((item, index) => (
                  <div key={`${item.id}-${item.color}-${index}`} className="flex py-4 border-b border-gray-200">
                    <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                    <div className="ml-4 flex-1">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-gray-600">
                        Color: <span className="inline-block w-3 h-3 rounded-full align-middle" style={{ backgroundColor: item.color }}></span>
                      </p>
                      <div className="flex justify-between mt-1">
                        <p className="text-sm">Qty: {item.quantity}</p>
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2 py-4 border-b border-gray-200">
                <div className="flex justify-between">
                  <p className="text-gray-600">Subtotal</p>
                  <p className="font-medium">${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Shipping</p>
                  <p className="font-medium">${shippingCost.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Tax</p>
                  <p className="font-medium">${tax.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="flex justify-between py-4 font-semibold text-lg">
                <p>Total</p>
                <p>${total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}