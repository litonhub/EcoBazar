import { FaInstagram } from "react-icons/fa6";
import Img1 from "../assets/images/instaone.png";
import Img2 from "../assets/images/instatwo.png";
import Img3 from "../assets/images/instathree.png";
import Img4 from "../assets/images/instafour.png";
import Img5 from "../assets/images/instafive.png";
import Img6 from "../assets/images/instasix.png";
import Container from "./layouts/Container";

const instagramImages = [
  Img1, Img2, Img3, Img4, Img5, Img6,
];

const InstagramGallery = () => {
  return (
    <section className="pb-12 lg:pb-15">
      <Container>

        <h2 className="mb-8 text-center text-hsize font-pop font-semibold leading-[120%] text-logoc">
          Follow us on Instagram
        </h2>

        <div className="grid grid-cols-2 gap-x-6 sm:grid-cols-3 lg:grid-cols-6">
          {instagramImages.map((image, index) => (
            <a
              key={index}
              href="#"
              className="group relative block overflow-hidden rounded-[10px]"
            >

              <div className="aspect-square overflow-hidden rounded-[10px]">
                <img
                  src={image}
                  alt={`Instagram ${index + 1}`}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 flex items-center justify-center rounded-[10px] bg-[#2D6A4F]/0 transition-all duration-500 group-hover:bg-[#2D6A4F]/70">

                <FaInstagram
                  size={34}
                  className="translate-y-3 scale-75 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100"
                />

              </div>
            </a>
          ))}
        </div>

      </Container>
    </section>
  );
};

export default InstagramGallery;