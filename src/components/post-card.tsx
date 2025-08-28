"use client";

import { ImageField } from "@prismicio/client";
import { PrismicImage } from "@prismicio/react";
import dayjs from "dayjs";
import { CalendarFold, Clock, UserRoundPen } from "lucide-react";
import Link from "next/link";

interface PostCardProps {
  title: string;
  cover: ImageField<never> | undefined;
  excerpt: string;
  readingTime: number;
  author: string;
  publishedDate: string;
  uid: string;
}

export function PostCard({
  title,
  cover,
  excerpt,
  readingTime,
  author,
  publishedDate,
  uid,
}: PostCardProps) {
  return (
    <Link
      href={`/${uid}`}
      className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-muted rounded-md overflow-hidden shadow-2xl hover:shadow-xl transition-all duration-300 ease-in-out border border-white/10 hover:border-white/30"
    >
      <div className="relative aspect-video">
        <PrismicImage field={cover} className="w-full h-full object-cover" />
      </div>
      <div className="space-y-4 p-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="font-serif line-clamp-3">{excerpt}</p>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Clock className="size-4 shrink-0" />
            <span className="text-sm text-muted-foreground line-clamp-1">
              {Math.round(readingTime / 60)} min read
            </span>
          </div>
          <div className="flex items-center gap-2">
            <UserRoundPen className="size-4 shrink-0" />
            <span className="text-sm text-muted-foreground line-clamp-1">
              {author}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarFold className="size-4 shrink-0" />
            <span className="text-sm text-muted-foreground line-clamp-1">
              {dayjs(publishedDate).format("DD MMM YYYY")}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
