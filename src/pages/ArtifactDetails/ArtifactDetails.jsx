import useArtifactsApi from "@/api/artifactsApi";
import LoaderLogoSpinner from "@/components/shared/LoaderLogoSpinner/LoaderLogoSpinner";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { LuFileX } from "react-icons/lu";
import { formatDistanceToNow } from "date-fns";
import {
  TbClockSearch,
  TbClockStar,
  TbMapPin2,
  TbUserSearch,
  TbUserUp,
} from "react-icons/tb";
import { Link, useParams } from "react-router";

import useUsersApi from "@/api/usersApi";
import ArtifactDeleteButton from "@/components/shared/ArtifactDeleteButton/ArtifactDeleteButton";
import ArtifactLikeButton from "@/components/shared/ArtifactLikeButton/ArtifactLikeButton";
import ArtifactUpdateButton from "@/components/shared/ArtifactUpdateButton/ArtifactUpdateButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useAuth from "@/hooks/useAuth";
import useDynamicTitle from "@/hooks/useDynamicTitle";

const ArtifactDetails = () => {
  useDynamicTitle("Artifact Details");
  const { id } = useParams();
  const { getOneArtifactPromise } = useArtifactsApi();
  const { checkIfLikedPromise, updateLikePromise } = useUsersApi();
  const { user } = useAuth();

  const [artifactLoading, setArtifactLoading] = useState(true);
  const [artifact, setArtifact] = useState(null);
  const [likeBtnLoading, setLikeBtnLoading] = useState(false);
  const [updateBtnLoading, setUpdateBtnLoading] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    getOneArtifactPromise(id)
      .then((res) => {
        setArtifact(res);
        setArtifactLoading(false);
      })
      .catch((err) => {
        setArtifactLoading(false);
      });
  }, [updateBtnLoading]);

  return (
    <section className="bg-primary/5 relative overflow-hidden">
      {artifactLoading ? (
        <div className="my-10 h-48">
          <LoaderLogoSpinner />
        </div>
      ) : (
        <div className="max-w-screen-xl mx-auto py-10 px-4 space-y-4">
          {artifact ? (
            <>
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
                      <span className="text-accent">Uploaded</span>{" "}
                      <span className="font-medium text-base-content">
                        {formatDistanceToNow(artifact.uploadTime)}
                      </span>{" "}
                      <span className="text-accent">ago.</span>
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
                          <ArtifactLikeButton
                            liked={liked}
                            setLiked={setLiked}
                            artifact={artifact}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Click to Like</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="text-xs">
                      {liked
                        ? "You liked this artifact."
                        : "You did not like this artifact."}
                    </div>
                  </div>

                  <Separator />

                  {/* other details */}
                  <div className="flex justify-center md:justify-start">
                    <div className="grid place-items-center md:place-items-start grid-cols-1 gap-y-1 gap-x-3">
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="flex flex-col md:flex-row place-items-center gap-y-0 gap-x-2 overflow-hidden select-text">
                            <span className="text-sm md:text-xl opacity-90 shrink-0 text-accent flex place-items-center gap-1">
                              <TbClockStar />
                              <span className="md:hidden">Created At</span>
                            </span>
                            <span className="text-center md:text-left">
                              {artifact.createdAt}
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="left" className="hidden lg:block">
                          <p>Created At</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger>
                          <div className="flex flex-col md:flex-row place-items-center gap-y-0 gap-x-2 overflow-hidden select-text">
                            <span className="text-sm md:text-xl opacity-90 shrink-0 text-accent flex place-items-center gap-1">
                              <TbUserSearch />
                              <span className="md:hidden">Discovered By</span>
                            </span>
                            <span className="text-center md:text-left">
                              {artifact.discoveredBy}
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="left" className="hidden lg:block">
                          <p>Discovered By</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger>
                          <div className="flex flex-col md:flex-row place-items-center gap-y-0 gap-x-2 overflow-hidden select-text">
                            <span className="text-sm md:text-xl opacity-90 shrink-0 text-accent flex place-items-center gap-1">
                              <TbClockSearch />
                              <span className="md:hidden">Discovered At</span>
                            </span>
                            <span className="text-center md:text-left">
                              {artifact.discoveredAt}
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="left" className="hidden lg:block">
                          <p>Discovered At</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger>
                          <div className="flex flex-col md:flex-row place-items-center gap-y-0 gap-x-2 overflow-hidden select-text">
                            <span className="text-sm md:text-xl opacity-90 shrink-0 text-accent flex place-items-center gap-1">
                              <TbMapPin2 />
                              <span className="md:hidden">
                                Present Location
                              </span>
                            </span>
                            <span className="text-center md:text-left">
                              {artifact.presentAddress}
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="left" className="hidden lg:block">
                          <p>Present Location</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex flex-col md:flex-row place-items-center gap-y-0 gap-x-2 overflow-hidden select-text">
                            <span className="text-sm md:text-xl opacity-90 shrink-0 text-accent flex place-items-center gap-1">
                              <TbUserUp />
                              <span className="md:hidden">Uploaded By</span>
                            </span>
                            <span className="text-center md:text-left">
                              {artifact.userName}
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="left" className="hidden lg:block">
                          <p>Uploaded By</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>

                  {/* <Separator className="hidden md:block" /> */}

                  {/* action buttons: HIDDEN IF OWNER IS SOMEONE ELSE */}
                  {user.email === artifact.userEmail ? (
                    <div className="flex gap-2 justify-center md:justify-start py-2">
                      {/* <div className="hidden"> */}
                      {/* update */}
                      <ArtifactUpdateButton
                        updateBtnLoading={updateBtnLoading}
                        setUpdateBtnLoading={setUpdateBtnLoading}
                        artifact={artifact}
                      />

                      {/* delete */}
                      <ArtifactDeleteButton artifact={artifact} />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <Separator />
              <div>
                <header className="text-center md:text-left">
                  <h3 className="font-cinzel font-medium text-primary text-lg md:text-xl">
                    Details
                  </h3>
                </header>
                <p className="text-center md:text-left">
                  {artifact.description}
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center">
                <Card className="w-full max-w-sm text-center bg-destructive/5">
                  <CardHeader>
                    <div className="flex justify-center">
                      <LuFileX className="text-5xl text-destructive" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-2xl font-cinzel">
                      Artifact Not Found
                    </CardTitle>
                    <CardDescription>
                      The artifact you're looking for is not in our server.
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="flex-col gap-2">
                    <Link to={-1} className="w-full">
                      <Button
                        variant={"outline"}
                        className="w-full text-primary"
                      >
                        Go Back
                      </Button>
                    </Link>
                    <Link to={"/"} className="w-full">
                      <Button
                        variant={"link"}
                        className="w-full text-base-content underline"
                      >
                        Go to Homepage
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default ArtifactDetails;
