import BlogCard from "@/components/shared/blogCard/BlogCard";
import { Button } from "@/components/ui/button";

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
          <BlogCard blog={blog}/>
          <BlogCard blog={blog} orientation="r-to-l"/>
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
