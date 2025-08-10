// VerticalSwiper.jsx
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import Artifact1 from "@/assets/images/ancient_artifact_1.png";
import Artifact2 from "@/assets/images/ancient_artifact_2.png";
import Artifact3 from "@/assets/images/ancient_artifact_3.png";
import Artifact4 from "@/assets/images/ancient_artifact_4.png";

const SwiperSlider = () => {
  const swiperItems = [
    {
      title: "Echoes from Lost Civilizations",
      subtitle:
        "Artifacts are the silent witnesses of human history — from ancient tools to ceremonial relics, they preserve forgotten ways of life.",
      image: Artifact1,
    },
    {
      title: "Legacy in Motion and Emotion",
      subtitle:
        "Fashion, early tools, and refined craftsmanship reflect a civilization deeply rooted in art and cosmic order.",
      image: Artifact2,
    },
    {
      title: "Fragments of the Everyday",
      subtitle:
        "Common items like pottery, coins, and jewelry give us insight into daily life across eras and empires.",
      image: Artifact3,
    },
    {
      title: "Buried Truths Revealed",
      subtitle:
        "Each excavation uncovers more than objects — it reconstructs stories of belief, power, and survival.",
      image: Artifact4,
    },
  ];

  return (
    <section className="h-[65vh] md:h-[50vh] lg:h-[75vh] w-full overflow-hidden px-4 lg:px-12 bg-amber-400/10 dark:bg-amber-600/10">
      <Swiper
        direction="vertical"
        slidesPerView={1}
        spaceBetween={20}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="h-full"
      >
        {swiperItems.map((item) => (
          <SwiperSlide key={item.title} className="overflow-hidden">
            <div className="flex flex-col-reverse md:flex-col lg:flex-row items-center justify-center h-full w-full max-w-screen-xl mx-auto px-4 ">
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl lg:text-6xl font-cinzel max-w-lg">
                  {item.title}
                </h1>
                <p className="px-6 mb-6 md:mb-0 border-l-4 text-sm md:text-md border-l-primary md:w-7/12">
                  {item.subtitle}
                </p>
              </div>
              <div className="h-full max-h-64 md:max-h-72 lg:max-h-128">
                <img src={item.image} className="h-full aspect-square object-contain" alt="" />
              </div>
              <div className="absolute -z-10 opacity-10">
                <img src={item.image} className="h-full" alt="" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default SwiperSlider;
