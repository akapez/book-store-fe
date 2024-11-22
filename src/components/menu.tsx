"use client";

import Link from "next/link";

import { Book, LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface MenuProps {
  children: React.ReactNode;
  role: string | undefined;
}

export default function Menu({ children, role }: MenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link href="/manage">
          <DropdownMenuItem className="cursor-pointer">
            <User />
            <span>Profile</span>
          </DropdownMenuItem>
        </Link>
        {role === "ADMIN" && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Admin Menu</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/manage/books">
              <DropdownMenuItem className="cursor-pointer">
                <Book />
                <span>Books Manage</span>
              </DropdownMenuItem>
            </Link>{" "}
          </>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() =>
            signOut({
              redirect: true,
              callbackUrl: "/sign-in",
            })
          }
        >
          <LogOut />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
