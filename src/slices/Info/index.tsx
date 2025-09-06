import { FC } from "react";
import { asText, Content } from "@prismicio/client";
import { PrismicImage, SliceComponentProps } from "@prismicio/react";
import { RichText } from "@/components/rich-text";
import { Heading } from "@/components/ui/heading";

/**
 * Props for `Info`.
 */
export type InfoProps = SliceComponentProps<Content.InfoSlice>;

/**
 * Component for "Info" Slices.
 */
const Info: FC<InfoProps> = ({ slice }) => {
  return (
    <main className="grow relative mt-8">
      <div className="flex flex-col items-center gap-4">
        <div className="size-40 overflow-hidden rounded-full">
          <PrismicImage
            field={slice.primary.avatar}
            className="w-full h-full aspect-square object-contain"
          />
        </div>
        <Heading level="h1" className="text-center">
          {asText(slice.primary.title)}
        </Heading>
        <p className="text-xl text-muted-foreground">
          {asText(slice.primary.excerpt)}
        </p>
      </div>
      <div className="w-full mx-auto max-w-3xl h-px bg-accent my-8" />
      <section className="px-4 py-8 md:px-6 md:py-10 lg:py-12">
        <div className="mx-auto w-full max-w-3xl font-serif">
          <RichText field={slice.primary.content} />
        </div>
      </section>
      <section className="px-4 py-8 md:px-6 md:py-10 lg:py-12">
        <div className="mx-auto w-full max-w-3xl bg-muted-foreground/20 p-8 rounded-md border border-white/15 shadow-xl">
          <h2 className="mb-8 text-2xl font-semibold">Skills/Languages</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-8">
            {slice.primary.skills.map((skill, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <div className="size-16 overflow-hidden">
                  <PrismicImage
                    field={skill.skill_icon}
                    className="w-full h-full object-contain select-none"
                  />
                </div>
                <span className="select-none pointer-events-none">
                  {skill.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <aside className="2xl:absolute 2xl:top-0 2xl:left-4 not-2xl:px-4 not-2xl:pb-8 not-2xl:md:px-6 not-2xl:md:pb-10 not-2xl:lg:pb-12">
        <div className="not-2xl:mx-auto w-full not-2xl:max-w-3xl bg-muted-foreground/20 p-8 rounded-md border border-white/15 shadow-xl">
          <h2 className="mb-8 text-2xl font-semibold">Social Links</h2>
          <div className="flex flex-col sm:flex-row 2xl:flex-col gap-8">
            {slice.primary.social_buttons.map((social, index) => (
              <a
                key={index}
                href={social.call_to_action_link.text}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4"
              >
                <div className="size-10 overflow-hidden">
                  <PrismicImage
                    field={social.social_image}
                    className="w-full h-full object-contain"
                  />
                </div>
                <p>{social.text}</p>
              </a>
            ))}
          </div>
        </div>
      </aside>
    </main>
  );
};

export default Info;
