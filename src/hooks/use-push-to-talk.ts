import { useCallback, useState } from "react";

type UsePushToTalkOptions = {
  muteInput: (mute: boolean) => void;
};

export function usePushToTalk({ muteInput }: UsePushToTalkOptions) {
  const [isTalking, setIsTalking] = useState<boolean>(false);
  // const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startTalking = useCallback(() => {
    muteInput(false);
    setIsTalking(true);
  }, [muteInput]);

  const stopTalking = useCallback(() => {
    muteInput(true);
    setIsTalking(false);
  }, [muteInput]);

  const handleLongPressStart = useCallback(() => {
    startTalking();
  }, [startTalking]);

  const handleLongPressEnd = useCallback(() => {
    stopTalking();
  }, [stopTalking]);

  return {
    isTalking,
    handleLongPressStart,
    handleLongPressEnd,
    startTalking,
    stopTalking,
  };
}
