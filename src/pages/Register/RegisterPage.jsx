import SocialLogin from "@/components/auth/SocialLogin";
import Loader from "@/components/shared/LoaderSpinner/LoaderSpinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import useAuth from "@/hooks/useAuth";
import useDynamicTitle from "@/hooks/useDynamicTitle";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

const RegisterPage = () => {
  useDynamicTitle("Register")
  const { loading, setLoading, createUser, updateUser, setUser } = useAuth();

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;

    const passRegex = /(?=.*[a-z])(?=.*[A-Z]).{6,}/;

    if (!passRegex.test(password)) {
      console.log(
        "Password must be at least 6 characters long, with at least one uppercase and one lowercase letter."
      );
      return;
    }

    createUser(email, password)
      .then((res) => {
        const user = res.user;
        updateUser({ displayName: name, photoURL: photoURL })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photoURL });

            toast.success("Account created successfully", {
              description: "You can now access private routes.",
            });
            setLoading(false);
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
            toast.error("Something Went Wrong", {
              description: "There was a problem while creating your account.",
            });
          });
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Something Went Wrong", {
          description: "There was a problem while creating your account.",
        });
      });
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center my-10 max-w-screen-xl mx-auto px-4">
      <div className="max-w-sm px-4 text-center">
        <h2 className="text-3xl font-cinzel font-bold">Register</h2>
        <p className="text-sm">
          Create an account with valid credentials and get access to exciting
          features.
        </p>
      </div>
      <form onSubmit={handleRegister} className="w-full max-w-sm">
        <Card>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Abdul Kuddus"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="yourmail@email.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="photoURL">Photo</Label>
                <Input
                  id="photoURL"
                  type="text"
                  placeholder="Photo URL"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Your Password"
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <div className="w-full space-y-1">
              <Button type="submit" className="w-full cursor-pointer">
                {loading ? <Loader /> : "Register"}
              </Button>
              <p className="text-sm">
                Already have an account?{" "}
                <Link to={"/sign-in"} className="underline text-accent">
                  Sign In
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

export default RegisterPage;
