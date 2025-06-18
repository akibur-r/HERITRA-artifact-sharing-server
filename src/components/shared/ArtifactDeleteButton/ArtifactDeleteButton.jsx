import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import useArtifactsApi from "@/api/artifactsApi";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BiTrashAlt } from "react-icons/bi";
import { useNavigate } from "react-router";

const ArtifactDeleteButton = ({ artifact }) => {
  const { deleteArtifactPromise } = useArtifactsApi();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleDeleteArtifact = () => {
    deleteArtifactPromise(artifact._id)
      .then((res) => {
        console.log(res);
        navigate("/all-artifacts");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Tooltip>
      <TooltipTrigger>
        <Dialog>
          <DialogTrigger>
            <Button
              variant={"secondary"}
              size={"sm"}
              className="rounded-xs bg-red-500/50 hover:bg-red-500/15 hover:text-red-500 cursor-pointer text-base-content border border-red-500/20"
            >
              <BiTrashAlt />
              <span>Delete</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-xs" showCloseButton={false}>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant={"outline"} className="rounded-xs">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                onClick={handleDeleteArtifact}
                variant={"default"}
                className="rounded-xs bg-red-500/70 hover:bg-red-500/80 text-base-content"
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TooltipTrigger>
      <TooltipContent>
        <p>Delete This Artifact</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default ArtifactDeleteButton;
