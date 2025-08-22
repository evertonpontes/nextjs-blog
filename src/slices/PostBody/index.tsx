import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

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
    >
      <div className="*:my-2 max-w-3xl mx-auto">
        <PrismicRichText
          field={slice.primary.content}
          components={{
            heading2: ({ children }) => (
              <h2 className="text-4xl">{children}</h2>
            ),
            heading3: ({ children }) => (
              <h3 className="text-3xl">{children}</h3>
            ),
          }}
        />
      </div>
    </section>
  );
};

export default BlogContent;
