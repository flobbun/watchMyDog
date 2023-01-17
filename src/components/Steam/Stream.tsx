import { useEffect, useRef } from "react";
import { useSocketContext } from "../../contexts/SocketContext";
import { useUIContext } from "../../contexts/UIContext";
import useStream from "../../hooks/useStream";
import SelectDevicePopup from "../SelectDevicePopup/SelectDevicePopup";
import s from "./Stream.module.css";

const Stream = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { emitConnect, emitStream } = useSocketContext();
  const { openPopup, closePopup } = useUIContext();
  const { requestPermissions, previewStream } = useStream();

  const onSelectDevice = async (deviceId: string) => {
    await previewStream(videoRef, deviceId);
    const context = canvasRef.current?.getContext("2d");
    if (!context) {
      throw new Error("Canvas context is not defined");
    }
    setInterval(() => {
      context.drawImage(videoRef.current!, 0, 0, 300, 350);
      emitStream(canvasRef.current?.toDataURL("image/webp", '1.0') as string);
    }, 5);
    closePopup();
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
      <video ref={videoRef} src="" height={350} width={700} autoPlay />
      <canvas ref={canvasRef} className={s.canvas} />
    </>
  );
};

export default Stream;
