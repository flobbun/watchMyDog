import useDevices from "../../hooks/useDevices";

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
    <div className="flex flex-col gap-y-2">
      {devices.map((device, i) => {
        return (
          device.kind === "videoinput" && (
            <div
              onClick={() => onSelect(device.deviceId)}
              className="flex-col text-center cursor-pointer gap-y-2 p-2 border rounded bg-white text-black text-sm"
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
