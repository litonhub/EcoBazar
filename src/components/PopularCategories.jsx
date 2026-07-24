import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router";
import Container from "./layouts/Container";
import { getCategories } from "../api/categoryApi";
import { useTranslation } from 'react-i18next'; 

const PopularCategories = () => {
  const { t, i18n } = useTranslation(); 
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  
  const handleCategoryClick = (category) => {
    // URL এ পাঠানোর সময় ইংলিশ নামটাই পাঠাতে হবে যাতে API ঠিকমতো কাজ করে
    const categorySlug = typeof category.name === 'object' ? category.name.en : category.name;
    navigate(`/shop?category=${encodeURIComponent(categorySlug.toLowerCase())}`);
  };

  if (loading) return <div className="py-15 text-center">{t('popular_categories.loading')}</div>; 

  return (
    <section className="py-15">
      <Container>
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-pop font-semibold text-hsize text-logoc leading-[120%]">
            {t('popular_categories.title')} 
          </h2>

          <button 
            onClick={() => navigate('/shop')}
            className="flex items-center gap-2 font-pop text-primary font-medium text-[16px] leading-[150%] cursor-pointer"
          >
            {t('popular_categories.view_all')} 
            <FaArrowRight size={15} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categories.map((item) => (
            <div
              key={item._id}
              onClick={() => handleCategoryClick(item)} // <--- আপডেট: পুরো object পাঠানো হচ্ছে
              className="group border border-brdrtwo rounded-[5px] px-5 pt-4 pb-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:border-[#2C742F] hover:shadow-[0_0_12px_0_rgba(32,181,38,0.32)] bg-white"
            >
              <img
                src={item.image?.url}
                alt={typeof item.name === 'object' ? item.name.en : item.name}
                className="h-32.5 object-contain"
              />

              <h3 className="mt-4 font-pop font-medium text-[18px] text-logoc leading-[150%] text-center transition-colors duration-300 group-hover:text-[#2C742F]">
                {/* ডায়নামিক ল্যাঙ্গুয়েজ চেকিং লজিক */}
                {typeof item.name === 'object' 
                  ? (item.name[i18n.language] || item.name.en) 
                  : item.name}
              </h3>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default PopularCategories;