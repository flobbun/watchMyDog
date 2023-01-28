import { ReactNode } from "react";
import { SocketProvider } from "../../../contexts/SocketContext";
import { UIProvider } from "../../../contexts/UIContext";
import s from "./Layout.module.css";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <SocketProvider>
      <UIProvider>
        <a href="/">
          <h1 className="absolute top-4 left-4 text-gray-200 font-mono text-2xl cursor-pointer">
            WatchMyDog
          </h1>
        </a>
        <div className={s.root}>{children}</div>
      </UIProvider>
    </SocketProvider>
  );
};
export default Layout;
