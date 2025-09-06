import {
  JSXMapSerializer,
  PrismicImage,
  PrismicRichTextProps,
} from "@prismicio/react";
import { Heading } from "@/components/ui/heading";
import { slugifyHeading } from "@/lib/utils";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText as BasePrismicRichText } from "@prismicio/react";

export const richTextComponents: JSXMapSerializer = {
  heading1: ({ children, node }) => (
    <Heading
      id={slugifyHeading(node)}
      className="mb-7 mt-12 first:mt-0 last:mb-0"
    >
      {children}
    </Heading>
  ),
  heading2: ({ children, node }) => (
    <Heading
      level="h2"
      id={slugifyHeading(node)}
      className="mb-7 last:mb-0 scroll-mt-6"
    >
      {children}
    </Heading>
  ),
  heading3: ({ children, node }) => (
    <Heading
      level="h3"
      id={slugifyHeading(node)}
      className="mb-7 last:mb-0 scroll-mt-6"
    >
      {children}
    </Heading>
  ),
  heading4: ({ children, node }) => (
    <Heading
      level="h4"
      id={slugifyHeading(node)}
      className="mb-7 last:mb-0 scroll-mt-6"
    >
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p className="mb-7 last:mb-0 text-base leading-relaxed">{children}</p>
  ),
  oList: ({ children }) => (
    <ol className="mb-7 pl-4 last:mb-0 md:pl-6">{children}</ol>
  ),
  oListItem: ({ children }) => (
    <li className="mb-1 list-decimal pl-1 last:mb-0 md:pl-2">{children}</li>
  ),
  list: ({ children }) => (
    <ul className="mb-7 pl-4 last:mb-0 md:pl-6">{children}</ul>
  ),
  listItem: ({ children }) => (
    <li className="mb-1 list-disc pl-1 last:mb-0 md:pl-2">{children}</li>
  ),
  preformatted: ({ children }) => (
    <pre className="mb-7 rounded text-sm md:text-lg p-4 md:p-8 last:mb-0 bg-muted overflow-x-auto">
      <code>{children}</code>
    </pre>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  hyperlink: ({ children, node }) => (
    <PrismicNextLink
      field={node.data}
      className="underline decoration-1 underline-offset-2"
    >
      {children}
    </PrismicNextLink>
  ),
  image: ({ node }) => (
    <PrismicImage field={node} className="w-full h-full mb-7 last:mb-0" />
  ),
};
export function RichText({ components, ...props }: PrismicRichTextProps) {
  return (
    <BasePrismicRichText
      components={{ ...richTextComponents, ...components }}
      {...props}
    />
  );
}
