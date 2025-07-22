import useCommentsApi from "@/api/commentsApi";
import LoaderSpinner from "@/components/shared/LoaderSpinner/LoaderSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import useCommentStore from "@/hooks/stores/commentStore";
import useAuth from "@/hooks/useAuth";
import { formatDistanceToNowStrict } from "date-fns";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const CommentSection = ({ artifact }) => {
  const { addNewComment, getComments } = useCommentsApi();
  const { user } = useAuth();
  const {
    comments,
    setComments,
    addNewComment: addNewCommmentToStore,
    loading,
    setLoading,
  } = useCommentStore();
  const [commentBtnLoading, setCommentBtnLoading] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      getComments(artifact._id)
        .then((res) => {
          setComments(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchComments().then(() => setLoading(false));
  }, []);

  const handleNewComment = (e) => {
    e.preventDefault();

    const form = e.target;

    const rawContent = form.content.value;
    const content = rawContent
      .split("\n")
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    if (!content.length) {
      toast.error("Failed to comment", {
        description: "You must write something.",
      });

      return;
    }

    setCommentBtnLoading(true);

    const newComment = {
      artifactId: artifact._id,
      userEmail: user.email,
      userName: user.displayName,
      content,
      parentId: null,
      createdAt: new Date().toISOString(),
    };

    addNewComment(newComment)
      .then((res) => {
        console.log(res);
        if (res.insertedId) {
          toast.success("Comment Added");
          addNewCommmentToStore(newComment);
          setCommentBtnLoading(false);
        } else {
          toast.error("Failed to add comment", {
            description: "Something went wrong",
          });
          setCommentBtnLoading(false);
        }
      })
      .catch((err) => {
        toast.error("Failed to add comment", {
          description: "Something went wrong",
        });
        console.log(err);
        setCommentBtnLoading(false);
      });
  };

  return (
    <section className="space-y-2">
      <header className="text-center md:text-left">
        <h3 className="font-cinzel font-medium text-primary text-lg md:text-xl">
          Comments
        </h3>
      </header>
      <main className="space-y-4">
        {loading ? (
          <LoaderSpinner />
        ) : (
          <>
            <section className="space-y-3">
              {!comments.length ? (
                <>No comments yet</>
              ) : (
                comments.map((comment) => (
                  <>
                    <Card className="rounded-xs bg-transparent border-0 p-0 gap-1">
                      <CardHeader className="p-0">
                        <CardTitle>
                          {comment.userName}{" "}
                          {comment.userEmail === artifact.userEmail && (
                            <Badge className="bg-secondary/20 text-foreground border border-secondary/40">
                              Owner
                            </Badge>
                          )}
                          {comment.userEmail === user.email && (
                            <Badge className="bg-secondary/20 text-foreground border border-secondary/40">
                              You
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="text-xs">
                          {formatDistanceToNowStrict(comment.createdAt) +
                            " ago"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        {comment.content.map((c) => (
                          <p>{c}</p>
                        ))}
                      </CardContent>
                    </Card>

                    <Separator />
                  </>
                ))
              )}
            </section>
            <Card className="rounded-xs bg-card/20 p-2 gap-0">
              <CardHeader className="p-2">
                <CardTitle>Add a Comment</CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <form
                  onSubmit={handleNewComment}
                  className="text-left space-y-2"
                >
                  {/* content */}
                  <div className="md:col-span-2 grid gap-2">
                    <Textarea
                      id="content"
                      name="content"
                      placeholder="I like the..."
                      className="text-sm md:text-md"
                    />
                  </div>

                  {/* submit btn */}
                  <Button type="submit" className="md:col-span-2 w-fit">
                    {commentBtnLoading ? <LoaderSpinner /> : "Comment"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </section>
  );
};

export default CommentSection;
