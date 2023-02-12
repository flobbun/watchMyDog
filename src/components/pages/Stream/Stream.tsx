import Modal from "antd/es/modal/Modal";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSocketContext } from "../../../contexts/SocketContext";
import useStream from "../../../hooks/useStream";
import SelectDevicePopup from "../../SelectDevicePopup/SelectDevicePopup";
import s from "./Stream.module.css";

const Stream = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { emitConnect, emitStream } = useSocketContext();
  const { requestPermissions, previewStream, resolution, setResolution, isStreaming, setIsStreaming } = useStream();
  const [showPopup, setShowPopup] = useState(false);

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

  const onSelectDevice = async (deviceId: string) => {
    await previewStream(videoRef, deviceId);
    const context = canvasRef.current?.getContext("2d");
    if (!context) {
      throw new Error("Canvas context is not defined");
    }
    streamLoop(context);
    setShowPopup(false);
  };

  const onResolutionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResolution({ ...resolution, [e.target.name]: Number(e.target.value) });
  };

  useEffect(() => {
    // Request permissions to get list of devices
    requestPermissions().then((stream) => {
      emitConnect();
      setShowPopup(true);
    });
  }, []);

  return (
    <>
      <Modal closable={false} footer={[]} open={showPopup}>
        <SelectDevicePopup onSelect={onSelectDevice} />
      </Modal>
      <div className={s.root} hidden={!isStreaming}>
        <p className="text-center text-white text-4xl">Streaming</p>
        <div className="flex gap-x-4 p-12">
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
          <p className="text-white">DX</p>
        </div>
        <video
          className="w-2/4 h-2/4 m-auto rounded-md border border-gray-500"
          ref={videoRef}
          autoPlay
        />
      </div>
      <canvas ref={canvasRef} width={resolution.dw} height={resolution.dh} className={s.canvas} />
    </>
  );
};

export default Stream;
