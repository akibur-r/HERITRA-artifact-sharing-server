import useArtifactsApi from "@/api/artifactsApi";
import LoaderLogoSpinner from "@/components/shared/LoaderLogoSpinner/LoaderLogoSpinner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { BiEditAlt, BiLike, BiTrashAlt } from "react-icons/bi";
import { GiDigDug } from "react-icons/gi";
import { GrLocation } from "react-icons/gr";
import { LuSearchCheck } from "react-icons/lu";
import { useParams } from "react-router";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ArtifactDetails = () => {
  const { id } = useParams();
  const { getOneArtifactPromise } = useArtifactsApi();
  const [artifactLoading, setArtifactLoading] = useState(true);
  const [artifact, setArtifact] = useState({});
  //   console.log(id);

  useEffect(() => {
    getOneArtifactPromise(id)
      .then((res) => {
        setArtifact(res);
        setArtifactLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setArtifactLoading(false);
      });
  }, []);

  console.log(artifact);

  return (
    <section className="bg-primary/5 relative overflow-hidden">
      {artifactLoading ? (
        <LoaderLogoSpinner />
      ) : (
        <div className="relative z-0 max-w-screen-xl mx-auto py-10 px-4 grid grid-cols-2 gap-x-16">
          <div className="">
            <img
              src={artifact.imageURL}
              className="relative h-full w-full object-contain h-50vh md:max-h-[60vh] rounded-xs"
              alt=""
            />
          </div>

          <div className="space-y-4">
            {/* name */}
            <div>
              <h1 className="text-5xl font-cinzel font-medium">
                {artifact.name}
              </h1>
            </div>

            {/* small details */}
            <div className="flex gap-6 items-center w-7/12 h-fit ">
              <h4>
                <span className="text-accent">{artifact.type}</span>
              </h4>

              <div className="h-4">
                <Separator
                  orientation="vertical"
                  className="bg-accent h-full opacity-70"
                />
              </div>

              <h4 className="text-sm ">
                <span className="text-accent">Created at</span>{" "}
                <span className="font-medium text-base-content">
                  {artifact.createdAt}
                </span>
              </h4>
            </div>

            {/* context */}
            <div>
              <p className="opacity-80">{artifact.historicalContext}</p>
            </div>

            {/* Like button */}
            <div className="space-y-1">
              <div>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      variant={"secondary"}
                      size={"sm"}
                      className="rounded-xs bg-green-500/5 hover:bg-green-500/5 hover:text-green-500 cursor-pointer text-base-content border border-green-500/20"
                    >
                      <BiLike />
                      <span>{artifact.likeCount} Likes</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Like This Artifact</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="text-xs">you did not like this artifact.</div>
            </div>

            <Separator />

            {/* other details */}
            <div className="space-y-1">
              <div>
                <span className="flex items-center gap-2">
                  <GiDigDug className="text-lg opacity-90 text-accent" />{" "}
                  {artifact.discoveredBy}
                </span>
              </div>
              <div>
                <span className="flex items-center gap-2">
                  <LuSearchCheck className="text-lg opacity-90 text-accent" />{" "}
                  {artifact.discoveredAt}
                </span>
              </div>
              <div>
                <span className="flex items-center gap-2">
                  <GrLocation className="text-lg opacity-90 text-accent" />{" "}
                  {artifact.presentAddress}
                </span>
              </div>
              <div>
                <span className="flex items-center gap-2">
                  <AiOutlineAppstoreAdd className="text-lg opacity-90 text-accent" />{" "}
                  {artifact.userName}
                </span>
              </div>
            </div>

            <Separator />

            {/* action buttons */}
            <div className="flex gap-2">
              {/* update */}
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant={"secondary"}
                    size={"sm"}
                    className="rounded-xs bg-yellow-500/50 hover:bg-yellow-500/15 hover:text-yellow-500 cursor-pointer text-base-content border border-yellow-500/20"
                  >
                    <BiEditAlt />
                    <span>Update</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit This Artifact</p>
                </TooltipContent>
              </Tooltip>

              {/* delete */}
              <Tooltip>
                <TooltipTrigger>
                  <Button
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
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ArtifactDetails;
