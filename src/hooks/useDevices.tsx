import { useEffect, useState } from "react";

const useDevices = () => {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const getDevices = async () =>
    await navigator.mediaDevices.enumerateDevices();

  useEffect(() => {
    getDevices().then((devices) => {
      setDevices(devices);
    });
  }, []);

  return {
    devices,
  };
};

export default useDevices;
