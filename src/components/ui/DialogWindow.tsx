import React from 'react';
import styled from 'styled-components';
import type { GameState } from '../../types/game';

interface DialogWindowProps {
  dialog: GameState['currentDialog'];
  onClose: () => void;
  onAction?: (action: string) => void; // For future actions like "Open Shop"
}

const DialogOverlay = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 800px;
  height: 200px;
  background: rgba(0, 0, 0, 0.9);
  border: 4px solid #ffffff;
  border-radius: 8px;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
`;

const SpeakerName = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #fbeb2b; /* Gold color for name */
  margin-bottom: 15px;
  text-shadow: 2px 2px 0 #000;
`;

const DialogText = styled.div`
  font-size: 18px;
  line-height: 1.6;
  flex: 1;
`;

const NextButton = styled.button`
  align-self: flex-end;
  background: transparent;
  border: 2px solid white;
  color: white;
  padding: 8px 20px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background: white;
    color: black;
  }
`;

const ActionButton = styled.button`
  align-self: flex-end;
  background: var(--primary-color);
  border: 2px solid var(--primary-color);
  color: black;
  padding: 8px 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;

  &:hover {
    background: #e6c200;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const DialogWindow: React.FC<DialogWindowProps> = ({
  dialog,
  onClose,
  onAction,
}) => {
  if (!dialog) return null;

  return (
    <DialogOverlay>
      <SpeakerName>{dialog.speaker}</SpeakerName>
      <DialogText>{dialog.text}</DialogText>
      <ButtonGroup>
        {dialog.action && dialog.actionLabel && (
          <ActionButton onClick={() => onAction && onAction(dialog.action!)}>
            {dialog.actionLabel}
          </ActionButton>
        )}
        <NextButton onClick={onClose}>대화 종료</NextButton>
      </ButtonGroup>
    </DialogOverlay>
  );
};

export default DialogWindow;
