import React from "react";
import { IoCameraOutline, IoCloudUploadOutline } from "react-icons/io5";
import Webcam from "react-webcam";
export default function UploadImage() {
  const [uploading, setUploading] = React.useState(true);
  const [img, setImg] = React.useState("");
  const [imgPrep, setImgPrep] = React.useState(true);
  const [cameraCapture, setCameraCapture] = React.useState(false);
  const webcamRef = React.useRef<Webcam>(null);
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
        Show us your crop
      </header>
      <form className="flex flex-col items-center gap-5 text-slate-700">
        {uploading ? (
          <div className="flex w-full flex-col">
            <section className="flex h-[15rem] w-full flex-col gap-5 md:flex-row">
              <label htmlFor="imageInput" className="w-full">
                <div className="flex h-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-blue-50">
                  <IoCloudUploadOutline size={80} className="" />
                  <p className="sm:text-md text-sm">
                    Upload your crop's image here
                  </p>
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
                <p className="sm:text-md text-sm">Take a picture</p>
              </div>
            </section>
          </div>
        ) : (
          <div className="flex flex-col">
            {cameraCapture ? (
              <div className="flex flex-col items-center gap-3">
                <Webcam ref={webcamRef} className="rounded-xl" />
                <div className="flex w-full items-center gap-5">
                  <button
                    className="bg-darkBrown w-full rounded-xl py-3 text-white"
                    onClick={handleCapture}
                  >
                    Capture
                  </button>
                  <button
                    className="bg-darkBrown w-full rounded-xl py-3 text-white"
                    onClick={handleCancelCameraCapture}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <img src={img} className="h-full w-full rounded-xl" />
                <button
                  className="w-full rounded-lg bg-black py-3 text-white"
                  onClick={() => {
                    setUploading(true);
                    setImg("");
                    setImgPrep(true);
                  }}
                >
                  Change Image
                </button>
              </div>
            )}
          </div>
        )}
        <button
          type="submit"
          className={`w-full rounded-xl bg-black py-3 text-white ${imgPrep ? "cursor-not-allowed opacity-60" : ""}`}
          disabled={imgPrep}
        >
          Diagnose Now
        </button>
      </form>
    </section>
  );
}
