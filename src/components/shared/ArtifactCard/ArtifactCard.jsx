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
  const { name, imageURL, description, likeCount } = artifact;
  const [liked, setLiked] = useState(false);

  return (
    <Card className="flex flex-col rounded-xs">
      {/* <div className="">
        
      </div> */}
      <CardHeader className="flex-1 flex items-center justify-center">
        <img src={imageURL} alt={name} className="max-h-48 object-contain" />
      </CardHeader>

      <div className="w-8 mx-auto">
        <Separator className="border-3 rounded-full" />
      </div>

      <div className="flex-1 flex flex-col gap-3">
        <CardContent className="pb-1">
          <CardTitle className="font-cinzel font-semibold">{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardContent>

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
    </Card>
  );
};

export default ArtifactCard;
