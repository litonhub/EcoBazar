import { useRef } from "react";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";
import { FaQuoteLeft } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Container from "./layouts/Container";
import "../css/ClientTestimonial.css"
import { useTranslation } from "react-i18next"; // <-- Language Import

import ClientOne from "../assets/images/client1.png";
import ClientTwo from "../assets/images/client2.png";
import ClientThree from "../assets/images/client3.png";
import ClientFour from "../assets/images/client4.png";
import ClientFive from "../assets/images/client5.png";
import ClientSix from "../assets/images/client6.png";

const testimonialData = [
  {
    id: 1,
    image: ClientOne,
    name: "Robert Fox",
    designation: "Customer",
    review:
      "Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget.",
    rating: 5,
  },
  {
    id: 2,
    image: ClientTwo,
    name: "Dianne Russell",
    designation: "Customer",
    review:
      "Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget.",
    rating: 5,
  },
  {
    id: 3,
    image: ClientThree,
    name: "Eleanor Pena",
    designation: "Customer",
    review:
      "Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget.",
    rating: 5,
  },
  {
    id: 4,
    image: ClientFour,
    name: "Courtney Henry",
    designation: "Customer",
    review:
      "Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget.",
    rating: 5,
  },
  {
    id: 5,
    image: ClientFive,
    name: "Jenny Wilson",
    designation: "Customer",
    review:
      "Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget.",
    rating: 5,
  },
  {
    id: 6,
    image: ClientSix,
    name: "Guy Hawkins",
    designation: "Customer",
    review:
      "Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget.",
    rating: 5,
  },
];

const ClientTestimonial = () => {
  const { t } = useTranslation(); // <-- Translation Hook
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="py-8 lg:py-15 bg-[#EDF2EE]">
      <Container>
        <div className="flex justify-between items-end lg:items-center mb-6 lg:mb-14 px-4 md:px-6 lg:px-0">
          <div>
            <h2 className="font-pop font-semibold text-[18px] sm:text-[24px] lg:text-hsize leading-[120%] text-[#1A1A1A]">
              {t('testimonials.title', 'Client Testimonial')}
            </h2>
            <div className="w-10 h-0.5 lg:w-18 lg:h-1 bg-[#00B207] rounded-full mt-2 lg:mt-4"></div>
          </div>

          <div className="flex items-center gap-2 lg:gap-3 shrink-0">
            <button
              ref={prevRef}
              className="w-8 h-8 lg:w-11 lg:h-11 rounded-full border border-[#E6E6E6] bg-white flex items-center justify-center text-[#1A1A1A] hover:bg-[#00B207] hover:text-white hover:border-[#00B207] duration-300 cursor-pointer shadow-sm lg:shadow-none"
            >
              <FaArrowLeft className="text-[12px] lg:text-base" />
            </button>

            <button
              ref={nextRef}
              className="w-8 h-8 lg:w-11 lg:h-11 rounded-full border border-[#E6E6E6] bg-white flex items-center justify-center text-[#1A1A1A] hover:bg-[#00B207] hover:text-white hover:border-[#00B207] duration-300 cursor-pointer shadow-sm lg:shadow-none"
            >
              <FaArrowRight className="text-[12px] lg:text-base" />
            </button>
          </div>
        </div>

        <div className="px-4 md:px-6 lg:px-0">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            loop={true}
            spaceBetween={16}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 16 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            speed={800}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: false,
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            className="pb-10 lg:pb-0" // Extra padding bottom for mobile pagination dots
          >
            {testimonialData.map((item) => (
              <SwiperSlide key={item.id} className="pt-2 pb-2">
                <div className="bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.05)] lg:shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-5 lg:p-6 transition-all duration-300 hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)] lg:hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)]">
                  
                  <FaQuoteLeft className="text-[#84D187] text-[24px] lg:text-[34px]" />

                  <p className="mt-3 lg:mt-4 text-[13px] lg:defaultfs text-gryd leading-[150%] lg:leading-normal line-clamp-4 lg:line-clamp-none">
                    {t(`testimonials.review_${item.id}`, item.review)}
                  </p>

                  <div className="flex justify-between items-center mt-4 lg:mt-6">
                    <div className="flex items-center gap-2.5 lg:gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 lg:w-14 lg:h-14 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-pop text-[14px] lg:text-[16px] font-medium text-[#1A1A1A] leading-[130%] lg:leading-[150%]">
                          {item.name}
                        </h4>
                        <p className="text-[11px] lg:defaultfs text-grynine leading-[130%] lg:leading-normal">
                          {t(`testimonials.role_${item.id}`, item.designation)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 lg:gap-1">
                      {[...Array(item.rating)].map((_, index) => (
                        <FaStar
                          key={index}
                          className="text-[#FF8A00] text-[12px] lg:text-base"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
};

export default ClientTestimonial;