import { GoHome } from "react-icons/go";
import { FaChevronRight } from "react-icons/fa6";
import Navimg from "../../assets/images/navigation-img.png";
import Container from "../layouts/Container";

const PageBanner = ({ items }) => {
    return (
        <div className="relative w-full">
            <img src={Navimg} alt="navigation-img" className="w-full h-30 object-cover" />
            <div className="absolute inset-0">
                <Container className='h-full'>
                    <div className="h-full flex items-center">
                        <div className="flex flex-wrap items-center gap-x-3">
                            <GoHome className="size-5 text-gryd" />
                            {items.map((item, index) => (
                                <div key={index} className="flex items-center gap-x-3">
                                    <FaChevronRight className="size-2 text-grynine" />
                                    <h5 className={index === items.length - 1
                                        ? "text-primary text-base font-normal leading-[150%]"
                                        : "text-grynine text-base font-normal leading-[150%]"}
                                    >{item}
                                    </h5>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </div>
        </div>

    );
};

export default PageBanner;