import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import { navItems } from "@/utils/navItems";

import { FiThumbsUp } from "react-icons/fi";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoIosLogOut } from "react-icons/io";
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

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import { toast } from "sonner";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";
import Logo from "../Logo/Logo";

export function Navbar() {
  const { loading, user, logOut } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSignOut = () => {
    logOut()
      .then(() => {
        toast.success("Signed Out");
        setDrawerOpen(false);
      })
      .catch(() => {
        toast.error("Sign Out Failed", {
          description: "Something went wrong while signing out.",
        });
      });
  };

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
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger className="outline-none">
        <Tooltip>
          <TooltipTrigger className="cursor-pointer rounded-full">
            <Avatar onClick={() => setDrawerOpen(true)}>
              <AvatarImage src={user?.photoURL} />
              <AvatarFallback>
                {user?.displayName[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>
            <p>Click to show menu</p>
          </TooltipContent>
        </Tooltip>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4">
        <DropdownMenuLabel className="text-left">{user?.displayName}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <Link to={"/my-artifacts"}>
          <DropdownMenuItem
            onClick={() => {
              setDrawerOpen(false);
            }}
            className="cursor-pointer flex items-center"
          >
            My Artifacts
            <LuAmphora />
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator className="w-4" />

        <Link to={"/liked-artifacts"}>
          <DropdownMenuItem
            onClick={() => {
              setDrawerOpen(false);
            }}
            className="cursor-pointer flex items-center"
          >
            Liked Artifacts
            <FiThumbsUp />
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator className="w-4" />

        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer flex items-center"
          onClick={handleSignOut}
        >
          Logout
          <IoIosLogOut />
        </DropdownMenuItem>
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
          {loading ? (
            <LoaderSpinner size={18} />
          ) : user ? (
            profileDropDown
          ) : (
            authButtons
          )}
          <ThemeToggle />
        </div>

        <div className="md:hidden">
          <Drawer
            open={drawerOpen}
            onOpenChange={setDrawerOpen}
            direction="left"
          >
            <DrawerTrigger>
              <HiMenuAlt3 className="text-2xl" />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="text-right">
                <div className="h-12 w-fit flex justify-center">
                  <Logo />
                </div>
                <div
                  className="grid mt-4"
                  onClick={() => {
                    setDrawerOpen(false);
                  }}
                >
                  {navItems.map((item) => {
                    return (
                      <div className="grid justify-end">
                        <div key={item.key}>{item}</div>
                        <div className="w-3 my-2">
                          <Separator />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </DrawerHeader>
              <DrawerFooter
                onClick={() => setDrawerOpen(false)}
                className="flex flex-row justify-end items-center"
              >
                <ThemeToggle />

                {loading ? (
                  <LoaderSpinner size={18} />
                ) : user ? (
                  profileDropDown
                ) : (
                  authButtons
                )}
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
}
