import { SheetNavigation } from "@components/sheet-navigation";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
      <SheetNavigation />
    </div>
  );
}
