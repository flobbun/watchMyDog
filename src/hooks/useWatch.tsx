import { useEffect, useState } from "react";
import { useSocketContext } from "../contexts/SocketContext";

interface StremsMap {
    [id: string]: string;
}

const useWatch = () => {
    const { emitWatch, socket, onStream } = useSocketContext();
    const [data, setData] = useState<StremsMap | null>(null);

    useEffect(() => {
        emitWatch();
        onStream((data) => {
            setData((prev) => {
                if (prev) {
                    return {
                        ...prev,
                        [data.id]: data.data
                    }
                } else {
                    return {
                        [data.id]: data.data
                    }
                }
            });
        });

        return () => {
            socket.off("stream");
        }
    }, []);

    return { data };
}

export default useWatch