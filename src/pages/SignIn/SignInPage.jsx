import SocialLogin from "@/components/auth/SocialLogin";
import Loader from "@/components/shared/LoaderSpinner/LoaderSpinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import useAuth from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

const SignInPage = () => {
  const { signIn, setLoading, loading } = useAuth();

  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();

    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then(() => {
        setLoading(false);
        toast.success('Signed In Successfully', {
          description: "You can now access private features"
        })
        navigate('/');
      })
      .catch((err) => {
        setLoading(false);
        toast.error('Login Failed', {
          description: "Something went wrong while loggin in"
        })
      });
  };
  return (
    <div className="flex flex-col gap-4 justify-center items-center my-10 max-w-screen-xl mx-auto px-4">
      <div className="max-w-sm text-center">
        <h2 className="text-3xl font-cinzel font-bold">Login</h2>
        <p className="text-sm">
          Enter your Email and Password to login to your account.
        </p>
      </div>
      <form onSubmit={handleSignIn} className="w-full max-w-sm">
        <Card>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <div className="w-full space-y-1">
              <Button type="submit" className="w-full">
                {loading? <Loader/> : "Sign In"}
              </Button>
              <p className="text-sm">
                Don't have an account?{" "}
                <Link to={"/register"} className="underline text-accent">
                  Register
                </Link>
              </p>
            </div>
            <Separator className="my-4" />
            <SocialLogin />
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default SignInPage;
