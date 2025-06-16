import lightModeLogo from "@/assets/images/logo_black.png";
import darkModeLogo from "@/assets/images/logo_white.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to={"/"} className="text-xl font-bold">
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
  );
};

export default Logo;
