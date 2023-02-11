import { Button, Space } from "antd";
import Title from "antd/es/typography/Title";
import { Link, useNavigate } from "react-router-dom";
import RoutePaths from "../../../constants/RoutePaths";
import { StorageVars } from "../../../constants/StorageVars";
import { clearStorage } from "../../../lib/storageManagement";
import s from "./Menu.module.css";

const Menu = () => {
  const navigate = useNavigate();

  return (
    <Space direction="vertical" className={s.root + ' container-bg'}>
      <Title>What do you want to do?</Title>
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
