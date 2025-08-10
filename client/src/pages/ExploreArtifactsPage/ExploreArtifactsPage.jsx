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

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useEffect } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import SortArtifact from "@/components/artifacts/sortArtifact/SortArtifact";
import useArtifactsStore from "@/hooks/stores/artifactsStore";
import useDynamicTitle from "@/hooks/useDynamicTitle";
import { useRef } from "react";
import { BiErrorCircle, BiInfoCircle } from "react-icons/bi";
import { Link } from "react-router";

const ExploreArtifactsPage = () => {
  useDynamicTitle("Artifacts Collection");
  const {
    getArtifactsCountPromise,
    getArtifactsByPagePromise,
    getAllArtifactsPromise,
    getArtifactsBySearchPromise,
  } = useArtifactsApi();
  const {
    artifacts,
    setArtifacts,
    artifactsLoading,
    setArtifactsLoading,
    artifactsCount,
    setArtifactsCount,
    artifactsPerPage,
    setArtifactsPerPage,
    currentPage,
    setCurrentPage,
    sortingValue,
    setSortingValue,
    sortingOrder,
    setSortingOrder,
    searching,
    setSearching,
  } = useArtifactsStore();
  const totalPages = Math.ceil(artifactsCount / artifactsPerPage);
  const pages = [...Array(totalPages).keys()];

  const searchQueryRef = useRef();

  // loading the number of artifacts in the server by default
  useEffect(() => {
    setArtifactsLoading(true);

    const searchQuery = searching;

    getArtifactsCountPromise(searchQuery)
      .then((res) => {
        setArtifactsCount(res);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  // loading artifacts by page and search
  useEffect(() => {
    setArtifactsLoading(true);
    const searchQuery = searching;

    getArtifactsByPagePromise(
      artifactsPerPage,
      currentPage,
      searchQuery,
      sortingValue,
      sortingOrder
    )
      .then((res) => {
        setArtifacts(res);
        setArtifactsLoading(false);
      })
      .catch(() => {
        setArtifactsLoading(false);
        // console.log("error");
      })
      .finally(
        window.scrollTo({
          top: 0,
        })
      );
  }, [currentPage, artifactsPerPage, sortingOrder, sortingValue, searching]);

  const handleSearch = () => {
    setCurrentPage(0);
    const searchQuery = searchQueryRef.current.value;
    setSearching(searchQuery);

    getArtifactsCountPromise(searchQuery).then((res) => {
      setArtifactsCount(res);
    });
  };

  const handleCurrentPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNext = () => {
    setCurrentPage(Math.min(currentPage + 1, totalPages - 1));
  };

  const handlePrev = () => {
    setCurrentPage(Math.max(currentPage - 1, 0));
  };

  const handlePerPageValueChange = (val) => {
    setCurrentPage(0);
    if (val) {
      setArtifactsPerPage(val);
    } else {
      setArtifactsPerPage(artifactsCount + 1);
    }
  };

  return (
    <section className="flex flex-col gap-4 justify-start items-center my-10 max-w-screen-xl mx-auto px-4">
      <header className="max-w-sm text-center">
        <h2 className="text-3xl font-cinzel font-bold">Explore Artifacts</h2>
        <p className="text-sm">Discover the ancient marvels</p>
      </header>

      <header className="flex flex-col w-full md:flex-row justify-between items-start gap-2">
        <div className="flex flex-col md:flex-row justify-start items-center gap-2 w-full">
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
        </div>

        <div className="w-full max-w-sm flex justify-end">
          <SortArtifact />
        </div>
      </header>
      {artifactsLoading ? (
        <main>
          <LoaderLogoSpinner className={"h-48"} />
        </main>
      ) : (
        <main className="w-full space-y-4">
          <Separator />

          {artifacts.length ? (
            <section className="space-y-3">
              <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {artifacts.map((artifact) => (
                  <ArtifactCard key={artifact._id} artifact={artifact} />
                ))}
              </main>
            </section>
          ) : searching ? (
            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <Alert variant={"destructive"}>
                <BiErrorCircle />
                <AlertTitle>Nothing Found!</AlertTitle>
                <AlertDescription>
                  <p>
                    We couldn't find anything matching your query in our server.
                    Try a different search.
                  </p>
                  <p className="text-foreground/70">
                    Note: Searches work only on the artifact names.
                  </p>
                </AlertDescription>
              </Alert>
            </main>
          ) : (
            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
            </main>
          )}
        </main>
      )}

      <footer>
        <Pagination className="flex-col items-center justify-center gap-y-2">
          <PaginationContent className="space-x-2">
            <PaginationItem>
              <PaginationPrevious onClick={handlePrev} />
            </PaginationItem>
            <PaginationItem className="flex gap-x-1 flex-wrap justify-center">
              {pages.map((page) => (
                <PaginationLink
                  onClick={() => handleCurrentPage(page)}
                  isActive={page === currentPage}
                >
                  {page + 1}
                </PaginationLink>
              ))}
            </PaginationItem>
            <PaginationItem>
              <PaginationNext onClick={handleNext} />
            </PaginationItem>
          </PaginationContent>
          <div>
            <Select
              value={artifactsPerPage}
              onValueChange={handlePerPageValueChange}
            >
              <SelectTrigger className="border-none">
                View:{" "}
                {artifactsPerPage === artifactsCount + 1
                  ? "All"
                  : artifactsPerPage}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={3}>3</SelectItem>
                <SelectItem value={6}>6</SelectItem>
                <SelectItem value={9}>9</SelectItem>
                <SelectItem value={0}>All</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Pagination>
      </footer>
    </section>
  );
};

export default ExploreArtifactsPage;
