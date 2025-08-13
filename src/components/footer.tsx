import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/home" className="block">
                Home
              </Link>
              <Link href="/posts" className="block">
                All Posts
              </Link>
              <Link href="/about" className="block">
                About
              </Link>
              <Link href="/contact" className="block">
                Contact
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <div className="space-y-2">
              <Link href="/home" className="block">
                Get in touch
              </Link>
              <Link href="/posts" className="block">
                GitHub
              </Link>
              <Link href="/about" className="block">
                Twitter
              </Link>
              <Link href="/contact" className="block">
                LinkedIn
              </Link>
            </div>
          </div>
          <div className="flex max-md:flex-col items-center justify-between w-full md:col-span-2 text-muted-foreground">
            <p>
              @ {new Date().getFullYear()} - Everton Pontes. All rights reserved
            </p>
            <p>Built with Nextjs, TypeScript, and a lot of ☕</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
