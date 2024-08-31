import Content from "./_components/Content";
import Navbar from "./_components/Navbar";

export default function App() {
  return (
    <main className="App flex min-h-screen flex-col gap-10">
      <Navbar />
      <Content />
    </main>
  );
}
