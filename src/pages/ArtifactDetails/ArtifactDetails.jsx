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
        <div className="max-w-screen-xl mx-auto py-10 px-4 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
            <div className="">
              <img
                src={artifact.imageURL}
                className="relative w-full object-contain max-h-[40vh] md:max-h-[60vh] rounded-xs"
                alt=""
              />
            </div>

            <div className="space-y-2 md:space-y-4">
              {/* name */}
              <div className="text-center md:text-left">
                <h1 className="text-3xl lg:text-5xl font-cinzel font-medium">
                  {artifact.name}
                </h1>
              </div>

              {/* small details */}
              <div className="flex gap-3 md:gap-4 lg:gap-6 justify-center md:justify-start items-center md:w-7/12 h-fit ">
                <h4>
                  <span className="text-accent">{artifact.type}</span>
                </h4>

                <div className="h-4">
                  <Separator
                    orientation="vertical"
                    className="bg-foreground h-full opacity-40"
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
                <p className="opacity-80 text-center md:text-left">
                  {artifact.historicalContext}
                </p>
              </div>

              {/* Like button */}
              <div className="flex flex-col md:items-start items-center py-2 md:py-0 gap-y-1">
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
              <div className="flex justify-center md:justify-start">
                <div className="grid grid-cols-2 md:grid-cols-1 gap-y-1 gap-x-3">
                  <div>
                    <span className="flex items-center gap-2 overflow-hidden">
                      <GiDigDug className="text-md md:text-lg opacity-90 shrink-0 text-accent" />{" "}
                      {artifact.discoveredBy}
                    </span>
                  </div>
                  <div>
                    <span className="flex items-center gap-2 overflow-hidden">
                      <LuSearchCheck className="text-md md:text-lg opacity-90 text-accent" />{" "}
                      {artifact.discoveredAt}
                    </span>
                  </div>
                  <div>
                    <span className="flex items-center gap-2 overflow-hidden">
                      <GrLocation className="text-md md:text-lg opacity-90 text-accent" />{" "}
                      {artifact.presentAddress}
                    </span>
                  </div>
                  <div>
                    <span className="flex items-center gap-2 overflow-hidden">
                      <AiOutlineAppstoreAdd className="text-md md:text-lg opacity-90 text-accent" />{" "}
                      {artifact.userName}
                    </span>
                  </div>
                </div>
              </div>

              {/* <Separator className="hidden md:block" /> */}

              {/* action buttons: HIDDEN IF OWNER IS SOMEONE ELSE */}
              {/* <div className="flex gap-2 justify-center md:justify-start py-2"> */}
              <div className="hidden">
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
        </div>
      )}
    </section>
  );
};

export default ArtifactDetails;
