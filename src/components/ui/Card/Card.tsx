import { ReactNode } from "react";
import s from "./Card.module.css";

const Card = ({
    className,
    children,
}: {
    className?: string;
    children: ReactNode;
}) => {
  return (
    <div className={s.root + ' ' + className}>
        {children}
    </div>
  )
}

export default Card