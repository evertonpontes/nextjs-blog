import { PostCard } from "@/components/post-card";
import { createClient } from "@/prismicio";
import { asText, isFilled } from "@prismicio/client";

export default async function Posts() {
  const client = createClient();
  const posts = await client.getAllByType("blog_post");

  return (
    <div className="grow">
      <div className="space-y-8 px-6 my-8">
        <h1 className="font-serif text-4xl font-bold">All Posts</h1>
        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4">
          {posts.map((post, index) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}
