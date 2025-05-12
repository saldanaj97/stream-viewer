import Sidebar from "@/components/sidebar/Sidebar";

export default function MainSiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex min-h-screen">
        <div className="sticky top-0 h-screen">
          <Sidebar />
        </div>
        <div className="mx-auto flex flex-1 flex-col overflow-auto px-4 2xl:px-48">
          <main className="flex flex-1 flex-col">
            <div className="flex-grow">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
