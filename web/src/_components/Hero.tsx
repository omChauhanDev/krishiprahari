import { useTranslation } from "react-i18next";
export default function Hero() {
  const { t } = useTranslation();
  return (
    <section className="bg-heroLeaves text-lightGreen flex w-full grow items-center justify-center">
      <div className="flex flex-col gap-2 p-5">
        <header className="text-3xl font-bold sm:text-5xl lg:text-6xl">
          {t("heroTitle")}
        </header>
        <p className="text-md font-medium sm:text-xl">{t("heroDescription")}</p>
        {/*<button className="bg-darkBrown mt-2 w-fit rounded-xl px-3 py-3 text-sm text-white sm:text-lg">
          {t("heroButton")}
          </button>*/}
      </div>
    </section>
  );
}
