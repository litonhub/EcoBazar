import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "../css/BrandSlider.css";
import Container from "./layouts/Container";

import Steps from "../assets/svg/steps.svg?react";
import Mango from "../assets/svg/mango.svg?react";
import Food from "../assets/svg/fooduk.svg?react";
import Bookoff from "../assets/svg/bookoff.svg?react";
import GSeries from "../assets/svg/gseries.svg?react";
import GoodFood from "../assets/svg/foods.svg?react";

const brands = [
  Steps,
  Mango,
  GoodFood,
  Food,
  Bookoff,
  GSeries,
];

const BrandSlider = () => {
  return (
    <section className="py-15">
      <Container>
        <Swiper
          className="marquee-swiper"
          modules={[Autoplay]}
          loop={true}
          speed={4000}
          allowTouchMove={false}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 25,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 40,
            },
          }}
        >

          {[...brands, ...brands, ...brands].map((Logo, index) => (
            <SwiperSlide key={index}>
              <div className="brand-item group flex h-15 items-center justify-center">
                <Logo className="text-[#CCCCCC] transition-all duration-300 group-hover:text-primary group-hover:scale-105" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
};

export default BrandSlider;