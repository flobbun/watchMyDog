import { Link } from "react-router-dom"
import RoutePaths from "../../../constants/RoutePaths"

const Header = () => {
  return (
    <Link to={RoutePaths.HOME}>
      <h1 className="absolute top-4 left-4 text-gray-200 font-mono text-2xl cursor-pointer">
        WatchMyDog
      </h1>
    </Link>
  )
}

export default Header