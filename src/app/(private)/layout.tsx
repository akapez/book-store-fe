"use client";

import { SessionProvider } from "next-auth/react";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div>{children}</div>
    </SessionProvider>
  );
}
