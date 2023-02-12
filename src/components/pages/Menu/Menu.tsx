import { Button, Space, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import RoutePaths from "../../../constants/RoutePaths";
import { StorageVars } from "../../../constants/StorageVars";
import { clearStorage } from "../../../lib/storageManagement";
import s from "./Menu.module.css";

const Menu = () => {
  const navigate = useNavigate();

  return (
    <Space direction="vertical" className={s.root + ' container-bg'}>
      <Typography>What do you want to do?</Typography>
      <Space className="justify-center">
        <Link to={RoutePaths.WATCH}>
          <Button size="large">
            Watch 📺
          </Button>
        </Link>
        <Link to={RoutePaths.STREAM}>
          <Button size="large">
            Stream 🎥
          </Button>
        </Link>
      </Space>
      <Button className="mt-12" onClick={() => {
        clearStorage(StorageVars.TOKEN);
        navigate(RoutePaths.LOGIN);
      }} size="small" danger>Logout</Button>
    </Space>
  );
};

export default Menu;
