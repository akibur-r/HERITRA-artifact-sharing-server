import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useArtifactsStore from "@/hooks/stores/artifactsStore";
import { useState } from "react";

const SortArtifact = () => {
  const [open, setOpen] = useState(false);

  const { sortingValue, setSortingValue, sortingOrder, setSortingOrder } =
    useArtifactsStore();

  return (
    <Accordion
      type="single"
      className="w-full border border-accent/10 px-2 rounded-xs"
      collapsible
      value={open ? "sort" : ""}
      onValueChange={() => setOpen(!open)}
    >
      <AccordionItem value="sort">
        <AccordionTrigger
          className="py-2 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          Sort By:{" "}
          {sortingValue === "uploadDate" ? "Date Uploaded " : "Popularity "}
          {sortingOrder === 1 ? "(Ascending)" : "(Descending)"}
        </AccordionTrigger>
        <AccordionContent>
          {/* by date, ascending */}
          <div
            className="p-2 w-full bg-transparent border-b text-foreground cursor-pointer hover:bg-accent/10 rounded-xs transition-all duration-200"
            onClick={() => {
              setSortingValue("uploadDate");
              setSortingOrder(1);
              setOpen(false);
            }}
          >
            Date Uploaded (Ascending)
          </div>

          {/* by date, descending */}
          <div
            className="p-2 w-full bg-transparent border-b text-foreground cursor-pointer hover:bg-accent/10 rounded-xs transition-all duration-200"
            onClick={() => {
              setSortingValue("uploadDate");
              setSortingOrder(-1);
              setOpen(false);
            }}
          >
            Date Uploaded (Descending)
          </div>

          {/* by popularity, ascending */}
          <div
            className="p-2 w-full bg-transparent border-b text-foreground cursor-pointer hover:bg-accent/10 rounded-xs transition-all duration-200"
            onClick={() => {
              setSortingValue("likeCount");
              setSortingOrder(1);
              setOpen(false);
            }}
          >
            Popularity (Ascending)
          </div>

          {/* by popularity, descending */}
          <div
            className="p-2 w-full bg-transparent border-b text-foreground cursor-pointer hover:bg-accent/10 rounded-xs transition-all duration-200"
            onClick={() => {
              setSortingValue("likeCount");
              setSortingOrder(-1);
              setOpen(false);
            }}
          >
            Popularity (Descending)
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SortArtifact;
