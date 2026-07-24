import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import bgImage from "../assets/images/videobanner.png";
import Container from "./layouts/Container";
import { useTranslation } from "react-i18next"; // <-- Language Import

const VideoBanner = ({
  title = "We're the Best Organic Farm in the World",
  videoId = "cP5dihjUUNc",
}) => {
  const { t } = useTranslation(); // <-- Translation Hook
  const [open, setOpen] = useState(false);

  return (
    <>
      <Container className="py-15">
        <section
          className="relative h-100 overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: `url(${bgImage})`,
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-[rgba(0,44,2,0.7)]"></div>

          {/* Content */}
          <div className="absolute inset-0 z-10 flex flex-col justify-center items-center px-5">
            <h2 className="font-pop text-white text-[36px] font-semibold text-center max-w-104 leading-[120%]">
              {t('video_banner.title', title)}
            </h2>

            <button
              onClick={() => setOpen(true)}
              className="mt-10 w-18 h-18 rounded-full border-2 border-white flex justify-center items-center text-white hover:bg-primary hover:border-primary duration-300 cursor-pointer"
            >
              <FaPlay className="ml-1 text-xl" />
            </button>
          </div>
        </section>
      </Container>

      {/* Video Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-5"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-12 right-0 text-white text-4xl hover:text-red-500"
            >
              ×
            </button>

            <iframe
              className="w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="YouTube Video"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
};

export default VideoBanner;