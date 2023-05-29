import { Action } from "../contexts/SocketContext";

const useSound = () => {
  const playSound = async (action: Action) => {
    const audio = new Audio();

    const audioPath = {
      ["bark-1"]: "/sounds/bark-1.wav",
      ["bark-2"]: "/sounds/bark-2.wav",
      ["meow"]: "/sounds/meow.mp3",
      ["whistle"]: "/sounds/whistle.wav",
    };

    audio.src = audioPath[action];
    await audio.play();
  };

  return {
    playSound
  };
};

export default useSound;
