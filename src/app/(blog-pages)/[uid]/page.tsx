import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { asText, isFilled } from "@prismicio/client";
import { PrismicImage, SliceZone } from "@prismicio/react";
import dayjs from "dayjs";
import { CalendarFold, Clock, UserRoundPen } from "lucide-react";

export default async function Post({
  params,
}: Readonly<{
  params: Promise<{ uid: string }>;
}>) {
  const { uid } = await params;

  const client = createClient();
  const post = await client.getByUID("blog_post", uid);
  const publishedDate = post.data.published_date as string;

  return (
    <main>
      <div className="px-4 py-8 md:px-6 md:py-10 lg:py-12">
        <div className="mx-auto w-full max-w-3xl">
          <h1 className="font-serif mb-3 text-3xl font-semibold tracking-tighter md:text-4xl">
            {asText(post.data.title)}
          </h1>
          <div className="md:flex items-center gap-8 not-md:space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="size-4" />
              <span className="text-sm text-muted-foreground">
                {Math.round((post.data.reading_time as number) / 60)} min read
              </span>
            </div>
            <div className="flex items-center gap-2">
              <UserRoundPen className="size-4" />
              <span className="text-sm text-muted-foreground">
                {isFilled.contentRelationship(post.data?.author)
                  ? (post.data?.author.data?.full_name as string)
                  : ""}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarFold className="size-4" />
              <span className="text-sm text-muted-foreground">
                {dayjs(publishedDate).format("DD MMM YYYY")}
              </span>
            </div>
          </div>
        </div>
      </div>
      <section className="px-4 py-8 md:px-6 md:py-10 lg:py-12">
        <div className="mx-auto w-full max-w-3xl">
          <p className="font-serif text-lg md:text-xl leading-relaxed">
            {asText(post.data.excerpt)}
          </p>
        </div>
      </section>
      <section className="px-4 py-8 md:px-6 md:py-10 lg:py-12">
        <div className="mx-auto w-full max-w-6xl">
          <PrismicImage
            field={post.data.cover_image}
            className="aspect-video"
          />
        </div>
      </section>
      <section className="px-4 py-8 md:px-6 md:py-10 lg:py-12">
        <div className="mx-auto w-full max-w-3xl">
          <div className="font-serif leading-relaxed md:text-lg">
            <SliceZone slices={post.data.slices} components={components} />
          </div>
        </div>
      </section>
    </main>
  );
}
