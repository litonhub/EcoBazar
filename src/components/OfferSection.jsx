import Countdown from "react-countdown";
import { FaArrowRight } from "react-icons/fa";
import Container from "./layouts/Container";
import Offerbo from "../assets/images/offerbannerone.png";
import Offerbt from "../assets/images/offerbtwo.png";
import Offerbth from "../assets/images/offerebthree.png";

const OfferSection = () => {
    const endDate = new Date("2026-12-31T23:59:59");

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <h3 className="text-xl font-bold">Offer Ended</h3>;
        }

        return (
            <div className="mt-2">
                {/* Number Row */}
                <div className="flex justify-center items-center gap-3">
                    <h2 className="font-pop font-normal text-[24px] leading-[150%] text-white">
                        {String(days).padStart(2, "0")}
                    </h2>

                    <span className="font-pop font-normal text-[24px] leading-none text-[rgba(255,255,255,0.6)]">
                        :
                    </span>

                    <h2 className="font-pop font-normal text-[24px] leading-[150%] text-white">
                        {String(hours).padStart(2, "0")}
                    </h2>

                    <span className="font-pop font-normal text-[24px] leading-none text-[rgba(255,255,255,0.6)]">
                        :
                    </span>

                    <h2 className="font-pop font-normal text-[24px] leading-[150%] text-white">
                        {String(minutes).padStart(2, "0")}
                    </h2>

                    <span className="font-pop font-normal text-[24px] leading-none text-[rgba(255,255,255,0.6)]">
                        :
                    </span>

                    <h2 className="font-pop font-normal text-[24px] leading-[150%] text-white">
                        {String(seconds).padStart(2, "0")}
                    </h2>
                </div>

                {/* Label Row */}
                <div className="flex justify-center gap-8 mt-2">
                    <p className="w-7.5 text-center font-pop font-normal text-[12px] leading-[100%] tracking-[3%] text-[rgba(255,255,255,0.8)] uppercase">
                        DAYS
                    </p>

                    <p className="w-7.5 text-center font-pop font-normal text-[12px] leading-[100%] tracking-[3%] text-[rgba(255,255,255,0.8)] uppercase">
                        HOURS
                    </p>

                    <p className="w-7.5 text-center font-pop font-normal text-[12px] leading-[100%] tracking-[3%] text-[rgba(255,255,255,0.8)] uppercase">
                        MINS
                    </p>

                    <p className="w-7.5 text-center font-pop font-normal text-[12px] leading-[100%] tracking-[3%] text-[rgba(255,255,255,0.8)] uppercase">
                        SECS
                    </p>
                </div>
            </div>
        );
    };

    const offers = [
        {
            id: 1,
            image: Offerbo,
            top: "BEST DEALS",
            title: "Sale of the Month",
            subtitle: "",
            timer: true,
            text: "text-white",
            overlay: "bg-black/10",
        },
        {
            id: 2,
            image: Offerbt,
            top: "85% FAT FREE",
            title: "Low-Fat Meat",
            subtitle: (
                <>
                    Started at{" "}
                    <span className="text-[20px] font-pop font-semibold leading-[150%] text-[#FF8A00]">$79.99</span>
                </>
            ),
            timer: false,
            text: "text-white",
            overlay: "bg-black/30",
        },
        {
            id: 3,
            image: Offerbth,
            top: "SUMMER SALE",
            title: "100% Fresh Fruit",
            subtitle: (
                <>
                    Up to{" "}
                    <span className="bg-logoc text-[#FCC900] font-pop text-[18px] font-semibold leading-[150%] px-3 py-1.5 rounded-[5px]">
                        64% OFF
                    </span>
                </>
            ),
            timer: false,
            text: "text-black",
            overlay: "bg-black/0",
        },
    ];

    return (
        <section className="py-15">
            <Container>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-x-6">
                    {offers.map((offer) => (
                        <div
                            key={offer.id}
                            className="relative h-134 rounded-lg overflow-hidden bg-cover bg-center"
                            style={{
                                backgroundImage: `url(${offer.image})`,
                            }}
                        >
                            <div className={`absolute inset-0 ${offer.overlay}`}></div>

                            <div
                                className={`absolute inset-0 z-10 flex flex-col items-center pt-8.75 px-6 ${offer.text}`}
                            >
                                <p className="text-sm font-pop font-medium leading-[100%] uppercase tracking-[3%]">
                                    {offer.top}
                                </p>

                                <h2 className="text-[40px] font-semibold font-pop leading-[120%] text-center mt-4">
                                    {offer.title}
                                </h2>

                                {offer.subtitle && (
                                    <p className="text-[18px] font-normal font-pop leading-[150%] mt-3.25 text-center">
                                        {offer.subtitle}
                                    </p>
                                )}

                                {offer.timer && (
                                    <Countdown date={endDate} renderer={renderer} />
                                )}

                                <button className="mt-7.25 bg-white text-primary font-semibold text-[14px] leading-[120%] px-8 py-3.5 rounded-[43px] flex items-center gap-3 hover:bg-primary hover:text-white duration-300 cursor-pointer">
                                    Shop Now
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

export default OfferSection;