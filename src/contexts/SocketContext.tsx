declare const io: any;

import { createContext, ReactNode, useContext, useEffect } from "react";
import { StorageVars } from "../constants/StorageVars";
import useSound from "../hooks/useSound";
import { getObject } from "../lib/storageManagement";

export type Action = 'bark-1' | 'bark-2' | 'meow' | 'whistle';

export interface SocketContextValue {
  socket: any;
  emitConnect: () => void;
  emitDisconnect: () => void;
  emitStream: (data: string) => void;
  emitAction: (action: Action) => void;
}

const Context = createContext({} as SocketContextValue);

let socket: any = null;

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { playSound } = useSound();

  const connect = () => {
    if (socket) {
      return socket;
    } else if (typeof io !== 'undefined') {
      return io(undefined, {
        auth: {
          token: getObject(StorageVars.TOKEN)
        },
        autoConnect: false
      })
    }

    return null;
  }

  socket = connect();

  const onAction = (action: Action) => {
    playSound(action);
  }

  useEffect(() => {
    if (socket) {
      socket.on('action', onAction);
    }
  }, [socket]);

  return (
    <Context.Provider
      value={{
        socket,
        emitConnect: () => {
          socket?.connect();
        },
        emitDisconnect: () => {
          socket?.disconnect();
        },
        emitStream: (data: string) => {
          socket?.emit('stream', data);
        },
        emitAction: (action: Action) => {
          socket?.emit('action', action);
        },
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useSocketContext = () => useContext(Context);

export const SocketConsumer = Context.Consumer;
