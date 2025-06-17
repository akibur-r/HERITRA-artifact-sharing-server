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
import { GoThumbsup } from "react-icons/go";
import { Link } from "react-router";

const ArtifactCard = ({ artifact }) => {
  const { name, imageURL, description, likeCount } = artifact;
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
            <Button
              variant={"secondary"}
              size={"sm"}
              className="rounded-xs bg-green-500/5 hover:bg-green-500/5 hover:text-green-500 cursor-pointer text-base-content border border-green-500/20"
            >
              <GoThumbsup />
              <span>{likeCount} Likes</span>
            </Button>
          </div>
          <CardAction>
            <Link to={`/artifact/details/${artifact._id}`}>
              <Button
                variant={"outline"}
                size={"sm"}
                className="rounded-xs cursor-pointer"
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
