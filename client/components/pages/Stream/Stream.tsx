import { Space, Typography } from "antd";
import useStream from "../../../hooks/useStream";
import SelectDeviceModal from "../../SelectDevicePopup/SelectDeviceModal";
import s from "./Stream.module.css";

const Configurations = ({ resolution, onChange }: { resolution: { dw: number; dh: number }, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <Space className="items-center gap-x-4 p-12">
      <p className="text-white">DW</p>
      <input
        name="dw"
        min={0}
        max={screen.width}
        type="range"
        value={resolution.dw}
        onChange={onChange}
      />
      <p className="text-white">DH</p>
      <input
        name="dh"
        min={0}
        max={screen.height}
        type="range"
        value={resolution.dh}
        onChange={onChange}
      />
      <p className="text-white">DX</p>
    </Space>
  );
};

const Stream = () => {
  const { previewStream, resolution, isStreaming, streamLoop, videoRef, canvasRef, showDeviceSelection, setShowDeviceSelection, handleResolutionChange } = useStream();

  const onSelectDevice = async (deviceId: string) => {
    await previewStream(videoRef, deviceId);
    const context = canvasRef.current?.getContext("2d");
    if (!context) {
      throw new Error("Canvas context is not defined");
    }
    streamLoop(context);
    setShowDeviceSelection(false);
  };

  return (
    <>
      <SelectDeviceModal show={showDeviceSelection} onSelect={onSelectDevice} />
      <Space direction="vertical" className={s.root} hidden={!isStreaming}>
        <Typography className="text-center text-white text-4xl">Streaming</Typography>
        <video
          className="w-2/4 h-2/4 m-auto rounded-md border border-gray-500"
          ref={videoRef}
          autoPlay
        />
        <Configurations resolution={resolution} onChange={handleResolutionChange} />
      </Space>
      <canvas ref={canvasRef} width={resolution.dw} height={resolution.dh} className={s.canvas} />
    </>
  );
};

export default Stream;
