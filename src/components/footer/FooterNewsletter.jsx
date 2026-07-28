import React from 'react'
import Container from '../layouts/Container'
import { FaFacebookF, FaTwitter, FaPinterestP, FaInstagram } from "react-icons/fa";
import { useTranslation } from "react-i18next"; 

const FooterNewsletter = () => {
    const { t } = useTranslation(); 

    const socialLinks = [
        { icon: FaFacebookF, link: "#" },
        { icon: FaTwitter, link: "#" },
        { icon: FaPinterestP, link: "#" },
        { icon: FaInstagram, link: "#" },
    ];

    return (
        <div className="bg-[#F7F7F7] py-8 lg:py-10 border-b border-gray-200 lg:border-none">
            <Container>
                {/* Desktop: flex-row justify-between. Mobile: flex-col, center-aligned, gap-6 */}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-0">
                    
                    <div className='w-full lg:w-md text-center lg:text-left'>
                        <h2 className='font-pop font-semibold text-[20px] lg:text-2xl text-logoc leading-[150%]'>{t('footer_newsletter.title', 'Subscribe our Newsletter')}</h2>
                        <p className='font-pop font-normal text-[13px] lg:text-sm text-grynine leading-[150%] mt-1 lg:mt-0'>{t('footer_newsletter.description', 'Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna.')}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-4 lg:gap-x-10 w-full lg:w-auto">
                        <div className='w-full sm:w-80 lg:w-134 relative'>
                            <input
                                type="text"
                                placeholder={t('footer_newsletter.email_placeholder', 'Your email address')}
                                className="w-full border border-brdr bg-white focus:border-primary font-pop text-[14px] lg:text-base text-black font-normal leading-[150%] placeholder:text-gryd ps-5 lg:ps-6 pr-32 lg:pr-40.5 py-3 lg:py-3.5 rounded-full lg:rounded-[46px] outline-none"
                            />
                            {/* Button perfectly centered vertically on mobile, untouched on desktop */}
                            <button className="bg-primary text-white text-[13px] lg:text-[16px] font-semibold font-pop leading-5 px-6 lg:px-10 py-0 lg:py-4 h-full lg:h-auto absolute right-0 top-0 lg:top-px rounded-full lg:rounded-[46px] cursor-pointer hover:bg-opacity-90 transition-colors">{t('footer_newsletter.subscribe_btn', 'Subscribe')}</button>
                        </div>

                        <div className="flex gap-x-3 lg:gap-x-2 mt-2 sm:mt-0">
                            {socialLinks.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <a
                                        key={index}
                                        href={item.link}
                                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white lg:bg-transparent shadow-sm lg:shadow-none text-[#4D4D4D] transition-all duration-300 hover:bg-primary hover:text-white"
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

export default FooterNewsletter;