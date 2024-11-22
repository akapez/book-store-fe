import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider, Toaster } from "@providers";

import "./globals.css";

import { options } from "@auth/options";
import { getServerSession } from "next-auth/next";

import Footer from "@components/footer";
import Header from "@components/header";
import ToggleTheme from "@components/toggle-theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Booktopia",
  description: "Discover your next favorite read.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(options);
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header
            role={session?.user.role}
            isLoggedIn={Boolean(session?.user)}
            firstName={"Avishka"}
            lastName={"Malshan"}
            imageUrl={"https://github.com/shadcn.png"}
          />
          {children}
          <ToggleTheme />
          <Toaster />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
