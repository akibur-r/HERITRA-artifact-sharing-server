import useUsersApi from "@/api/usersApi";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";
import { toast } from "sonner";

const ArtifactLikeButton = ({
  liked = false,
  setLiked,
  artifact,
  showText = true,
  disabled = false,
}) => {
  const { checkIfLikedPromise, updateLikePromise } = useUsersApi();
  const { user } = useAuth();

  const [likeBtnLoading, setLikeBtnLoading] = useState(false);
  const [totalLikes, setTotalLikes] = useState(artifact.likeCount);

  useEffect(() => {
    if (user) {
      checkIfLikedPromise(artifact._id, user.email)
        .then((res) => {
          setLiked(res);
          setLikeBtnLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLikeBtnLoading(false);
        });
    }
  }, [liked, totalLikes, user]);

  const handleLike = () => {
    setLikeBtnLoading(true);

    if (user) {
      updateLikePromise(artifact._id, user.email)
        .then((res) => {
          if (res?.likeAdded) {
            setLiked(true);
            setTotalLikes(totalLikes + 1);
          } else {
            setLiked(false);
            setTotalLikes(totalLikes - 1);
          }

          setLikeBtnLoading(false);
        })
        .catch((err) => {
          toast.error("Failed", { description: "Something went wrong." });
          console.log(err);
          setLikeBtnLoading(false);
        });
    } else {
      toast.error("Like Not Added.", {
        description: "You must be logged in to like an artifact",
      });
      setLikeBtnLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLike}
      variant={"secondary"}
      size={"sm"}
      className={`border border-green-500/20 cursor-pointer ${
        liked
          ? "bg-green-500/50 hover:bg-green-500/15 hover:text-green-500 text-black dark:text-white"
          : "hover:bg-green-500/50 bg-green-500/15 text-green-700 dark:text-green-300 hover:text-black dark:hover:text-white"
      }`}
      disabled={disabled}
    >
      {likeBtnLoading ? (
        <>
          <LoaderSpinner size={16} />
        </>
      ) : (
        <>
          {liked ? <AiFillLike /> : <AiOutlineLike />}
          <span>
            {totalLikes} {showText && "Likes"}
          </span>
        </>
      )}
    </Button>
  );
};

export default ArtifactLikeButton;
