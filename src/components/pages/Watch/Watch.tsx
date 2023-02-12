import { Typography } from "antd";
import useWatch from "../../../hooks/useWatch";
import ActionsMenu from "../../ui/ActionsMenu/ActionsMenu";
import s from "./Watch.module.css";

export const NoStream = () => {
  return (
    <div className="flex p-12 text-center">
      <Typography className="text-2xl">No stream available</Typography>
    </div>
  );
};


const StreamFrame = ({ data }: { data: string }) => {
  return (
    <div className={s.imageContainer}>
      <img src={data} className={s.renderedImage} />
    </div>
  )
}

const Watch = () => {
  const { data } = useWatch();

  return (
    <div className={s.root}>
      <p className="text-4xl">Watching</p>
      {data && Object.keys(data).length > 0 ? (
        <>
          {Object.keys(data).map((key) => (
            <StreamFrame key={key} data={data[key]} />
          ))}
          <ActionsMenu />
        </>
      ) : (
        <NoStream />
      )}
    </div>
  );
};

export default Watch;
