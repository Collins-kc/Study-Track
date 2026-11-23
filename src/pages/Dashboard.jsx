import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <main className="p-4 max-w-2xl mx-auto">
        <h1 className="text-xl font-bold">My Tasks</h1>
      </main>
    </>
  );
}