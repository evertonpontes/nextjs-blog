import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { SliceZone } from "@prismicio/react";

export default async function Home() {
  const client = createClient();
  const home = await client.getSingle("home");
  return <SliceZone slices={home.data.slices} components={components} />;
}
