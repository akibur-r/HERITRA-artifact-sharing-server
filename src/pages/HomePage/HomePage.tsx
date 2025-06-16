import Blogs from "@/components/homepage/Blogs/Blogs";
import FeaturedArtifacts from "@/components/homepage/FeaturedArtifacts/FeaturedArtifacts";
import Stats from "@/components/homepage/Stats/Stats";
import SwiperSlider from "@/components/homepage/SwiperSlider/SwiperSlider";

const HomePage = () => {
  return (
    <div className="relative">
      <SwiperSlider />
      <FeaturedArtifacts />
      <Blogs />
      <Stats />
    </div>
  );
};

export default HomePage;
