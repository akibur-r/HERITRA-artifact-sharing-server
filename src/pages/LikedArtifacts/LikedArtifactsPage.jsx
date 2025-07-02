import useUsersApi from "@/api/usersApi";
import ArtifactRow from "@/components/artifacts/ArtifactRow";
import LoaderLogoSpinner from "@/components/shared/LoaderLogoSpinner/LoaderLogoSpinner";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BsHeartbreak } from "react-icons/bs";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import useDynamicTitle from "@/hooks/useDynamicTitle";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

const LikedArtifactsPage = () => {
  useDynamicTitle("My Likes")
  const [artifacts, setArtifacts] = useState([]);
  const [artifactsLoading, setArtifactsLoading] = useState(false);

  const { getLikedArtifacts } = useUsersApi();
  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    setArtifactsLoading(true);
    getLikedArtifacts(user.email)
      .then((res) => {
        setArtifacts(res);
        setArtifactsLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        setArtifactsLoading(false);
      });
  }, []);

  // console.log(artifacts);

  return (
    <section className="flex flex-col gap-4 items-center my-10 max-w-screen-xl mx-auto px-4">
      {artifactsLoading ? (
        <div className="h-full flex justify-center items-center">
          <LoaderLogoSpinner className={"h-48"} />
        </div>
      ) : artifacts.length ? (
        <>
          <header className="max-w-sm text-center">
            <h2 className="text-3xl font-cinzel font-bold">Liked Artifacts</h2>
            <p className="text-sm">Your liked artifacts are listed here.</p>
          </header>
          <main className="w-full">
            <Table>
              <TableCaption>A list of artifacts that you liked.</TableCaption>
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
                    artifact={artifact}
                    idx={idx + 1}
                    key={artifact._id}
                  />
                ))}
              </TableBody>
            </Table>
          </main>
        </>
      ) : (
        <>
          <Card className="w-full my-auto max-w-sm text-center bg-accent/5">
            <CardHeader>
              <div className="flex justify-center">
                <BsHeartbreak className="text-5xl text-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-2xl font-cinzel">
                No Liked Artifacts
              </CardTitle>
              <CardDescription>
                You didn't like any artifact yet.
              </CardDescription>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Link to={"/explore"} className="w-full">
                <Button variant={"outline"} className="w-full text-primary">
                  Browse Artifacts
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

export default LikedArtifactsPage;
