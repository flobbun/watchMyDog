import { Action, useSocketContext } from "../../../contexts/SocketContext";
import Button from "../Button/Button";
import Card from "../Card/Card";

const ActionsMenu = () => {
  const { emitAction } = useSocketContext();

  const onSelectAction = (action: Action) => {
    emitAction(action);
  }

  return (
    <Card className="p-4 w-full">
      <p className="text-4xl mb-8 text-gray-900">Sound Actions</p>
      <ul className="flex justify-center gap-x-8 text-2xl">
        <li>
          <Button onClick={() => onSelectAction('bark-1')}>Bark 1 🐶</Button>
        </li>
        <li>
          <Button onClick={() => onSelectAction('bark-2')}>Bark 2 🐺</Button>
        </li>
        <li>
          <Button onClick={() => onSelectAction('whistle')}>Whistle 😗</Button>
        </li>
      </ul>
    </Card>
  );
};

export default ActionsMenu;
