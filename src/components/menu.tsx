import Link from "next/link";

import { Book, BookCheck, History, LogOut, User, Users } from "lucide-react";

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
}

export default function Menu({ children }: MenuProps) {
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
        <Link href="/manage/order-history">
          <DropdownMenuItem className="cursor-pointer">
            <History />
            <span>Order History</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Admin Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/manage/books">
          <DropdownMenuItem className="cursor-pointer">
            <Book />
            <span>Books Manage</span>
          </DropdownMenuItem>
        </Link>
        <Link href="/manage/users">
          <DropdownMenuItem className="cursor-pointer">
            <Users />
            <span>Users Manage</span>
          </DropdownMenuItem>
        </Link>
        <Link href="/manage/orders">
          <DropdownMenuItem className="cursor-pointer">
            <BookCheck />
            <span>Orders Manage</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <LogOut />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
