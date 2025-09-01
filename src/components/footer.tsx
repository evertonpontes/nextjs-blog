import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8">
          <div className="flex max-md:flex-col md:items-center justify-between w-full md:col-span-2 text-muted-foreground">
            <p>
              Copyright @ {new Date().getFullYear()} evertonpontes. All rights
              reserved
            </p>
            <p>Built with Nextjs, TypeScript, and a lot of ☕</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
