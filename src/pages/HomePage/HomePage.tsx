import Blogs from "@/components/homepage/Blogs/Blogs";
import FeaturedArtifacts from "@/components/homepage/FeaturedArtifacts/FeaturedArtifacts";
import Stats from "@/components/homepage/Stats/Stats";
import SwiperSlider from "@/components/homepage/SwiperSlider/SwiperSlider";
import { Button } from "@/components/ui/button";
import useDynamicTitle from "@/hooks/useDynamicTitle";
import { motion } from "motion/react";
import { FaAngleDoubleDown } from "react-icons/fa";

const HomePage = () => {
  useDynamicTitle("*homepage");
  return (
    <div className="relative">
      <SwiperSlider />
      <div className="absolute w-full flex -translate-y-8 h-16 z-50 justify-center items-center">
        <motion.a
          animate={{
            backgroundColor: [
              "var(--primary)",
              "var(--accent)",
              "var(--primary)",
            ],
            // opacity: [0.8, 1, 0.8]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          href={"#featured-artifacts"}
          className="p-0"
        >
          <Button
            type="button"
            variant={"default"}
            className="rounded-[1px] bg-transparent h-fit px-6 py-2 border-ring ring-[8px]"
          >
            <motion.span
              animate={{
                y: [-6, 6, -6],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaAngleDoubleDown />
            </motion.span>
          </Button>
        </motion.a>
      </div>
      <FeaturedArtifacts />
      <Blogs />
      <Stats />
    </div>
  );
};

export default HomePage;
