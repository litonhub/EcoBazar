import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { AiOutlineHeart, AiOutlineEye } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import Container from "./layouts/Container";
import Apple from "../assets/images/apple.png";
import Malta from "../assets/images/malta.png";
import Cabage from "../assets/images/cabage.png";
import Letuce from "../assets/images/lettuce.png";
import Eggplant from "../assets/images/eggplant.png";
import Potato from "../assets/images/potato.png";
import Corn from "../assets/images/corn.png";
import Cauliflower from "../assets/images/Cauliflower.png";
import Capsicum from "../assets/images/capsicum.png";
import Chili from "../assets/images/chili.png";
import Mango from "../assets/images/mango.png";
import Tomato from "../assets/images/tomato.png";
import Redcap from "../assets/images/redcap.png";
import CountdownTimer from "./common/CountdownTimer";
import { Link } from "react-router";

const products = [
    {
        id: 1,
        name: "Green Apple",
        image: Apple,
        price: 12.0,
        oldPrice: 24.0,
        sale: true,
        bestSale: true,
    },
    {
        id: 2,
        name: "Chinese cabbage",
        image: Cabage,
        price: 12.0,
    },
    {
        id: 3,
        name: "Green Lettuce",
        image: Letuce,
        price: 9.0,
    },
    {
        id: 4,
        name: "Eggplant",
        image: Eggplant,
        price: 34.0,
    },
    {
        id: 5,
        name: "Fresh Cauliflower",
        image: Cauliflower,
        price: 12.0,
    },
    {
        id: 6,
        name: "Green Capsicum",
        image: Capsicum,
        price: 10.5,
        oldPrice: 20.99,
        sale: true,
    },
    {
        id: 7,
        name: "Green Chili",
        image: Chili,
        price: 34.0,
    },
    {
        id: 8,
        name: "Big Potatoes",
        image: Potato,
        price: 20.0,
    },
    {
        id: 9,
        name: "Corn",
        image: Corn,
        price: 20.0,
    },
    {
        id: 10,
        name: "Red Chili",
        image: Redcap,
        price: 34.0,
    },
    {
        id: 11,
        name: "Red Tomatos",
        image: Tomato,
        price: 34.0,
        oldPrice: 17.0,
        sale: true,
    },
    {
        id: 12,
        name: "Surjapur Mango",
        image: Mango,
        price: 34.0,
    },
];

