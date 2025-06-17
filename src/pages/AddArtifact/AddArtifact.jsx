import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import useArtifactsApi from "@/api/artifactsApi";
import LoaderSpinner from "@/components/shared/LoaderSpinner/LoaderSpinner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import { toast } from "sonner";

const AddArtifact = () => {
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

  const [addLoading, setAddLoading] = useState(false);

  const { addArtifactPromise } = useArtifactsApi();

  const { user } = useAuth();
  const userEmail = user.email;
  const userName = user.displayName;

  const handleAddArtifact = (e) => {
    setAddLoading(true);
    e.preventDefault();
    const form = e.target;
    let formOk = true;

    const formData = new FormData(form);
    formData.forEach((key, value) => {
      if (!key) {
        toast.error(`${value} is required`);
        formOk = false;
      }
    });

    if (!formOk) {
      setAddLoading(false);
      return;
    }

    const newArtifact = Object.fromEntries(formData.entries());
    newArtifact.userEmail = userEmail;
    newArtifact.userName = userName;

    addArtifactPromise(newArtifact)
      .then((res) => {
        if (res.insertedId) {
          toast.success("Artifact Added", {
            description: "Your Artifact is added to the database.",
          });
        }
        setAddLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setAddLoading(false);
      });
  };

  return (
    <section className="flex flex-col gap-4 justify-center items-center my-10 max-w-screen-xl mx-auto px-4">
      <header className="max-w-sm text-center">
        <h2 className="text-3xl font-cinzel font-bold">Add Artifact</h2>
        <p className="text-sm">Share your discovery to the community.</p>
      </header>
      <Card className="w-full ">
        <CardContent>
          <form onSubmit={handleAddArtifact}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10">
              {/* name */}
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  name="name"
                  id="name"
                  type="text"
                  placeholder="Artifact Name"
                  className="text-sm md:text-md"
                  /*required*/
                />
              </div>

              {/* type */}
              <div className="grid gap-2">
                <Label htmlFor="type">Type</Label>
                <Select name="type">
                  <SelectTrigger className="w-full">
                    <SelectValue
                      className="text-sm md:text-md"
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
                  className="text-sm md:text-md"
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
                  className="text-sm md:text-md"
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
                  className="text-sm md:text-md"
                  disabled
                />
              </div>

              {/* submit btn */}
              <Button type="submit" className="md:col-span-2 w-full">
                {addLoading ? <LoaderSpinner /> : "Add Artifact"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};
export default AddArtifact;
