import { useTranslation } from "react-i18next";

const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "Hindi" },
    // { code: "bn", name: "Bengali" },
    // { code: "gu", name: "Gujarati" },
    // { code: "te", name: "Telugu" },
    // { code: "mr", name: "Marathi" },
    // { code: "ta", name: "Tamil" },
    // { code: "kn", name: "Kannada" },
    // { code: "ml", name: "Malayalam" },
    // { code: "pa", name: "Punjabi" },
];

const LanguageSelector = () => {
    const {i18n} = useTranslation();
    const changeLanguage = (lngCode: string) => {
        i18n.changeLanguage(lngCode);
    };
    return (
        <div className="languaglector-container flex items-center gap-2">
            {languages.map((lng) => (
                <button 
                className={lng.code === i18n.language ? "selected" : ""} 
                onClick={()=>changeLanguage(lng.code)} key={lng.code}>{lng.name}
                </button>
            ))}
        </div>
    );
}

export default LanguageSelector;