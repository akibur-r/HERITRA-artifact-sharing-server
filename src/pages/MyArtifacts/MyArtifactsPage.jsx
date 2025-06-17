import useArtifactsApi from "@/api/artifactsApi";
import LoaderLogoSpinner from "@/components/shared/LoaderLogoSpinner/LoaderLogoSpinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const MyArtifactsPage = () => {
  const [artifacts, setArtifacts] = useState([]);
  const [artifactsLoading, setArtifactsLoading] = useState(false);

  const { getArtifactsByEmailPromise } = useArtifactsApi();
  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    setArtifactsLoading(true);
    getArtifactsByEmailPromise(user.email)
      .then((res) => {
        setArtifacts(res);
        setArtifactsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setArtifactsLoading(false);
      });
  }, []);

  const handleClick = (id) => {
    navigate(`/artifact/details/${id}`);
  };

  return (
    <section className="flex flex-col gap-4 justify-center items-center my-10 max-w-screen-xl mx-auto px-4">
      {artifactsLoading ? (
        <div className="h-48">
          <LoaderLogoSpinner />
        </div>
      ) : (
        <>
          <header className="max-w-sm text-center">
            <h2 className="text-3xl font-cinzel font-bold">My Artifacts</h2>
            <p className="text-sm">Artifacts that you added are listed here.</p>
          </header>
          <main className="w-full">
            <Table>
              <TableCaption>A list of artifacts that you added.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12 hidden md:table-cell">#</TableHead>
                  <TableHead>Artifact</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Type</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Discovered By
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Currently At
                  </TableHead>
                  <TableHead className="w-32 text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {artifacts.map((artifact, idx) => (
                  <TableRow
                    onClick={() => handleClick(artifact._id)}
                    className="cursor-pointer"
                    key={artifact._id}
                  >
                    <TableCell className="font-medium hidden md:table-cell">
                      {idx + 1}
                    </TableCell>
                    <TableCell>
                      <Avatar className="rounded-none bg-foreground/10 dark:bg-foreground/5 size-12">
                        <AvatarImage src={artifact.imageURL} />
                        <AvatarFallback>A</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium">
                      {artifact.name}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {artifact.type}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {artifact.discoveredBy}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {artifact.presentAddress}
                    </TableCell>
                    <TableCell className="text-center">-</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </main>
        </>
      )}
    </section>
  );
};

export default MyArtifactsPage;
