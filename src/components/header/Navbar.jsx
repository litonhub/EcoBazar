import React, { useEffect, useState } from 'react'
import Container from '../layouts/Container'
import { FaAngleDown, FaBars, FaChevronDown } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { TbPhoneCall } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { Link, useLocation } from 'react-router'; // useLocation added
import Apple from '../../assets/svg/Apple';
import Vegetables from '../../assets/svg/Vegetables';
import Fish from '../../assets/svg/Fish';
import Chicken from '../../assets/svg/Chicken';
import Drink from '../../assets/svg/Drink';
import Icecream from '../../assets/svg/Icecream';
import Cake from '../../assets/svg/Cake';
import Cream from '../../assets/svg/Cream';
import Cooking from '../../assets/svg/Cooking';
import Dropdown from "../common/Dropdown";
import DropdownHover from '../common/DropdownHover';
import { HiOutlineTrendingUp } from "react-icons/hi";
import { FaFire, FaBolt, FaGift, FaTags, FaCalendarAlt, FaPercent } from "react-icons/fa";
import { FaLeaf, FaClock, FaSun, FaArrowTrendUp, FaRegSnowflake } from "react-icons/fa6";
import { LuArrowUpNarrowWide } from "react-icons/lu";
import { HiSquares2X2, HiOutlineShoppingBag } from "react-icons/hi2";
import { BsCalendarWeek } from "react-icons/bs";
import { FaCrown, FaTrophy, FaCartShopping, FaHeart, FaStar } from "react-icons/fa6";
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { getCart } from "../../services/cartService";

