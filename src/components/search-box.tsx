import { connectSearchBox } from "react-instantsearch-dom";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

interface SearchBoxProps {
  refine: (value: string) => void;
}

function SearchBox({ refine }: SearchBoxProps) {
  return (
    <div className="relative overflow-x-auto">
      <Input
        type="search"
        placeholder="What are you looking for?"
        className="text-ellipsis focus-visible:ring-0 h-10 pl-7"
        onChange={(e) => refine(e.currentTarget.value)}
      />
      <SearchIcon className="absolute left-4 top-1/2 -translate-1/2 text-muted-foreground size-4 pointer-events-none" />
    </div>
  );
}

export default connectSearchBox(SearchBox);
