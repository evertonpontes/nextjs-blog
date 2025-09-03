"use client";

import { cn, slugifyHeading } from "@/lib/utils";
import { asText, RichTextField, SliceZone } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { BlogContentSlice } from "../../prismicio-types";
import { useEffect, useRef, useState } from "react";

interface TocNavElementProps {
  node: { text: string };
  children?: React.ReactNode;
  level: number;
  activeId: string | null;
}

function TocNavElement({
  node,
  children,
  level,
  activeId,
}: TocNavElementProps) {
  const id = slugifyHeading(node);

  return (
    <li
      className={cn("list-disc transition-colors", {
        "pl-2": level === 1,
        "pl-4": level === 2,
        "pl-8": level === 3,
        "text-blue-500": activeId === id,
        "text-muted-foreground": activeId !== id,
      })}
    >
      <a className="block text-primary" href={`#${id}`}>
        {children ? children : node.text}
      </a>
    </li>
  );
}

interface TocProps {
  slices: SliceZone<BlogContentSlice>;
  title: RichTextField;
}

export function Toc({ slices, title }: TocProps) {
  const headingsList = useRef<HTMLOListElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [headings, setHeadings] = useState<{ id: string; index: number }[]>([]);
  const scrollRef = useRef(0);

  useEffect(() => {
    if (!headingsList.current) return;

    const firstHeadingId = slugifyHeading({
      text: headingsList.current.childNodes[0].textContent as string,
    });

    setActiveId(firstHeadingId);

    headingsList.current.childNodes.forEach((heading, index) => {
      const id = slugifyHeading({ text: heading.textContent as string });

      if (id) {
        setHeadings((headings) => [...headings, { id, index }]);
      }
    });
  }, [headingsList]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("id");

          if (entry.isIntersecting) {
            setActiveId(id);
            scrollRef.current = window.scrollY;
          } else {
            const diff = scrollRef.current - window.scrollY;
            const isScrollingUp = diff > 0;
            const currentIndex = headings.findIndex(
              (heading) => heading.id === id
            );
            const prevEntry = headings[currentIndex - 1];
            const prevId = prevEntry?.id;

            if (isScrollingUp && prevId) {
              setActiveId(prevId);
            }
          }
        });
      },
      {
        rootMargin: "0px 0px -85% 0px",
      }
    );

    const observeHeadings = () => {
      headings.forEach((heading) => {
        const currentHeading = document.getElementById(heading.id);

        if (currentHeading) {
          observer.observe(currentHeading);
        }
      });
    };

    if (headings.length) {
      observeHeadings();
    }

    return () => {
      headings.forEach((heading) => {
        const currentHeading = document.getElementById(heading.id);

        if (currentHeading) {
          observer.unobserve(currentHeading);
        }
      });
    };
  }, [headings]);

  return (
    <div className="2xl:sticky 2xl:top-4 px-4 md:px-6 w-full">
      <div className="2xl:absolute 2xl:top-0 2xl:left-4">
        <aside className="border p-6 bg-background mx-auto max-w-3xl mt-6 md:mt-0 2xl:w-80">
          <nav aria-labelledby="toc-heading">
            <h2 className="text-4xl md:text-3xl font-semibold" id="toc-heading">
              Table of Contents
            </h2>
            <ol className="font-serif pl-4 mt-4" ref={headingsList} role="list">
              {slices.map(
                (slice) =>
                  slice.slice_type === "blog_content" && (
                    <PrismicRichText
                      key={slice.id}
                      field={slice.primary.content}
                      components={{
                        heading1: ({ node, children, key }) => (
                          <TocNavElement
                            node={node}
                            key={key}
                            level={1}
                            activeId={activeId}
                          >
                            {children}
                          </TocNavElement>
                        ),
                        heading2: ({ node, children, key }) => (
                          <TocNavElement
                            node={node}
                            key={key}
                            level={2}
                            activeId={activeId}
                          >
                            {children}
                          </TocNavElement>
                        ),
                        heading3: ({ node, children, key }) => (
                          <TocNavElement
                            node={node}
                            key={key}
                            level={3}
                            activeId={activeId}
                          >
                            {children}
                          </TocNavElement>
                        ),
                        paragraph: () => <></>,
                        preformatted: () => <></>,
                        strong: () => <></>,
                        em: () => <></>,
                        listItem: () => <></>,
                        oListItem: () => <></>,
                        list: () => <></>,
                        oList: () => <></>,
                        image: () => <></>,
                        embed: () => <></>,
                        hyperlink: () => <></>,
                      }}
                    />
                  )
              )}
            </ol>
          </nav>
        </aside>
      </div>
    </div>
  );
}
