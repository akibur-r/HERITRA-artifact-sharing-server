import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Link } from "react-router";
import ArtifactLikeButton from "../ArtifactLikeButton/ArtifactLikeButton";

const ArtifactCard = ({ artifact }) => {
  const { name, imageURL, historicalContext, likeCount } = artifact;
  const [liked, setLiked] = useState(false);

  return (
    <Card className="grid grid-rows-2 gap-3 aspect-auto rounded-xs">
      <CardHeader className="grid items-center justify-center">
        <img src={imageURL} alt={name} className="max-h-48 object-contain" />
      </CardHeader>

      <div>
        <div className="w-8 mx-auto mb-3">
          <Separator className="border-3 rounded-full" />
        </div>

        <div className="flex flex-col gap-3 justify-between h-full">
          <CardContent className="h-full space-y-2">
            <CardTitle className="font-cinzel text-xl font-semibold">
              {name}
            </CardTitle>
            <CardDescription>
              {historicalContext.length > 150
                ? historicalContext.slice(0, 150) + "..."
                : historicalContext}
            </CardDescription>
          </CardContent>

          <Separator />

          <CardFooter className="flex justify-between">
            <div>
              <ArtifactLikeButton
                liked={liked}
                setLiked={setLiked}
                artifact={artifact}
              />
            </div>
            <CardAction>
              <Link to={`/artifact/details/${artifact._id}`}>
                <Button
                  variant={"outline"}
                  size={"sm"}
                  className="cursor-pointer"
                >
                  View Details
                </Button>
              </Link>
            </CardAction>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default ArtifactCard;
