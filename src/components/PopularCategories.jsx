import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import Container from "./layouts/Container";
import { getCategories } from "../api/categoryApi";

const PopularCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularCategories = async () => {
      try {
        const res = await getCategories({ popular: true, limit: 12 });
        setCategories(res.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch popular categories:", error);
        setLoading(false);
      }
    };
    fetchPopularCategories();
  }, []);

  if (loading) return <div className="py-15 text-center">Loading Categories...</div>;

  return (
    <section className="py-15">
      <Container>
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-pop font-semibold text-hsize text-logoc leading-[120%]">
            Popular Categories
          </h2>

          <button className="flex items-center gap-2 font-pop text-primary font-medium text-[16px] leading-[150%] cursor-pointer">
            View All
            <FaArrowRight size={15} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categories.map((item) => (
            <div
              key={item._id}
              className="group border border-brdrtwo rounded-[5px] px-5 pt-4 pb-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:border-[#2C742F] hover:shadow-[0_0_12px_0_rgba(32,181,38,0.32)] bg-white"
            >
              <img
                src={item.image?.url}
                alt={item.name}
                className="h-32.5 object-contain"
              />

              <h3 className="mt-4 font-pop font-medium text-[18px] text-logoc leading-[150%] text-center transition-colors duration-300 group-hover:text-[#2C742F]">
                {item.name}
              </h3>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default PopularCategories;