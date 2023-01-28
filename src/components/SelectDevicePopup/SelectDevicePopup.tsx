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
    <div className={s.root}>
      <p className="text-gray-900 text-3xl text-center">
        Select a recording device
      </p>
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
    </div>
  );
};

export default SelectDevicePopup;
