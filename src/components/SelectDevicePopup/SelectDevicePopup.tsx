import { Button, Space, Typography } from "antd";
import useDevices from "../../hooks/useDevices";
import s from "./SelectDevicePopup.module.css";

const SelectDevicePopup = ({
  onSelect,
}: {
  onSelect: (deviceId: string) => void;
}) => {
  const { devices } = useDevices();

  if (!devices) {
    return <div>loading...</div>;
  }

  return (
    <Space direction="vertical" className={s.root}>
      <Typography className="text-gray-900 text-3xl text-center">
        Select a recording device
      </Typography >
      <Space className="flex flex-col" direction="vertical">
        {devices.map((device, i) => {
          return (
            device.kind === "videoinput" && (
              <div
                onClick={() => onSelect(device.deviceId)}
                className={s.device}
                key={device.deviceId + i}
              >
                <div>{device.label}</div>
                <div>{device.deviceId}</div>
              </div>
            )
          );
        })}
      </Space>
    </Space>
  );
};

export default SelectDevicePopup;
