import { FaArrowRight } from "react-icons/fa";
import Container from "./layouts/Container";
import Fruit from '../assets/images/fruit.png'
import PCtwo from '../assets/images/vege.png'
import PCthree from '../assets/images/meat.png'
import PCfour from '../assets/images/snacks.png'
import PCfive from '../assets/images/bevarage.png'
import PCsix from '../assets/images/beauty.png'
import PCseven from '../assets/images/bread.png'
import PCeight from '../assets/images/baking.png'
import PCnine from '../assets/images/cooking.png'
import PCten from '../assets/images/diabetic.png'
import PCel from '../assets/images/dd.png'
import PCtw from '../assets/images/oil.png'

const categories = [
  {
    id: 1,
    name: "Fresh Fruit",
    image: Fruit,
  },
  {
    id: 2,
    name: "Fresh Vegetables",
    image: PCtwo,
  },
  {
    id: 3,
    name: "Meat & Fish",
    image: PCthree,
  },
  {
    id: 4,
    name: "Snacks",
    image: PCfour,
  },
  {
    id: 5,
    name: "Beverages",
    image: PCfive,
  },
  {
    id: 6,
    name: "Beauty & Health",
    image: PCsix,
  },
  {
    id: 7,
    name: "Bread & Bakery",
    image: PCseven,
  },
  {
    id: 8,
    name: "Baking Needs",
    image: PCeight,
  },
  {
    id: 9,
    name: "Cooking",
    image: PCnine,
  },
  {
    id: 10,
    name: "Diabetic Food",
    image: PCten,
  },
  {
    id: 11,
    name: "Dish Detergents",
    image: PCel,
  },
  {
    id: 12,
    name: "Oil",
    image: PCtw,
  },
];

const PopularCategories = () => {
  return (
    <section className="py-15">

      <Container>
        <div className="flex justify-between items-center mb-8">
        <h2 className="font-pop font-semibold text-hsize text-logoc leading-[120%]">
          Popular Categories
        </h2>

        <button className="flex items-center gap-2 font-pop text-primary font-medium text-[16px] leading-[150%] cursor-pointer">
          View All
          <FaArrowRight size={15}/>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">

        {categories.map((item)=>(
          <div
          key={item.id}
          className="group border border-brdrtwo rounded-[5px] px-5 pt-4 pb-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:border-[#2C742F] hover:shadow-[0_0_12px_0_rgba(32,181,38,0.32)] bg-white"
          >

            <img
            src={item.image}
            alt="CategoryImage"
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