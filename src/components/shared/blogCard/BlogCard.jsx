import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BlogCard = ({ blog, orientation = "l-to-r" }) => {
  const isLTR = orientation === "l-to-r";
  const contentDirection = isLTR ? "md:flex-row" : "md:flex-row-reverse";
  const titleAlignment = isLTR ? "md:justify-start" : "md:justify-end";

  return (
    <Card className="rounded-none shadow-none bg-transparent">
      <CardHeader>
        <CardTitle className={`font-cinzel flex flex-col md:flex-row items-center gap-2 ${titleAlignment}`}>
          <span>{blog.title}</span>
          <span className="w-8 h-px bg-white/70"></span>
          <span className="text-sm font-normal">Published: {blog.publishedDate}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className={`flex flex-col ${contentDirection} gap-4 justify-between w-full h-40 md:h-32`}>
        <div className="lg:w-7/12 space-y-2 text-center md:text-left">
          <p>{blog.description}</p>
          <p className="opacity-80 space-x-1">
            <span>Published By:</span>
            <span className="font-semibold">{blog.author}</span>
          </p>
        </div>
        <div className="hidden lg:block h-full w-56">
          <img
            className="h-full w-full object-cover rounded-sm border border-primary/20"
            src="https://i.postimg.cc/59v3kGcf/blog.png"
            alt="Blog"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
