import React from 'react';
import { NavLink } from 'react-router';
import { 
  FiGrid, 
  FiRefreshCcw, 
  FiHeart, 
  FiShoppingBag, 
  FiSettings, 
  FiLogOut 
} from 'react-icons/fi';
import { useTranslation } from "react-i18next"; // <-- Language Import

const DashboardSidebar = ({ activeMenu, handleLogout }) => {
  const { t } = useTranslation(); // <-- Translation Hook

  const menuItems = [
    { name: 'Dashboard', label: t('sidebar.dashboard', 'Dashboard'), icon: FiGrid, path: '/dashboard' },
    { name: 'Order History', label: t('sidebar.order_history', 'Order History'), icon: FiRefreshCcw, path: '/order-history' },
    { name: 'Wishlist', label: t('sidebar.wishlist', 'Wishlist'), icon: FiHeart, path: '/wishlist' },
    { name: 'Shopping Cart', label: t('sidebar.cart', 'Shopping Cart'), icon: FiShoppingBag, path: '/cart' },
    { name: 'Settings', label: t('sidebar.settings', 'Settings'), icon: FiSettings, path: '/settings' },
  ];

  return (
    <aside className="w-full md:w-64 bg-white border border-gray-200 rounded-lg shadow-sm h-fit shrink-0">
      <h2 className="text-lg font-semibold px-6 py-5">{t('sidebar.navigation', 'Navigation')}</h2>
      <nav className="flex flex-col pb-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMenu === item.name;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={`group flex items-center px-6 py-3 font-medium transition-all ${
                isActive
                  ? 'bg-gray-100 text-gray-900 border-l-4 border-primary' // Active Style
                  : 'text-gray-600 border-l-4 border-transparent hover:bg-gray-100 hover:text-gray-900 hover:border-primary' // Default & Hover Style
              }`}
            >
              <Icon
                className={`w-5 h-5 mr-3 transition-colors ${
                  isActive ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-700'
                }`}
              />
              {item.label}
            </NavLink>
          );
        })}
        
        {/* Log-out button is converted to a button tag with onClick */}
        <button
          onClick={handleLogout}
          className="w-full group flex items-center px-6 py-3 mt-2 text-gray-600 border-l-4 border-transparent hover:bg-gray-100 hover:text-gray-900 hover:border-primary transition-all font-medium cursor-pointer"
        >
          <FiLogOut className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-700 transition-colors" />
          {t('sidebar.logout', 'Log-out')}
        </button>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;