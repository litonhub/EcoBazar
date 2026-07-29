import { GoHome } from "react-icons/go";
import { FaChevronRight } from "react-icons/fa6";
import Navimg from "../../assets/images/navigation-img.png";
import Container from "../layouts/Container";

const PageBanner = ({ items }) => {
    return (
        <div className="relative w-full">
            {/* Height optimized for mobile (h-16), tablet (h-24) and desktop (h-30) */}
            <img src={Navimg} alt="navigation-img" className="w-full h-16 sm:h-24 lg:h-30 object-cover" />
            
            <div className="absolute inset-0">
                <Container className='h-full'>
                    <div className="h-full flex items-center px-4 md:px-6 lg:px-0">
                        {/* Reduced gap on mobile to prevent long breadcrumbs from wrapping excessively */}
                        <div className="flex flex-wrap items-center gap-x-1.5 sm:gap-x-2 lg:gap-x-3">
                            <GoHome className="size-4 lg:size-5 text-gryd shrink-0" />
                            
                            {items.map((item, index) => (
                                <div key={index} className="flex items-center gap-x-1.5 sm:gap-x-2 lg:gap-x-3">
                                    <FaChevronRight className="size-2 lg:size-2.5 text-grynine shrink-0" />
                                    <h5 className={index === items.length - 1
                                        ? "text-primary text-[12px] sm:text-[14px] lg:text-base font-normal leading-[150%] line-clamp-1"
                                        : "text-grynine text-[12px] sm:text-[14px] lg:text-base font-normal leading-[150%] line-clamp-1"}
                                    >
                                        {item}
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