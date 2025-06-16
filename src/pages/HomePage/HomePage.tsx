import Blogs from "@/components/homepage/Blogs/Blogs";
import FeaturedArtifacts from "@/components/homepage/FeaturedArtifacts/FeaturedArtifacts";
import SwiperSlider from "@/components/homepage/SwiperSlider/SwiperSlider";

const HomePage = () => {
  return (
    <div className="relative">
      <SwiperSlider />
      <FeaturedArtifacts />
      <Blogs />
    </div>
  );
};

export default HomePage;
