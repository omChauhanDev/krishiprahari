import React from "react";
import { useTranslation } from "react-i18next";
import {
  IoCameraOutline,
  IoCloseOutline,
  IoCloudUploadOutline,
} from "react-icons/io5";
import Webcam from "react-webcam";

export default function UploadImage() {
  const [open, setOpen] = React.useState(false);
  const [moreDetails, setMoreDetails] = React.useState(false);
  const { t } = useTranslation();
  const [uploading, setUploading] = React.useState(true);
  const [img, setImg] = React.useState("");
  const [imgPrep, setImgPrep] = React.useState(true);
  const [cameraCapture, setCameraCapture] = React.useState(false);
  const webcamRef = React.useRef<Webcam>(null);
  const diseaseName = "Apple__Cedar_apple_rust";
  const cropData = {
    Apple__Cedar_apple_rust: {
      leafName: "Apple",
      diseaseName: "Cedar Apple Rust",
      description:
        "Cedar Apple Rust is a fungal disease that causes bright orange, yellow, or reddish spots on apple leaves, leading to reduced fruit quality and yield.",
      precautions:
        "Remove nearby juniper or cedar trees, which host the rust fungus. Apply fungicides in early spring.",
      treatment:
        "Apply fungicides at bud break and continue through the growing season as needed. Prune infected leaves and dispose of them properly.",
      water:
        "Ensure consistent watering, avoiding overhead irrigation to reduce leaf wetness and prevent the spread of the disease.",
    },
    Apple__healthy: {
      leafName: "Apple",
      diseaseName: "Healthy",
      description:
        "This apple leaf is healthy with no signs of disease or damage, indicating optimal growing conditions and proper care.",
      precautions:
        "Maintain regular monitoring and care to prevent potential diseases. Ensure proper watering, fertilization, and pruning.",
      treatment:
        "No treatment necessary. Continue regular care and monitoring to keep the plant healthy.",
      water:
        "Provide consistent watering according to the plant's needs, avoiding both under-watering and over-watering.",
    },

    "Corn_(maize)__Common_rust": {
      leafName: "Corn (maize)",
      diseaseName: "Common Rust",
      description:
        "Common Rust in maize causes small, reddish-brown pustules on leaves, which can reduce photosynthesis and yield if severe.",
      precautions:
        "Plant resistant varieties and ensure proper crop rotation. Apply fungicides if the disease pressure is high.",
      treatment:
        "Apply fungicides early in the disease development. Remove and destroy infected leaves to reduce spread.",
      water:
        "Water at the base of the plant to keep foliage dry, as moisture on leaves can promote rust development.",
    },

    "Corn_(maize)___Northern_Leaf_Blight": {
      leafName: "Corn (maize)",
      diseaseName: "Northern Leaf Blight",
      description:
        "Northern Leaf Blight is characterized by long, gray-green, cigar-shaped lesions on leaves, which can lead to significant yield loss.",
      precautions:
        "Use resistant hybrids, practice crop rotation, and ensure proper spacing for airflow.",
      treatment:
        "Apply fungicides at the first sign of symptoms. Remove infected debris from the field to prevent overwintering of the fungus.",
      water:
        "Water at the base and avoid overhead irrigation to minimize leaf wetness, reducing the spread of blight.",
    },

    "Pepper,bell_Bacterial_spot": {
      leafName: "Pepper, bell",
      diseaseName: "Bacterial Spot",
      description:
        "Bacterial Spot causes small, dark, water-soaked lesions on leaves and fruit, leading to defoliation and reduced fruit quality.",
      precautions:
        "Use disease-free seeds, practice crop rotation, and avoid overhead watering. Apply copper-based bactericides.",
      treatment:
        "Remove and destroy infected plants. Apply bactericides at the first sign of disease to control spread.",
      water:
        "Water at the base of the plants to prevent moisture from splashing onto the leaves, which can spread bacteria.",
    },

    "Pepper,_bell__healthy": {
      leafName: "Pepper, bell",
      diseaseName: "Healthy",
      description:
        "This bell pepper plant is healthy with no visible signs of disease or stress, indicating good growing conditions.",
      precautions:
        "Continue regular care, including proper watering, fertilization, and pest monitoring.",
      treatment:
        "No treatment necessary. Maintain regular care to keep the plant healthy.",
      water:
        "Ensure consistent watering, allowing the soil to dry slightly between waterings to avoid root rot.",
    },
  };

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
            <div className="absolute left-1/2 top-1/2 z-50 flex w-[80%] -translate-x-1/2 -translate-y-1/2 flex-col items-end gap-2 rounded-xl bg-white md:w-[70%] lg:w-[47%]">
              {moreDetails ? (
                <div className="flex flex-col items-center justify-center gap-2 rounded-xl bg-green-100 p-4">
                  <p className="text-xl">
                    <span className="text-2xl font-medium">Precautions: </span>
                    {cropData[diseaseName].precautions}
                  </p>
                  <p className="text-xl">
                    <span className="text-2xl font-medium">
                      Treatment/Care:{" "}
                    </span>
                    {cropData[diseaseName].treatment}
                  </p>
                  <p className="text-xl">
                    <span className="text-2xl font-medium">
                      Water Requirement:{" "}
                    </span>
                    {cropData[diseaseName].water}
                  </p>
                  <div className="flex w-full items-center justify-between">
                    <button
                      onClick={() => setMoreDetails(false)}
                      className="bg-darkBrown mt-4 w-full rounded-lg py-2 text-white"
                    >
                      Back
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2 rounded-xl bg-green-100 p-4">
                  <header className="text-3xl font-bold">
                    Crop: {cropData[diseaseName].leafName}
                  </header>
                  <p className="text-xl">
                    <span className="text-2xl font-medium">
                      Status: {cropData[diseaseName].diseaseName}
                    </span>
                  </p>
                  <p className="text-xl">
                    <span className="text-2xl font-medium">Description: </span>
                    {cropData[diseaseName].description}
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      className="bg-darkBrown mt-4 w-full rounded-lg py-2 text-white"
                      onClick={() => setMoreDetails(true)}
                    >
                      More Details
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
            </div>
          </>
        )}
        <button
          className={`bg-darkBrown w-full rounded-xl py-3 text-white ${imgPrep ? "cursor-not-allowed" : ""}`}
          type="submit"
          disabled={imgPrep}
        >
          {t("diagnoseButton")}
        </button>
      </form>
    </section>
  );
}
