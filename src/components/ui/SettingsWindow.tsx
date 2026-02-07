import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  backdrop-filter: blur(4px);
`;

const Window = styled.div`
  background: var(--panel-bg);
  width: 350px;
  border-radius: 12px;
  border: 1px solid var(--primary-color);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.8);
  padding: 20px;
  position: relative;
`;

const Title = styled.h2`
  color: var(--primary-color);
  margin: 0 0 20px 0;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: #666;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: white;
  }
`;

const SettingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
`;

const SettingLabel = styled.span`
  color: #eee;
  font-size: 1rem;
`;

const ToggleButton = styled.button<{ active: boolean }>`
  background: ${(props) => (props.active ? 'var(--primary-color)' : '#444')};
  color: ${(props) => (props.active ? 'black' : '#aaa')};
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;

  &:hover {
    filter: brightness(1.1);
  }
`;

const ActionButton = styled.button<{ variant?: 'danger' | 'success' }>`
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  border-radius: 8px;
  border: 1px solid
    ${(props) =>
      props.variant === 'danger'
        ? '#ff4444'
        : props.variant === 'success'
          ? '#44ff44'
          : 'var(--primary-color)'};
  background: rgba(0, 0, 0, 0.3);
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: 1px;

  &:hover {
    background: ${(props) =>
      props.variant === 'danger'
        ? 'rgba(255, 68, 68, 0.2)'
        : props.variant === 'success'
          ? 'rgba(68, 255, 68, 0.2)'
          : 'rgba(255, 215, 0, 0.2)'};
  }
`;

import type { GameState } from '../../types/game';

interface SettingsWindowProps {
  settings: {
    showRange: boolean;
    showHitbox: boolean;
    cooldownVisualMode: number;
    showCoordinates: boolean;
  };
  onToggle: (key: keyof GameState['settings']) => void;
  onClose: () => void;
  onSave: () => void;
  onLoad: () => void;
  onReset: () => void;
}

const SettingsWindow: React.FC<SettingsWindowProps> = ({
  settings,
  onToggle,
  onClose,
  onSave,
  onLoad,
  onReset,
}) => {
  const getModeLabel = (mode: number) => {
    switch (mode) {
      case 1:
        return 'At Feet';
      case 2:
        return 'On HUD';
      case 3:
        return 'Glow Effect';
      default:
        return 'Off';
    }
  };

  const handleCycleMode = () => {
    onToggle('cooldownVisualMode');
  };

  return (
    <Overlay onClick={onClose}>
      <Window onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>{'Settings'}</Title>

        <SettingRow>
          <SettingLabel>{'Language'}</SettingLabel>
        </SettingRow>

        <SettingRow>
          <SettingLabel>{'Show Attack Range'}</SettingLabel>
          <ToggleButton
            active={settings.showRange}
            onClick={() => onToggle('showRange')}
          >
            {settings.showRange ? 'ON' : 'OFF'}
          </ToggleButton>
        </SettingRow>

        <SettingRow>
          <SettingLabel>{'Show Hitboxes'}</SettingLabel>
          <ToggleButton
            active={settings.showHitbox}
            onClick={() => onToggle('showHitbox')}
          >
            {settings.showHitbox ? 'ON' : 'OFF'}
          </ToggleButton>
        </SettingRow>

        <SettingRow>
          <SettingLabel>{'Cooldown Visual'}</SettingLabel>
          <ToggleButton
            active={settings.cooldownVisualMode > 0}
            onClick={handleCycleMode}
          >
            {getModeLabel(settings.cooldownVisualMode)}
          </ToggleButton>
        </SettingRow>

        <SettingRow>
          <SettingLabel>{'Show Coordinates'}</SettingLabel>
          <ToggleButton
            active={settings.showCoordinates}
            onClick={() => onToggle('showCoordinates')}
          >
            {settings.showCoordinates ? 'ON' : 'OFF'}
          </ToggleButton>
        </SettingRow>

        <div
          style={{
            marginTop: '30px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <ActionButton variant="success" onClick={onSave}>
            {'Save Game'}
          </ActionButton>
          <ActionButton onClick={onLoad}>{'Load Game'}</ActionButton>
          <ActionButton
            variant="danger"
            onClick={onReset}
            style={{ marginTop: '20px' }}
          >
            {'Reset Game'}
          </ActionButton>
        </div>

        <div
          style={{
            marginTop: '20px',
            fontSize: '0.8rem',
            color: '#666',
            textAlign: 'center',
          }}
        >
          {'Shortcuts'}
        </div>
      </Window>
    </Overlay>
  );
};

export default SettingsWindow;
