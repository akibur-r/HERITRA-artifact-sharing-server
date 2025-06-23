import LoaderSpinner from "@/components/shared/LoaderSpinner/LoaderSpinner";
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

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import useAuth from "@/hooks/useAuth";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { toast } from "sonner";

const UpdateBasicInfoButton = ({ showText = true, setProfileUpdated }) => {
  const [updateConfirmLoading, setUpdateConfirmLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user, updateUser, setLoading, setUser } = useAuth();

  const handleArtifactUpdate = (e) => {
    e.preventDefault();
    setUpdateConfirmLoading(true);
    setProfileUpdated(false);
    try {
      const form = e.target;

      const name = form.name.value;
      const photoURL = form.photoURL.value;
      const phoneNumber = form.phoneNumber.value;
      const updatedUser = {
        displayName: name,
        photoURL: photoURL,
      };

      if (name === user.displayName && photoURL === user.photoURL) {
        toast.warning("Not Saved.", {
          description: "You did not make any change.",
        });

        return;
      }

      const validUrlRegex =
        /^https?:\/\/(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
      const validPhoneNumberRegex = /^$|^\+?[0-9]+$/;

      if (!validUrlRegex.test(photoURL)) {
        toast.error("Not Saved.", {
          description: "You must provide a valid image URL.",
        });
        setUpdateConfirmLoading(false);

        return;
      }

      if (!validPhoneNumberRegex.test(phoneNumber)) {
        toast.error("Not Saved.", {
          description: "You must provide a valid phone number.",
        });
        setUpdateConfirmLoading(false);

        return;
      }

      updateUser(updatedUser)
        .then(() => {
          setUser(user);
          setProfileUpdated(true);

          toast.success("Changes Saved.", {
            description: "Profile information updated successfully.",
          });
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          toast.error("Changes Not Saved", {
            description: "Something went wrong.",
          });
        })
        .finally(() => {
          setUpdateConfirmLoading(true);
          setLoading(false);
        });
    } catch (err) {
      toast.error("Changes Not Saved", {
        description: "Something went wrong.",
      });
      setDialogOpen(false);
      setUpdateConfirmLoading(false);
      setLoading(false);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger>
        <Tooltip>
          <TooltipTrigger>
            <Button
              type="button"
              variant={"secondary"}
              size={"sm"}
              className=" bg-yellow-500/50 hover:bg-yellow-500/15 hover:text-yellow-500 cursor-pointer text-base-content border border-yellow-500/20"
            >
              <BiEditAlt />
              {showText && <span>Update</span>}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" className="hidden lg:block">
            <p>Update profile info.</p>
          </TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent className="rounded-xs" showCloseButton={false}>
        <form className="flex flex-col gap-4" onSubmit={handleArtifactUpdate}>
          <DialogHeader>
            <DialogTitle className="font-cinzel">Update Profile</DialogTitle>
            <DialogDescription>
              <p className="text-xs">
                <span>
                  Edit your profile information here. Click save when you're
                  done.
                </span>{" "}
                <span className="text-accent">Scroll to view more</span>
              </p>
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[50vh] lg:max-h-[60vh] w-full md:w-[70vw] pr-2 md:pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 m-2">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Abdul Kuddus"
                  defaultValue={user.displayName}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="yourmail@email.com"
                  defaultValue={user.email}
                  disabled
                />
              </div>
              <div className="md:col-span-2 grid gap-2">
                <Label htmlFor="photoURL">Photo</Label>
                <Input
                  id="photoURL"
                  type="text"
                  placeholder="Photo URL"
                  defaultValue={user.photoURL}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                </div>
                <Input
                  id="phoneNumber"
                  type="text"
                  placeholder="Your Phone Number"
                  defaultValue={user.phoneNumber ? user.phoneNumber : ""}
                  disabled
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="gender">Gender</Label>
                <Select disabled name="gender">
                  <SelectTrigger className="w-full">
                    <SelectValue
                      className="text-sm md:text-md"
                      placeholder="Temporarily Unavailable"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"male"} className="text-sm md:text-md">
                      Male
                    </SelectItem>
                    <SelectItem value={"female"} className="text-sm md:text-md">
                      Female
                    </SelectItem>
                    <SelectItem
                      value={"prefersNotToSay"}
                      className="text-sm md:text-md"
                    >
                      Prefer Not to Say
                    </SelectItem>
                  </SelectContent>
                </Select>
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

export default UpdateBasicInfoButton;
