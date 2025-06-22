import useArtifactsApi from "@/api/artifactsApi";
import ArtifactRow from "@/components/artifacts/ArtifactRow";
import LoaderLogoSpinner from "@/components/shared/LoaderLogoSpinner/LoaderLogoSpinner";
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
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAuth from "@/hooks/useAuth";
import useDynamicTitle from "@/hooks/useDynamicTitle";
import { useEffect, useState } from "react";
import { BiXCircle } from "react-icons/bi";
import { Link, useNavigate } from "react-router";

const MyArtifactsPage = ({ showHeader = true }) => {
  if (showHeader) {
    useDynamicTitle("My Artifacts");
  }

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
        // console.log(err);
        setArtifactsLoading(false);
      });
  }, []);

  return (
    <section
      className={`flex flex-col gap-4 justify-center items-center ${
        showHeader && "my-10 max-w-screen-xl mx-auto px-4"
      }`}
    >
      {artifactsLoading ? (
        <div className="h-48">
          <LoaderLogoSpinner />
        </div>
      ) : artifacts.length ? (
        <>
          <header className={`max-w-sm text-center ${!showHeader && "hidden"}`}>
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
                  <ArtifactRow
                    key={artifact._id}
                    artifact={artifact}
                    idx={idx + 1}
                    viewControls={true}
                    hideLikeBtn={true}
                  />
                ))}
              </TableBody>
            </Table>
          </main>
        </>
      ) : (
        <>
          <Card className="w-full max-w-sm text-center bg-destructive/5">
            <CardHeader>
              <div className="flex justify-center">
                <BiXCircle className="text-6xl text-destructive" />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-2xl font-cinzel">
                No Artifacts
              </CardTitle>
              <CardDescription>
                You haven't added any artifact yet.
              </CardDescription>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Link to={"/add-artifact"} className="w-full">
                <Button variant={"outline"} className="w-full text-primary">
                  Add an Artifact
                </Button>
              </Link>
              <Link to={-1} className="w-full">
                <Button
                  variant={"link"}
                  className="w-full text-base-content underline"
                >
                  Go Back
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </>
      )}
    </section>
  );
};

export default MyArtifactsPage;
