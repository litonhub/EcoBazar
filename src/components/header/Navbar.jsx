import React, { useState, useRef, useEffect } from 'react'
import Container from '../layouts/Container'
import { FaAngleDown } from "react-icons/fa6";
import { TbPhoneCall } from "react-icons/tb";
import { FaBars, FaChevronDown, FaPlus } from "react-icons/fa";
import { FaAppleAlt, FaCarrot, FaFish, FaDrumstickBite, FaWineBottle, FaIceCream, FaBreadSlice, FaCheese, FaUtensils } from "react-icons/fa";

const Navbar = () => {

    const [open, setOpen] = useState(false);
    const [active, setActive] = useState("Vegetables");
    const dropdownRef = useRef(null);

    // 👉 outside click close
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const menuItems = [
        { name: "Home", dropdown: true },
        { name: "Shop", dropdown: true },
        { name: "Pages", dropdown: true },
        { name: "Blog", dropdown: true },
        { name: "About Us", dropdown: false },
        { name: "Contact Us", dropdown: false },
    ];

    const categories = [
        { name: "Fresh Fruit", icon: <FaAppleAlt /> },
        { name: "Vegetables", icon: <FaCarrot /> },
        { name: "River Fish", icon: <FaFish /> },
        { name: "Chicken & Meat", icon: <FaDrumstickBite /> },
        { name: "Drink & Water", icon: <FaWineBottle /> },
        { name: "Yogurt & Ice Cream", icon: <FaIceCream /> },
        { name: "Cake & Bread", icon: <FaBreadSlice /> },
        { name: "Butter & Cream", icon: <FaCheese /> },
        { name: "Cooking", icon: <FaUtensils /> },
    ];

    return (
        <div className='bg-logoc'>
            <Container>
                <div className='flex items-center gap-x-8 font-pop leading-[150%]'>
                    <div ref={dropdownRef} className="relative w-78">
                        <div
                            onClick={() => setOpen(!open)}
                            className="flex items-center justify-between bg-subb text-white cursor-pointer"
                        >
                            <div className="flex items-center">
                                <div className="bg-primary p-4">
                                    <FaBars className='size-8' />
                                </div>
                                <h4 className="px-4 py-5 font-medium text-[16px]">All Categories</h4>
                            </div>
                            <FaChevronDown
                                className={`mr-4 size-5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                            />
                        </div>
                        <div
                            className={`absolute left-0 top-full w-full bg-white shadow-lg z-50
                            transition-all duration-300 origin-top
                            ${open ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"}`}
                        >
                            <ul className="border border-solid border-brdr">
                                {categories.map((item, index) => (
                                    <li
                                        key={index}
                                        onClick={() => setActive(item.name)}
                                        className="flex items-center gap-3 px-5 py-4 text-sm font-normal cursor-pointer transition-all duration-300 text-logoc hover:bg-primary hover:text-white"
                                    >
                                        <span className="text-lg">{item.icon}</span>
                                        {item.name}
                                    </li>
                                ))}
                                <li className="flex items-center gap-3 px-5 py-4 text-sm font-normal text-logoc border-t border-solid border-brdr cursor-pointer hover:bg-primary hover:text-white transition">
                                    <FaPlus />
                                    View all Category
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <div>
                            <ul className="flex text-[#999999] text-sm font-medium gap-x-8">
                                {menuItems.map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-1 hover:text-white transition-all duration-300 ease-in-out cursor-pointer"
                                    >
                                        {item.name}
                                        {item.dropdown && <FaAngleDown />}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className='flex items-center gap-x-2 text-white cursor-pointer'>
                            <TbPhoneCall className='size-7' />
                            <h4 className='text-sm font-medium'>(219) 555-0114</h4>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Navbar