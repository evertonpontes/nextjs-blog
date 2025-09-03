import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { RichText } from "@/components/rich-text";

/**
 * Props for `BlogContent`.
 */
export type BlogContentProps = SliceComponentProps<Content.BlogContentSlice>;

/**
 * Component for "BlogContent" Slices.
 */
const BlogContent: FC<BlogContentProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="px-4 py-8 md:px-6 md:py-10 lg:py-12"
    >
      <div className="mx-auto w-full max-w-3xl">
        {isFilled.richText(slice.primary.content) && (
          <div className="font-serif leading-relaxed md:text-xl md:leading-relaxed">
            <RichText field={slice.primary.content} />
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogContent;
