import { Mode } from "../../../interfaces/types";
import Button from "../../ui/Button/Button";
import Card from "../../ui/Card/Card";
import s from "./Menu.module.css";

const Menu = ({ onSelect }: { onSelect: (mode: Mode) => void }) => {
  return (
    <Card className={s.root}>
      <p className="text-5xl font-bold">What do you want to do?</p>
      <div className="flex gap-x-8 justify-center font-bold text-4xl">
        <Button className={s.option} onClick={() => onSelect("watch")}>
          Watch 📺
        </Button>
        <Button className={s.option} onClick={() => onSelect("stream")}>
          Stream 🎥
        </Button>
      </div>
    </Card>
  );
};

export default Menu;
