import { ReactNode } from "react"
import s from "./Button.module.css"

const Button = ({
    className,
    onClick,
    children,
}: {
    className?: string
    onClick?: () => void
    children: ReactNode
}) => {
  return (
    <button onClick={onClick} className={s.root + ' ' + className}>
        {children}
    </button>
  )
}

export default Button