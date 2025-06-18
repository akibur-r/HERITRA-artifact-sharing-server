import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Blogs = () => {
  const blog = {
    title: "Glossary of Terms",
    description:
      "Confused by words like stratigraphy or provenance? This glossary breaks down common archaeological and historical terms to help you better understand the artifacts you explore on Heritra.",
    image: "/images/blogs/glossary.jpg",
    author: "Heritra Editorial",
    publishedDate: "2025-06-16",
    category: "help",
  };

  return (
    <section className="bg-secondary py-10 my-10">
      <div className="max-w-screen-xl mx-auto px-4 space-y-6">
        <header>
          <h1 className="font-cinzel text-2xl font-medium">Tales & Texts</h1>
          <p className="opacity-70">Helpful and interesting articles</p>
        </header>

        <main className="space-y-4">
          <Card className="rounded-none shadow-none bg-transparent">
            <CardHeader>
              <CardTitle className="font-cinzel flex flex-col md:flex-row items-center gap-2">
                <span>{blog.title}</span>
                <span className="w-8 h-px bg-white/70"></span>
                <span className="text-sm font-normal">
                  Published: {blog.publishedDate}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row gap-4 justify-between w-full h-40 md:h-32">
              <p className="lg:w-7/12 space-y-2 text-center md:text-left">
                <div>{blog.description}</div>
                <div className="opacity-80">
                  Published By:{" "}
                  <span className="font-semibold">{blog.author}</span>
                </div>
              </p>
              <div className="hidden lg:block h-full w-56">
                <img
                  className="h-full w-full object-cover rounded-sm  border border-primary/20"
                  src="https://i.postimg.cc/59v3kGcf/blog.png"
                  alt=""
                />
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-none shadow-none bg-transparent">
            <CardHeader>
              <CardTitle className="font-cinzel flex flex-col md:flex-row justify-end items-center gap-2">
                <span>{blog.title}</span>
                <span className="w-8 h-px bg-white/70"></span>
                <span className="text-sm font-normal">
                  Published: {blog.publishedDate}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row-reverse gap-4 justify-between w-full h-40 md:h-32">
              <p className="lg:w-7/12 space-y-2 text-center md:text-left">
                <div>{blog.description}</div>
                <div className="opacity-80">
                  Published By:{" "}
                  <span className="font-semibold">{blog.author}</span>
                </div>
              </p>
              <div className="hidden lg:block h-full w-56">
                <img
                  className="h-full w-full object-cover rounded-sm  border border-primary/20"
                  src="https://i.postimg.cc/59v3kGcf/blog.png"
                  alt=""
                />
              </div>
            </CardContent>
          </Card>
        </main>

        <footer className="flex justify-center">
          <Button
            variant={"outline"}
            className="cursor-pointer font-cinzel"
          >
            Explore More
          </Button>
        </footer>
      </div>
    </section>
  );
};

export default Blogs;
