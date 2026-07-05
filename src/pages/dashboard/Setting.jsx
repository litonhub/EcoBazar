import React from 'react';
import { FiChevronDown, FiEye } from 'react-icons/fi';
import Container from '../../components/layouts/Container';
import Sidebar from '../../components/common/DashboardSidebar';
import PageBanner from '../../components/common/PageBanner';

const Settings = () => {

  const labelClass = "block text-sm font-medium text-gray-700 mb-2";
  const inputClass = "w-full border border-gray-200 rounded-md px-4 py-2.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-primary transition-colors bg-white";

  return (
    <>
      <PageBanner
        items={[
          "Settings"
        ]}
      />

      <Container>
        <div className="flex flex-col md:flex-row gap-6 pt-8 pb-20 min-h-screen text-gray-800 font-pop">

          {/* Reusable Sidebar Component */}
          <Sidebar activeMenu="Settings" />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col gap-6 w-full">

            {/* Card 1: Account Settings */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Account Settings</h3>
              </div>
              <div className="p-6 md:p-8">
                <div className="flex flex-col-reverse md:flex-row gap-10">
                  {/* Form Fields */}
                  <div className="flex-1 space-y-5">
                    <div>
                      <label className={labelClass}>First name</label>
                      <input type="text" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Last Name</label>
                      <input type="text" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Email</label>
                      <input type="email" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Phone Number</label>
                      <input type="tel" className={inputClass} />
                    </div>
                    <div className="pt-2">
                      <button className="bg-primary hover:bg-opacity-90 text-white px-8 py-2.5 rounded-full font-medium transition-all">
                        Save Changes
                      </button>
                    </div>
                  </div>

                  {/* Profile Image Section */}
                  <div className="w-full md:w-64 flex flex-col items-center pt-2">
                    <div className="w-48 h-48 rounded-full overflow-hidden mb-6 border-4 border-white shadow-sm">
                      {/* Replace src with your actual image path */}
                      <img src="https://i.pravatar.cc/300?u=a042581f4e29026704d" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <button className="border-2 border-primary text-primary px-8 py-2 rounded-full font-medium hover:bg-primary hover:text-white transition-all">
                      Choose Image
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Billing Address */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Billing Address</h3>
              </div>
              <div className="p-6 md:p-8 space-y-5">

                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className={labelClass}>First name</label>
                    <input type="text" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Last name</label>
                    <input type="text" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Company Name <span className="text-gray-400 font-normal">(optional)</span></label>
                    <input type="text" className={inputClass} />
                  </div>
                </div>

                {/* Row 2 */}
                <div>
                  <label className={labelClass}>Street Address</label>
                  <input type="text" className={inputClass} />
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className={labelClass}>Country / Region</label>
                    <div className="relative">
                      <select className={`${inputClass} appearance-none cursor-pointer`}>
                        <option>Bangladesh</option>
                        <option>United Sates</option>
                        <option>France</option>
                      </select>
                      <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>States</label>
                    <div className="relative">
                      <select className={`${inputClass} appearance-none cursor-pointer`}>
                        <option>Dhaka</option>
                        <option>Rajshahi</option>
                      </select>
                      <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Zip Code</label>
                    <input type="text" className={inputClass} />
                  </div>
                </div>

                {/* Row 4 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Email</label>
                    <input type="email" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Phone</label>
                    <input type="tel" className={inputClass} />
                  </div>
                </div>

                <div className="pt-2">
                  <button className="bg-primary hover:bg-opacity-90 text-white px-8 py-2.5 rounded-full font-medium transition-all">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3: Change Password */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
              </div>
              <div className="p-6 md:p-8 space-y-5">

                <div>
                  <label className={labelClass}>Current Password</label>
                  <div className="relative">
                    <input type="password" placeholder="Password" className={inputClass} />
                    <FiEye className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>New Password</label>
                    <div className="relative">
                      <input type="password" placeholder="Password" className={inputClass} />
                      <FiEye className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Confirm Password</label>
                    <div className="relative">
                      <input type="password" placeholder="Password" className={inputClass} />
                      <FiEye className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button className="bg-primary hover:bg-opacity-90 text-white px-8 py-2.5 rounded-full font-medium transition-all">
                    Change Password
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </Container>
    </>
  );
};

export default Settings;