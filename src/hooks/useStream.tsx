import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { useSocketContext } from "../contexts/SocketContext";

const useStream = () => {
  const [showDeviceSelection, setShowDeviceSelection] = useState(false);
  const { emitStream, emitConnect } = useSocketContext();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [resolution, setResolution] = useState({
    dw: 640,
    dh: 480,
  });
  const handleResolutionChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setResolution({ ...resolution, [e.target.name]: Number(e.target.value) });
  }, [resolution, setResolution]);
  const [isStreaming, setIsStreaming] = useState(false);
  const constraints: MediaStreamConstraints = {
    video: true,
    audio: false,
  };

  useEffect(() => {
    // Request permissions to get list of devices
    requestPermissions().then((stream) => {
      emitConnect();
      setShowDeviceSelection(true);
    });
  }, []);

  const streamLoop = useCallback((context: CanvasRenderingContext2D | null | undefined) => {
    if (videoRef.current && context) {
      context?.drawImage(
        videoRef.current!, 0, 0, resolution.dw, resolution.dh,
      );
      emitStream(canvasRef.current?.toDataURL("image/webp", "1.0") as string);
      setIsStreaming(true);
      requestAnimationFrame(() => streamLoop(context));
    }
  }, [videoRef.current, canvasRef.current, resolution, emitStream, setIsStreaming]);

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
    videoRef,
    canvasRef,
    streamLoop,
    isStreaming,
    resolution,
    setResolution,
    previewStream,
    showDeviceSelection,
    setShowDeviceSelection,
    handleResolutionChange,
  };
};

export default useStream;
