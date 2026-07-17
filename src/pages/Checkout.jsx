import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import Container from '../components/layouts/Container';
import PageBanner from '../components/common/PageBanner';

const Checkout = () => {
  // States
  const [shipToDifferent, setShipToDifferent] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod'); // cod, paypal, amazon

  // ডামি কার্ট ডাটা (ছবির সাথে মিল রেখে)
  const orderItems = [
    { id: 1, title: 'Green Capsicum', qty: 5, price: 70.00, image: 'https://via.placeholder.com/50?text=Green+Cap' },
    { id: 2, title: 'Red Capsicum', qty: 1, price: 14.00, image: 'https://via.placeholder.com/50?text=Red+Cap' }
  ];

  return (
    <>
    <PageBanner
        items={[
          "Shopping Cart",
          "Checkout",
        ]}
      />

    <section className="pt-10 pb-20 bg-white font-pop text-[#1a1a1a]">
      <Container>
        <form className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* --- Left Side: Forms --- */}
          <div className="flex-1 w-full lg:w-[65%]">
            
            {/* Billing Information */}
            <div className="mb-8">
              <h2 className="text-[24px] font-medium mb-6">Billing Information</h2>
              
              {/* Row 1: Names & Company */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-[14px] mb-1.5">First name</label>
                  <input type="text" placeholder="Your first name" className="w-full h-[48px] px-4 border border-gray-200 rounded-md outline-none focus:border-[#00B207] text-[14px] transition-colors" />
                </div>
                <div>
                  <label className="block text-[14px] mb-1.5">Last name</label>
                  <input type="text" placeholder="Your last name" className="w-full h-[48px] px-4 border border-gray-200 rounded-md outline-none focus:border-[#00B207] text-[14px] transition-colors" />
                </div>
                <div>
                  <label className="block text-[14px] mb-1.5">Company Name <span className="text-gray-400">(optional)</span></label>
                  <input type="text" placeholder="Company name" className="w-full h-[48px] px-4 border border-gray-200 rounded-md outline-none focus:border-[#00B207] text-[14px] transition-colors" />
                </div>
              </div>

              {/* Row 2: Street Address */}
              <div className="mb-4">
                <label className="block text-[14px] mb-1.5">Street Address</label>
                <input type="text" placeholder="Street Address" className="w-full h-[48px] px-4 border border-gray-200 rounded-md outline-none focus:border-[#00B207] text-[14px] transition-colors" />
              </div>

              {/* Row 3: Country, State, Zip */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-[14px] mb-1.5">Country / Region</label>
                  <div className="relative">
                    <select className="w-full h-[48px] px-4 border border-gray-200 rounded-md outline-none focus:border-[#00B207] text-[14px] appearance-none bg-white cursor-pointer transition-colors">
                      <option value="">Select</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="BD">Bangladesh</option>
                    </select>
                    <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs" />
                  </div>
                </div>
                <div>
                  <label className="block text-[14px] mb-1.5">States</label>
                  <div className="relative">
                    <select className="w-full h-[48px] px-4 border border-gray-200 rounded-md outline-none focus:border-[#00B207] text-[14px] appearance-none bg-white cursor-pointer transition-colors">
                      <option value="">Selects</option>
                      <option value="NY">New York</option>
                      <option value="CA">California</option>
                      <option value="DH">Dhaka</option>
                    </select>
                    <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs" />
                  </div>
                </div>
                <div>
                  <label className="block text-[14px] mb-1.5">Zip Code</label>
                  <input type="text" placeholder="Zip Code" className="w-full h-[48px] px-4 border border-gray-200 rounded-md outline-none focus:border-[#00B207] text-[14px] transition-colors" />
                </div>
              </div>

              {/* Row 4: Email, Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-[14px] mb-1.5">Email</label>
                  <input type="email" placeholder="Email Address" className="w-full h-[48px] px-4 border border-gray-200 rounded-md outline-none focus:border-[#00B207] text-[14px] transition-colors" />
                </div>
                <div>
                  <label className="block text-[14px] mb-1.5">Phone</label>
                  <input type="text" placeholder="Phone number" className="w-full h-[48px] px-4 border border-gray-200 rounded-md outline-none focus:border-[#00B207] text-[14px] transition-colors" />
                </div>
              </div>

              {/* Ship to a different address Checkbox */}
              <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => setShipToDifferent(!shipToDifferent)}>
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${shipToDifferent ? 'bg-[#00B207] border-[#00B207]' : 'border-gray-300 bg-white'}`}>
                  {shipToDifferent && (
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span className="text-[14px] text-[#4d4d4d] select-none">Ship to a different address</span>
              </div>
            </div>

            {/* --- Shipping Address Form (Production Standard Animation) --- */}
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${shipToDifferent ? 'max-h-[1000px] opacity-100 mb-8' : 'max-h-0 opacity-0 m-0'}`}>
              <h2 className="text-[20px] font-medium mb-6 text-[#1a1a1a]">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[14px] mb-1.5">First name</label>
                  <input type="text" placeholder="First name" className="w-full h-[48px] px-4 border border-gray-200 rounded-md outline-none focus:border-[#00B207] text-[14px]" />
                </div>
                <div>
                  <label className="block text-[14px] mb-1.5">Last name</label>
                  <input type="text" placeholder="Last name" className="w-full h-[48px] px-4 border border-gray-200 rounded-md outline-none focus:border-[#00B207] text-[14px]" />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-[14px] mb-1.5">Street Address</label>
                <input type="text" placeholder="Shipping Street Address" className="w-full h-[48px] px-4 border border-gray-200 rounded-md outline-none focus:border-[#00B207] text-[14px]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-[14px] mb-1.5">Country / Region</label>
                  <select className="w-full h-[48px] px-4 border border-gray-200 rounded-md outline-none focus:border-[#00B207] text-[14px] bg-white">
                    <option value="">Select</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[14px] mb-1.5">States</label>
                  <select className="w-full h-[48px] px-4 border border-gray-200 rounded-md outline-none focus:border-[#00B207] text-[14px] bg-white">
                    <option value="">Selects</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[14px] mb-1.5">Zip Code</label>
                  <input type="text" placeholder="Zip Code" className="w-full h-[48px] px-4 border border-gray-200 rounded-md outline-none focus:border-[#00B207] text-[14px]" />
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="border-t border-gray-100 pt-8">
              <h2 className="text-[24px] font-medium mb-6">Additional Info</h2>
              <div>
                <label className="block text-[14px] mb-1.5 text-[#1a1a1a]">Order Notes (Optional)</label>
                <textarea 
                  placeholder="Notes about your order, e.g. special notes for delivery" 
                  className="w-full h-[120px] p-4 border border-gray-200 rounded-md outline-none focus:border-[#00B207] text-[14px] resize-none transition-colors"
                ></textarea>
              </div>
            </div>
          </div>

          {/* --- Right Side: Order Summary --- */}
          <div className="w-full lg:w-[420px] shrink-0 border border-gray-200 rounded-lg p-6 bg-white">
            <h3 className="text-[20px] font-medium text-[#1a1a1a] mb-6">Order Summary</h3>
            
            {/* Items */}
            <div className="space-y-4 mb-6">
              {orderItems.map(item => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-[50px] h-[50px] bg-white rounded border border-gray-100 flex items-center justify-center p-1">
                      <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                    </div>
                    <span className="text-[14px] text-[#4d4d4d] font-medium">{item.title} x{item.qty}</span>
                  </div>
                  <span className="text-[14px] font-medium text-[#1a1a1a]">${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Subtotal & Shipping */}
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-[#666666] text-[14px]">Subtotal:</span>
              <span className="font-medium text-[#1a1a1a] text-[14px]">$84.00</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-[#666666] text-[14px]">Shipping:</span>
              <span className="font-medium text-[#1a1a1a] text-[14px]">Free</span>
            </div>
            <div className="flex justify-between items-center py-4 mb-6">
              <span className="text-[#1a1a1a] text-[16px] font-normal">Total:</span>
              <span className="font-bold text-[#1a1a1a] text-[20px]">$84.00</span>
            </div>

            {/* Payment Methods */}
            <div className="mb-8">
              <h3 className="text-[20px] font-medium text-[#1a1a1a] mb-4">Payment Method</h3>
              <div className="space-y-3">
                
                <label className="flex items-center gap-3 cursor-pointer group" onClick={() => setPaymentMethod('cod')}>
                  <div className={`w-[20px] h-[20px] rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === 'cod' ? 'border-[#00B207]' : 'border-gray-300'}`}>
                    {paymentMethod === 'cod' && <div className="w-[10px] h-[10px] bg-[#00B207] rounded-full"></div>}
                  </div>
                  <span className={`text-[14px] ${paymentMethod === 'cod' ? 'text-[#1a1a1a]' : 'text-[#666666]'}`}>Cash on Delivery</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group" onClick={() => setPaymentMethod('paypal')}>
                  <div className={`w-[20px] h-[20px] rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === 'paypal' ? 'border-[#00B207]' : 'border-gray-300'}`}>
                    {paymentMethod === 'paypal' && <div className="w-[10px] h-[10px] bg-[#00B207] rounded-full"></div>}
                  </div>
                  <span className={`text-[14px] ${paymentMethod === 'paypal' ? 'text-[#1a1a1a]' : 'text-[#666666]'}`}>Paypal</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group" onClick={() => setPaymentMethod('amazon')}>
                  <div className={`w-[20px] h-[20px] rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === 'amazon' ? 'border-[#00B207]' : 'border-gray-300'}`}>
                    {paymentMethod === 'amazon' && <div className="w-[10px] h-[10px] bg-[#00B207] rounded-full"></div>}
                  </div>
                  <span className={`text-[14px] ${paymentMethod === 'amazon' ? 'text-[#1a1a1a]' : 'text-[#666666]'}`}>Amazon Pay</span>
                </label>

              </div>
            </div>

            {/* Place Order Button */}
            <button 
              type="submit"
              className="w-full h-[52px] bg-[#00B207] text-white rounded-full font-semibold text-[15px] hover:bg-[#009206] transition-colors"
            >
              Place Order
            </button>
          </div>
          
        </form>
      </Container>
    </section>

    </>
  );
};

export default Checkout;