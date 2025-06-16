import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((res) => {
        console.log(res);
        alert();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Button
      onClick={handleGoogleSignIn}
      type="button"
      variant="outline"
      className="w-full cursor-pointer"
    >
      <FcGoogle /> Login with Google
    </Button>
  );
};

export default SocialLogin;
