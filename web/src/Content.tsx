import { IoCloudUploadOutline } from "react-icons/io5";
import React from "react";
import WebCamImage from "./WebCamImage";
import Hero from "./_components/Hero";
import UploadImage from "./_components/UploadImage";
import { useTranslation } from "react-i18next";

export default function Content() {
  const [uploading, setUploading] = React.useState(true);
  const [file, setFile] = React.useState("");
  const [capture, setCapture] = React.useState(false);

  const handleFileChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setUploading(false);
  };
  const { t } = useTranslation();

  return (
    <section className="flex h-full w-full grow flex-col items-center justify-center gap-10">
      <Hero />
      <UploadImage />
      <form className="flex flex-col items-center gap-5 text-slate-700">
        {uploading ? (
          <div className="flex flex-col">
            <label htmlFor="imageInput" className="h-[15rem] w-[30rem]">
              <div className="flex h-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-blue-50">
                <IoCloudUploadOutline size={80} className="" />
                <p>{t("uploadDiscription")}</p>
              </div>
            </label>
            <input
              id="imageInput"
              type="file"
              placeholder="Upload your image here"
              onChange={handleFileChange}
              hidden
            />
            {capture ? (
              <WebCamImage />
            ) : (
              <button onClick={() => setCapture(true)}>
                {t("captureCrop")}
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col">
            <img src={file} />
            <button
              className="w-full rounded-lg bg-black py-3 text-white"
              onClick={() => {
                setUploading(true);
                setFile("");
              }}
            >
              Change Image
            </button>
          </div>
        )}

        <button
          type="submit"
          className={`w-full rounded-xl bg-black py-3 text-white ${uploading ? "cursor-not-allowed opacity-60" : ""}`}
          disabled={uploading}
        >
          {t("Diagnose now")}
        </button>
      </form>
    </section>
  );
}
