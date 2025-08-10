import { Separator } from "@/components/ui/separator";
import { navItems } from "@/utils/navItems";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import { Link } from "react-router";
import Logo from "../Logo/Logo";

const Footer = () => {
  return (
    <footer className="bg-background border-t p-4 relative space-y-6 text-center md:text-left">
      <div className="max-w-screen-xl pt-10 mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        <div className="space-y-2 md:space-y-3 lg:space-y-4">
          <div className="h-14 md:h-16 w-fit mx-auto md:mx-0">
            <Logo />
          </div>
          <p className="text-sm leading-relaxed max-w-sm">
            Heritra is a social platform for sharing and exploring ancient
            artifacts. Interact with others, show your collection, and learn
            about history.
          </p>
          <div className="flex justify-center md:justify-start gap-4 mt-4  text-lg">
            <Link to={"https://www.facebook.com/ar.akib2d"} target="_blank">
              <FaFacebookF className="hover:text-accent transition duration-100 cursor-pointer" />
            </Link>
            <Link to={"https://www.instagram.com/_akibur_r/"} target="_blank">
              <FaInstagram className="hover:text-accent transition duration-100 cursor-pointer" />
            </Link>
            <Link to={"https://www.linkedin.com/in/akibur-r/"} target="_blank">
              <FaLinkedinIn className="hover:text-accent transition duration-100 cursor-pointer" />
            </Link>
            <Link to={"https://x.com/akibur_r"} target="_blank">
              <FaXTwitter className="hover:text-accent transition duration-100 cursor-pointer" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-end gap-6 md:gap-10">
          {/* Site Map */}
          <div>
            <h4 className="text-lg font-semibold mb-2 md:mb-4">Site Map</h4>
            <ul className="space-y-2 grid text-sm">{navItems}</ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-2 md:mb-4">Legal</h4>
            <ul className="space-y-2  text-sm">
              <li>
                <Link to={"/privacy-policy"}>Privacy Policy</Link>
              </li>
              <li>
                <Link to={"/terms-of-use"}>Terms of Use</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Separator className="opacity-20 bg-gray-600 dark:bg-gray-400" />

      {/* Bottom Strip */}
      <div className="text-center text-sm ">
        <p className="text-neutral-700 dark:text-neutral-300 space-x-1">
          <span>Copyright © 2025 by Heritra Heritage Archive Inc.</span>
          <span className="hidden lg:inline">All Rights Reserved.</span>
        </p>
        <p className="text-neutral-800 dark:text-neutral-200 space-x-1">
          <span>Developed with ❤️ by</span>
          <Link
            target="_blank"
            to={"https://akibur.web.app/"}
            className="font-semibold underline"
          >
            Akib
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
