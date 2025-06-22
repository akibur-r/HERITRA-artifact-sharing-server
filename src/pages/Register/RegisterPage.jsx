import useAuthUserApi from "@/api/authUserApi";
import SocialLogin from "@/components/auth/SocialLogin";
import Loader from "@/components/shared/LoaderSpinner/LoaderSpinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import useAuth from "@/hooks/useAuth";
import useDynamicTitle from "@/hooks/useDynamicTitle";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

const RegisterPage = () => {
  useDynamicTitle("Register");
  const {
    loading,
    setLoading,
    createUser,
    updateUser,
    setUser,
    logOut,
    deleteUserFromFirebase,
  } = useAuth();
  const { addUserPromise } = useAuthUserApi();

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;
    const gender = form.gender.value || "unspecified";

    const passRegex = /(?=.*[a-z])(?=.*[A-Z]).{6,}/;

    if (!passRegex.test(password)) {
      toast.error("Failed to Register.", {
        description:
          "Password must be at least 6 characters long with minimum 1 digit.",
      });
      return;
    }

    createUser(email, password)
      .then((res) => {
        const user = res.user;
        updateUser({ displayName: name, photoURL: photoURL, gender: gender })
          .then(() => {
            addUserPromise({ email: email, gender: gender, likes: [] })
              .then((res) => {
                toast.success("Account created successfully", {
                  description: "You can now access exclusive contents.",
                });
                setLoading(false);
                navigate("/");
              })
              .catch((err) => {
                deleteUserFromFirebase()
                  .then((res) => {
                    toast.error("Something Went Wrong", {
                      description:
                        "There was a problem while creating your account.",
                    });
                  })
                  .catch(() => {});
                setLoading(false);
              });
          })
          .catch((err) => {
            // console.log(err);
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
      <form onSubmit={handleRegister} className="w-full max-w-xl">
        <Card className="rounded-xs">
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <div className="md:col-span-2 grid gap-2">
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

              <div className="grid gap-2">
                <Label htmlFor="gender">Gender</Label>
                <Select name="gender">
                  <SelectTrigger className="w-full">
                    <SelectValue
                      className="text-sm md:text-md"
                      placeholder="Select Gender (Optional)"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"male"} className="text-sm md:text-md">
                      Male
                    </SelectItem>
                    <SelectItem value={"female"} className="text-sm md:text-md">
                      Female
                    </SelectItem>
                    <SelectItem
                      value={"prefersNotToSay"}
                      className="text-sm md:text-md"
                    >
                      Prefer Not to Say
                    </SelectItem>
                  </SelectContent>
                </Select>
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
