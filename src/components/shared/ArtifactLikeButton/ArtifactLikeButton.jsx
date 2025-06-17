import useUsersApi from "@/api/usersApi";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { BiLike } from "react-icons/bi";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";

const ArtifactLikeButton = ({ liked, setLiked, artifact }) => {
  const { checkIfLikedPromise, updateLikePromise } = useUsersApi();
  const { user } = useAuth();

  const [likeBtnLoading, setLikeBtnLoading] = useState(false);
  const [totalLikes, setTotalLikes] = useState(artifact.likeCount);

  useEffect(() => {
    checkIfLikedPromise(artifact._id, user.email)
      .then((res) => {
        setLiked(res);
        setLikeBtnLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLikeBtnLoading(false);
      });
  }, [liked, totalLikes]);

  const handleLike = () => {
    setLikeBtnLoading(true);

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
  };

  return (
    <Button
      onClick={handleLike}
      variant={"secondary"}
      size={"sm"}
      className={`rounded-xs ${
        liked
          ? "bg-green-500/50 hover:bg-green-500/5 hover:text-green-500"
          : "bg-green-500/5 hover:bg-green-500/50"
      }  cursor-pointer text-base-content border border-green-500/20`}
    >
      {likeBtnLoading ? (
        <>
          <LoaderSpinner />
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
