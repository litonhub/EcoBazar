import { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
} from "react-icons/fa";
import {
  AiOutlineHeart,
  AiOutlineEye,
} from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi2";

import Container from "./layouts/Container";
import { getProducts } from "../api/productApi";

const PopularProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const res = await getProducts({
        popular: true,
        limit: 10,
      });

      setProducts(res.data.data.products || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating = 0) => {
    const stars = [];

    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar
          key={`full-${i}`}
          className="text-orange-400 text-sm"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <FaStarHalfAlt
          key="half"
          className="text-orange-400 text-sm"
        />
      );
    }

    while (stars.length < 5) {
      stars.push(
        <FaRegStar
          key={`empty-${stars.length}`}
          className="text-orange-400 text-sm"
        />
      );
    }

    return stars;
  };

  return (
    <section>
      <Container>
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-pop font-semibold text-hsize text-logoc leading-[120%]">
            Popular Products
          </h2>

          <button className="flex items-center gap-x-3 font-pop text-primary font-medium text-[16px] leading-[150%] cursor-pointer">
            View All
            <FaArrowRight size={15} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 -mr-px -mb-px">
          {products.map((item) => (
            <div
              key={item._id}
              className="group relative border border-brdrtwo -mr-px -mb-px bg-white transition-all duration-300 hover:border-[#2C742F] hover:shadow-[0_0_12px_0_rgba(32,181,38,0.32)] hover:z-10 cursor-pointer overflow-hidden"
            >
              {item.discountPercentage > 0 && (
                <span className="absolute top-4 left-4 bg-[#EA4B48] text-white defaultfs px-2 py-1 rounded">
                  Sale {item.discountPercentage}%
                </span>
              )}

              <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition duration-300">
                <button className="w-10 h-10 rounded-full cursor-pointer text-logoc bg-white shadow border border-[#f2f2f2] flex items-center justify-center hover:bg-primary hover:text-white">
                  <AiOutlineHeart />
                </button>

                <button className="w-10 h-10 rounded-full cursor-pointer text-logoc bg-white border border-[#f2f2f2] shadow flex items-center justify-center hover:bg-primary hover:text-white">
                  <AiOutlineEye />
                </button>
              </div>

              <img
                src={item.thumbnail?.url}
                alt={item.title}
                className="h-57.5 mx-auto object-contain px-1.25 pt-1.25"
              />
              <div className="px-3 mt-4.25 mb-3">
                <h3 className="defaultfs text-[#4d4d4d] transition-colors duration-300 group-hover:text-[#2C742F]">
                  {item.title}
                </h3>

                <div className="flex items-center gap-2 font-pop text-[16px] leading-[150%]">
                  <span className="font-medium text-logoc">
                    ${Number(item.price).toFixed(2)}
                  </span>

                  {item.discountPercentage > 0 && (
                    <span className="line-through font-normal text-grynine">
                      $
                      {(
                        item.price /
                        (1 - item.discountPercentage / 100)
                      ).toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-0.5 mt-1">
                  {renderStars(item.rating)}
                </div>
              </div>

              <button className="absolute bottom-6 right-4 w-10 h-10 rounded-full bg-[#f2f2f2] text-logoc cursor-pointer flex items-center justify-center transition-all duration-300 group-hover:bg-green-500 group-hover:text-white">
                <HiOutlineShoppingBag />
              </button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default PopularProducts;