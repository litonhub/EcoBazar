import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSingleOrder } from "../services/orderService";
import { toast } from "react-toastify";
import {
    FaBoxOpen,
    FaTruck,
    FaCheckCircle,
    FaMapMarkerAlt,
} from "react-icons/fa";
import Container from "./layouts/Container";
import PageBanner from "./common/PageBanner";

const TrackOrder = () => {
    const [trackingId, setTrackingId] = useState("");
    const [orderIdToFetch, setOrderIdToFetch] = useState(null);

    const { data: orderResponse, isLoading } = useQuery({
        queryKey: ["order", orderIdToFetch],
        queryFn: () => getSingleOrder(orderIdToFetch),
        enabled: !!orderIdToFetch,
        retry: false,
        onSuccess: () => {
            toast.success("Order details fetched successfully.");
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Order not found.");
        }
    });

    const orderData = orderResponse?.data;
    const showOrder = !!orderData;

    const handleTrack = (e) => {
        e.preventDefault();
        if (!trackingId.trim()) {
            toast.warn("Please enter a valid Order ID.");
            return;
        }
        setOrderIdToFetch(trackingId);
    };

    const getTrackingSteps = (status) => {
        const statuses = ["pending", "processing", "shipped", "delivered"];
        const currentIndex = statuses.indexOf(status);
        
        return [
            { title: "Order Placed", active: currentIndex >= 0, icon: <FaBoxOpen /> },
            { title: "Processing", active: currentIndex >= 1, icon: <FaCheckCircle /> },
            { title: "Out For Delivery", active: currentIndex >= 2, icon: <FaTruck /> },
            { title: "Delivered", active: currentIndex >= 3, icon: <FaMapMarkerAlt /> },
        ];
    };

    const trackingSteps = showOrder ? getTrackingSteps(orderData.orderStatus) : [];

    return (
        <>
            <PageBanner items={["Track Order"]} />
            <section className="py-20">
                <Container>
                    <div className="text-center mb-14">
                        <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium text-sm">
                            Track Your Order
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mt-5">
                            Check Order Status
                        </h1>
                        <p className="text-gray-500 max-w-xl mx-auto mt-4">
                            Enter your order number to get real-time updates about your
                            delivery status and shipping progress.
                        </p>
                    </div>

                    {/* Search Card */}
                    <div className="max-w-250 mx-auto bg-white rounded-xl shadow-xl border border-gray-100 p-8 md:p-10">
                        <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4">
                            <input
                                type="text"
                                placeholder="Enter Order ID (e.g. 6a5e...)"
                                value={trackingId}
                                onChange={(e) => setTrackingId(e.target.value)}
                                className="flex-1 border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-green-500"
                            />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-xl transition"
                            >
                                {isLoading ? "Tracking..." : "Track Order"}
                            </button>
                        </form>
                    </div>

                    {showOrder && (
                        <div className="mt-12">
                            {/* Order Info */}
                            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
                                <div className="flex flex-col lg:flex-row justify-between gap-8">
                                    <div>
                                        <h3 className="text-2xl font-bold text-[#1A1A1A]">
                                            Order #{orderData._id}
                                        </h3>
                                        <p className="text-gray-500 mt-2">
                                            Placed on: {new Date(orderData.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-4">
                                        <div className="bg-green-50 px-5 py-3 rounded-xl">
                                            <p className="text-sm text-gray-500">Order Status</p>
                                            <h4 className="font-semibold text-green-600 capitalize">
                                                {orderData.orderStatus}
                                            </h4>
                                        </div>
                                        <div className="bg-orange-50 px-5 py-3 rounded-xl">
                                            <p className="text-sm text-gray-500">Payment</p>
                                            <h4 className="font-semibold text-orange-600 capitalize">
                                                {orderData.paymentStatus}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Shipment Progress */}
                            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 mt-8">
                                <h3 className="text-2xl font-bold mb-10 text-[#1A1A1A]">
                                    Shipment Progress
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                    {trackingSteps.map((step, index) => (
                                        <div key={index} className="relative text-center">
                                            {index !== trackingSteps.length - 1 && (
                                                <div className={`hidden md:block absolute top-6 left-[55%] w-full h-[3px] ${step.active ? "bg-green-500" : "bg-gray-200"}`} />
                                            )}
                                            <div className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center text-xl ${step.active ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"}`}>
                                                {step.icon}
                                            </div>
                                            <h4 className="font-semibold mt-4 text-[#1A1A1A]">{step.title}</h4>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Delivery Address */}
                            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 mt-8">
                                <h3 className="text-2xl font-bold mb-6">Delivery Address</h3>
                                <div className="flex items-start gap-4">
                                    <FaMapMarkerAlt className="text-green-600 text-2xl mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-lg">{orderData.shippingAddress.firstName} {orderData.shippingAddress.lastName}</h4>
                                        <p className="text-gray-500">
                                            {orderData.shippingAddress.street}, {orderData.shippingAddress.city}, {orderData.shippingAddress.country}
                                        </p>
                                        <p className="text-gray-500 mt-2">
                                            {orderData.shippingAddress.phone}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Container>
            </section>
        </>
    );
};

export default TrackOrder;