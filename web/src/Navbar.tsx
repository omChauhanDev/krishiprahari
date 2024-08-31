import logo from "./assets/logo.png";
export default function Navbar() {
  return (
    <nav className="bg-teaGreen flex h-[4rem] items-center justify-around">
      <header className="flex items-center gap-1">
        <img src={logo} alt="Krishi Prahari Logo" height={50} width={60} />
        <p className="text-2xl font-bold">Krishi Prahar</p>
      </header>

      <button className="rounded-xl bg-black p-4 py-3 text-white transition-transform duration-200 hover:scale-105">
        Diagnose now
      </button>
    </nav>
  );
}
