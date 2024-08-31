import { useTranslation } from "react-i18next";
import logo from "./assets/logo.png";
import LanguageSelector from './_components/language-selector';

export default function Navbar() {
  const { t } = useTranslation();
  return (
    <nav className="bg-teaGreen flex h-[4rem] items-center justify-around">
      <header className="flex items-center gap-1">
        <img src={logo} alt="Krishi Prahari Logo" height={50} width={60} />
        <p className="text-2xl font-bold">{t("logoTitle")}</p>
      </header>

      {/* <button className="rounded-xl bg-black p-4 py-3 text-white transition-transform duration-200 hover:scale-105">
        {t("Diagnose now")}
      </button> */}
      <LanguageSelector/>
    </nav>
  );
}
