import React, { useState } from 'react'
import Container from '../layouts/Container'
import { FaAngleDown, FaBars, FaChevronDown, FaPlus } from "react-icons/fa";
import { TbPhoneCall } from "react-icons/tb";
import { FaAppleAlt, FaCarrot, FaFish, FaDrumstickBite, FaWineBottle, FaIceCream, FaBreadSlice, FaCheese, FaUtensils } from "react-icons/fa";
import Dropdown from "../common/Dropdown";

const Navbar = () => {

  const [active, setActive] = useState("Vegetables");

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
          <Dropdown
            options={categories}
            value={active}
            onChange={(item) => setActive(item.name)}
            className="w-78"
            dropdownClass="w-full border border-brdr"
            renderTrigger={(open) => (
              <div className="flex items-center justify-between bg-subb text-white">
                <div className="flex items-center">
                  <div className="bg-primary p-4">
                    <FaBars className="size-8" />
                  </div>
                  <h4 className="px-4 py-5 font-medium text-[16px]">
                    All Categories
                  </h4>
                </div>
                <FaChevronDown
                  className={`mr-4 size-5 transition duration-300 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </div>
            )}
            renderItem={(item) => (
              <div className="flex items-center gap-3 px-5 py-4 text-sm cursor-pointer hover:bg-primary hover:text-white transition">
                <span className="text-lg">{item.icon}</span>
                {item.name}
              </div>
            )}

            footer={(
              <div className="flex items-center gap-3 px-5 py-4 text-sm cursor-pointer hover:bg-primary hover:text-white transition border-t border-brdr">
                <FaPlus />
                View all Category
              </div>
            )}
          />

          <div className="flex items-center justify-between w-full">
            <div>
              <ul className="flex text-[#999999] text-sm font-medium gap-x-8">
                {menuItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-1 hover:text-white transition cursor-pointer"
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

export default Navbar;