import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="bg-background relative min-h-svh flex flex-col"
      suppressHydrationWarning
    >
      <Navbar />
      {children}
    </div>
  );
}
