import React, { useEffect, useState } from 'react'
import Container from '../layouts/Container'
import { FaAngleDown, FaBars, FaChevronDown } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { TbPhoneCall } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { Link } from 'react-router';
import Apple from '../../assets/svg/Apple';
import Vegetables from '../../assets/svg/Vegetables';
import Fish from '../../assets/svg/Fish';
import Chicken from '../../assets/svg/Chicken';
import Drink from '../../assets/svg/Drink';
import Icecream from '../../assets/svg/Icecream';
import Cake from '../../assets/svg/Cake';
import Cream from '../../assets/svg/Cream';
import Cooking from '../../assets/svg/Cooking';

const Navbar = () => {

  const [active, setActive] = useState("Vegetables");
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sidebarOpen]);

  const menuItems = [
    { name: "Home", dropdown: true },
    { name: "Shop", dropdown: true },
    { name: "Pages", dropdown: true },
    { name: "Blog", dropdown: true },
    { name: "About Us", dropdown: false },
    { name: "Contact Us", dropdown: false },
  ];

  const categories = [
    { name: "Fresh Fruit", icon: <Apple className='text-grynine group-hover:text-white' /> },
    { name: "Vegetables", icon: <Vegetables className='text-grynine group-hover:text-white' /> },
    { name: "River Fish", icon: <Fish className='text-grynine group-hover:text-white' /> },
    { name: "Chicken & Meat", icon: <Chicken className='text-grynine group-hover:text-white' /> },
    { name: "Drink & Water", icon: <Drink className='text-grynine group-hover:text-white' /> },
    { name: "Yogurt & Ice Cream", icon: <Icecream className='text-grynine group-hover:text-white' /> },
    { name: "Cake & Bread", icon: <Cake className='text-grynine group-hover:text-white' /> },
    { name: "Butter & Cream", icon: <Cream className='text-grynine group-hover:text-white' /> },
    { name: "Cooking", icon: <Cooking className='text-grynine group-hover:text-white' /> },
  ];

  return (
    <div className='bg-logoc'>
      <Container>
        <div className='flex items-center gap-x-8 font-pop leading-[150%]'>

          <div className="relative w-78">
            <div className="flex items-center justify-between bg-subb text-white">
              <div className="flex items-center">
                <div
                  className="bg-primary p-4 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSidebarOpen(true);
                  }}
                >
                  <FaBars className="size-8" />
                </div>
                <div
                  className="flex items-center"
                  onMouseEnter={() => setIsOpen(true)}
                  onMouseLeave={() => setIsOpen(false)}
                >
                  <h4 className="px-4 py-5 font-medium text-[16px]">
                    All Categories
                  </h4>

                  <FaChevronDown
                    className={`mr-4 size-5 transition duration-300 ${isOpen ? "rotate-180" : ""
                      }`}
                  />
                </div>
              </div>
            </div>

            <div
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
              className={`absolute left-0 top-full w-full border border-brdr bg-white shadow-md z-50 transition-all duration-300 ${isOpen
                ? "opacity-100 visible translate-y-0"
                : "opacity-0 invisible -translate-y-1"
                }`}
            >
              {categories.map((item, i) => (
                <div
                  key={i}
                  onClick={() => setActive(item.name)}
                  className="group defaultfs text-logoc flex items-center gap-x-3 px-5 py-4 cursor-pointer hover:bg-primary hover:text-white transition"
                >
                  <span>{item.icon}</span>
                  {item.name}
                </div>
              ))}
              <div className="group flex items-center gap-x-3 defaultfs text-logoc px-5 py-4 cursor-pointer hover:bg-primary hover:text-white transition border-t border-brdr">
                <AiOutlinePlus className='text-grynine text-2xl group-hover:text-white' />
                View all Category
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between w-full">
            <div>
              <ul className="flex text-grynine text-sm font-medium gap-x-8">
                {menuItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-x-1 hover:text-white transition cursor-pointer"
                  >
                    {item.name}
                    {item.dropdown && <FaAngleDown />}
                  </li>
                ))}
              </ul>
            </div>
            <div className='flex items-center gap-x-2 text-white cursor-pointer'>
              <TbPhoneCall className='size-7' />
              <Link to='tel:+8801701054694' className='text-sm font-medium'>(+880) 1701054694</Link>
            </div>
          </div>
        </div>
      </Container>

      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => setSidebarOpen(false)}
      />

      <div
        className={`fixed top-0 left-0 h-full w-75 bg-white z-50 transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="p-5 border-b border-brdr flex justify-between items-center">
          <h3 className="font-semibold text-lg">Categories</h3>
          <button onClick={() => setSidebarOpen(false)}>
            <RxCross2 className='text-gry text-2xl cursor-pointer' />
          </button>
        </div>

        <div className="p-4 space-y-2 overflow-y-auto h-full">
          {categories.map((item, i) => (
            <div
              key={i}
              className="group defaultfs text-logoc flex items-center gap-x-3 px-5 rounded-md py-4 cursor-pointer hover:bg-primary hover:text-white transition"
            >
              <span>{item.icon}</span>
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Navbar;