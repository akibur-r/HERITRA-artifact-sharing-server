import ErrorPageDarkBackground from "@/assets/vectors/error_bg_dark.svg";
import ErrorPageLightBackground from "@/assets/vectors/error_bg_light.svg";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useDynamicTitle from "@/hooks/useDynamicTitle";
import { MdOutlineSentimentVeryDissatisfied } from "react-icons/md";
import { Link } from "react-router";

const ErrorPage = () => {
  useDynamicTitle("Error 404");
  return (
    <section className="relative flex flex-col gap-4 justify-center items-center w-screen h-screen overflow-hidden">
      <img
        src={ErrorPageLightBackground}
        className="dark:hidden absolute -z-10 h-full w-full opacity-20"
        alt=""
      />
      <img
        src={ErrorPageDarkBackground}
        className="hidden dark:block absolute -z-10 h-full w-full opacity-20"
        alt=""
      />
      <div className="p-2 w-full flex justify-center ">
        <Card className="w-full max-w-sm text-center bg-foreground/5 dark:bg-background/50 rounded-xs">
        <CardHeader>
          <div className="flex justify-center">
            <MdOutlineSentimentVeryDissatisfied className="text-9xl text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-4xl font-cinzel text-accent">You're Lost</CardTitle>
          <CardDescription className="opacity-70">
            The page you're searching is not found.
          </CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between gap-2">
          <Link to={"/"} >
            <Button variant={"link"} className="underline rounded-xs">
              Go to Homepage
            </Button>
          </Link>
          
          <Link to={-1} >
            <Button variant={"default"} className="rounded-xs">
              Go Back
            </Button>
          </Link>

          
        </CardFooter>
      </Card>
      </div>
    </section>
  );
};

export default ErrorPage;
