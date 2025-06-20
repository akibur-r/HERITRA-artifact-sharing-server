import useAuthUserApi from "@/api/authUserApi";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";
import { toast } from "sonner";
const SocialLogin = ({ location }) => {
  const { signInWithGoogle, setLoading } = useAuth();
  const navigate = useNavigate();

  const { addUserPromise } = useAuthUserApi();

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((res) => {
        const email = res.user.email;

        addUserPromise({ email: email, gender: "unspecified", likes: [] })
          .then((res) => {
            toast.success("Signed In Successfully.", {
              description: "You can now access exclusive features.",
            });
            setLoading(false);
            navigate(`${location.state ? location.state : "/"}`);
          })
          .catch((err) => {
            toast.error("Google Sign In Failed", {
              description: "Something went wrong.",
            });
            setLoading(false);
          });
      })
      .catch(() => {
        toast.error("Google Sign In Failed", {
          description: "Something went wrong.",
        });
        setLoading(false);
      });
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
