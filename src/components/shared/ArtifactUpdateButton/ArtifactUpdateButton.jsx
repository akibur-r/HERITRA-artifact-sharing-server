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
import { Textarea } from "@/components/ui/textarea";
import { BiEditAlt } from "react-icons/bi";

const artifactTypes = [
  {
    title: "Tools",
    value: "tools",
  },
  {
    title: "Weapons",
    value: "weapons",
  },
  {
    title: "Documents",
    value: "documents",
  },
  {
    title: "Writings",
    value: "writings",
  },
  {
    title: "Other",
    value: "other",
  },
];

const handleArtifactUpdate = () => {};

const ArtifactUpdateButton = ({ artifact }) => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            variant={"secondary"}
            size={"sm"}
            className="rounded-xs bg-yellow-500/50 hover:bg-yellow-500/15 hover:text-yellow-500 cursor-pointer text-base-content border border-yellow-500/20"
          >
            <BiEditAlt />
            <span>Update</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="rounded-xs" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className="font-cinzel">Update Artifact</DialogTitle>
            <DialogDescription>
              <p className="text-xs">
                <span>
                  Edit your artifact details here. Click save when you&apos;re
                  done.
                </span>
                &nbsp;
                <span className="text-accent">Scroll to view more</span>
              </p>
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[50vh] w-full md:w-[70vw] pr-2 md:pr-4">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10">
              {/* name */}
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  name="name"
                  id="name"
                  type="text"
                  placeholder="Artifact Name"
                  className="text-sm md:text-md rounded-xs"
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
                      className="text-sm md:text-md rounded-xs"
                      placeholder="Select Artifact Type"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {artifactTypes.map((artifactType) => (
                      <SelectItem
                        key={artifactType.value}
                        value={artifactType.value}
                        className="text-sm md:text-md"
                      >
                        {artifactType.title}
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
                  className="text-sm md:text-md rounded-xs"
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
                  className="text-sm md:text-md rounded-xs"
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
                  className="text-sm md:text-md rounded-xs"
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
                  className="text-sm md:text-md rounded-xs"
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
                  className="text-sm md:text-md rounded-xs"
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
                  className="text-sm md:text-md rounded-xs"
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
                  className="text-sm md:text-md rounded-xs"
                  defaultValue={artifact.presentAddress}
                  /*required*/
                />
              </div>

              {/* adder_name */}
              <div className="grid gap-2">
                <Label htmlFor="adder_name">Adder Name</Label>
                <Input
                  name="adder_name"
                  id="name"
                  type="text"
                  placeholder="XYZ Person"
                  className="text-sm md:text-md rounded-xs"
                  defaultValue={artifact.userName}
                  disabled
                />
              </div>

              {/* adder_email */}
              <div className="grid gap-2">
                <Label htmlFor="adder_email">Adder Email</Label>
                <Input
                  name="adder_email"
                  id="name"
                  type="email"
                  placeholder="mail@email.com"
                  defaultValue={artifact.userEmail}
                  className="text-sm md:text-md rounded-xs"
                  disabled
                />
              </div>
            </div>
          </ScrollArea>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="rounded-xs">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="rounded-xs">Save</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default ArtifactUpdateButton;
