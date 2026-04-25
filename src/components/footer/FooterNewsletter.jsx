import React from 'react'
import Container from '../layouts/Container'
import { FaFacebookF, FaTwitter, FaPinterestP, FaInstagram } from "react-icons/fa";

const FooterNewsletter = () => {

    const socialLinks = [
        { icon: FaFacebookF, link: "#" },
        { icon: FaTwitter, link: "#" },
        { icon: FaPinterestP, link: "#" },
        { icon: FaInstagram, link: "#" },
    ];
    return (
        <div className="bg-[#F7F7F7] py-10">
            <Container>
                <div className="flex justify-between items-center">
                    <div className='w-md'>
                        <h2 className='font-pop font-semibold text-2xl text-logoc leading-[150%]'>Subcribe our Newsletter</h2>
                        <p className='font-pop font-normal text-sm text-[#999999] leading-[150%]'>Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna.</p>
                    </div>
                    <div className="flex items-center gap-x-10">
                        <div className='w-134 relative'>
                            <input
                                type="text"
                                placeholder="Your email address"
                                className="w-full border border-brdrtwo font-pop text-[16px] text-[#808080] ps-6 py-3.5 rounded-[46px] outline-none"
                            />
                            <button className="bg-primary text-white text-[16px] font-semibold font-pop leading-5 px-10 py-4 absolute right-0 rounded-[46px] top-px cursor-pointer">Subscribe</button>
                        </div>
                        <div className="flex gap-x-2">
                            {socialLinks.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <a
                                        key={index}
                                        href={item.link}
                                        className="w-10 h-10 flex items-center justify-center rounded-full text-[#4D4D4D] transition-all duration-300 hover:bg-primary hover:text-white"
                                    >
                                        <Icon size={18} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default FooterNewsletter
