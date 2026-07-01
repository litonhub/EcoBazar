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
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="py-15 bg-[#EDF2EE]">
      <Container>
        <div className="flex justify-between items-center mb-14">

          <div>
            <h2 className="font-pop font-semibold text-hsize leading-[120%] text-[#1A1A1A]">
              Client Testimonial
            </h2>

            <div className="w-18 h-1 bg-[#00B207] rounded-full mt-4"></div>
          </div>

          <div className="flex items-center gap-3">

            <button
              ref={prevRef}
              className="w-11 h-11 rounded-full border border-[#E6E6E6] bg-white flex items-center justify-center text-[#1A1A1A] hover:bg-[#00B207] hover:text-white hover:border-[#00B207] duration-300 cursor-pointer">
              <FaArrowLeft />
            </button>

            <button
              ref={nextRef}
              className="w-11 h-11 rounded-full border border-[#E6E6E6] bg-white flex items-center justify-center text-[#1A1A1A] hover:bg-[#00B207] hover:text-white hover:border-[#00B207] duration-300 cursor-pointer">
              <FaArrowRight />
            </button>
          </div>

        </div>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          loop={true}
          spaceBetween={24}
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
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {testimonialData.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-6 transition-all duration-300 hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)]">

                <FaQuoteLeft className="text-[#84D187] text-[34px]" />

                <p className="mt-4 defaultfs text-gryd">
                  {item.review}
                </p>

                <div className="flex justify-between items-center mt-6">
                  <div className="flex items-center gap-3">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />

                    <div>

                      <h4 className="font-pop text-[16px] font-medium text-[#1A1A1A] leading-[150%]">
                        {item.name}
                      </h4>

                      <p className="defaultfs text-grynine">
                        {item.designation}
                      </p>

                    </div>
                  </div>

                  <div className="flex items-center gap-1">

                    {[...Array(item.rating)].map((_, index) => (
                      <FaStar
                        key={index}
                        className="text-[#FF8A00]"
                      />
                    ))}

                  </div>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
};

export default ClientTestimonial;