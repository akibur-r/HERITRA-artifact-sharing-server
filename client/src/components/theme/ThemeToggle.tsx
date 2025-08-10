import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/ThemeProvider";
import { BiMoon, BiSun } from "react-icons/bi";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      className="cursor-pointer rounded-full w-9 h-9"
      size="sm"
    >
      {theme === "dark" ? <BiSun className="" /> : <BiMoon className="" />}
    </Button>
  );
}
