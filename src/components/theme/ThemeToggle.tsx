import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/ThemeProvider";
import { FaMoon, FaSun } from "react-icons/fa";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      className="cursor-pointer"
      size="sm"
    >
      {theme === "dark" ? <FaSun className="" /> : <FaMoon className="" />}
    </Button>
  );
}
