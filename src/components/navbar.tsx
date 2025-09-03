"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Menu } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Search } from "@/components/search";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/posts", label: "Posts" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="bg-background z-50 w-full border-b px-4 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-6">
          {/* Mobile trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Menu description
                </SheetDescription>
              </SheetHeader>
              <div className="px-4">
                <NavigationMenu className="items-start max-w-none *:w-full">
                  <NavigationMenuList className="flex-col items-start gap-2">
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index} className="w-full">
                        <NavigationMenuLink
                          href={link.href}
                          className="text-accent-foreground py-1.5 font-serif text-base"
                        >
                          {link.label}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </SheetContent>
          </Sheet>
          {/* Navigation links */}
          <NavigationMenu className="max-md:hidden">
            <NavigationMenuList className="gap-2">
              {navigationLinks.map((link, index) => (
                <NavigationMenuItem key={index} className="relative group/link">
                  <NavigationMenuLink
                    href={link.href}
                    className="text-accent-foreground py-1.5 font-medium font-serif text-base"
                  >
                    {link.label}
                  </NavigationMenuLink>
                  <div className="absolute h-px bg-primary bottom-1.5 w-0 group-hover/link:w-full transition-[width] ease-in-out duration-300" />
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        {/* Search form */}
        <div className="w-full max-w-lg grow">
          <Search />
        </div>
        {/* Right side */}
        <div>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
