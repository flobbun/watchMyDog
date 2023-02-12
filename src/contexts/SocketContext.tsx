declare const io: any;

import { message } from "antd";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { StorageVars } from "../constants/StorageVars";
import useSound from "../hooks/useSound";
import { getObject } from "../lib/storageManagement";

export type Action = 'bark-1' | 'bark-2' | 'meow' | 'whistle';

interface StreamData {
  data: string;
  id: string;
}

export interface SocketContextValue {
  socket: any;
  emitConnect: () => void;
  emitWatch: () => void;
  emitDisconnect: () => void;
  emitStream: (data: string) => void;
  emitAction: (action: Action) => void;
  onStream: (cb: (data: StreamData) => void) => void;
  numberOfUsers: number;
}

const Context = createContext({} as SocketContextValue);

let socket: any = null;

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [numberOfUsers, setNumberOfUsers] = useState(0);
  const { playSound } = useSound();
  const [messageApi, contextHolder] = message.useMessage();

  const onConnect = ({ numberOfUsers }: { numberOfUsers: number }) => {
    setNumberOfUsers(numberOfUsers);
    messageApi.open({
      type: 'success',
      content: 'A user has connected to the server!',
    });
  }

  const onDisconnect = ({ numberOfUsers }: { numberOfUsers: number }) => {
    setNumberOfUsers(numberOfUsers);
    messageApi.open({
      type: 'success',
      content: 'A user has disconnected from the server!',
    });
  }

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
      socket.on('userConnected', onConnect);
      socket.on('userDisconnected', onDisconnect);
    }
    return () => {
      socket.off('action', onAction);
      socket.off('userConnected', onConnect);
      socket.off('userDisconnected', onDisconnect);
    };
  }, [socket]);

  return (
    <Context.Provider
      value={{
        socket,
        emitConnect: () => socket?.connect(),
        emitWatch: () => {
          socket?.connect();
          socket?.emit('watch');
        },
        emitDisconnect: () => socket?.disconnect(),
        emitStream: (data: string) => socket?.emit('stream', data),
        emitAction: (action: Action) => socket?.emit('action', action),
        onStream: (cb: (data: StreamData) => void) => socket.on("stream", cb),
        numberOfUsers
      }}
    >
      {contextHolder}
      {children}
    </Context.Provider>
  );
};

export const useSocketContext = () => useContext(Context);

export const SocketConsumer = Context.Consumer;
