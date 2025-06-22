import { Button } from "@/components/ui/button";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import useArtifactsApi from "@/api/artifactsApi";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { artifactErrorMessages } from "@/utils/artifactErrorMessages";
import { artifactTypes } from "@/utils/artifactTypes";
import { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { toast } from "sonner";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";

const ArtifactUpdateButton = ({
  artifact,
  updateBtnLoading,
  setUpdateBtnLoading,
  showText = true,
  disabled = false,
}) => {
  const [updateConfirmLoading, setUpdateConfirmLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { updateArtifactPromise } = useArtifactsApi();

  const handleArtifactUpdate = (e) => {
    e.preventDefault();
    setUpdateBtnLoading(true);
    setUpdateConfirmLoading(true);
    try {
      const form = e.target;

      const formData = new FormData(form);
      const updatedArtifact = Object.fromEntries(formData.entries());

      for (const [key, value] of Object.entries(updatedArtifact)) {
        if (!value) {
          setUpdateBtnLoading(false);
          setUpdateConfirmLoading(false);

          toast.error("Not Saved.", {
            description: artifactErrorMessages[key],
          });
          return;
        }
      }

      const validUrlRegex =
        /^https?:\/\/(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;

      if (!validUrlRegex.test(updatedArtifact.imageURL)) {
        toast.error("Not Saved.", {
          description: "You must provide a valid image URL.",
        });
        setUpdateBtnLoading(false);
        setUpdateConfirmLoading(false);

        return;
      }

      updateArtifactPromise(artifact._id, updatedArtifact)
        .then((res) => {
          // console.log(res);
          if (res.modifiedCount) {
            toast.success("Changes Saved", {
              description: "The artifact has been updated",
            });
            setDialogOpen(false);
            setUpdateBtnLoading(false);
            setUpdateConfirmLoading(false);
          } else {
            toast.warning("Changes Not Saved", {
              description: "There was no change made.",
            });
            setUpdateBtnLoading(false);
            setUpdateConfirmLoading(false);
          }
        })
        .catch(() => {
          toast.error("Changes Not Saved", {
            description: "Something went wrong.",
          });
          setUpdateBtnLoading(false);
          setDialogOpen(false);
          setUpdateConfirmLoading(false);
        });
    } catch (err) {
      toast.error("Changes Not Saved", {
        description: "Something went wrong.",
      });
      setUpdateBtnLoading(false);
      setDialogOpen(false);
      setUpdateConfirmLoading(false);
    }
  };

  return disabled ? (
    <>
      <Button
        type="button"
        variant={"secondary"}
        size={"sm"}
        className=" bg-yellow-500/50 hover:bg-yellow-500/15 hover:text-yellow-500 cursor-pointer text-base-content border border-yellow-500/20"
        disabled
      >
        {updateBtnLoading ? (
          <LoaderSpinner />
        ) : (
          <>
            <BiEditAlt />
            {showText && <span>Update</span>}
          </>
        )}
      </Button>
    </>
  ) : (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant={"secondary"}
          size={"sm"}
          className=" bg-yellow-500/50 hover:bg-yellow-500/15 hover:text-yellow-500 cursor-pointer text-base-content border border-yellow-500/20"
        >
          {updateBtnLoading ? (
            <LoaderSpinner />
          ) : (
            <>
              <BiEditAlt />
              {showText && <span>Update</span>}
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-xs" showCloseButton={false}>
        <form className="flex flex-col gap-4" onSubmit={handleArtifactUpdate}>
          <DialogHeader>
            <DialogTitle className="font-cinzel">Update Artifact</DialogTitle>
            <DialogDescription>
              <p className="text-xs">
                <span>
                  Edit your artifact details here. Click save when you&apos;re
                  done.
                </span>{" "}
                <span className="text-accent">Scroll to view more</span>
              </p>
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[50vh] lg:max-h-[60vh] w-full md:w-[70vw] pr-2 md:pr-4">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10">
              {/* name */}
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  name="name"
                  id="name"
                  type="text"
                  placeholder="Artifact Name"
                  className="text-sm md:text-md"
                  defaultValue={artifact.name}
                  /*required*/
                />
              </div>

              {/* type */}
              <div className="grid gap-2">
                <Label htmlFor="type">Type</Label>
                <Select name="type" defaultValue={artifact.type}>
                  <SelectTrigger className="w-full">
                    <SelectValue
                      className="text-sm md:text-md"
                      placeholder="Select Artifact Type"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {artifactTypes.map((artifactType) => (
                      <SelectItem
                        key={artifactType}
                        value={artifactType}
                        className="text-sm md:text-md"
                      >
                        {artifactType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* photoURL */}
              <div className="md:col-span-2 grid gap-2">
                <Label htmlFor="name">Image</Label>
                <Input
                  name="imageURL"
                  id="name"
                  type="text"
                  placeholder="Artifact Image URL"
                  className="text-sm md:text-md"
                  defaultValue={artifact.imageURL}
                  /*required*/
                />
              </div>

              {/* Historical Context */}
              <div className="md:col-span-2 grid gap-2">
                <Label htmlFor="historicalContext">Historical Context</Label>
                <Textarea
                  id="historicalContext"
                  name="historicalContext"
                  placeholder="Historical Context of the Artifact..."
                  className="text-sm md:text-md"
                  defaultValue={artifact.historicalContext}
                />
              </div>

              {/* description */}
              <div className="md:col-span-2 grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Short Description..."
                  className="text-sm md:text-md"
                  defaultValue={artifact.description}
                />
              </div>

              {/* createdAt */}
              <div className="grid gap-2">
                <Label htmlFor="createdAt">Created At</Label>
                <Input
                  name="createdAt"
                  id="name"
                  type="text"
                  placeholder="e.g. 100 BC"
                  className="text-sm md:text-md"
                  defaultValue={artifact.createdAt}
                  /*required*/
                />
              </div>

              {/* discoveredAt */}
              <div className="grid gap-2">
                <Label htmlFor="discoveredAt">Discovered At</Label>
                <Input
                  name="discoveredAt"
                  id="name"
                  type="text"
                  placeholder="e.g. 2002"
                  className="text-sm md:text-md"
                  defaultValue={artifact.discoveredAt}
                  /*required*/
                />
              </div>

              {/* discoveredBy */}
              <div className="grid gap-2">
                <Label htmlFor="discoveredBy">Discovered By</Label>
                <Input
                  name="discoveredBy"
                  id="name"
                  type="text"
                  placeholder="e.g. X Person"
                  className="text-sm md:text-md"
                  defaultValue={artifact.discoveredBy}
                  /*required*/
                />
              </div>

              {/* presentAddress */}
              <div className="grid gap-2">
                <Label htmlFor="presentAddress">Present Address</Label>
                <Input
                  name="presentAddress"
                  id="name"
                  type="text"
                  placeholder="National Museum"
                  className="text-sm md:text-md"
                  defaultValue={artifact.presentAddress}
                  /*required*/
                />
              </div>

              {/* adder_name */}
              <div className="grid gap-2">
                <Label htmlFor="adder_name">Adder Name</Label>
                <Input
                  name="adder_name"
                  id="adder_name"
                  type="text"
                  placeholder="XYZ Person"
                  className="text-sm md:text-md"
                  defaultValue={artifact.userName}
                  disabled
                />
              </div>

              {/* adder_email */}
              <div className="grid gap-2">
                <Label htmlFor="adder_email">Adder Email</Label>
                <Input
                  name="adder_email"
                  id="adder_email"
                  type="email"
                  placeholder="mail@email.com"
                  defaultValue={artifact.userEmail}
                  className="text-sm md:text-md"
                  disabled
                />
              </div>
            </div>
          </ScrollArea>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">
              {updateConfirmLoading ? <LoaderSpinner /> : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ArtifactUpdateButton;
