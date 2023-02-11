import { Button, Card, Space, Typography } from "antd";
import { Action, useSocketContext } from "../../../contexts/SocketContext";

const ActionsMenu = () => {
  const { emitAction } = useSocketContext();

  const onSelectAction = (action: Action) => {
    emitAction(action);
  }

  return (
    <Card className="p-4 w-full">
      <Typography className="text-4xl mb-8 text-gray-900">Sound Actions</Typography>
      <Space className="justify-center gap-x-8 text-2xl">
          <Button size="large" onClick={() => onSelectAction('bark-1')}>Bark 1 🐶</Button>
          <Button size="large" onClick={() => onSelectAction('bark-2')}>Bark 2 🐺</Button>
          <Button size="large" onClick={() => onSelectAction('meow')}>Meow 🐱</Button>
          <Button size="large" onClick={() => onSelectAction('whistle')}>Whistle 😗</Button>
      </Space>
    </Card>
  );
};

export default ActionsMenu;
