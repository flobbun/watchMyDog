import { ConfigProvider } from "antd";
import { ReactNode } from "react";
import { SocketProvider } from "../../../contexts/SocketContext";

const ProviderHub = ({ children }: { children: ReactNode }) => {
    const antTheme = {
        token: {
            "colorPrimaryTextActive": "#fffafa",
            "colorPrimary": "#1f7588",
            "colorInfo": "#1f7588",
            "colorTextBase": "#060505"
        }
    }

    return (
        <ConfigProvider theme={antTheme}>
            <SocketProvider>
                {children}
            </SocketProvider>
        </ConfigProvider>
    )
}

export default ProviderHub