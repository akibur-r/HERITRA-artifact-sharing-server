import SocialLogin from "@/components/auth/SocialLogin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router";

const SignInPage = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center my-10 max-w-screen-2xl mx-auto px-4">
      <div className="max-w-sm text-center">
        <h2 className="text-3xl font-cinzel font-bold">Login</h2>
        <p className="text-sm">
          Enter your Email and Password to login to your account.
        </p>
      </div>
      <Card className="w-full max-w-sm">
        {/* <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader> */}
        <CardContent>
          <form>
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
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <div className="w-full space-y-1">
            <Button type="submit" className="w-full">
              Login
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
    </div>
  );
};

export default SignInPage;
