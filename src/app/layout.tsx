import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@providers";

import "./globals.css";

import Footer from "@components/footer";
import Header from "@components/header";
import ToggleTheme from "@components/toggle-theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Booktopia",
  description: "Discover your next favorite read.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <ToggleTheme />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
