import Link from "next/link";

import { Search, ShoppingCart } from "lucide-react";

import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:px-5">
      <div className="container flex h-14">
        <div className="hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">Book Store</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2 px-5">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <form className="relative">
              <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8 sm:w-full md:w-[300px] lg:w-[400px]"
              />
            </form>
          </div>
          <Button variant="outline" size="icon">
            <ShoppingCart />
          </Button>
          <Button size="sm">Sign In</Button>
        </div>
      </div>
    </header>
  );
}
