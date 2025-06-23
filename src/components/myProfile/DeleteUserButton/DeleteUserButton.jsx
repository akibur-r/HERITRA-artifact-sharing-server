import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";

import useUsersApi from "@/api/usersApi";
import LoaderSpinner from "@/components/shared/LoaderSpinner/LoaderSpinner";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import { BiCheck, BiTrashAlt } from "react-icons/bi";
import { BsEmojiFrown } from "react-icons/bs";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const DeleteUserButton = ({ showText = true }) => {
  const [open, setOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [deleteBtnLoading, setDeleteBtnLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { deleteUserPromise } = useUsersApi();
  const { deleteUserFromFirebase, logOut } = useAuth();
  const navigate = useNavigate();

  const handleDeleteUser = () => {
    setDeleteBtnLoading(true);

    deleteUserPromise()
      .then((res) => {
        if (res) {
          deleteUserFromFirebase()
            .then(() => {
              toast.success("Account Deleted.", {
                description: "All of your data is deleted from our server.",
              });
              navigate("/");
            })
            .catch((err) => {
              if (err.code === "auth/requires-recent-login") {
                toast.warning("Account Not Deleted.", {
                  description:
                    "Sign in and try again. This is to verify your identity.",
                });
                logOut();
              } else {
                toast.error("Account Not Deleted.", {
                  description:
                    "Something went wrong. You might have lost some data.",
                });
              }
            })
            .finally(() => {
              setDeleteBtnLoading(false);
              setDialogOpen(false);
            });
        } else {
          toast.error("Account Not Deleted.", {
            description: "Something went wrong.",
          });

          setDeleteBtnLoading(false);
          setDialogOpen(false);
        }
      })
      .catch(() => {
        toast.error("Account Not Deleted.", {
          description: "Something went wrong.",
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
        <DialogDescription>
          <Card className="w-full max-w-sm rounded-xs shadow-none text-center bg-accent/5">
            <CardHeader>
              <div className="flex justify-center">
                <BsEmojiFrown className="text-6xl text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-2xl font-cinzel">
                We're Sorry
              </CardTitle>
              <CardDescription>
                Losing you is the last thing on earth we want.
              </CardDescription>
            </CardContent>
            <DialogDescription className="max-w-sm px-4">
              <div className="font-medium">Keep in mind...</div>
              <span className="text-destructive text-xs">
                This is an irreversible action. You will permanently lose all of
                your data from our servers.
              </span>
            </DialogDescription>
          </Card>
        </DialogDescription>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"default"} className="text-background">
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleDeleteUser}
            variant={"outline"}
            className="text-destructive hover:text-destructive/80 hover:bg-destructive/30"
          >
            {deleteBtnLoading ? <LoaderSpinner /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserButton;
