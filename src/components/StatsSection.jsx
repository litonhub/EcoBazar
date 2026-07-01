import CountUpCard from "./common/CountUpCard";
import BgImage from "../assets/images/counterbg.png";
import LeftLeaf from "../assets/images/counterbgol.png";
import RightIcon from "../assets/images/counterbgol.png";
import Container from "./layouts/Container";

const StatsSection = () => {
  const stats = [
    {
      id: 1,
      end: 37,
      suffix: "+",
      title: "Years of Hard Work",
    },
    {
      id: 2,
      end: 500,
      suffix: "k+",
      title: "Happy Customer",
    },
    {
      id: 3,
      end: 28,
      suffix: "",
      title: "Qualified Team Member",
    },
    {
      id: 4,
      end: 750,
      suffix: "k+",
      title: "Monthly Orders",
    },
  ];

  return (
    <section className="relative py-20 bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url(${BgImage})`,
      }}>
      <Container>
        <div >
          <div className="absolute inset-0 bg-[rgba(0,16,9,0.5)]"></div>

          <img src={LeftLeaf} alt="" className="absolute left-0 top-5 w-40" />
          <img src={RightIcon} alt="" className="absolute right-5 bottom-20 w-16 opacity-40" />

          <div className="relative z-10 container mx-auto">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
              {stats.map((item) => (
                <CountUpCard
                  key={item.id}
                  end={item.end}
                  suffix={item.suffix}
                  title={item.title}
                  duration={3}
                  cardClass="bg-[rgba(255,255,255,0.07)] rounded-lg py-10 flex flex-col justify-center items-center"
                  numberClass="text-primary text-[56px] font-pop font-light leading-[120%]"
                  titleClass="text-white text-[18px] font-pop font-normal leading-[150%]"
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default StatsSection;