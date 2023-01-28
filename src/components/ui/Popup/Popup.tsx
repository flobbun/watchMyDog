import { ReactNode } from "react";
import Card from "../Card/Card";
import s from "./Popup.module.css";

const Popup = ({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) => {
  return (
    <Card className={s.root}>
      <button
        className="cursor-pointer bg-gray-900 p-1 rounded w-10"
        onClick={() => onClose()}
      >
        ❌
      </button>
      {children}
    </Card>
  );
};

export default Popup;
