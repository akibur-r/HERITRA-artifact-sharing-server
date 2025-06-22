import useArtifactsApi from "@/api/artifactsApi";
import ArtifactCard from "@/components/shared/ArtifactCard/ArtifactCard";
import LoaderLogoSpinner from "@/components/shared/LoaderLogoSpinner/LoaderLogoSpinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useDynamicTitle from "@/hooks/useDynamicTitle";
import { useEffect, useRef, useState } from "react";
import { BiErrorCircle, BiInfoCircle } from "react-icons/bi";
import { Link } from "react-router";

const AllArtifacts = () => {
  useDynamicTitle("Artifacts Collection");
  const { getAllArtifactsPromise, getArtifactsBySearchPromise } =
    useArtifactsApi();
  const [artifacts, setArtifacts] = useState([]);
  const [artifactsLoading, setArtifactsLoading] = useState(false);
  const [searching, setSearching] = useState("");

  const searchQueryRef = useRef();

  useEffect(() => {
    setArtifactsLoading(true);

    getAllArtifactsPromise()
      .then((data) => {
        setArtifacts(data);
        setArtifactsLoading(false);
      })
      .catch(() => {
        // console.log("error");
        setArtifactsLoading(false);
      });
  }, []);

  const handleSearch = () => {
    const searchQuery = searchQueryRef.current.value;
    setSearching(searchQuery);
    getArtifactsBySearchPromise(searchQuery)
      .then((res) => {
        setArtifacts(res);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  return (
    <section className="flex flex-col gap-4 justify-center items-center my-10 max-w-screen-xl mx-auto px-4">
      <header className="max-w-sm text-center">
        <h2 className="text-3xl font-cinzel font-bold">All Artifacts</h2>
        <p className="text-sm">Explore the ancient marvels</p>
      </header>
      {artifactsLoading ? (
        <main className="h-48">
          <LoaderLogoSpinner />
        </main>
      ) : (
        <main className="w-full space-y-4">
          <header className="flex flex-col md:flex-row justify-center items-center gap-2">
            <Label htmlFor="query" className="text-base">
              Search
            </Label>
            <Input
              type="text"
              id="email"
              placeholder="Type to search..."
              className="w-full text-sm max-w-sm border-0 focus-visible:ring-ring/10 focus-visible:ring-[2px]"
              ref={searchQueryRef}
              onChange={handleSearch}
            />
          </header>

          <Separator />

          <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {artifacts.length ? (
              artifacts.map((artifact) => (
                <ArtifactCard key={artifact._id} artifact={artifact} />
              ))
            ) : searching ? (
              <>
                <Alert variant={"destructive"}>
                  <BiErrorCircle />
                  <AlertTitle>Nothing Found!</AlertTitle>
                  <AlertDescription>
                    <p>
                      We couldn't find anything matching your query in our
                      server. Try a different search.
                    </p>
                    <p className="text-foreground/70">
                      Note: Searches work only on the artifact names.
                    </p>
                  </AlertDescription>
                </Alert>
              </>
            ) : (
              <>
                <Alert variant={"default"}>
                  <BiInfoCircle />
                  <AlertTitle className="text-lg">
                    No artifact available.
                  </AlertTitle>
                  <AlertDescription>
                    <p>Artifacts will eventually appear here.</p>
                    <Tooltip>
                      <TooltipTrigger>
                        <p className="text-foreground/70">
                          try{" "}
                          <Link to={"/add-artifact"} className="underline">
                            Adding an artifact
                          </Link>
                          .
                        </p>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>Click to add an artifact.</p>
                      </TooltipContent>
                    </Tooltip>
                  </AlertDescription>
                </Alert>
              </>
            )}
          </main>
        </main>
      )}
    </section>
  );
};

export default AllArtifacts;
