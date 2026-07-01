import { FaArrowRight } from "react-icons/fa";
import { AiOutlineHeart, AiOutlineEye } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import Container from "./layouts/Container";
import Apple from "../assets/images/apple.png";
import Malta from "../assets/images/malta.png";
import Cabage from "../assets/images/cabage.png";
import Letuce from "../assets/images/lettuce.png";
import Eggplant from "../assets/images/eggplant.png";
import Potato from "../assets/images/potato.png";
import Corn from "../assets/images/corn.png";
import Cauliflower from "../assets/images/Cauliflower.png";
import Capsicum from "../assets/images/capsicum.png";
import Chili from "../assets/images/chili.png";

const products = [
  {
    id: 1,
    name: "Green Apple",
    image: Apple,
    price: 14.99,
    oldPrice: 29.99,
    sale: true,
  },
  {
    id: 2,
    name: "Fresh Indian Malta",
    image: Malta,
    price: 20,
  },
  {
    id: 3,
    name: "Chinese cabbage",
    image: Cabage,
    price: 12,
  },
  {
    id: 4,
    name: "Green Lettuce",
    image: Letuce,
    price: 9,
  },
  {
    id: 5,
    name: "Eggplant",
    image: Eggplant,
    price: 34,
  },
];

const BestSeller = () => {
  return (
    <section>

      <Container>
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-pop font-semibold text-hsize text-logoc leading-[120%]">
            Best Seller Products
          </h2>

          <button className="flex items-center gap-x-3 font-pop text-primary font-medium text-[16px] leading-[150%] cursor-pointer">
            View All
            <FaArrowRight size={15} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 -mr-px -mb-px">

          {products.map((item) => (

            <div
              key={item.id}
              className="group relative border border-brdrtwo -mr-px -mb-px bg-white transition-all duration-300 hover:border-[#2C742F] hover:shadow-[0_0_12px_0_rgba(32,181,38,0.32)] hover:z-10 cursor-pointer overflow-hidden"
            >

              {item.sale && (
                <span className="absolute top-4 left-4 bg-[#EA4B48] text-white defaultfs px-2 py-1 rounded">
                  Sale 50%
                </span>
              )}

              {/* Hover Icons */}

              <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition duration-300">

                <button className="w-10 h-10 rounded-full cursor-pointer text-logoc bg-white shadow border border-[#f2f2f2] flex items-center justify-center hover:bg-primary hover:text-white">
                  <AiOutlineHeart />
                </button>

                <button className="w-10 h-10 rounded-full cursor-pointer text-logoc bg-white border border-[#f2f2f2] shadow flex items-center justify-center hover:bg-primary hover:text-white">
                  <AiOutlineEye />
                </button>

              </div>

              <img
                src={item.image}
                alt=""
                className="h-57.5 mx-auto object-contain px-1.25 pt-1.25"
              />

              <div className="px-3 mt-4.25 mb-3">
                <h3 className="defaultfs text-[#4d4d4d] transition-colors duration-300 group-hover:text-[#2C742F]">
                  {item.name}
                </h3>

                <div className="flex items-center gap-2 font-pop text-[16px] leading-[150%]">

                  <span className="font-medium text-logoc">
                    ${item.price}
                  </span>

                  {item.oldPrice && (
                    <span className="line-through font-nornal text-grynine">
                      ${item.oldPrice}
                    </span>
                  )}

                </div>

                <div className="text-orange-400">
                  ★★★★☆
                </div>
              </div>

              <button
                className="absolute bottom-6 right-4 w-10 h-10 rounded-full bg-[#f2f2f2] text-logoc cursor-pointer flex items-center justify-center transition-all duration-300 group-hover:bg-green-500 group-hover:text-white"
              >
                <HiOutlineShoppingBag />
              </button>

            </div>

          ))}

        </div>
      </Container>

    </section>
  );
};

export default BestSeller;