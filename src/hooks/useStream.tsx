import { RefObject, useState } from "react";

const useStream = () => {
  const [resolution, setResolution] = useState({
    dw: 640,
    dh: 480,
  });
  const [isStreaming, setIsStreaming] = useState(false);
  const constraints: MediaStreamConstraints = {
    video: true,
    audio: false,
  };

  const requestPermissions = async (deviceId?: string) => {
    if (
      "mediaDevices" in navigator &&
      "getUserMedia" in navigator.mediaDevices
    ) {
      if (deviceId) {
        constraints.video = {
          deviceId: {
            exact: deviceId,
          },
        };
      }
      return await navigator.mediaDevices.getUserMedia(constraints);
    } else {
      alert("Your browser does not support video streaming");
    }
    return null;
  };

  const previewStream = async (
    videoRef: RefObject<HTMLVideoElement>,
    deviceId: string,
  ) => {
    if (!videoRef || !videoRef.current) {
      throw new Error("Video ref is not defined");
    }

    // Request permissions to get stream from selected device
    const stream = await requestPermissions(deviceId);
    videoRef.current.srcObject = stream;
    videoRef.current.play();
  };

  return {
    isStreaming,
    setIsStreaming,
    resolution,
    setResolution,
    requestPermissions,
    previewStream,
  };
};

export default useStream;
