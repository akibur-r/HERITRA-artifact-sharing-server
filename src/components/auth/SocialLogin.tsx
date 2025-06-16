import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
const SocialLogin = () => {
  return (
    <Button variant="outline" className="w-full cursor-pointer">
      <FcGoogle /> Login with Google
    </Button>
  );
};

export default SocialLogin;
