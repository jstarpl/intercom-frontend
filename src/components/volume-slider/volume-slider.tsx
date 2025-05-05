import styled from "@emotion/styled";
import { FC } from "react";
import { NoSoundIcon, SpeakerOn } from "../../assets/icons/icon";

const SliderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const VolumeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    width: 5rem;
    padding: 0.5rem;
    fill: #59cbe8;
  }
`;

const SliderTrack = styled.div`
  width: 80%;
  height: 0.4rem;
  background-color: #e0e0e0;
  border-radius: 0.2rem;
  position: relative;
`;

const SliderThumb = styled.div<{ position: number }>`
  width: 1.5rem;
  height: 1.5rem;
  background-color: #59cbe8;
  border-radius: 50%;
  position: absolute;
  top: -0.6rem;
  left: ${({ position }) => `${position}%`};
  transform: translateX(-50%);
  cursor: pointer;
`;

const VolumeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
`;

type TVolumeSliderProps = {
  value: number;
  handleValueChange: (newVolume: number) => void;
};

export const VolumeSlider: FC<TVolumeSliderProps> = ({
  handleValueChange,
  value,
}) => {
  const thumbPosition = value * 100;

  function onWheel(e: React.WheelEvent<HTMLInputElement>) {
    e.preventDefault();
    const newValue = String(
      Math.max(
        0,
        Math.min(1, Number(e.currentTarget.value) - Math.sign(e.deltaY) * 0.05)
      )
    );
    console.log(e.deltaY, e.currentTarget.value, newValue);

    if (e.currentTarget.value === newValue) return;
    e.currentTarget.value = newValue;
    handleValueChange?.(Number(e));
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    handleValueChange?.(Number(e.target.value));
  }

  return (
    <SliderWrapper>
      <VolumeWrapper>
        <VolumeContainer>
          <NoSoundIcon />
        </VolumeContainer>
        <SliderTrack>
          <SliderThumb position={thumbPosition} />
          <input
            id="volumeSlider"
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={value}
            onChange={onChange}
            onWheel={onWheel}
            style={{
              width: "100%",
              position: "absolute",
              top: "-1rem",
              height: "2rem",
              opacity: 0,
              pointerEvents: "all",
              zIndex: 2,
            }}
          />
        </SliderTrack>
        <VolumeContainer>
          <SpeakerOn />
        </VolumeContainer>
      </VolumeWrapper>
    </SliderWrapper>
  );
};
