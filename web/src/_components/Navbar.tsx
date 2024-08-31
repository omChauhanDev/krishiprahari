import { useTranslation } from "react-i18next";
import logo from "../assets/logo.png";
import LanguageSelector from "./language-selector";
export default function Navbar() {
  const { t } = useTranslation();
  return (
    <nav className="bg-teaGreen flex h-[4rem] justify-center">
      <section className="flex w-[95%] items-center justify-between lg:w-[80%]">
        <header className="flex items-center gap-1">
          <img src={logo} alt="Krishi Prahari Logo" height={50} width={50} />
          <p className="text-2xl font-bold md:text-3xl lg:text-4xl">
            {t("logoTitle")}
          </p>
        </header>
        <LanguageSelector />
      </section>
    </nav>
  );
}
