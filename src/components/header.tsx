import Link from "next/link";

import { Search } from "lucide-react";

import Menu from "./menu";
import ShoppingCartButton from "./shoppint-cart-button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface HeaderProps {
  isLoggedIn: boolean;
  role: string | undefined;
  imageUrl?: string;
  firstName: string;
  lastName: string;
}

export default function Header({
  isLoggedIn = false,
  role,
  imageUrl,
  firstName,
  lastName,
}: HeaderProps) {
  const firstLetter = firstName.charAt(0).toUpperCase();
  const secondLetter = lastName.charAt(0).toLocaleUpperCase();

  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:pl-5">
      <div className="container flex h-16">
        <div className="hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">Booktopia</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2 px-5">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <form className="relative">
              <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                type="search"
                placeholder="Search..."
                className="pl-8 sm:w-full md:w-[300px] lg:w-[400px]"
              />
            </form>
          </div>
          <Link href="/cart">
            <ShoppingCartButton />
          </Link>
          {!isLoggedIn ? (
            <Link href="/sign-in">
              <Button size="sm">Sign In</Button>
            </Link>
          ) : (
            <Menu role={role} firstName={firstName} lastName={lastName}>
              <Avatar className="cursor-pointer" id="avatar">
                <AvatarImage src={imageUrl} />
                <AvatarFallback>{`${firstLetter}${secondLetter}`}</AvatarFallback>
              </Avatar>
            </Menu>
          )}
        </div>
      </div>
    </header>
  );
}
