import { FaArrowRight, FaRegCommentAlt, FaRegUser } from "react-icons/fa";
import { FiTag } from "react-icons/fi";
import NewsOne from "../assets/images/news1.png";
import NewsTwo from "../assets/images/news2.png";
import NewsThree from "../assets/images/news3.png";
import Container from "./layouts/Container";
// Note: If you want translation support, don't forget to import useTranslation and replace hardcoded texts!

const LatestNews = () => {
  const news = [
    {
      id: 1,
      image: NewsOne,
      day: "18",
      month: "NOV",
      category: "Food",
      author: "Admin",
      comments: "65 Comments",
      title:
        "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
    },
    {
      id: 2,
      image: NewsTwo,
      day: "29",
      month: "JAN",
      category: "Food",
      author: "Admin",
      comments: "65 Comments",
      title:
        "Eget lobortis lorem lacinia. Vivamus pharetra semper.",
    },
    {
      id: 3,
      image: NewsThree,
      day: "21",
      month: "FEB",
      category: "Food",
      author: "Admin",
      comments: "65 Comments",
      title:
        "Maecenas blandit risus elementum mauris malesuada.",
    },
  ];

  return (
    <section className="py-5 lg:py-15">
      <Container>
        <h2 className="text-center font-pop text-[24px] sm:text-[28px] lg:text-hsize font-semibold leading-[120%] text-[#1A1A1A] mb-5 lg:mb-8">
          Latest News
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 px-4 md:px-6 lg:px-0">
          {news.map((item) => (
            <div
              key={item.id}
              className="group rounded-[8px] lg:rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-56 sm:h-64 lg:h-81 object-cover group-hover:scale-110 duration-500"
                />

                {/* Date */}
                <div className="absolute left-3 bottom-3 lg:left-6 lg:bottom-6 w-12 h-12 lg:w-14.5 lg:h-14.5 rounded bg-white flex flex-col justify-center items-center shadow">
                  <h3 className="font-pop text-[16px] lg:text-[20px] font-medium leading-[150%] text-[#1A1A1A]">
                    {item.day}
                  </h3>

                  <span className="font-pop text-[10px] lg:text-[12px] font-medium leading-[100%] text-gryd uppercase tracking-[3%]">
                    {item.month}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 lg:p-6">
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-2 lg:gap-4 text-[#4d4d4d] text-[12px] lg:defaultfs mb-2 lg:mb-2">
                  <div className="flex items-center gap-1.5 lg:gap-2">
                    <FiTag className="text-[#B3B3B3] text-[16px] lg:text-[20px]" />
                    {item.category}
                  </div>

                  <div className="flex items-center gap-1.5 lg:gap-2">
                    <FaRegUser className="text-[#B3B3B3] text-[14px] lg:text-[18px]" />
                    By {item.author}
                  </div>

                  <div className="flex items-center gap-1.5 lg:gap-2">
                    <FaRegCommentAlt className="text-[#B3B3B3] text-[14px] lg:text-[18px]" />
                    {item.comments}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-pop text-[15px] sm:text-[16px] lg:text-[18px] font-medium leading-[140%] lg:leading-[150%] text-[#1A1A1A] group-hover:text-[#2C742F] duration-300 line-clamp-2">
                  {item.title}
                </h3>

                {/* Button */}
                <button className="mt-3 lg:mt-6 flex items-center gap-2 font-semibold text-[13px] lg:text-[16px] text-primary hover:gap-3 duration-300 cursor-pointer">
                  Read More
                  <FaArrowRight className="text-[12px] lg:text-[16px]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default LatestNews;