import { useTranslation } from "react-i18next";
import { MdGTranslate } from "react-icons/md";

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "bn", name: "Bengali" },
  { code: "gu", name: "Gujarati" },
  { code: "te", name: "Telugu" },
  { code: "mr", name: "Marathi" },
  { code: "ta", name: "Tamil" },
  { code: "kn", name: "Kannada" },
  { code: "ml", name: "Malayalam" },
  { code: "pa", name: "Punjabi" },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lngCode: string) => {
    i18n.changeLanguage(lngCode);
  };

  return (
    <div className="flex items-center gap-1 rounded-xl bg-white p-2">
      <MdGTranslate size={25} />
      <select
        title="Select Language"
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="bg-white focus:outline-none"
      >
        {languages.map((lng) => (
          <option key={lng.code} value={lng.code}>
            {lng.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
