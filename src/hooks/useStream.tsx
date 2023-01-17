import { RefObject } from "react";

const useStream = () => {
  const constraints: MediaStreamConstraints = {
    video: {
      width: {
        min: 1280,
        ideal: 1920,
        max: 2560,
      },
      height: {
        min: 720,
        ideal: 1080,
        max: 1440,
      },
    },
    audio: false,
  };

  const requestPermissions = async (deviceId?: string) => {
    console.log("requestPermissions", deviceId);
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
    requestPermissions,
    previewStream,
  };
};

export default useStream;
