export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex gap-8">
      <aside className="flex-[2]">
        {/* Include shared UI here e.g. a sidebar */}
      </aside>
      <div className="min-h-[300px] flex-[8] rounded bg-gray-100 p-4">
        {children}
      </div>
    </div>
  );
}
