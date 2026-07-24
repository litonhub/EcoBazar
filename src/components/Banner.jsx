import React from 'react'
import Container from './layouts/Container'
import BannerBig from '../assets/images/BannerBig.webp'
import BannerRSone from '../assets/images/BannerRSone.webp'
import BannerRStwo from '../assets/images/BannerRStwo.webp'
import BannerBigTwo from '../assets/images/BannerBigTwo.webp'
import BannerBigThree from '../assets/images/BannerBigThree.webp'
import { FaArrowRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import 'swiper/css/pagination';
import "swiper/css/effect-fade";
import Beans from '../assets/svg/Beans'
import Radish from '../assets/svg/Radish'
import Onion from '../assets/svg/Onion'
import Chili from '../assets/svg/Chili'
import Mashroom from '../assets/svg/Mashroom'
import BannerThreeBg from '../assets/svg/BannerThreeBg'
import BannerThreeBgg from '../assets/svg/BannerThreeBgg'
import BannerThreeBggg from '../assets/svg/BannerThreeBggg'
import BannerBigBgggg from '../assets/svg/BannerBigBgggg'
import { useTranslation } from "react-i18next"; // <-- Language Import

const Banner = () => {
    const { t } = useTranslation(); // <-- Translation Hook

    return (
        <Container>
            <div className="flex justify-between py-6">
                <Swiper
                    modules={[EffectFade, Autoplay]}
                    effect="fade"
                    fadeEffect={{ crossFade: true }}
                    speed={1200}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    loop={true}
                    className="w-218 h-150 ml-0! overflow-hidden rounded-[10px]"
                >
                    <SwiperSlide>
                        <div className='w-218 relative'>
                            <img src={BannerBig} alt="Banner img" className='rounded-[10px]' />
                            <div className="bg-[linear-gradient(77deg,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0)_100%)] w-full h-full absolute top-0 left-0 rounded-[10px]">
                                <div className="max-w-146 absolute top-1/2 -translate-y-1/2 left-15">
                                    <h1 className='font-pop font-semibold text-5xl text-white leading-[120%]'>{t('banner.slider1_title', 'Fresh & Healthy Organic Food')}</h1>
                                    <div className='py-7 pl-3.5 relative after:w-0.5 after:h-16.25 after:bg-[#84D187] after:content-[] after:absolute after:top-8  after:left-0'>
                                        <div className="flex gap-x-2 items-center">
                                            <h3 className='font-pop font-medium text-[20px] text-white leading-[150%]'>{t('banner.sale_up_to', 'Sale up to ')}</h3>
                                            <span className='bg-[#FF8A00] py-1 px-3 font-pop font-semibold text-[20px] text-white leading-[150%] rounded-[5px]'>{t('banner.off_30', '30% OFF')}</span>
                                        </div>
                                        <p className='defaultfs text-white/80 pt-2'>{t('banner.free_shipping', 'Free shipping on all your order.')}</p>
                                    </div>
                                    <div className="inline-flex items-center gap-x-4 bg-white py-4 px-10 rounded-[53px] cursor-pointer">
                                        <button className='font-pop font-semibold text-base text-primary leading-[120%] cursor-pointer'>{t('banner.shop_now', 'Shop now')}</button>
                                        <FaArrowRight className='text-base text-primary' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className='bg-[#DAE5DA] w-218 h-150 rounded-[10px] relative'>
                            <div className="absolute top-1/2 -translate-y-1/2 left-15 flex items-center">
                                <div>
                                    <h1 className='font-pop font-semibold text-hsize text-logoc leading-[120%]'>{t('banner.slider2_title', 'Fresh & Healthy Organic Vegetable')}</h1>
                                    <div className='py-7 pl-3.5 relative after:w-0.5 after:h-16.25 after:bg-[#84D187] after:content-[] after:absolute after:top-8  after:left-0'>
                                        <div className="flex gap-x-2 items-center">
                                            <h3 className='font-pop font-medium text-[20px] text-logoc leading-[150%]'>{t('banner.sale_up_to', 'Sale up to ')}</h3>
                                            <span className='bg-[#FF8A00] py-1 px-3 font-pop font-semibold text-[20px] text-white leading-[150%] rounded-[5px]'>{t('banner.off_50', '50% OFF')}</span>
                                        </div>
                                        <p className='defaultfs text-gry pt-2'>{t('banner.free_shipping', 'Free shipping on all your order.')}</p>
                                    </div>
                                    <div className="inline-flex items-center gap-x-4 bg-primary py-4 px-10 rounded-[53px] cursor-pointer">
                                        <button className='font-pop font-semibold text-base text-white leading-[120%] cursor-pointer'>{t('banner.shop_now', 'Shop now')}</button>
                                        <FaArrowRight className='text-base text-white' />
                                    </div>
                                </div>
                                <img src={BannerBigTwo} alt="Banner img" className='w-[60%]' />
                            </div>
                            <div className='absolute bottom-0 left-1'>
                                <Beans className='opacity-50' />
                            </div>
                            <div className='absolute -bottom-4 right-0'>
                                <Radish className='opacity-50' />
                            </div>
                            <div className='absolute top-22 right-90'>
                                <Onion className='opacity-50' />
                            </div>
                            <div className='absolute top-0 left-2'>
                                <Chili className='opacity-50' />
                            </div>
                            <div className='absolute top-0 right-0'>
                                <Mashroom className='opacity-50' />
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className='bg-[#FFF4E6] w-218 h-150 rounded-[10px] relative'>
                            <div className="flex flex-col justify-center text-center">
                                <div className='pt-10 max-w-120 mx-auto'>
                                    <h1 className='font-pop font-semibold text-[40px] text-primary leading-[120%]'>{t('banner.slider3_title', 'Fresh & Healthy Organic Fruits')}</h1>
                                    <p className='defaultfs text-gry pt-2 pb-5'>{t('banner.free_shipping', 'Free shipping on all your order.')}</p>
                                </div>
                                <div className='relative'>
                                    <img src={BannerBigThree} alt="Banner img" className='w-[50%] mx-auto' />
                                    <div className='bg-[#FF8A00] w-15 h-15 rounded-full absolute top-5 right-75 flex items-center justify-center'>
                                        <div className="flex flex-col">
                                            <span className='font-pop font-semibold text-[20px] text-white leading-[100%]'>{t('banner.slider3_number', '30%')}</span>
                                            <span className='font-pop font-normal text-sm text-white leading-[100%]'>{t('banner.off', 'OFF')}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-fit mx-auto items-center gap-x-4 bg-primary py-4 px-10 rounded-[53px] cursor-pointer">
                                    <button className='font-pop font-semibold text-base text-white leading-[120%] cursor-pointer'>{t('banner.shop_now', 'Shop now')}</button>
                                    <FaArrowRight className='text-base text-white' />
                                </div>
                            </div>
                            <div className='absolute top-0 -right-16'>
                                <BannerThreeBg className='opacity-50' />
                            </div>
                            <div className='absolute top-0 -left-22'>
                                <BannerThreeBgg className='opacity-50' />
                            </div>
                            <div className='absolute bottom-0 -right-21'>
                                <BannerThreeBggg className='opacity-50' />
                            </div>
                            <div className='absolute bottom-0 -left-32'>
                                <BannerBigBgggg className='opacity-50' />
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>

                <div className='w-105.75'>
                    <div className="space-y-6">
                        <Swiper
                            direction="vertical"
                            slidesPerView={1}
                            spaceBetween={0}
                            loop={true}
                            autoplay={{
                                delay: 3500,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true,
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            modules={[Pagination, Autoplay]}
                            className="h-72 overflow-hidden rounded-[10px] slider"
                        >

                            <SwiperSlide>
                                <div className='relative'>
                                    <img src={BannerRSone} alt="Banner img" className='rounded-[10px]' />
                                    <div className='absolute top-8 left-8'>
                                        <h3 className='font-pop font-medium text-sm text-logoc tracking-[3px]'>{t('banner.rs1_subtitle', 'SUMMER SALE')}</h3>
                                        <h2 className='font-pop font-semibold text-[28px] text-logoc pt-2 pb-3'>{t('banner.rs1_title', '75% OFF')}</h2>
                                        <p className='font-pop text-sm text-gry'>{t('banner.rs1_desc', 'Only Fruit & Vegetable')}</p>
                                        <div className="flex items-center gap-x-3 pt-6 cursor-pointer">
                                            <button className='font-pop font-semibold text-base text-primary'>{t('banner.shop_now', 'Shop now')}</button>
                                            <FaArrowRight className='text-base text-primary' />
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>

                            <SwiperSlide>
                                <div className='relative'>
                                    <img src={BannerRStwo} alt="Banner img" className='rounded-[10px]' />
                                    <div className="bg-[rgba(0,38,3,0.8)] absolute top-0 right-0 w-full h-full rounded-[10px] flex items-center justify-center text-center">
                                        <div className="max-w-85 ">
                                            <h3 className='font-pop font-medium text-sm text-white leading-[100%] tracking-[3px]'>{t('banner.rs2_subtitle', 'BEST DEAL')}</h3>
                                            <h2 className='font-pop font-semibold text-hsize text-white leading-[120%] pt-3 pb-8'>{t('banner.rs2_title', 'Special Products Deal of the Month')}</h2>
                                            <div className="flex items-center gap-x-3 cursor-pointer justify-center">
                                                <button className='font-pop font-semibold text-base text-primary leading-[120%] cursor-pointer'>{t('banner.shop_now', 'Shop now')}</button>
                                                <FaArrowRight className='text-base text-primary' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>

                        <Swiper
                            direction="vertical"
                            slidesPerView={1}
                            spaceBetween={0}
                            loop={true}
                            autoplay={{
                                delay: 3500,
                                reverseDirection: true,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true,
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            modules={[Pagination, Autoplay]}
                            className="h-72 overflow-hidden rounded-[10px] slidertwo"
                        >

                            <SwiperSlide>
                                <div className='relative'>
                                    <img src={BannerRStwo} alt="Banner img" className='rounded-[10px]' />
                                    <div className="bg-[rgba(0,38,3,0.8)] absolute top-0 right-0 w-full h-full rounded-[10px] flex items-center justify-center text-center">
                                        <div className="max-w-85 ">
                                            <h3 className='font-pop font-medium text-sm text-white leading-[100%] tracking-[3px]'>{t('banner.rs2_subtitle', 'BEST DEAL')}</h3>
                                            <h2 className='font-pop font-semibold text-hsize text-white leading-[120%] pt-3 pb-8'>{t('banner.rs2_title', 'Special Products Deal of the Month')}</h2>
                                            <div className="flex items-center gap-x-3 cursor-pointer justify-center">
                                                <button className='font-pop font-semibold text-base text-primary leading-[120%] cursor-pointer'>{t('banner.shop_now', 'Shop now')}</button>
                                                <FaArrowRight className='text-base text-primary' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>

                            <SwiperSlide>
                                <div className='relative'>
                                    <img src={BannerRSone} alt="Banner img" className='rounded-[10px]' />
                                    <div className='absolute top-8 left-8'>
                                        <h3 className='font-pop font-medium text-sm text-logoc tracking-[3px]'>{t('banner.rs1_subtitle', 'SUMMER SALE')}</h3>
                                        <h2 className='font-pop font-semibold text-[28px] text-logoc pt-2 pb-3'>{t('banner.rs1_title', '75% OFF')}</h2>
                                        <p className='font-pop text-sm text-gry'>{t('banner.rs1_desc', 'Only Fruit & Vegetable')}</p>
                                        <div className="flex items-center gap-x-3 pt-6 cursor-pointer">
                                            <button className='font-pop font-semibold text-base text-primary'>{t('banner.shop_now', 'Shop now')}</button>
                                            <FaArrowRight className='text-base text-primary' />
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Banner;