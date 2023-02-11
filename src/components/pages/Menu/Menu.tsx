import { Link } from "react-router-dom";
import RoutePaths from "../../../constants/RoutePaths";
import s from "./Menu.module.css";
import { Button, Card, Space } from "antd";
import Title from "antd/es/typography/Title";

const Menu = () => {
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
    </Space>
  );
};

export default Menu;
