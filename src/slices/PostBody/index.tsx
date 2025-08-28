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
    <div
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mb-7 last:mb-0"
    >
      <PrismicRichText
        field={slice.primary.content}
        components={{
          heading2: ({ children }) => (
            <h2 className="text-3xl font-semibold mb-7 mt-12 first:mt-0 last:mb-0">
              {children}
            </h2>
          ),
          heading3: ({ children }) => (
            <h3 className="text-2xl font-semibold mb-7 mt-12 first:mt-0 last:mb-0">
              {children}
            </h3>
          ),
          paragraph: ({ children }) => (
            <p className="mb-7 last:mb-0">{children}</p>
          ),
          preformatted: ({ children }) => (
            <pre className="mb-7 last:mb-0 bg-muted py-8 px-6">{children}</pre>
          ),
        }}
      />
    </div>
  );
};

export default BlogContent;
