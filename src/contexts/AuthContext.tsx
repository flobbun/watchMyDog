import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RoutePaths from "../constants/RoutePaths";
import { StorageVars } from "../constants/StorageVars";
import useRefresh from "../hooks/useRefresh";
import { clearStorage, getObject, setObject } from "../lib/storageManagement";

const Context = createContext({});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { refreshSession } = useRefresh();

  useEffect(() => {
    const token = getObject(StorageVars.TOKEN);
    (async () => {
      if (token) {
        try {
          const { token: newToken } = await refreshSession(token);
          if (newToken) {
            setObject(StorageVars.TOKEN, newToken);
          }
        } catch (error) {
          navigate(RoutePaths.LOGIN);
          clearStorage(StorageVars.TOKEN)
        }
      } else if (location.pathname !== RoutePaths.LOGIN){
        navigate(RoutePaths.LOGIN);
      }
    })();
  }, [location]);

  return (
    <Context.Provider
      value={{
        logout: () => {
          clearStorage(StorageVars.TOKEN);
          navigate(RoutePaths.LOGIN);
        },
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAuthContext = () => useContext(Context);

export const AuthConsumer = Context.Consumer;
