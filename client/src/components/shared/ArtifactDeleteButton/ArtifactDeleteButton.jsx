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
import { BiCheck, BiTrashAlt } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";

const ArtifactDeleteButton = ({
  deleted = false,
  setDeleted = (val) => {},
  artifact,
  showText = true,
}) => {
  const { deleteArtifactPromise } = useArtifactsApi();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [deleteBtnLoading, setDeleteBtnLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const location = useLocation();

  const handleDeleteArtifact = () => {
    setDeleteBtnLoading(true);
    deleteArtifactPromise(artifact._id)
      .then((res) => {
        if (res.deletedCount) {
          toast.success("Deleted", {
            description: "The artifact is removed from the server.",
          });
          setDeleteBtnLoading(false);
          if (location.pathname !== "/my-artifacts") {
            navigate("/explore");
          } else {
            navigate("/my-artifacts");
          }
          setDeleted(true);
          setDialogOpen(false);
        } else {
          toast.error("Not Deleted", {
            description: "There was an error while deleting this artifact.",
          });
          setDeleteBtnLoading(false);
          setDialogOpen(false);
        }
      })
      .catch(() => {
        toast.error("Not Deleted", {
          description: "There was an error while deleting this artifact.",
        });
        setDeleteBtnLoading(false);
        setDialogOpen(false);
      });
  };

  return (
    <Dialog open={dialogOpen && !deleted} onOpenChange={setDialogOpen}>
      <DialogTrigger>
        <Button
          disabled={deleted}
          variant={"secondary"}
          size={"sm"}
          className="rounded-xs bg-red-500/50 hover:bg-red-500/15 hover:text-red-500 cursor-pointer text-base-content border border-red-500/20"
        >
          {deleteBtnLoading ? (
            <LoaderSpinner size={12} />
          ) : (
            <>
              {deleted ? <BiCheck /> : <BiTrashAlt />}
              {showText && <span>Delete</span>}
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-xs" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription className="max-w-sm">
            This action cannot be undone. This will permanently delete{" "}
            <span className="text-accent font-semibold">{artifact.name}</span>{" "}
            from our servers.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button
            onClick={handleDeleteArtifact}
            variant={"default"}
            className="bg-red-500/70 hover:bg-red-500/80 text-base-content"
          >
            {deleteBtnLoading ? <LoaderSpinner /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ArtifactDeleteButton;
