import useUsersApi from "@/api/usersApi";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { BiLike } from "react-icons/bi";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";

const ArtifactLikeButton = ({ liked = false, setLiked, artifact }) => {
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
          console.log(err);
          setLikeBtnLoading(false);
        });
    } else {
      setLikeBtnLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLike}
      variant={"secondary"}
      size={"sm"}
      className={`rounded-xs border border-green-500/20 cursor-pointer ${
        liked
          ? "bg-green-500/50 hover:bg-green-500/15 hover:text-green-500 text-black dark:text-white"
          : "hover:bg-green-500/50 bg-green-500/15 text-green-700 dark:text-green-300 hover:text-black dark:hover:text-white"
      }`}
    >
      {likeBtnLoading ? (
        <>
          <LoaderSpinner size={16} />
        </>
      ) : (
        <>
          <BiLike />
          <span>{totalLikes} Likes</span>
        </>
      )}
    </Button>
  );
};

export default ArtifactLikeButton;
