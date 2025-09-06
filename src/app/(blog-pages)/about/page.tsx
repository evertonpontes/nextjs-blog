import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { SliceZone } from "@prismicio/react";

export default async function AboutPage() {
  const client = createClient();
  const about = await client.getSingle("about");

  return <SliceZone slices={about.data.slices} components={components} />;
}
