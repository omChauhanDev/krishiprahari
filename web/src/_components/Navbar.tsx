import logo from "../assets/logo.png";
export default function Navbar() {
  return (
    <nav className="bg-teaGreen flex h-[4rem] items-center">
      <header className="flex items-center gap-1">
        <img src={logo} alt="Krishi Prahari Logo" height={50} width={50} />
        <p className="text-3xl font-bold lg:text-4xl">Krishi Prahar</p>
      </header>
    </nav>
  );
}
