
import { ReactNode } from "react";
import Header from "../Header/Header";

import s from "./Layout.module.css";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <div className={s.root}>{children}</div>
    </>

  );
};
export default Layout;
