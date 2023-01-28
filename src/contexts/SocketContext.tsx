declare const io: any;

import { createContext, ReactNode, useContext } from "react";

export interface SocketContextValue {
  socket: any;
  emitConnect: () => void;
  emitDisconnect: () => void;
  emitStream: (data: string) => void;
}

const Context = createContext({} as SocketContextValue);

let socket: any = null;

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  socket = socket ? socket : typeof io !== 'undefined' ? io(undefined, {
    auth: {
      token: localStorage.getItem('authToken')
    },
    autoConnect: false
  }) : null;

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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useSocketContext = () => useContext(Context);

export const SocketConsumer = Context.Consumer;
