import { Separator } from "@/components/ui/separator";
import { motion } from "motion/react";
import { FaRegHeart } from "react-icons/fa";
import { GiBallPyramid } from "react-icons/gi";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { PiUsersThree } from "react-icons/pi";

const Stats = () => {
  const stats = [
    {
      label: "Civilizations Tracked",
      value: "112",
      icon: <GiBallPyramid />,
    },
    {
      label: "Contributors",
      value: "141K",
      icon: <LiaUserFriendsSolid />,
    },
    {
      label: "Total Likes",
      value: "1.7B",
      icon: <FaRegHeart />,
    },
    {
      label: "Users",
      value: "10M",
      icon: <PiUsersThree />,
    },
  ];

  const animationColors = [
    ["var(--foreground)", "var(--primary)", "var(--foreground)"],
    ["var(--primary)", "var(--foreground)", "var(--primary)"],
  ];

  const animationOpacities = [
    [1, 0.5, 1],
    [0.5, 1, 0.5],
  ];

  return (
    <section className="max-w-screen-xl mx-auto px-4 my-10 space-y-6">
      <header>
        <h1 className="font-cinzel text-2xl font-medium">By the Numbers</h1>
        <p className="opacity-70">Our history at a glance</p>
      </header>
      <main className="grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            animate={{
              color: animationColors[Math.floor(i % 2)],
              opacity: animationOpacities[Math.floor((i + 1) % 2)],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="p-6 flex flex-col items-center text-center">
              <div className="text-4xl">{stat.icon}</div>
              <div className="text-3xl font-semibold mt-3">{stat.value}+</div>
              <div className="text-sm opacity-80 mt-1 font-cinzel">
                {stat.label}
              </div>
            </div>
            <Separator orientation="vertical" className="hidden md:block" />
          </motion.div>
        ))}
      </main>
    </section>
  );
};

export default Stats;
