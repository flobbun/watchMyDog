import { Card, Typography } from "antd"

const Error404 = () => {
  return (
    <Card className="text-center flex justify-center items-center border p-14 m-auto h-screen">
        <Typography className="text-8xl">Code 404</Typography>
        <Typography className="text-6xl">Page not found</Typography>
    </Card>
  )
}

export default Error404;