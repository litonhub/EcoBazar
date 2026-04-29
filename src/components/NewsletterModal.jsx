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

                <div className="w-1/2 p-2.5">
                    <img
                        src={Modalone}
                        alt="modalimg"
                        className="w-full"
                    />
                </div>

                <div className="w-1/2 py-12.5 px-10 text-center">
                    <button
                        onClick={onClose}
                        className="absolute top-2.5 right-2.5 text-grynine hover:text-black cursor-pointer"
                    >
                        <RxCross2 className="size-6" />
                    </button>
                    <h2 className="font-pop font-semibold text-[40px]">
                        Subscribe to Our Newsletter
                    </h2>

                    <p className="defaultfs text-grynine mt-3 mb-6">
                        Subscribe to our newlletter and Save your <span className="text-[#FF8A00]">20% money</span> with discount code today.
                    </p>
                    <div className="flex border border-brdr rounded-[46px] overflow-hidden defaultfs">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-6 py-3.5 outline-none"
                        />
                        <button className="bg-primary text-white px-5 cursor-pointer">
                            Subscribe
                        </button>
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