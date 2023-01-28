import { useEffect, useRef, useState } from "react";
import { useSocketContext } from "../../../contexts/SocketContext";
import { useUIContext } from "../../../contexts/UIContext";
import useStream from "../../../hooks/useStream";
import SelectDevicePopup from "../../SelectDevicePopup/SelectDevicePopup";
import s from "./Stream.module.css";

const Stream = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { emitConnect, emitStream } = useSocketContext();
  const { openPopup, closePopup } = useUIContext();
  const { requestPermissions, previewStream } = useStream();
  const [resolution, setResolution] = useState({
    dx: 0,
    dy: 0,
    dw: 640,
    dh: 480,
  });
  const [isStreaming, setIsStreaming] = useState(false);
  const screenShotTimeInterval = 10;

  const onSelectDevice = async (deviceId: string) => {
    await previewStream(videoRef, deviceId);
    const context = canvasRef.current?.getContext("2d");
    if (!context) {
      throw new Error("Canvas context is not defined");
    }
    setInterval(() => {
      context.drawImage(
        videoRef.current!,
        resolution.dx,
        resolution.dy,
        resolution.dw,
        resolution.dh,
      );
      emitStream(canvasRef.current?.toDataURL("image/webp", "1.0") as string);
      setIsStreaming(true);
    }, screenShotTimeInterval);
    closePopup();
  };

  const onResolutionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setResolution({ ...resolution, [e.target.name]: Number(e.target.value) });
  };

  useEffect(() => {
    // Request permissions to get list of devices
    requestPermissions().then((stream) => {
      emitConnect();
      openPopup(<SelectDevicePopup onSelect={onSelectDevice} />);
    });
  }, []);

  return (
    <>
      <div className={s.root} hidden={!isStreaming}>
        <p className="text-center text-white">Streaming</p>
        <div className="flex gap-x-4 p-4">
          <p className="text-white">DW</p>
          <input
            name="dw"
            min={0}
            max={screen.width}
            type="range"
            value={resolution.dw}
            onChange={onResolutionChange}
          />
          <p className="text-white">DH</p>
          <input
            name="dh"
            min={0}
            max={screen.height}
            type="range"
            value={resolution.dh}
            onChange={onResolutionChange}
          />
          <input
            name="dx"
            min={0}
            max={screen.width}
            type="range"
            value={resolution.dx}
            onChange={onResolutionChange}
          />
          <input
            name="dy"
            min={0}
            max={screen.height}
            type="range"
            value={resolution.dy}
            onChange={onResolutionChange}
          />
        </div>
        <video
          className="w-full h-full"
          ref={videoRef}
          autoPlay
        />
      </div>
      <canvas ref={canvasRef} width={resolution.dw} height={resolution.dh} className={s.canvas} />
    </>
  );
};

export default Stream;
