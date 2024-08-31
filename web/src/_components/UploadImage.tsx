import React from "react";
import { useTranslation } from "react-i18next";
import { AiTwotoneSafetyCertificate } from "react-icons/ai";
import {
  IoCameraOutline,
  IoCloseOutline,
  IoCloudUploadOutline,
} from "react-icons/io5";
import Webcam from "react-webcam";
export default function UploadImage() {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();
  const [uploading, setUploading] = React.useState(true);
  const [img, setImg] = React.useState("");
  const [imgPrep, setImgPrep] = React.useState(true);
  const [cameraCapture, setCameraCapture] = React.useState(false);
  const webcamRef = React.useRef<Webcam>(null);
  const plantHealth = [
    {
      name: "Healthy",
      description:
        "The plant is thriving, with vibrant green leaves and strong stems. There are no visible signs of disease, pests, or nutrient deficiencies. The plant's growth is robust, and it appears lush and full of life, indicating optimal conditions for continued development.",
    },
    {
      name: "Light Blight",
      description:
        "The plant is showing early signs of disease, specifically blight, which could be caused by fungal or bacterial infections. Symptoms are mild, with some leaves exhibiting small, discolored spots or slight wilting. Although the plant's overall health is still manageable, early intervention is necessary to prevent further spread.",
    },
    {
      name: "Late Blight",
      description:
        "The plant is in a critical condition due to advanced blight. This stage is characterized by severe symptoms, including widespread leaf discoloration, extensive wilting, and decay. The plant's ability to survive and produce fruit or flowers is significantly compromised, and immediate treatment or removal may be required to prevent the disease from spreading to nearby plants.",
    },
  ];

  const imageConstraints = {
    facingMode: "environment",
  };

  const handleCameraCapture = () => {
    setCameraCapture(true);
    setUploading(false);
  };

  const handleCancelCameraCapture = () => {
    setCameraCapture(false);
    setUploading(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imgUrl = URL.createObjectURL(e.target.files![0]);
    setImg(imgUrl);
    setUploading(false);
    setImgPrep(false);
  };

  const handleCapture = React.useCallback(() => {
    let imageSrc = "";
    if (webcamRef.current) {
      imageSrc = webcamRef.current.getScreenshot()!;
    }
    setImg(imageSrc);
    setCameraCapture(false);
    setImgPrep(false);
  }, [webcamRef]);
  return (
    <section className="bg-teaGreen flex w-[95%] flex-col gap-5 rounded-xl p-5 lg:w-[85%]">
      <header className="text-xl font-bold sm:text-2xl">
        {t("uploadTitle")}
      </header>
      <form
        className="flex flex-col items-center gap-5 text-slate-700"
        onSubmit={(e) => {
          e.preventDefault();
          setOpen(true);
          console.log("Diagnosing Image");
        }}
      >
        {uploading ? (
          <div className="flex w-full flex-col">
            <section className="flex h-[15rem] w-full flex-col gap-5 md:flex-row">
              <label htmlFor="imageInput" className="w-full">
                <div className="flex h-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-blue-50">
                  <IoCloudUploadOutline size={80} className="" />
                  <p className="sm:text-md text-sm">{t("uploadDescription")}</p>
                </div>
                <input
                  id="imageInput"
                  type="file"
                  placeholder="Upload your image here"
                  onChange={handleFileChange}
                  hidden
                />
              </label>
              <div
                className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-blue-50"
                onClick={handleCameraCapture}
              >
                <IoCameraOutline size={80} />
                <p className="sm:text-md text-sm">{t("captureCrop")}</p>
              </div>
            </section>
          </div>
        ) : (
          <div className="flex flex-col">
            {cameraCapture ? (
              <div className="flex flex-col items-center gap-3">
                <Webcam
                  ref={webcamRef}
                  className="rounded-xl"
                  videoConstraints={imageConstraints}
                />
                <div className="flex w-full items-center gap-5">
                  <button
                    className="bg-darkBrown w-full rounded-xl py-3 text-white"
                    onClick={handleCapture}
                  >
                    {t("capture")}
                  </button>
                  <button
                    className="bg-darkBrown w-full rounded-xl py-3 text-white"
                    onClick={handleCancelCameraCapture}
                  >
                    {t("cancel")}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <img
                  src={img}
                  alt="selected image"
                  className="h-full w-full rounded-xl"
                />
                <button
                  className="w-full rounded-lg bg-black py-3 text-white"
                  onClick={() => {
                    setUploading(true);
                    setImg("");
                    setImgPrep(true);
                  }}
                >
                  {t("changeImage")}
                </button>
              </div>
            )}
          </div>
        )}
        {open && (
          <>
            <div
              className="fixed top-0 z-20 h-screen w-full bg-black/50"
              onClick={() => setOpen(false)}
            ></div>
            <div className="absolute left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 flex-col items-end gap-2 rounded-xl bg-white">
              <div className="flex flex-col items-center gap-2 rounded-xl bg-green-100 p-4">
                <p className="flex items-center gap-1 text-xl font-medium">
                  {plantHealth[0].name} <AiTwotoneSafetyCertificate size={30} />
                </p>
                <p className="text-justify text-lg">
                  {plantHealth[0].description}
                </p>
                <button
                  className="bg-darkBrown flex cursor-pointer items-center rounded-xl px-3 py-1 text-white"
                  onClick={() => setOpen(false)}
                >
                  Close <IoCloseOutline size={30} />
                </button>
              </div>
            </div>
          </>
        )}
        <button
          type="submit"
          className={`w-full rounded-xl bg-black py-3 text-white ${imgPrep ? "cursor-not-allowed opacity-60" : ""}`}
          disabled={imgPrep}
        >
          {t("diagnoseButton")}
        </button>
      </form>
    </section>
  );
}
