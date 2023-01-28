import { useEffect, useState } from "react";
import { useSocketContext } from "../../contexts/SocketContext";
import s from "./Watch.module.css";

const Watch = () => {
  const { emitConnect, socket } = useSocketContext();
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    emitConnect();
    socket.on("stream", (data: string) => {
      setData(data);
    });
  }, []);

  return (
    <>
      <div className={s.root}>
        <p className="text-2xl">Watching</p>
        {data ? (
          <div className={s.imageContainer}>
            <img src={data} className={s.renderedImage} />
          </div>
        ) : (
          <div className="flex p-12 text-center">
            <p className="text-2xl">No stream available</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Watch;
