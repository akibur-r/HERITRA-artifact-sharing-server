import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableCell, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { useNavigate } from "react-router";
import ArtifactDeleteButton from "../shared/ArtifactDeleteButton/ArtifactDeleteButton";
import ArtifactLikeButton from "../shared/ArtifactLikeButton/ArtifactLikeButton";
import ArtifactUpdateButton from "../shared/ArtifactUpdateButton/ArtifactUpdateButton";

const ArtifactRow = ({ artifact, idx, viewControls = false, hideLikeBtn = false }) => {
  const [updateBtnLoading, setUpdateBtnLoading] = useState(false);
  const [liked, setLiked] = useState(false);

  

  const navigate = useNavigate();

  const navigateToDetails = () => {
    navigate(`/artifact/details/${artifact._id}`);
  };

  return (
    <TableRow className="cursor-pointer">
      <TableCell
        onClick={navigateToDetails}
        className="font-medium hidden md:table-cell"
      >
        {idx}
      </TableCell>
      <TableCell onClick={navigateToDetails}>
        <Avatar className="rounded-none bg-foreground/10 dark:bg-foreground/5 size-12">
          <AvatarImage src={artifact.imageURL} />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      </TableCell>
      <TableCell onClick={navigateToDetails} className="font-medium">
        {artifact.name}
      </TableCell>
      <TableCell onClick={navigateToDetails} className="hidden md:table-cell">
        {artifact.type}
      </TableCell>
      <TableCell onClick={navigateToDetails} className="hidden md:table-cell">
        {artifact.discoveredBy}
      </TableCell>
      <TableCell onClick={navigateToDetails} className="hidden lg:table-cell">
        {artifact.presentAddress}
      </TableCell>
      <TableCell className="text-center">
        <div className="flex gap-2 justify-center">
          <span className={`${hideLikeBtn && "hidden md:block"}`}>
            <ArtifactLikeButton
              setLiked={setLiked}
              liked={liked}
              artifact={artifact}
              showText={false}
            />
          </span>
          {viewControls ? (
            <>
              <ArtifactUpdateButton
                setUpdateBtnLoading={setUpdateBtnLoading}
                updateBtnLoading={updateBtnLoading}
                showText={false}
                artifact={artifact}
              />

              <ArtifactDeleteButton showText={false} artifact={artifact} />
            </>
          ) : (
            <></>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ArtifactRow;
