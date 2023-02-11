import { Card, Space } from "antd"
import { Link } from "react-router-dom"
import RoutePaths from "../../../constants/RoutePaths"
import { useSocketContext } from "../../../contexts/SocketContext"

const Header = () => {
  const { numberOfUsers } = useSocketContext();
  return (
    <Card size="small">
      <Space className="font-mono" direction="horizontal">
        <Link to={RoutePaths.HOME}>
          <h1 className="text-2xl cursor-pointer">
            WatchMyDog
          </h1>
        </Link>

        <div className="ml-10 text-lg">Users On: {numberOfUsers} 🟢</div>
      </Space>
    </Card>
  )
}

export default Header