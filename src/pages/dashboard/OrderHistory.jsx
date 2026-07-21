import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import Container from "../../components/layouts/Container";
import Sidebar from "../../components/common/DashboardSidebar";
import PageBanner from "../../components/common/PageBanner";
import api from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import { getMyOrders } from "../../services/orderService"; 

const OrderHistory = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  // Fetching Orders
  const { data: ordersResponse, isLoading, isError } = useQuery({
    queryKey: ["my-orders"],
    queryFn: getMyOrders,
  });

  const allOrders = ordersResponse?.data?.orders || ordersResponse?.data || [];
  
  // Pagination Logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = allOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(allOrders.length / ordersPerPage);

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

  return (
    <>
      <PageBanner items={[
        "Account",
        "Order History"
        ]} />

      <Container>
        <div className="flex flex-col md:flex-row gap-6 pt-8 pb-20 min-h-screen font-pop text-[#1A1A1A]">
          <Sidebar activeMenu="Order History" handleLogout={handleLogout} />

          <div className="flex-1">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900">Order History</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-[#F2F2F2] text-gray-500 text-xs uppercase tracking-wider font-medium">
                      <th className="px-6 py-3.5">Order ID</th>
                      <th className="px-6 py-3.5">Date</th>
                      <th className="px-6 py-3.5">Total</th>
                      <th className="px-6 py-3.5">Status</th>
                      <th className="px-6 py-3.5 text-right"></th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    {isLoading ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-10 text-center text-gray-500">Loading your orders...</td>
                      </tr>
                    ) : isError || allOrders.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-10 text-center text-gray-500">No order history found.</td>
                      </tr>
                    ) : (
                      currentOrders.map((order) => {
                        const orderTotal = order.totalPrice || order.totalAmount || order.total || order.grandTotal || 0;
                        const orderProductsCount = order.totalItems || order.items?.length || order.products?.length || order.orderItems?.length || 0;

                        return (
                          <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-gray-900 font-medium">#{order._id.substring(0, 4)}</td>
                            <td className="px-6 py-4 text-gray-600">
                              {new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-gray-900 font-medium">${Number(orderTotal).toFixed(2)}</span>
                              <span className="text-gray-500"> ({orderProductsCount} {orderProductsCount > 1 ? 'Products' : 'Product'})</span>
                            </td>
                            <td className="px-6 py-4 text-gray-600 capitalize">{order.orderStatus || 'Processing'}</td>
                            <td className="px-6 py-4 text-right">
                              <button 
                                onClick={() => navigate(`/order-details/${order._id}`)}
                                className="text-[#00B207] font-medium hover:text-[#009206] transition-colors cursor-pointer"
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 p-6 border-t border-gray-100">
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaChevronLeft className="text-xs" />
                  </button>
                  
                  {[...Array(totalPages)].map((_, i) => {
                     const pageNum = i + 1;
                     return (
                      <button 
                        key={pageNum}
                        className={`w-10 h-10 rounded-full font-medium flex items-center justify-center cursor-pointer transition-colors ${
                          currentPage === pageNum ? 'bg-[#00B207] text-white' : 'text-gray-600 hover:bg-gray-50'
                        }`} 
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </button>
                     )
                  })}
                  
                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaChevronRight className="text-xs" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OrderHistory;