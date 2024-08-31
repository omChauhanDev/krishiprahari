import { useTranslation } from "react-i18next";
import sideLeaves from "../assets/sideLeaves.png";
export default function Hero() {
  const { t } = useTranslation();
  return (
    <section className="bg-lightGreen flex w-[95%] items-center justify-between rounded-xl lg:w-[90%]">
      <div className="flex flex-col gap-2 p-5">
        <header className="text-2xl font-bold sm:text-4xl lg:text-5xl">
          {t("heroTitle")}
        </header>
        <p className="text-md font-medium sm:text-lg">{t("heroDescription")}</p>
        <button className="bg-darkBrown sm:text-md mt-2 w-fit rounded-xl px-3 py-3 text-sm text-white">
          {t("heroButton")}
        </button>
      </div>
      <img alt="leaves" src={sideLeaves} className="hidden rounded-xl lg:block" />
    </section>
  );
}