const HotDeals = () => {
    return (
        <section className="py-15 bg-[#F7F7F7]">
            <Container>
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-pop font-semibold text-3xl text-gray-900 leading-[120%]">
                        Hot Deals
                    </h2>
                    <Link to="/allhotdeals" className="flex items-center gap-x-2 font-pop text-primary font-medium text-[16px] leading-[150%] cursor-pointer hover:underline">
                        View All
                        <FaArrowRight size={14} />
                    </Link>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 -mr-px -mb-px">
                    {products.map((item, index) => {
                        // Check if it's the first featured item
                        const isFeatured = index === 0;

                        if (isFeatured) {
                            return (
                                <div
                                    key={item.id}
                                    className="group relative col-span-2 row-span-2 border border-brdrtwo -mr-px -mb-px bg-white p-6 hover:border-[#2C742F] hover:shadow-[0_0_12px_0_rgba(32,181,38,0.32)] transition-all duration-300 z-10 flex flex-col justify-between"
                                >
                                    {/* Badges */}
                                    <div className="absolute top-6 left-6 flex gap-2 z-20">
                                        {item.sale && (
                                            <span className="bg-[#EA4B48] text-white defaultfs px-2 py-0.75 rounded">
                                                Sale 50%
                                            </span>
                                        )}
                                        {item.bestSale && (
                                            <span className="bg-badgeblue text-white defaultfs px-2 py-0.75 rounded">
                                                Best Sale
                                            </span>
                                        )}
                                    </div>

                                    {/* Featured Image */}
                                    <div className="grow flex items-center justify-center pt-8 pb-4">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="max-h-72 object-contain"
                                        />
                                    </div>

                                    {/* Featured Actions */}
                                    <div className="flex items-center justify-between gap-x-2 mb-6">
                                        <button className="w-12 h-12 rounded-full cursor-pointer text-logoc bg-[#f2f2f2] flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                            <AiOutlineHeart size={20} />
                                        </button>
                                        <button className="flex-1 py-3.5 bg-primary text-white text-[14px] font-pop rounded-full flex items-center justify-center gap-x-3 font-semibold transition-colors cursor-pointer">
                                            <span>Add to Cart</span>
                                            <HiOutlineShoppingBag size={18} />
                                        </button>
                                        <button className="w-12 h-12 rounded-full cursor-pointer text-logoc bg-[#f2f2f2] flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                            <AiOutlineEye size={20} />
                                        </button>
                                    </div>

                                    {/* Featured Details */}
                                    <div className="text-center pb-4">
                                        <h3 className="font-pop font-normal text-[18px] text-[#4d4d4d] leading-[150%] mb-2 transition-colors duration-300 group-hover:text-[#2C742F]">
                                            {item.name}
                                        </h3>
                                        <div className="flex items-center justify-center gap-2 font-pop text-xl mb-2">
                                            <span className="font-pop font-medium text-[24px] leading-[150%] text-logoc">
                                                ${item.price.toFixed(2)}
                                            </span>
                                            {item.oldPrice && (
                                                <span className="line-through font-pop font-normal text-[24px] leading-[150%] text-grynine">
                                                    ${item.oldPrice.toFixed(2)}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-center gap-2 mb-4.5">
                                            <div className="text-[#FF8A00]">★★★★★</div>
                                            <span className="font-pop font-normal text-[14px] leading-[130%] text-gryd">
                                                (524 Feedback)
                                            </span>
                                        </div>

                                        <div>
                                            <h6 className="font-pop font-normal text-[14px] leading-4.5 text-grynine">Hurry up! Offer ends In:</h6>
                                            <CountdownTimer
                                                endDate={new Date("2027-01-01")}
                                                wrapperClass="mt-1.5"
                                                numberClass="font-pop font-medium text-[18px] text-logoc leading-[150%]"
                                                separatorClass="font-pop font-normal text-[20px] text-gryd leading-[27px]"
                                                labelClass="font-pop font-medium text-[12px] text-grynine leading-[100%] traking-[3%]"
                                                numberGap="gap-5"
                                                labelGap="gap-8"
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        // Standard Small Cards
                        return (
                            <div
                                key={item.id}
                                className="group relative border border-gray-200 -mr-px -mb-px bg-white transition-all duration-300 hover:border-[#2C742F] hover:shadow-[0_0_12px_0_rgba(32,181,38,0.32)] hover:z-10 cursor-pointer flex flex-col p-4"
                            >
                                {/* Sale Badge */}
                                {item.sale && (
                                    <span className="absolute top-4 left-4 bg-[#EA4B48] text-white defaultfs px-2 py-0.75 rounded z-10">
                                        Sale 50%
                                    </span>
                                )}

                                {/* Product Image */}
                                <div className="grow flex items-center justify-center mb-4 min-h-35">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="max-h-32 object-contain"
                                    />
                                </div>

                                {/* Hover Actions */}
                                <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition duration-300">

                                    <button className="w-10 h-10 rounded-full cursor-pointer text-logoc bg-white shadow border border-[#f2f2f2] flex items-center justify-center hover:bg-primary hover:text-white">
                                        <AiOutlineHeart />
                                    </button>

                                    <button className="w-10 h-10 rounded-full cursor-pointer text-logoc bg-white border border-[#f2f2f2] shadow flex items-center justify-center hover:bg-primary hover:text-white">
                                        <AiOutlineEye />
                                    </button>

                                </div>

                                {/* Product Info */}
                                <div className="mt-auto">
                                    <h3 className="font-pop font-normal text-[14px] leading-[150%] text-[#4d4d4d] group-hover:text-[#2C742F] transition-colors">
                                        {item.name}
                                    </h3>

                                    <div className="flex justify-between items-end">
                                        <div>
                                            <div className="flex items-center gap-2 font-pop">
                                                <span className="font-pop font-medium text-[16px] leading-[150%] text-logoc">
                                                    ${item.price.toFixed(2)}
                                                </span>
                                                {item.oldPrice && (
                                                    <span className="line-through font-pop font-normal text-[16px] leading-[150%] text-gryd">
                                                        ${item.oldPrice.toFixed(2)}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-[#FF8A00] mt-1">★★★★☆</div>
                                        </div>

                                        {/* Small Cart Button */}
                                        <button className="absolute bottom-6 right-4 w-10 h-10 rounded-full bg-[#f2f2f2] text-logoc flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:text-white hover:bg-primary hover:text-white cursor-pointer">
                                            <HiOutlineShoppingBag size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
};

export default HotDeals;