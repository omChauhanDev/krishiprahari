import logo from "./assets/logo.png";
export default function Navbar() {
  return (
    <nav className="bg-teaGreen flex h-[4rem] items-center justify-around">
      <img
        src={logo}
        alt="Krishi Prahari Logo"
        height={50}
        width={160}
        className=""
      />
      <button className="rounded-xl bg-black p-4 py-3 text-white transition-transform duration-200 hover:scale-105">
        Diagnose now
      </button>
    </nav>
  );
}
