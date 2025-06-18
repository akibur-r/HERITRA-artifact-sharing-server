import useArtifactsApi from "@/api/artifactsApi";
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
      )}
    </section>
  );
};

export default MyArtifactsPage;
