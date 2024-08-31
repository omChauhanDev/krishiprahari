import logo from "../assets/logo.png";
export default function Navbar() {
  return (
    <nav className="bg-teaGreen flex h-[4rem] items-center">
      <header className="flex items-center gap-1">
        <img src={logo} alt="Krishi Prahari Logo" height={50} width={50} />
        <p className="text-4xl font-bold">Krishi Prahar</p>
      </header>
    </nav>
  );
}
