import { FaArrowRight, FaRegCommentAlt, FaRegUser } from "react-icons/fa";
import { FiTag } from "react-icons/fi";
import NewsOne from "../assets/images/news1.png";
import NewsTwo from "../assets/images/news2.png";
import NewsThree from "../assets/images/news3.png";
import Container from "./layouts/Container";

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
    <section className="py-15">
      <Container>
        <h2 className="text-center font-pop text-hsize font-semibold leading-[120%] text-[#1A1A1A] mb-8">
          Latest News
        </h2>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          {news.map((item) => (
            <div
              key={item.id}
              className="group rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-xl duration-300"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-81 object-cover group-hover:scale-110 duration-500"
                />

                {/* Date */}
                <div className="absolute left-6 bottom-6 w-14.5 h-14.5 rounded bg-white flex flex-col justify-center items-center shadow">
                  <h3 className="font-pop text-[20px] font-medium leading-[150%] text-[#1A1A1A]">
                    {item.day}
                  </h3>

                  <span className="font-pop text-[12px] font-medium leading-[100%] text-gryd uppercase tracking-[3%]">
                    {item.month}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 text-[#4d4d4d] defaultfs mb-2">
                  <div className="flex items-center gap-2">
                    <FiTag size={20} className="text-[#B3B3B3]" />
                    {item.category}
                  </div>

                  <div className="flex items-center gap-2">
                    <FaRegUser size={18} className="text-[#B3B3B3]" />
                    By {item.author}
                  </div>

                  <div className="flex items-center gap-2">
                    <FaRegCommentAlt size={18} className="text-[#B3B3B3]" />
                    {item.comments}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-pop text-[18px] font-medium leading-[150%] text-[#1A1A1A] group-hover:text-[#2C742F] duration-300">
                  {item.title}
                </h3>

                {/* Button */}
                <button className="mt-6 flex items-center gap-2 font-semibold text-primary hover:gap-3 duration-300 cursor-pointer">
                  Read More
                  <FaArrowRight />
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