import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { IoCloseOutline } from 'react-icons/io5';
import { MdClose } from "react-icons/md";

const CartSidebar = ({ isOpen, onClose, cartItems = [], onRemoveItem }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // টোটাল প্রাইস ক্যালকুলেশন
    const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

    return (
        <>
            {/* Background Overlay (কালো আবছা অংশ) */}
            <div
                onClick={onClose}
                className={`fixed inset-0 bg-black/50 z-100 transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
            />

            {/* Sidebar Panel (ডানদিকের স্লাইডার) */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-[400px] bg-white z-[110] shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                    <h2 className="text-[20px] font-medium text-[#1a1a1a] font-pop">
                        Shopping Cart ({cartItems.length})
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-black transition-colors"
                    >
                        <MdClose size={24} />
                    </button>
                </div>

                {/* Cart Items List */}
                <div className="flex-1 overflow-y-auto hide-scrollbar p-6 space-y-6">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <p className="font-medium text-lg">Your cart is empty.</p>
                        </div>
                    ) : (
                        cartItems.map((item, index) => (
                            <div key={item.product?._id || index} className="flex items-center gap-4 group">

                                {/* Item Image */}
                                <div className="w-[80px] h-[80px] shrink-0 bg-white rounded flex items-center justify-center">
                                    <img
                                        src={
                                            item.thumbnail ||
                                            item.product?.thumbnail?.url ||
                                            "/images/no-image.png"
                                        }
                                        alt={item.title}
                                        className="max-w-full max-h-full object-contain"
                                    />
                                </div>

                                {/* Item Details */}
                                <div className="flex-1 flex flex-col font-pop">
                                    <h4 className="text-[14px] text-[#1a1a1a] font-medium mb-1 line-clamp-1 group-hover:text-[#00B207] transition-colors">
                                        {item.title}
                                    </h4>
                                    <div className="text-[14px] text-[#666666]">
                                        {item.quantity || 1} kg x <span className="font-semibold text-[#1a1a1a]">${Number(item.price).toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Remove Button */}
                                <button
                                    onClick={() =>
                                        onRemoveItem &&
                                        onRemoveItem(item.product?._id)
                                    }
                                    className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500 transition-colors shrink-0"
                                >
                                    <IoCloseOutline size={16} />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer (Total & Buttons) */}
                {cartItems.length > 0 && (
                    <div className="p-6 border-t border-gray-100 bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.03)] font-pop">

                        {/* Summary */}
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-[15px] text-[#4d4d4d]">{cartItems.length} Product</span>
                            <span className="text-[18px] font-bold text-[#1a1a1a]">${totalAmount.toFixed(2)}</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => { onClose(); navigate('/checkout'); }}
                                className="w-full py-3.5 rounded-full bg-[#00B207] text-white font-semibold text-[15px] hover:bg-[#009206] transition-colors"
                            >
                                Checkout
                            </button>
                            <button
                                onClick={() => { onClose(); navigate('/cart'); }}
                                className="w-full py-3.5 rounded-full bg-[#e6f7e6] text-[#00B207] font-semibold text-[15px] hover:bg-[#d5f0d5] transition-colors"
                            >
                                Go To Cart
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Hide Scrollbar Style for the Items List */}
            <style dangerouslySetInnerHTML={{
                __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
        </>
    );
};

export default CartSidebar;