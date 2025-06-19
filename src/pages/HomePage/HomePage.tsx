import Blogs from "@/components/homepage/Blogs/Blogs";
import FeaturedArtifacts from "@/components/homepage/FeaturedArtifacts/FeaturedArtifacts";
import HeroButton from "@/components/homepage/HeroButton/HeroButton";
import Stats from "@/components/homepage/Stats/Stats";
import SwiperSlider from "@/components/homepage/SwiperSlider/SwiperSlider";
import useDynamicTitle from "@/hooks/useDynamicTitle";

const HomePage = () => {
  useDynamicTitle("*homepage");
  return (
    <div className="relative">
      <SwiperSlider />
      <HeroButton/>
      <FeaturedArtifacts />
      <Blogs />
      <Stats />
    </div>
  );
};

export default HomePage;
