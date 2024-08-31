import Webcam from "react-webcam";
import React from "react";
export default function WebCamImage() {
  const webcamRef = React.useRef(null);
  const [img, setImg] = React.useState(null);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImg(imageSrc);
  }, [webcamRef]);

  return (
    <div>
      {img ? (
        <img src={img} alt="webcam" />
      ) : (
        <Webcam height={600} width={600} ref={webcamRef} mirrored={true} />
      )}
      <div className="btn-container">
        <button onClick={capture}>Capture photo</button>
      </div>
    </div>
  );
}
