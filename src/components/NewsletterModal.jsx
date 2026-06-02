import React, { useRef, useState } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import { RxCross2 } from "react-icons/rx";
import Modalone from '../assets/images/modalone.png'

const NewsletterModal = ({ isOpen, onClose }) => {

    const [checked, setChecked] = useState(false)

    const modalRef = useRef();
    
    useOutsideClick(modalRef, () => {
        onClose();
    });

    if (!isOpen) return null;


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.8)]">

            <div
                ref={modalRef}
                className="relative bg-white rounded-lg shadow-xl max-w-218 flex items-center"
            >

                <div className="w-88.5 p-2.5">
                    <img
                        src={Modalone}
                        alt="modalimg"
                        className="w-full"
                    />
                </div>

                <div className="w-129.5 ps-7.5 pe-10 text-center">
                    <button
                        onClick={onClose}
                        className="absolute top-4.5 right-4.5 text-grynine hover:text-black cursor-pointer"
                    >
                        <RxCross2 className="text-[25px]" />
                    </button>
                    <h2 className="font-pop font-semibold text-[40px]">
                        Subscribe to Our Newsletter
                    </h2>

                    <p className="defaultfs text-grynine mt-3 mb-6">
                        Subscribe to our newlletter and Save your <span className="text-[#FF8A00]">20% money</span> with discount code today.
                    </p>
                    <div className='w-full relative'>
                            <input
                                type="text"
                                placeholder="Your email address"
                                className="w-full border border-brdr bg-white focus:border-primary font-pop text-base text-black font-normal leading-[150%] placeholder:text-gryd ps-6 pr-40.5 py-3.5 rounded-[46px] outline-none"
                            />
                            <button className="bg-primary text-white text-[16px] font-semibold font-pop leading-5 px-9.5 py-4 absolute right-0 rounded-[46px] top-px cursor-pointer">Subscribe</button>
                        </div>
                    <div className="mt-12.5 flex justify-center">
                        <label
                            onClick={() => setChecked(!checked)}
                            className='flex gap-x-1.5 items-center cursor-pointer'
                        >
                            <div className="w-5 h-5 rounded flex items-center justify-center border border-[#cccccc]">
                                {checked && (
                                    <svg className="w-3 h-3 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </div>
                            <h4 className='defaultfs text-gry'>
                                Do not show this window
                            </h4>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsletterModal;