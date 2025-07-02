import useAuth from "@/hooks/useAuth";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router";

const TopActionPrompt = () => {
  const { user } = useAuth();
  const [isTopActionClosed, setIsTopActionClosed] = useState(false);

  const actionClosedItem = `topActionClosed:${user?.email}` || null;

  useEffect(() => {
    if (actionClosedItem) {
      const stored = localStorage.getItem(actionClosedItem);
      setIsTopActionClosed(stored === "true");
    }
  }, [actionClosedItem]);

  const handleTopActionClose = () => {
    if (actionClosedItem) {
      localStorage.setItem(actionClosedItem, "true");
    }
    setIsTopActionClosed(true);
  };

  if (isTopActionClosed) return null;

  return (
    user && (
      <motion.section
        initial={{ height: 0 }}
        animate={{ height: "auto" }}
        transition={{ duration: 0.3, ease: "easeOut", delay: 2 }}
      >
        <div className="border-b border-accent/10">
          <div className="max-w-screen-xl mx-auto px-4 w-full text-sm text-neutral-600 dark:text-neutral-300 space-x-1 py-0.5">
            <span>You now have access to our exclusive features.</span>
            <Link to={"/add-artifact"} className="underline text-primary">
              Add an artifact?
            </Link>
            <button
              onClick={handleTopActionClose}
              className="cursor-pointer ml-2"
            >
              <IoClose className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.section>
    )
  );
};

export default TopActionPrompt;
