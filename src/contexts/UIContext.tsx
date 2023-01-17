import { createContext, ReactNode, useContext, useState } from "react";
import { Popup } from "../components";

export interface UIContextValue {
  popup: ReactNode | null;
  openPopup: (popup: ReactNode) => void;
  closePopup: () => void;
}

const Context = createContext({} as UIContextValue);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [popup, setPopup] = useState<ReactNode | null>(null);
  const openPopup = (popup: ReactNode) => {
    setPopup(popup);
  };
  const closePopup = () => {
    setPopup(null);
  };

  return (
    <Context.Provider
      value={{
        popup,
        openPopup,
        closePopup,
      }}
    >
      {popup && <Popup onClose={closePopup}>{popup}</Popup>}
      {children}
    </Context.Provider>
  );
};

export const useUIContext = () => useContext(Context);

export const UIConsumer = Context.Consumer;
