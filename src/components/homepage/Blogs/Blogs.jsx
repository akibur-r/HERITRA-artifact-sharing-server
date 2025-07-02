import blogs from "@/assets/docs/blogsList.json";
import BlogCard from "@/components/shared/blogCard/BlogCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const Blogs = () => {
  return (
    <section className="bg-secondary py-10 my-10">
      <div className="max-w-screen-xl mx-auto px-4 space-y-6">
        <header>
          <h1 className="font-cinzel text-2xl font-medium">Tales & Texts</h1>
          <p className="opacity-70">Helpful and interesting articles</p>
        </header>

        <main className="space-y-4">
          {blogs.slice(0, 2).map((blog, idx) => (
            <BlogCard
              key={idx}
              blog={blog}
              orientation={idx === 1 ? "r-to-l" : "l-to-r"}
            />
          ))}
        </main>

        <footer className="flex justify-center">
          <Link to={'/learn'}>
            <Button variant={"outline"} className="cursor-pointer font-cinzel">
              View More
            </Button>
          </Link>
        </footer>
      </div>
    </section>
  );
};

export default Blogs;
