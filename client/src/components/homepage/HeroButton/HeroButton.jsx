import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { FaAngleDoubleDown } from "react-icons/fa";

const HeroButton = () => {
  const scrollToSection = () => {
    const element = document.getElementById("featured-artifacts");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="absolute w-full flex -translate-y-8 h-16 z-10 justify-center items-center">
      <motion.span
        animate={{
          backgroundColor: [
            "var(--primary)",
            "var(--accent)",
            "var(--primary)",
          ],
          // opacity: [0.8, 1, 0.8]
        }}
        transition={{ duration: 3, repeat: Infinity }}
        onClick={scrollToSection}
        className="p-0"
      >
        <Button
          type="button"
          variant={"default"}
          className="rounded-[1px] overflow-hidden bg-transparent h-fit px-6 py-2 border-ring ring-background ring-[8px]"
        >
          <motion.span
            animate={{
              y: [-25, 25],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <FaAngleDoubleDown />
          </motion.span>
        </Button>
      </motion.span>
    </div>
  );
};

export default HeroButton;
