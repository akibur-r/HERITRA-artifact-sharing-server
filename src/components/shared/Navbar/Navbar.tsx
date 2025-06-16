import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import { navItems } from "@/utils/navItems";

import { FiThumbsUp } from "react-icons/fi";
import { HiMenuAlt3 } from "react-icons/hi";
import { LuAmphora } from "react-icons/lu";
import { Link } from "react-router";

import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "../Logo/Logo";

export function Navbar() {
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

  const profileDropDown = (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer rounded-full">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Md. Akibur Rahman</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <Link to={"/my-artifacts"}>
          <DropdownMenuItem className="cursor-pointer flex items-center">
            <LuAmphora />
            My Artifacts
          </DropdownMenuItem>
        </Link>

        <Link to={"/liked-artifacts"}>
          <DropdownMenuItem className="cursor-pointer flex items-center">
            <FiThumbsUp />
            Liked Artifacts
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
  return (
    <header className="w-full border-b bg-background text-foreground">
      <div className="mx-auto max-w-screen-2xl px-4 py-2 flex items-center justify-between">
        {/* left icon */}
        <div className="h-12 w-fit">
          <Logo />
        </div>

        {/* center links */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          {navItems}
        </nav>

        {/* right actions */}
        <div className="hidden md:flex items-center gap-2">
          {authButtons}
          {profileDropDown}
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
                {profileDropDown}
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
}
