import React, { useState } from "react";
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
    const [showOrder, setShowOrder] = useState(false);

    const handleTrack = (e) => {
        e.preventDefault();

        if (!trackingId.trim()) return;

        setShowOrder(true);
    };

    const trackingSteps = [
        {
            title: "Order Placed",
            date: "02 Jun 2026, 09:15 AM",
            icon: <FaBoxOpen />,
            active: true,
        },
        {
            title: "Processing",
            date: "02 Jun 2026, 11:30 AM",
            icon: <FaCheckCircle />,
            active: true,
        },
        {
            title: "Out For Delivery",
            date: "03 Jun 2026, 08:00 AM",
            icon: <FaTruck />,
            active: true,
        },
        {
            title: "Delivered",
            date: "Expected Today",
            icon: <FaMapMarkerAlt />,
            active: false,
        },
    ];

    return (
        <>
            <PageBanner
                items={[
                    "Track Order",
                ]}
            />
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
                        <form
                            onSubmit={handleTrack}
                            className="flex flex-col md:flex-row gap-4"
                        >
                            <input
                                type="text"
                                placeholder="Enter Order ID (e.g. ECO-2026-001)"
                                value={trackingId}
                                onChange={(e) => setTrackingId(e.target.value)}
                                className="flex-1 border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-green-500"
                            />

                            <button
                                type="submit"
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-xl transition"
                            >
                                Track Order
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
                                            Order #{trackingId}
                                        </h3>

                                        <p className="text-gray-500 mt-2">
                                            Estimated Delivery: 03 June 2026
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-4">
                                        <div className="bg-green-50 px-5 py-3 rounded-xl">
                                            <p className="text-sm text-gray-500">Order Status</p>
                                            <h4 className="font-semibold text-green-600">
                                                Out For Delivery
                                            </h4>
                                        </div>

                                        <div className="bg-orange-50 px-5 py-3 rounded-xl">
                                            <p className="text-sm text-gray-500">Payment</p>
                                            <h4 className="font-semibold text-orange-600">Paid</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 mt-8">
                                <h3 className="text-2xl font-bold mb-10 text-[#1A1A1A]">
                                    Shipment Progress
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                    {trackingSteps.map((step, index) => (
                                        <div
                                            key={index}
                                            className="relative text-center"
                                        >
                                            {index !== trackingSteps.length - 1 && (
                                                <div
                                                    className={`hidden md:block absolute top-6 left-[55%] w-full h-[3px]
                        ${step.active
                                                            ? "bg-green-500"
                                                            : "bg-gray-200"
                                                        }`}
                                                />
                                            )}

                                            <div
                                                className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center text-xl
                      ${step.active
                                                        ? "bg-green-600 text-white"
                                                        : "bg-gray-200 text-gray-500"
                                                    }`}
                                            >
                                                {step.icon}
                                            </div>

                                            <h4 className="font-semibold mt-4 text-[#1A1A1A]">
                                                {step.title}
                                            </h4>

                                            <p className="text-sm text-gray-500 mt-2">
                                                {step.date}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 mt-8">
                                <h3 className="text-2xl font-bold mb-6">
                                    Delivery Address
                                </h3>

                                <div className="flex items-start gap-4">
                                    <FaMapMarkerAlt className="text-green-600 text-2xl mt-1" />

                                    <div>
                                        <h4 className="font-semibold text-lg">
                                            Creative IT Institute
                                        </h4>

                                        <p className="text-gray-500">
                                            House #21, Road #04,
                                            Shahzadpur, Dhaka, Bangladesh
                                        </p>

                                        <p className="text-gray-500 mt-2">
                                            +8801700000000
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-linear-to-r from-green-600 to-green-700 rounded-3xl p-8 mt-8 text-white">
                                <h3 className="text-2xl font-bold">
                                    Need Help?
                                </h3>

                                <p className="mt-3 text-green-100">
                                    If you have any questions regarding your order,
                                    our support team is available 24/7.
                                </p>

                                <button className="mt-6 bg-white text-green-700 font-semibold px-6 py-3 rounded-xl">
                                    Contact Support
                                </button>
                            </div>
                        </div>
                    )}
                </Container>
            </section>
        </>
    );
};

export default TrackOrder;