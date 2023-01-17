import { useEffect, useRef } from "react";
import { useSocketContext } from "../../contexts/SocketContext";
import s from "./Watch.module.css";

const Watch = () => {
  const { emitConnect, socket } = useSocketContext();
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    emitConnect();
    socket.on("stream", (data: string) => {
      if (imageRef.current) {
        console.log("data", data);
        imageRef.current.src = data;
      }
    });
  }, []);

  return (
    <>
      <div className="text-white text-center p-4 flex flex-col gap-y-4 justify-center items-center">
        <p>Watching</p>
        <img ref={imageRef} className={s.renderedImage} src="" alt="" />
      </div>
    </>
  );
};

export default Watch;