const Navbar = () => {
  const { t } = useTranslation();
  const location = useLocation(); // Hook to track route changes

  const [active, setActive] = useState("Vegetables");
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Cart query for Bottom Navigation App Bar on Mobile
  const { data: cartData } = useQuery({ queryKey: ["cart"], queryFn: getCart });
  const totalItems = cartData?.totalItems || 0;

  // Prevent scrolling when sidebar is open
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

  // Close Category Sidebar automatically on Route Change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Listen to Cart events to cross-close Category sidebar
  useEffect(() => {
    const closeCategory = () => setSidebarOpen(false);
    window.addEventListener("open-cart-sidebar", closeCategory);
    window.addEventListener("toggle-cart-sidebar", closeCategory);
    return () => {
      window.removeEventListener("open-cart-sidebar", closeCategory);
      window.removeEventListener("toggle-cart-sidebar", closeCategory);
    }
  }, []);

  // Dispatch event to close Cart
  const closeCart = () => {
    window.dispatchEvent(new Event("close-cart-sidebar"));
  };

  // Dispatch event to toggle Cart
  const toggleCart = () => {
    window.dispatchEvent(new Event("toggle-cart-sidebar"));
  };

  const menuItems = [
    {
      name: t('navbar.menu.deals.title'),
      badge: "HOT",
      badgeColor: "bg-[#FF8A00]",
      dropdown: true,
      options: [
        { label: t('navbar.menu.deals.today'), icon: <FaTags /> },
        { label: t('navbar.menu.deals.flash'), icon: <FaBolt /> },
        { label: t('navbar.menu.deals.bundle'), icon: <FaGift /> },
        { label: t('navbar.menu.deals.buy1get1'), icon: <FaFire /> },
        { label: t('navbar.menu.deals.weekend'), icon: <FaCalendarAlt /> },
        { label: t('navbar.menu.deals.clearance'), icon: <FaPercent /> },
      ],
    },
    {
      name: t('navbar.menu.new_arrivals.title'),
      badge: "NEW",
      badgeColor: "bg-[#00b207]",
      dropdown: true,
      options: [
        { label: t('navbar.menu.new_arrivals.recently'), icon: <FaRegSnowflake /> },
        { label: t('navbar.menu.new_arrivals.fresh'), icon: <BsCalendarWeek /> },
        { label: t('navbar.menu.new_arrivals.seasonal'), icon: <FaSun /> },
        { label: t('navbar.menu.new_arrivals.trending'), icon: <LuArrowUpNarrowWide /> },
        { label: t('navbar.menu.new_arrivals.organic'), icon: <FaLeaf /> },
        { label: t('navbar.menu.new_arrivals.latest'), icon: <HiSquares2X2 /> },
      ],
    },
    {
      icon: <HiOutlineTrendingUp />,
      name: t('navbar.menu.best_sellers.title'),
      dropdown: true,
      options: [
        { label: t('navbar.menu.best_sellers.top_today'), icon: <FaFire /> },
        { label: t('navbar.menu.best_sellers.weekly'), icon: <FaTrophy /> },
        { label: t('navbar.menu.best_sellers.monthly'), icon: <FaCrown /> },
        { label: t('navbar.menu.best_sellers.most_ordered'), icon: <FaCartShopping /> },
        { label: t('navbar.menu.best_sellers.customer'), icon: <FaHeart /> },
        { label: t('navbar.menu.best_sellers.top_rated'), icon: <FaStar /> },
      ],
    },
    {
      name: t('navbar.menu.about'),
      path: "/about",
      dropdown: false,
    },
    {
      name: t('navbar.menu.contact'),
      path: "/contact",
      dropdown: false,
    },
  ];

  const categories = [
    { name: t('navbar.categories_list.fresh_fruit'), icon: <Apple className='text-grynine group-hover:text-white' /> },
    { name: t('navbar.categories_list.vegetables'), icon: <Vegetables className='text-grynine group-hover:text-white' /> },
    { name: t('navbar.categories_list.river_fish'), icon: <Fish className='text-grynine group-hover:text-white' /> },
    { name: t('navbar.categories_list.chicken_meat'), icon: <Chicken className='text-grynine group-hover:text-white' /> },
    { name: t('navbar.categories_list.drink_water'), icon: <Drink className='text-grynine group-hover:text-white' /> },
    { name: t('navbar.categories_list.yogurt_icecream'), icon: <Icecream className='text-grynine group-hover:text-white' /> },
    { name: t('navbar.categories_list.cake_bread'), icon: <Cake className='text-grynine group-hover:text-white' /> },
    { name: t('navbar.categories_list.butter_cream'), icon: <Cream className='text-grynine group-hover:text-white' /> },
    { name: t('navbar.categories_list.cooking'), icon: <Cooking className='text-grynine group-hover:text-white' /> },
  ];

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <div className='bg-logoc hidden lg:block'>
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
                      {t('navbar.all_categories')}
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
                  {t('navbar.view_all_category')}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between w-full">
              <div>
                <ul className="flex text-grynine text-sm font-medium gap-x-7">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      {item.dropdown ? (
                        <DropdownHover
                          options={item.options}
                          onChange={(selected) =>
                            console.log(`${item.name}: ${selected}`)
                          }
                          renderTrigger={(open) => (
                            <div
                              className={`flex items-center gap-x-1 cursor-pointer transition-colors duration-300 ${open ? "text-white" : "text-grynine"
                                } hover:text-white`}
                            >
                              {item.icon && (
                                <span className="text-xl text-primary">
                                  {item.icon}
                                </span>
                              )}
                              {item.name}
                              {item.badge && (
                                <span
                                  className={`px-1.5 py-0.5 text-[10px] font-bold text-white rounded ${item.badgeColor}`}
                                >
                                  {item.badge}
                                </span>
                              )}
                              <FaAngleDown
                                className={`transition duration-300 ${open ? "rotate-180" : ""
                                  }`}
                              />
                            </div>
                          )}
                        />
                      ) : (
                        <Link
                          to={item.path}
                          className="flex items-center gap-x-1 hover:text-white transition"
                        >
                          {item.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center gap-x-5">
                <div>
                  <Link to='/track-order' className='font-pop font-medium text-sm text-grynine border border-gry hover:border-primary hover:text-white rounded-sm px-4 py-2'>{t('navbar.track_order')}</Link>
                </div>
                <div className='flex items-center gap-x-2 text-white cursor-pointer'>
                  <TbPhoneCall className='size-7' />
                  <Link to='tel:+8801701054694' className='text-sm font-medium'>
                    {t('navbar.menu.phone_number')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* MOBILE BOTTOM APP BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white shadow-[0_-4px_15px_rgba(0,0,0,0.08)] z-[80] flex justify-between items-center px-6 py-2.5 border-t border-gray-100 font-pop pb-safe">

        {/* Force close Cart & Menu on Link click */}
        <Link to="/" onClick={closeCart} className="flex flex-col items-center gap-1 text-gray-500 hover:text-primary transition-colors">
          <AiOutlineHome size={22} />
          <span className="text-[10px] font-medium tracking-wide uppercase">Home</span>
        </Link>

        {/* Close Cart if open before opening Category Sidebar */}
        <button onClick={() => { closeCart(); setSidebarOpen(true); }} className="flex flex-col items-center gap-1 text-gray-500 hover:text-primary transition-colors">
          <HiSquares2X2 size={22} />
          <span className="text-[10px] font-medium tracking-wide uppercase">Category</span>
        </button>

        {/* Toggle Cart Sidebar smoothly */}
        <button onClick={toggleCart} className="flex flex-col items-center gap-1 text-gray-500 hover:text-primary transition-colors relative">
          <div className="relative">
            <HiOutlineShoppingBag size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-2 flex items-center justify-center min-w-4 lg:min-w-5 h-4 lg:min-h-5 bg-[#2C742F] text-white text-[9px] lg:text-[11px] font-semibold font-pop rounded-full border-[1.5px] lg:border-2 border-white px-1 shadow-sm">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium tracking-wide uppercase">Cart</span>
        </button>

        {/* Force close Cart & Menu on Link click */}
        <Link to="/dashboard" onClick={closeCart} className="flex flex-col items-center gap-1 text-gray-500 hover:text-primary transition-colors">
          <AiOutlineUser size={22} />
          <span className="text-[10px] font-medium tracking-wide uppercase">Account</span>
        </Link>
      </div>

      {/* Categories Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-[90] transition-opacity duration-300 ${sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Categories Sidebar Content */}
      <div
        className={`fixed top-0 left-0 h-full w-[85%] max-w-[320px] lg:max-w-none lg:w-75 bg-white z-[100] transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-5 border-b border-brdr flex justify-between items-center">
          <h3 className="font-semibold text-lg">{t('navbar.categories_sidebar')}</h3>
          <button onClick={() => setSidebarOpen(false)}>
            <RxCross2 className='text-gry text-2xl cursor-pointer' />
          </button>
        </div>

        <div className="p-4 space-y-2 overflow-y-auto h-full pb-24 lg:pb-0">
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
    </>
  )
}

export default Navbar;