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

import type { GameState } from '../../types/game';

interface SettingsWindowProps {
  settings: {
    showRange: boolean;
    showHitbox: boolean;
    cooldownVisualMode: number;
  };
  onToggle: (key: keyof GameState['settings']) => void;
  onClose: () => void;
}

const SettingsWindow: React.FC<SettingsWindowProps> = ({
  settings,
  onToggle,
  onClose,
}) => {
  const getModeLabel = (mode: number) => {
    switch (mode) {
      case 1:
        return '1: 발밑 게이지';
      case 2:
        return '2: HUD 아이콘';
      case 3:
        return '3: 캐릭터 반짝임';
      default:
        return '0: 끄기';
    }
  };

  const handleCycleMode = () => {
    // This is a bit tricky because onToggle expects a key and toggles boolean.
    // However, for this specific use case, we might need a custom handler or
    // just use onToggle if the parent's toggleSetting handles numbers.
    onToggle('cooldownVisualMode');
  };

  return (
    <Overlay onClick={onClose}>
      <Window onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>Settings</Title>

        <SettingRow>
          <SettingLabel>공격 범위 표시</SettingLabel>
          <ToggleButton
            active={settings.showRange}
            onClick={() => onToggle('showRange')}
          >
            {settings.showRange ? 'ON' : 'OFF'}
          </ToggleButton>
        </SettingRow>

        <SettingRow>
          <SettingLabel>몬스터 히트박스 표시</SettingLabel>
          <ToggleButton
            active={settings.showHitbox}
            onClick={() => onToggle('showHitbox')}
          >
            {settings.showHitbox ? 'ON' : 'OFF'}
          </ToggleButton>
        </SettingRow>

        <SettingRow>
          <SettingLabel>쿨타임 표시 방식</SettingLabel>
          <ToggleButton
            active={settings.cooldownVisualMode > 0}
            onClick={handleCycleMode}
          >
            {getModeLabel(settings.cooldownVisualMode)}
          </ToggleButton>
        </SettingRow>

        <div
          style={{
            marginTop: '20px',
            fontSize: '0.8rem',
            color: '#666',
            textAlign: 'center',
          }}
        >
          단축키: I (인벤토리), C (스테이터스), B (도감), O (설정)
        </div>
      </Window>
    </Overlay>
  );
};

export default SettingsWindow;
