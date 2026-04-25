import React from 'react'
import { FaApple, FaGooglePlay, FaApplePay, FaCcVisa, FaCcDiscover } from "react-icons/fa";
import { SiMastercard } from "react-icons/si";
import Container from '../layouts/Container';
import footerlogo from '../../assets/images/footerlogo.png'

const MainFooter = () => {

  const columns = [
    {
      title: "My Account",
      links: ["My Account", "Order History", "Shopping Cart", "Wishlist"],
    },
    {
      title: "Helps",
      links: ["Contact", "Faqs", "Terms & Condition", "Privacy Policy"],
    },
    {
      title: "Proxy",
      links: ["About", "Shop", "Product", "Track Order"],
    },
  ];
  return (
    <div className="bg-logoc">
      <Container>
        <footer>
          <div className="py-15 flex justify-between">
            <div className="max-w-86">
              <img src={footerlogo} alt="footerlogo" />
              <p className='font-pop font-normal text-sm text-gryd leading-[150%] py-4'>
                Morbi cursus porttitor enim lobortis molestie. Duis gravida turpis dui,
                eget bibendum magna congue nec.
              </p>
              <div className="flex gap-x-4">
                <div className="flex items-center gap-x-3 font-pop leading-[150%] relative">
                  <span className="text-white font-medium font-sm">(219) 555-0114</span>
                  <span className="absolute left-0 -bottom-1 w-[34%] h-0.5 bg-primary"></span>
                  <span className='text-[16px] font-normal text-gryd'>or</span>
                  <span className="text-white font-medium font-sm underline">liton01766@gmail.com</span>
                  <span className="absolute right-0 -bottom-1 w-[53%] h-0.5 bg-primary"></span>
                </div>
              </div>
            </div>
            <div className="flex gap-x-19.5">
              {columns.map((col, i) => (
                <div key={i}>
                  <h4 className="font-pop text-white text-16px leading-[150%] mb-5 font-medium relative inline-block">
                    {col.title}
                    <span className="absolute left-0 -bottom-1 w-6 h-0.5 bg-primary"></span>
                  </h4>

                  <ul className="space-y-3">
                    {col.links.map((link, idx) => (
                      <li key={idx} className="defaultfs text-[#999999] hover:text-white cursor-pointer">
                        {link}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div>
              <h4 className="text-white font-pop text-[20px] leading-[150%] mb-7.5 font-medium relative inline-block">
                Download our Mobile App
                <span className="absolute left-0 -bottom-1 w-6 h-0.5 bg-primary"></span>
              </h4>

              <div className="flex gap-x-2">
                <div className="flex items-center gap-1.5 bg-subb p-2.5 rounded-sm cursor-pointer hover:bg-gray-700 transition">
                  <FaApple className="size-7 text-white" />
                  <div className="text-pop">
                    <p className='font-normal text-xs text-[#B3B3B3] leading-[130%]'>Download on the</p>
                    <p className="text-white text-[16px] font-medium leading-[150%]">App Store</p>
                  </div>
                </div>

                <div className="flex items-center gap-x-1.5 bg-subb p-2.5 rounded-sm cursor-pointer hover:bg-gray-700 transition">
                  <FaGooglePlay className="size-6 text-white" />
                  <div className="text-pop">
                    <p className='font-normal text-xs text-[#B3B3B3] leading-[130%]'>Download on the</p>
                    <p className="text-white text-[16px] font-medium leading-[150%]">Google Play</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-subb py-6 flex items-center justify-between">
            <p className="defaultfs text-gryd">
              Ecobazar eCommerce © 2026. All Rights Reserved
            </p>
            <div className="flex items-center gap-x-3 text-white text-xl mt-3">
              <FaApplePay />
              <FaCcVisa />
              <FaCcDiscover />
              <SiMastercard />
              <span className="text-xs border px-2 py-1 rounded border-gray-600 text-white">
                Secure Payment
              </span>
            </div>
          </div>
        </footer>
      </Container>
    </div>
  )
}

export default MainFooter
