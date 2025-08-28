"use server";

import { FC } from "react";
import { asText, Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PostCard } from "@/components/post-card";

/**
 * Props for `Posts`.
 */
export type PostsProps = SliceComponentProps<Content.PostsSlice>;

/**
 * Component for "Posts" Slices.
 */
const Posts: FC<PostsProps> = ({ slice }) => {
  if (isFilled.contentRelationship(slice.primary.posts?.[0]?.post)) {
    console.log(slice.primary.posts?.[0]?.post.data);
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="w-full h-px bg-accent my-8" />
      <div className="space-y-8 px-6 mb-8">
        <h1 className="font-serif text-4xl font-bold">
          {asText(slice.primary.title)}
        </h1>
        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4">
          {slice.primary.posts.map(({ post }, index) => {
            if (isFilled.contentRelationship(post)) {
              return (
                <PostCard
                  key={index}
                  title={asText(post.data?.title) as string}
                  cover={post.data?.cover_image}
                  excerpt={asText(post.data?.excerpt) as string}
                  readingTime={post.data?.reading_time as number}
                  author={
                    isFilled.contentRelationship(post.data?.author)
                      ? (post.data?.author.data?.full_name as string)
                      : ""
                  }
                  publishedDate={post.data?.published_date as string}
                  uid={post.uid as string}
                />
              );
            }
          })}
        </div>
      </div>
    </section>
  );
};

export default Posts;
