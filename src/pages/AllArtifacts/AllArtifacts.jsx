import useArtifactsApi from "@/api/artifactsApi";
import ArtifactCard from "@/components/shared/ArtifactCard/ArtifactCard";
import LoaderLogoSpinner from "@/components/shared/LoaderLogoSpinner/LoaderLogoSpinner";
import { useEffect, useState } from "react";

const AllArtifacts = () => {
  const { getAllArtifactsPromise } = useArtifactsApi();
  const [artifacts, setArtifacts] = useState([]);
  const [artifactsLoading, setArtifactsLoading] = useState("false");

  useEffect(() => {
    setArtifactsLoading(true);

    getAllArtifactsPromise()
      .then((data) => {
        setArtifacts(data);
        setArtifactsLoading(false);
      })
      .catch(() => {
        console.log("error");
        setArtifactsLoading(false);
      });
  }, []);

  return (
    <section className="flex flex-col gap-4 justify-center items-center my-10 max-w-screen-xl mx-auto px-4">
      <header className="max-w-sm text-center">
        <h2 className="text-3xl font-cinzel font-bold">All Artifacts</h2>
        <p className="text-sm">
          Explore the ancient marvels
        </p>
      </header>
      {artifactsLoading ? (
        <main className="h-48">
          <LoaderLogoSpinner />
        </main>
      ) : (
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {artifacts.map((artifact) => (
            <ArtifactCard key={artifact._id} artifact={artifact} />
          ))}
        </main>
      )}
    </section>
  );
};

export default AllArtifacts;
