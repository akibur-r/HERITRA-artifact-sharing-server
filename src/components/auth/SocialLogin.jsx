import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";
import { toast } from "sonner";
const SocialLogin = ({ location }) => {
  const { signInWithGoogle, setLoading } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        toast.success("Signed In");
        setLoading(false);

        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch(() => {
        toast.error("Google Sign In Failed", {
          description: "There was a problem while signin in with Google.",
        });
        setLoading(false);
      });
  };

  return (
    <Button
      onClick={handleGoogleSignIn}
      type="button"
      variant="outline"
      className="w-full cursor-pointer rounded-xs"
    >
      <FcGoogle /> Login with Google
    </Button>
  );
};

export default SocialLogin;
