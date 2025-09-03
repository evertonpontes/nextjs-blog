import {
  connectStateResults,
  Highlight,
  InstantSearchProps,
} from "react-instantsearch-dom";
import { PrismicNextImage } from "@prismicio/next";
import Link from "next/link";
import { ImageField } from "@prismicio/client";

interface SearchHit extends Record<string, unknown> {
  objectID: string;
  slug: string;
  title: string;
  image: ImageField<never>;
  text: string;
}

function SearchHits({
  searchState,
  searchResults,
}: {
  searchState?: InstantSearchProps["searchState"];
  searchResults?: {
    hits: Record<string, unknown>[];
  };
}) {
  const hits = (searchResults?.hits ?? []) as SearchHit[];

  return searchState?.query ? (
    <div className="relative">
      <div className="bg-background border rounded-md absolute top-1 right-0 left-0 shadow-2xl">
        {hits.length === 0 && (
          <div className="py-3 px-6">No results found!</div>
        )}
        {hits.length > 0 &&
          hits.map((hit) => {
            return (
              <Link
                key={hit.objectID}
                className="flex items-center gap-4 border-t first:rounded-t-md last:rounded-b-md first:border-0 py-3 px-3 focus:outline-none focus:ring-2 ring-inset ring-ring transition-colors hover:bg-accent"
                href={`/posts/${hit.slug}`}
              >
                {hit.image?.url && (
                  <PrismicNextImage
                    field={hit.image}
                    className="w-1/4 aspect-[16/9] rounded-md block"
                    alt=""
                  />
                )}
                <Highlight attribute="title" hit={hit} tagName="mark" />
              </Link>
            );
          })}
      </div>
    </div>
  ) : (
    <></>
  );
}

export default connectStateResults(SearchHits);
