import React, { useRef, useState } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import { RxCross2 } from "react-icons/rx";
import Modalone from '../assets/images/modalone.png'
import { useTranslation } from "react-i18next"; 

const NewsletterModal = ({ isOpen, onClose }) => {
    const { t } = useTranslation(); 

    const [checked, setChecked] = useState(false)

    const modalRef = useRef();

    useOutsideClick(modalRef, () => {
        onClose();
    });

    if (!isOpen) return null;


    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[rgba(0,0,0,0.8)] px-4 lg:px-0 backdrop-blur-sm">

            <div
                ref={modalRef}
                className="relative bg-white rounded-lg lg:rounded-xl shadow-xl w-full max-w-[340px] sm:max-w-md lg:max-w-218 flex flex-col lg:flex-row items-center overflow-hidden"
            >
                {/* Image Section - Hidden on mobile, visible on desktop */}
                <div className="hidden lg:block w-88.5 p-2.5">
                    <img
                        src={Modalone}
                        alt="modalimg"
                        className="w-full object-cover rounded-lg"
                    />
                </div>

                <div className="w-full lg:w-129.5 px-5 py-8 sm:px-8 lg:ps-7.5 lg:pe-10 text-center relative">
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 lg:top-4.5 lg:right-4.5 w-8 h-8 lg:w-auto lg:h-auto rounded-full bg-gray-100 lg:bg-transparent flex items-center justify-center text-grynine hover:text-black cursor-pointer transition-colors"
                    >
                        <RxCross2 className="text-[20px] lg:text-[25px]" />
                    </button>
                    
                    <h2 className="font-pop font-semibold text-[22px] sm:text-[28px] lg:text-[40px] leading-[120%] mt-2 lg:mt-0">
                        {t('newsletter_modal.title', 'Subscribe to Our Newsletter')}
                    </h2>

                    <p className="text-[13px] sm:text-[14px] lg:defaultfs text-grynine mt-3 mb-5 lg:mb-6 leading-[140%] lg:leading-[150%] px-2 lg:px-0">
                        {t('newsletter_modal.desc_part1', 'Subscribe to our newsletter and Save your')} <span className="text-[#FF8A00]">{t('newsletter_modal.desc_part2', '20% money')}</span> {t('newsletter_modal.desc_part3', 'with discount code today.')}
                    </p>
                    
                    {/* Input Field - Stacked on mobile, Inline on desktop */}
                    <div className='w-full relative flex flex-col lg:block gap-3 lg:gap-0'>
                        <input
                            type="text"
                            placeholder={t('newsletter_modal.placeholder', "Your email address")}
                            className="w-full border border-brdr bg-white focus:border-primary font-pop text-[14px] lg:text-base text-black font-normal leading-[150%] placeholder:text-gryd ps-5 lg:ps-6 pr-5 lg:pr-40.5 py-3 lg:py-3.5 rounded-[46px] outline-none"
                        />
                        <button className="w-full lg:w-auto bg-primary text-white text-[15px] lg:text-[16px] font-semibold font-pop leading-5 px-6 lg:px-9.5 py-3.5 lg:py-4 lg:absolute lg:right-0 lg:top-px rounded-[46px] cursor-pointer hover:bg-green-700 transition-colors">
                            {t('newsletter_modal.subscribe', 'Subscribe')}
                        </button>
                    </div>
                    
                    <div className="mt-6 lg:mt-12.5 flex justify-center">
                        <label
                            onClick={() => setChecked(!checked)}
                            className='flex gap-x-2 lg:gap-x-1.5 items-center cursor-pointer select-none'
                        >
                            <div className="w-4 h-4 lg:w-5 lg:h-5 rounded flex items-center justify-center border border-[#cccccc] shrink-0">
                                {checked && (
                                    <svg className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </div>
                            <h4 className='text-[12px] lg:defaultfs text-gry'>
                                {t('newsletter_modal.dont_show', 'Do not show this window')}
                            </h4>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsletterModal;