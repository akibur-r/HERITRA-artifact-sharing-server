import blogs from "@/assets/docs/blogsList.json";
import BlogCard from "@/components/shared/blogCard/BlogCard";
const BlogPage = () => {
  return (
    <section className="my-10 max-w-screen-xl mx-auto px-4">
      <header className="max-w-sm text-center mx-auto">
        <h2 className="text-3xl font-cinzel font-bold">Heritra Blog</h2>
        <p className="text-sm">
          Informative facts and articles about artifacts
        </p>
      </header>
      <main className="w-full space-y-4 mt-8">
        {
            blogs.map((blog)=><BlogCard blog={blog}/>)
        }
      </main>
    </section>
  );
};

export default BlogPage;
