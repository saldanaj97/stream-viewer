import Sidebar from "../components/Sidebar";
import TopStreams from "../components/TopStreams";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col text-white md:flex-row">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <main className="flex-1 p-4">
        <h1 className="mb-6 text-2xl font-bold md:text-3xl">Top Streams</h1>
        <TopStreams />
      </main>
    </div>
  );
}
