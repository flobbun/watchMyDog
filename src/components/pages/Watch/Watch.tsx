import { useEffect, useState } from "react";
import { useSocketContext } from "../../../contexts/SocketContext";
import ActionsMenu from "../../ui/ActionsMenu/ActionsMenu";
import s from "./Watch.module.css";

export const NoStream = () => {
  return (
    <div className="flex p-12 text-center">
      <p className="text-2xl">No stream available</p>
    </div>
  );
};

const Watch = () => {
  const { emitWatch, socket } = useSocketContext();
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    emitWatch();
    socket.on("stream", (data: string) => {
      setData(data);
    });

    return () => {
      socket.off("stream");
    }
  }, []);

  return (
    <div className={s.root}>
      <p className="text-4xl">Watching</p>
      {data ? (
        <>
          <div className={s.imageContainer}>
            <img src={data} className={s.renderedImage} />
          </div>
          <ActionsMenu />
        </>
      ) : (
        <NoStream />
      )}
    </div>
  );
};

export default Watch;
