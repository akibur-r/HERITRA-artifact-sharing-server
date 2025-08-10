import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import { navItems } from "@/utils/navItems";

import { FiBox, FiLogOut, FiPlus, FiThumbsUp, FiUser } from "react-icons/fi";
import { HiMenuAlt3 } from "react-icons/hi";
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
import NotificationBell from "../NotificationBell/NotificationBell";

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
    <DropdownMenu dir="rtl" modal={false}>
      <Tooltip>
        <TooltipTrigger asChild className="cursor-pointer rounded-full">
          <DropdownMenuTrigger asChild className="outline-none flex">
            <Avatar className="size-9 rounded-full border-4 border-primary/60 hover:border-primary/80">
              <AvatarImage src={user?.photoURL} className="object-cover" />
              <AvatarFallback>
                {user?.displayName?.toUpperCase()[0]}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent className="hidden lg:block">
          <p>Click to show menu</p>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent className="mr-4">
        <DropdownMenuLabel className="text-left">
          {user?.displayName && user.displayName}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <Link to={"/add-artifact"}>
          <DropdownMenuItem
            onClick={() => {
              setDrawerOpen(false);
            }}
            className="cursor-pointer flex items-center text-primary"
          >
            Add Artifact
            <FiPlus className="text-primary" />
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator className="w-4" />

        <Link to={"/my-profile"}>
          <DropdownMenuItem
            onClick={() => {
              setDrawerOpen(false);
            }}
            className="cursor-pointer flex items-center"
          >
            My Profile
            <FiUser />
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator className="w-4" />

        <Link to={"/my-artifacts"}>
          <DropdownMenuItem
            onClick={() => {
              setDrawerOpen(false);
            }}
            className="cursor-pointer flex items-center"
          >
            My Artifacts
            <FiBox />
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator className="w-4" />

        <Link to={"/liked-artifacts"}>
          <DropdownMenuItem
            onClick={() => {
              setDrawerOpen(false);
            }}
            className="cursor-pointer flex items-center pr-8 md:pr-10"
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
          <FiLogOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
  return (
    <header className="w-full border-b bg-background text-foreground sticky top-0 z-20">
      <div className="mx-auto max-w-screen-xl px-4 py-2 flex items-center justify-between">
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
            <>
              <NotificationBell />
              {profileDropDown}
            </>
          ) : (
            authButtons
          )}
          <ThemeToggle />
        </div>

        <div className="md:hidden flex gap-2 items-center">
          {loading ? (
            <LoaderSpinner size={18} />
          ) : (
            user && (
              <>
                <NotificationBell />
              </>
            )
          )}
          <Drawer
            open={drawerOpen}
            onOpenChange={setDrawerOpen}
            direction="left"
          >
            <DrawerTrigger>
              <div>
                <HiMenuAlt3 className="text-3xl" />
              </div>
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
              <DrawerFooter className="flex flex-row justify-end items-center">
                <span onClick={() => setDrawerOpen(false)}>
                  <ThemeToggle />
                </span>

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
