import { ReactNode } from "react";
import s from "./Popup.module.css";

const Popup = ({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) => {
  return (
    <div className={s.root}>
      <button
        className="cursor-pointer bg-cyan-600 p-1 rounded w-2/12"
        onClick={() => onClose()}
      >
        ❌
      </button>
      {children}
    </div>
  );
};

export default Popup;
