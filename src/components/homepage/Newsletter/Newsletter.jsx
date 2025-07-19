import NewsletterBG from "@/assets/vectors/newletter_bg.svg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useRef, useState } from "react";
import { toast } from "sonner";

const Newsletter = () => {
  const newsletterEmailRef = useRef();
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubscribe = (e) => {
    e.preventDefault();
    const email = newsletterEmailRef.current.value;
    if (!email) {
      toast.error("Subscription Failed", {
        description: "Please provide your email.",
      });

      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
      toast.success("Subscribed", {
        description: "You'll receive regular updates from now on.",
      });
      newsletterEmailRef.current.value = "";
      setSubscribed(true);
    } else {
      toast.error("Subscription Failed", {
        description: "You must provide a valid email.",
      });
    }
  };

  return (
    <section className={`max-w-screen-xl mx-auto px-4 my-10 space-y-10 relative`}>
      <div className="absolute z-0 right-0 opacity-10 hidden md:block">
        <img src={NewsletterBG} className="h-full w-full right-0  " />
      </div>
      <Separator className="opacity-50" />
      <main className="flex flex-col md:flex-row gap-4 md:gap-16 justify-between items-end z-10 relative">
        <div className="text-center md:text-left">
          <h2 className="font-cinzel font-medium text-3xl md:text-3xl lg:text-6xl flex flex-col">
            <span className="text-[0.85em]">Want to</span>{" "}
            <span className="text-accent">Stay Updated?</span>
          </h2>
          <p className="text-neutral-800 dark:text-neutral-300 space-x-1 max-w-sm">
            <span>Receive highlights about artifacts by email every</span>
            <span className="font-medium">Sunday.</span>
          </p>
        </div>

        <div className="text-center space-y-2 flex justify-center flex-col md:items-end w-full">
          <h3 className="font-cinzel font-medium space-x-1">
            <span>Subscribe to our</span>
            <span className="text-accent">Newsletter</span>
          </h3>
          <form
            onSubmit={handleNewsletterSubscribe}
            className="flex w-full max-w-sm items-center gap-1"
          >
            {subscribed ? (
              <>
                <Badge className="w-full bg-emerald-200 dark:bg-emerald-800 rounded-xs text-foreground py-2">
                  Subscribed!
                </Badge>
              </>
            ) : (
              <>
                <Input
                  ref={newsletterEmailRef}
                  type="text"
                  placeholder="yourmail@email.com"
                  className="text-sm outline-0 border focus:!border-background focus:!ring-1"
                />
                <Button type="submit" variant="outline">
                  Subscribe
                </Button>
              </>
            )}
          </form>
        </div>
      </main>
    </section>
  );
};

export default Newsletter;
