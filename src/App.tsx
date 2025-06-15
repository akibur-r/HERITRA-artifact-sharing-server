import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import TestComponent from "./components/test/TestComponent";

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <motion.div animate={{ rotate: 360, transition: {duration: 1} }}>
        <Button>Click me</Button>
        <TestComponent />
      </motion.div>
    </div>
  );
}

export default App;
