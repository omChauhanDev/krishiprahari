import React from "react";
import { useTranslation } from "react-i18next";
import {
  IoCameraOutline,
  IoCloseOutline,
  IoCloudUploadOutline,
} from "react-icons/io5";
import { PulseLoader } from "react-spinners";
import Webcam from "react-webcam";
import { imageUpload } from "../actions/fileUpload";
export default function UploadImage() {
  const [open, setOpen] = React.useState(false);
  const [moreDetails, setMoreDetails] = React.useState(false);
  const { t } = useTranslation();
  const [file, setFile] = React.useState<File | null>(null);
  const [uploading, setUploading] = React.useState(true);
  const [img, setImg] = React.useState("");
  const [imgPrep, setImgPrep] = React.useState(true);
  const [cameraCapture, setCameraCapture] = React.useState(false);
  const webcamRef = React.useRef<Webcam>(null);
  // const diseaseName = "Apple__Cedar_apple_rust";
  const [loading, setLoading] = React.useState(false);
  const [diseaseName, setDiseaseName] = React.useState("");
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
    setFile(e.target.files![0]);
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
        className="flex flex-col items-center gap-5 text-slate-700 mb-5"
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          setOpen(true);
          setDiseaseName(await imageUpload(file));
          setLoading(false);
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
          <div className="flex flex-col w-full items-center">
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
              <div className="flex flex-col items-center gap-3 max-w-[40%]">
                <img
                  src={img}
                  alt="selected image"
                  className="h-full w-full rounded-xl"
                  width={200}
                  height={100}
                />
                <button
                  className="w-fit px-4 rounded-lg bg-darkBrown py-3 text-white"
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
            <div className="absolute left-1/2 top-1/2 z-50 flex w-fit -translate-x-1/2 -translate-y-1/2 flex-col items-end gap-2 rounded-xl">
              {loading ? (
                  <PulseLoader className="" />
              ) : (
                <>
                  {moreDetails ? (
                    <div className="flex flex-col items-start justify-center gap-2 rounded-xl bg-green-100 p-4 w-full">
                      <p className="text-xl">
                        <span className="text-2xl font-medium">
                          {t("precautionsLabel")}: <br />
                        </span>
                        {t(`diseases.${diseaseName}.precautions`)}
                      </p>
                      <p className="text-xl">
                        <span className="text-2xl font-medium">
                          {t("treatmentLabl")}: <br />
                        </span>
                        {t(`diseases.${diseaseName}.treatment`)}
                      </p>
                      <p className="text-xl">
                        <span className="text-2xl font-medium">
                          {t("waterRequirementLabel")} : <br />
                        </span>
                        {t(`diseases.${diseaseName}.water`)}
                      </p>
                      <div className="flex w-full items-center justify-between">
                        <button
                          onClick={() => setMoreDetails(false)}
                          className="bg-darkBrown mt-4 w-full rounded-lg py-2 text-white"
                        >
                          {t("backButton")}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2 rounded-xl bg-green-100 p-4">
                      <header className="text-3xl font-bold">
                        {t("cropLabel")}:{" "}
                        {t(`diseases.${diseaseName}.leafName`)}
                      </header>
                      <p className="text-xl">
                        <span className="text-2xl font-medium">
                          {t("statusLabel")}:{" "}
                          {t(`diseases.${diseaseName}.diseaseName`)}
                        </span>
                      </p>
                      <p className="text-xl">
                        <span className="text-2xl font-medium">
                          {t("descriptionLabel")}:{" "}
                        </span>
                        {t(`diseases.${diseaseName}.description`)}
                      </p>
                      <div className="flex items-center justify-between">
                        <button
                          className="bg-darkBrown mt-4 w-full rounded-lg py-2 text-white"
                          onClick={() => setMoreDetails(true)}
                        >
                          {t("moreDetailsButton")}
                        </button>
                      </div>
                    </div>
                  )}
                  <button
                    className="absolute right-0 top-0 mr-2 mt-2 text-gray-700"
                    onClick={() => setOpen(false)}
                  >
                    <IoCloseOutline size={30} />
                  </button>
                </>
              )}
            </div>
          </>
        )}
        <button
          className={`bg-darkBrown px-4 text-nowrap rounded-xl py-3 text-white ${imgPrep ? "hidden" : "block"}`}
          type="submit"
          disabled={imgPrep}
        >
          {t("diagnoseButton")}
        </button>
      </form>
    </section>
  );
}
