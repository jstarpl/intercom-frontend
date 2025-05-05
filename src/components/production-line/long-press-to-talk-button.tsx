import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { isMobile } from "../../bowser";
import { PrimaryButton } from "../landing-page/form-elements";

type TLongPressToTalkButton = {
  isTalking: boolean;
  onStartTalking?: () => void;
  onStopTalking?: () => void;
};

const Button = styled(PrimaryButton)`
  background: rgba(50, 56, 59, 1);
  color: white;
  border: 0.2rem solid #6d6d6d;
  position: relative;
  width: 100%;

  &.active-btn {
    color: rgba(255, 255, 255, 0);
    animation: pulse 0.7s ease-in-out infinite alternate;
  }

  &.mobile {
    user-select: none;
  }

  @keyframes pulse {
    0% {
      background: #4ada1e;
    }
    100% {
      background: rgba(255, 255, 255, 0.78);
    }
  }
`;

export const LongPressToTalkButton = ({
  isTalking,
  onStartTalking,
  onStopTalking,
}: TLongPressToTalkButton) => {
  const [ref, setRef] = useState<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!ref) return

    const onPointerDown = (e: PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onStartTalking?.();
    };

    const onPointerUp = (e: PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onStopTalking?.();
    };

    const onClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
    }

    const onContextMenu = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    }

    ref.addEventListener('pointerdown', onPointerDown);
    ref.addEventListener('pointerup', onPointerUp);
    ref.addEventListener('click', onClick);
    ref.addEventListener('contextmenu', onContextMenu);

    return () => {
      ref.removeEventListener("pointerdown", onPointerDown);
      ref.removeEventListener("pointerup", onPointerUp);
      ref.removeEventListener("click", onClick);
      ref.removeEventListener("contextmenu", onContextMenu);
    }
  }, [ref])

  return (
    <Button
      ref={setRef}
      className={`${isMobile ? "mobile" : ""} ${isTalking ? "active-btn" : ""}`}
      type="button"
    >
      <span
        style={{
          textAlign: "center",
          width: "100%",
        }}
      >
        Push To Talk
      </span>
    </Button>
  );
};
