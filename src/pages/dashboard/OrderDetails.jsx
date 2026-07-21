import React from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa";

import Container from "../../components/layouts/Container";
import Sidebar from "../../components/common/DashboardSidebar";
import PageBanner from "../../components/common/PageBanner";
import api from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import { getSingleOrder } from "../../services/orderService"; 

const OrderDetails = () => {
  const { id } = useParams(); // URL parameter theke order id nibe
  const { setUser } = useAuth();
  const navigate = useNavigate();

  // Fetch Single Order
  const { data: orderResponse, isLoading, isError } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getSingleOrder(id),
    enabled: !!id,
  });

  const order = orderResponse?.data;

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      setUser(null);
      toast.success("Logout successful.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#00B207] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
        <button onClick={() => navigate("/order-history")} className="bg-[#00B207] text-white px-6 py-2 rounded-full">Back to Orders</button>
      </div>
    );
  }

  const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const itemsCount = order.items?.length || order.orderItems?.length || 0;
  const products = order.items || order.orderItems || [];
  
  const subTotal = order.subTotal || order.itemsPrice || 0;
  const shipping = order.shippingPrice || order.shippingCost || 0;
  const discount = order.discount || order.discountAmount || 0;
  const total = order.totalPrice || order.totalAmount || order.grandTotal || 0;

  // Tracking Progress Logic
  const statuses = ["pending", "processing", "shipped", "delivered"];
  const currentStatusIndex = statuses.indexOf(order.orderStatus?.toLowerCase() || "pending");

  const trackingSteps = [
    { title: "Order received", step: 1 },
    { title: "Processing", step: 2 },
    { title: "On the way", step: 3 },
    { title: "Delivered", step: 4 },
  ];

  return (
    <>
      <PageBanner items={[
        "Account",
        "Order History",
        "Order Details"
        ]} />

      <Container>
        <div className="flex flex-col md:flex-row gap-6 pt-8 pb-20 min-h-screen font-pop text-[#1A1A1A]">
          <Sidebar activeMenu="Order History" handleLogout={handleLogout} />

          <div className="flex-1">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              
              {/* Header */}
              <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-[15px]">
                  <h3 className="text-xl font-semibold text-gray-900">Order Details</h3>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">{orderDate}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">{itemsCount} Products</span>
                </div>
                <button 
                  onClick={() => navigate("/order-history")} 
                  className="text-[#00B207] font-medium hover:text-[#009206] transition-colors cursor-pointer"
                >
                  Back to List
                </button>
              </div>

              <div className="p-6">
                {/* Top Info Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                  {/* Billing & Shipping Address Box */}
                  <div className="lg:col-span-2 border border-gray-200 rounded-lg grid grid-cols-1 md:grid-cols-2">
                    
                    {/* Billing Address */}
                    <div className="p-6 border-b md:border-b-0 md:border-r border-gray-200">
                      <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Billing Address</h4>
                      <h3 className="text-base font-semibold text-gray-900 mb-2">
                        {order.billingAddress?.firstName || order.shippingAddress?.firstName} {order.billingAddress?.lastName || order.shippingAddress?.lastName}
                      </h3>
                      <p className="text-gray-500 text-sm mb-4 leading-relaxed max-w-[200px]">
                        {order.billingAddress?.street || order.shippingAddress?.street}, <br/>
                        {order.billingAddress?.city || order.shippingAddress?.city}, {order.billingAddress?.country || order.shippingAddress?.country} {order.billingAddress?.zipCode || order.shippingAddress?.zipCode}
                      </p>
                      <div className="space-y-1">
                         <p className="text-xs text-gray-400 uppercase font-medium">Email</p>
                         <p className="text-sm text-gray-800">{order.user?.email || "N/A"}</p>
                      </div>
                      <div className="space-y-1 mt-3">
                         <p className="text-xs text-gray-400 uppercase font-medium">Phone</p>
                         <p className="text-sm text-gray-800">{order.billingAddress?.phone || order.shippingAddress?.phone || "N/A"}</p>
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="p-6">
                      <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Shipping Address</h4>
                      <h3 className="text-base font-semibold text-gray-900 mb-2">
                        {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}
                      </h3>
                      <p className="text-gray-500 text-sm mb-4 leading-relaxed max-w-[200px]">
                        {order.shippingAddress?.street}, <br/>
                        {order.shippingAddress?.city}, {order.shippingAddress?.country} {order.shippingAddress?.zipCode}
                      </p>
                      <div className="space-y-1">
                         <p className="text-xs text-gray-400 uppercase font-medium">Email</p>
                         <p className="text-sm text-gray-800">{order.user?.email || "N/A"}</p>
                      </div>
                      <div className="space-y-1 mt-3">
                         <p className="text-xs text-gray-400 uppercase font-medium">Phone</p>
                         <p className="text-sm text-gray-800">{order.shippingAddress?.phone}</p>
                      </div>
                    </div>

                  </div>

                  {/* Order Summary Box */}
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <p className="text-xs text-gray-400 uppercase font-medium mb-1">Order ID:</p>
                        <p className="text-base font-semibold text-gray-900">#{order._id.substring(0,4)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase font-medium mb-1">Payment Method:</p>
                        <p className="text-base font-medium text-gray-900 capitalize">{order.paymentMethod || "Paypal"}</p>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-5 space-y-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Subtotal:</span>
                        <span className="font-semibold text-gray-900">${Number(subTotal).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Discount:</span>
                        <span className="font-medium text-gray-900">{discount > 0 ? `$${Number(discount).toFixed(2)}` : '0%'}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Shipping:</span>
                        <span className="font-medium text-gray-900">{shipping === 0 ? "Free" : `$${Number(shipping).toFixed(2)}`}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-lg text-gray-900">Total</span>
                        <span className="text-xl font-bold text-[#00B207]">${Number(total).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

{/* Progress Bar (Tracking) */}
<div className="py-8 px-4 w-full max-w-4xl mx-auto mb-12">
  <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-0 relative">
    {trackingSteps.map((step, index) => {
      const isCompleted = index < currentStatusIndex;
      const isActive = index === currentStatusIndex;
      const isPending = index > currentStatusIndex;

      return (
        <div key={index} className="relative z-10 text-center">
          
          {/* Desktop Horizontal Line */}
          {index !== trackingSteps.length - 1 && (
            <div className="hidden md:block absolute top-7 left-1/2 w-full h-[4px] bg-gray-100 rounded-full z-0">
              <div 
                className={`h-full rounded-full transition-all duration-700 ease-in-out ${
                  isCompleted ? 'bg-[#00B207] w-full' : 'w-0'
                }`} 
              />
            </div>
          )}

          {/* Mobile Vertical Line */}
          {index !== trackingSteps.length - 1 && (
            <div className="md:hidden absolute top-14 left-[26px] bottom-[-40px] w-[4px] bg-gray-100 rounded-full z-0">
              <div 
                className={`w-full rounded-full transition-all duration-700 ease-in-out ${
                  isCompleted ? 'bg-[#00B207] h-full' : 'h-0'
                }`} 
              />
            </div>
          )}

          {/* Step Node */}
          <div className="relative z-10 flex flex-row md:flex-col items-center md:justify-center gap-5 md:gap-3">
            
            {/* Icon Circle */}
            <div 
              className={`w-14 h-14 shrink-0 rounded-full flex items-center justify-center font-bold text-[17px] transition-all duration-500
                ${isCompleted ? 'bg-[#00B207] text-white shadow-lg shadow-green-500/40 scale-100' : ''}
                ${isActive ? 'bg-white text-[#00B207] border-[3px] border-[#00B207] ring-4 ring-green-50 shadow-md scale-110' : ''}
                ${isPending ? 'bg-white text-gray-400 border-2 border-dashed border-gray-300' : ''}
              `}
            >
              {isCompleted ? <FaCheck className="w-5 h-5" /> : `0${step.step}`}
            </div>

            {/* Text Content */}
            <div className="text-left md:text-center mt-1">
              <h4 className={`text-[15px] font-semibold transition-colors duration-300 ${
                isActive || isCompleted ? 'text-gray-900' : 'text-gray-400'
              }`}>
                {step.title}
              </h4>
              
              {/* Active "Current" Badge */}
              {isActive && (
                <>
                  <span className="hidden md:inline-block absolute left-1/2 -translate-x-1/2 mt-1.5 text-[10px] font-bold text-[#00B207] uppercase tracking-wider bg-green-50 px-3 py-1 rounded-full">
                    Current
                  </span>
                  <span className="md:hidden mt-1.5 text-[10px] font-bold text-[#00B207] uppercase tracking-wider bg-green-50 px-3 py-1 rounded-full inline-block">
                    Current
                  </span>
                </>
              )}
            </div>
            
          </div>
        </div>
      );
    })}
  </div>
</div>

                {/* Products Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="bg-[#F2F2F2] text-gray-500 text-xs uppercase tracking-wider font-medium">
                        <th className="px-6 py-3.5">Product</th>
                        <th className="px-6 py-3.5">Price</th>
                        <th className="px-6 py-3.5">Quantity</th>
                        <th className="px-6 py-3.5">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100 border-b border-gray-100">
                      {products.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 flex items-center gap-4">
                            <div className="w-12 h-12 flex-shrink-0 bg-white border border-gray-100 rounded p-1">
                              <img
                                src={item.thumbnail || item.product?.thumbnail?.url || item.image}
                                alt={item.name || item.title || item.product?.title}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <span className="font-medium text-gray-900 text-[15px]">
                              {item.name || item.title || item.product?.title}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-600 font-medium">
                            ${Number(item.price).toFixed(2)}
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            x{item.quantity || item.qty}
                          </td>
                          <td className="px-6 py-4 text-gray-900 font-semibold">
                            ${Number(item.price * (item.quantity || item.qty)).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OrderDetails;