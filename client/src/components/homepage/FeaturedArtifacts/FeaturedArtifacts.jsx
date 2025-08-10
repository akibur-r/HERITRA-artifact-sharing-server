import useArtifactsApi from "@/api/artifactsApi";
import ArtifactCard from "@/components/shared/ArtifactCard/ArtifactCard";
import LoaderLogoSpinner from "@/components/shared/LoaderLogoSpinner/LoaderLogoSpinner";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const FeaturedArtifacts = () => {
  const { topSixArtifactsPromise } = useArtifactsApi();
  const [artifacts, setArtifacts] = useState([]);
  const [artifactsLoading, setArtifactsLoading] = useState("false");

  useEffect(() => {
    setArtifactsLoading(true);

    topSixArtifactsPromise()
      .then((data) => {
        setArtifacts(data);
        setArtifactsLoading(false);
      })
      .catch(() => {
        setArtifactsLoading(false);
      });
  }, []);

  return (
    <section
      id="featured-artifacts"
      className="max-w-screen-xl mx-auto px-4 my-10 space-y-6"
    >
      <header>
        <h1 className="font-cinzel text-2xl font-medium">Featured Artifacts</h1>
        <p className="opacity-70">Most Liked Artifacts on Heritra</p>
      </header>
      {artifactsLoading ? (
        <main >
          <LoaderLogoSpinner className={"h-48"} />
        </main>
      ) : (
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {artifacts.map((artifact, idx) => (
            <ArtifactCard key={artifact._id} idx={idx} artifact={artifact} />
          ))}
        </main>
      )}

      <footer className="flex justify-center">
        <Link to={"/explore"}>
          <Button variant={"primary-custom"} className="cursor-pointer font-cinzel">
            See All
          </Button>
        </Link>
      </footer>
    </section>
  );
};

export default FeaturedArtifacts;
