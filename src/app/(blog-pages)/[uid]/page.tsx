import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { RichTextNodeType } from "@prismicio/client";
import { PrismicImage, PrismicRichText, SliceZone } from "@prismicio/react";

export default async function Post({
  params,
}: Readonly<{
  params: Promise<{ uid: string }>;
}>) {
  const { uid } = await params;

  const client = createClient();
  const post = await client.getByUID("blog_post", uid);
  return (
    <div>
      <PrismicRichText field={post.data.title} />
      <PrismicRichText field={post.data.excerpt} />
      <PrismicImage field={post.data.cover_image} />

      <SliceZone slices={post.data.slices} components={components} />
    </div>
  );
}
