import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import { navItems } from "@/utils/navItems";

import lightModeLogo from "@/assets/images/logo_black.png";
import darkModeLogo from "@/assets/images/logo_white.png";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link } from "react-router";

import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";

const authButtons = (
  <div className="flex flex-row-reverse md:flex-row">
    <Button
      variant="link"
      className="cursor-pointer text-base-content underline hover:text-primary"
      size="sm"
    >
      <Link to={"/sign-in"}>Sign In</Link>
    </Button>
    <Button variant="outline" className="cursor-pointer" size="sm">
      <Link to={"/register"}>Register</Link>
    </Button>
  </div>
);

export function Navbar() {
  return (
    <header className="w-full border-b bg-background text-foreground">
      <div className="mx-auto max-w-screen-2xl px-4 py-2 flex items-center justify-between">
        <Link to={"/"} className="text-xl font-bold h-12">
          <img
            src={lightModeLogo}
            className="dark:hidden h-full w-full"
            alt="Heritra"
          />
          <img
            src={darkModeLogo}
            className="hidden dark:block h-full w-full"
            alt="Heritra"
          />
        </Link>

        <nav className="hidden md:flex gap-6 text-sm font-medium">
          {navItems}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {authButtons}
          <ThemeToggle />
        </div>

        <div className="md:hidden">
          <Drawer direction="left">
            <DrawerTrigger>
              <HiMenuAlt3 className="text-2xl" />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>{navItems}</DrawerHeader>
              <DrawerFooter className="flex flex-row justify-end items-end">
                <ThemeToggle />
                {authButtons}
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
}
