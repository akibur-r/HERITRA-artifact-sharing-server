import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import useArtifactsApi from "@/api/artifactsApi";
import { Button } from "@/components/ui/button";
import { BiTrashAlt } from "react-icons/bi";
import { useNavigate } from "react-router";

const DeleteArtifactButton = ({ artifact }) => {
  const { deleteArtifactPromise } = useArtifactsApi();
  const navigate = useNavigate();

  const handleDeleteArtifact = () => {
    deleteArtifactPromise(artifact._id)
      .then((res) => {
        console.log(res);
        navigate("/my-artifacts");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          onClick={handleDeleteArtifact}
          variant={"secondary"}
          size={"sm"}
          className="rounded-xs bg-red-500/50 hover:bg-red-500/15 hover:text-red-500 cursor-pointer text-base-content border border-red-500/20"
        >
          <BiTrashAlt />
          <span>Delete</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Delete This Artifact</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default DeleteArtifactButton;
