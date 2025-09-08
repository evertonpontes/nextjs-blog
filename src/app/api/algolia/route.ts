export const runtime = "nodejs";

import { algoliasearch } from "algoliasearch";
import { createClient } from "@/prismicio";
import { asText, SliceZone } from "@prismicio/client";
import { BlogContentSlice } from "../../../../prismicio-types";

const transformSlices = (slices: SliceZone<BlogContentSlice>) => {
  const textStrings = slices.map((slice) => {
    if (slice.slice_type === "blog_content") {
      return asText(slice.primary.content);
    }
  });

  return textStrings.join(" "); // Join items into a single string
};

export async function POST(request: Request) {
  // Check if Algolia credentials exist, return error if not
  if (
    !process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID ||
    !process.env.ALGOLIA_ADMIN_KEY
  ) {
    return new Response("Algolia credentials are not set", {
      status: 500,
    });
  }

  try {
    // Instantiate Prismic and Algolia clients
    const prismicClient = createClient();
    const algoliaClient = algoliasearch(
      process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
      process.env.ALGOLIA_ADMIN_KEY
    );

    // Get all articles from Prismic
    const articles = await prismicClient.getAllByType("blog_post", {
      pageSize: 100,
      fetchOptions: {
        next: { revalidate: 0 },
      },
    });

    // Map articles to Algolia records
    const articleRecords = articles.map((post) => ({
      objectID: post.id, // Unique identifier in algolia
      title: asText(post.data.title), // Post title
      slug: post.uid, // Post URL slug
      image: post.data.cover_image, // Post featured image
      text: transformSlices(post.data.slices), // Post content transformed to search text
    }));

    // Index records to Algolia
    await algoliaClient.saveObjects({
      indexName: "blog",
      objects: articleRecords,
    });

    // Return success response if the process completes without any issue
    return new Response(
      "Content successfully synchronized with Algolia search",
      {
        status: 200,
      }
    );
  } catch (error) {
    // Log the error and return error response if any error occurs
    console.error(error);
    return new Response("An error occurred while synchronizing content", {
      status: 500,
    });
  }
}
