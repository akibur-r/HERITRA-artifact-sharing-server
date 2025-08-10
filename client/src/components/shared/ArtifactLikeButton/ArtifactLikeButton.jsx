import useUsersApi from "@/api/usersApi";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";
import { toast } from "sonner";

const ArtifactLikeButton = ({
  size="sm",
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
          // console.log(err);
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
          // console.log(err);
          setLikeBtnLoading(false);
        });
    } else {
      toast.error("Failed to Like.", {
        description: "You must be logged in to like an artifact",
      });
      setLikeBtnLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLike}
      variant={"secondary"}
      size={size}
      className={`border border-emerald-500/20 cursor-pointer ${
        liked
          ? "bg-emerald-500/50 hover:bg-emerald-500/15 hover:text-emerald-500 text-black dark:text-white"
          : "hover:bg-emerald-500/50 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 hover:text-black dark:hover:text-white"
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
