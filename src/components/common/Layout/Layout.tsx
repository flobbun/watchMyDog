import { ReactNode } from "react";
import { SocketProvider } from "../../../contexts/SocketContext";
import { UIProvider } from "../../../contexts/UIContext";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <SocketProvider>
      <UIProvider>
        <div className="h-screen bg-slate-800 p-2">{children}</div>
      </UIProvider>
    </SocketProvider>
  );
};
export default Layout;
