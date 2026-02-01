import React from 'react';
import styled from 'styled-components';
import type { Player } from '../../types/game';

const HUDContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TopLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StatusBars = styled.div`
  background: var(--panel-bg);
  padding: 15px;
  border-radius: 8px;
  border-left: 4px solid var(--primary-color);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  width: 250px;
`;

const LevelDisplay = styled.div`
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 5px;
  font-size: 0.9rem;
`;

const BarContainer = styled.div`
  width: 100%;
  height: 12px;
  background: #333;
  margin: 5px 0;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
`;

const BarFill = styled.div<{ color: string; percent: number }>`
  height: 100%;
  width: ${(props) => props.percent}%;
  background: ${(props) => props.color};
  transition: width 0.3s ease-out;
`;

const BarText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.6rem;
  color: white;
  font-weight: bold;
  pointer-events: none;
`;

const BottomMenu = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  padding-bottom: 20px;
  pointer-events: auto;
`;

const MenuButton = styled.button`
  background: var(--panel-bg);
  color: var(--primary-color);
  border: 1px solid rgba(255, 215, 0, 0.3);
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-family: 'Outfit', sans-serif;
  font-weight: bold;
  font-size: 0.85rem;
  transition: all 0.2s;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);

  &:hover {
    background: var(--primary-color);
    color: black;
    transform: translateY(-2px);
  }

  span {
    display: block;
    font-size: 0.6rem;
    opacity: 0.6;
    margin-bottom: 2px;
  }
`;

interface HUDProps {
  player: Player;
  settings: {
    cooldownVisualMode: number;
  };
  onOpenStatus: () => void;
  onOpenInventory: () => void;
  onOpenBestiary: () => void;
  onOpenSettings: () => void;
}

const WeaponSlot = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 64px;
  height: 64px;
  background: var(--panel-bg);
  border: 2px solid var(--primary-color);
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  pointer-events: auto;
  overflow: hidden;
`;

const CooldownOverlay = styled.div<{ progress: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(circle, transparent 40%, rgba(0, 0, 0, 0.5) 40%),
    conic-gradient(
      rgba(255, 255, 255, 0.3) ${(props) => props.progress * 360}deg,
      transparent 0
    );
  pointer-events: none;
`;

const WeaponIcon = styled.div`
  font-size: 2rem;
  filter: drop-shadow(0 0 5px rgba(255, 215, 0, 0.5));
`;

const HUD: React.FC<HUDProps> = ({
  player,
  settings,
  onOpenStatus,
  onOpenInventory,
  onOpenBestiary,
  onOpenSettings,
}) => {
  const hpPercent = (player.hp / player.maxHp) * 100;
  const mpPercent = (player.mp / player.maxMp) * 100;
  const expPercent = (player.exp / player.maxExp) * 100;

  // Clockwipe progress: 0 (start) to 1 (end)
  // When progress is 0 but isAttacking is true, it's just starting.
  // When isAttacking is false, cooldown is done (0/Ready).
  const cooldownProgress = player.attack.isAttacking
    ? 1 - player.attack.progress
    : 0;

  return (
    <HUDContainer>
      <TopLeft>
        <StatusBars>
          <LevelDisplay>Lv.{player.level} Player</LevelDisplay>

          <BarContainer>
            <BarFill color="#ff4b2b" percent={hpPercent} />
            <BarText>
              HP {player.hp} / {player.maxHp}
            </BarText>
          </BarContainer>

          <BarContainer>
            <BarFill color="#2b86ff" percent={mpPercent} />
            <BarText>
              MP {player.mp} / {player.maxMp}
            </BarText>
          </BarContainer>

          <BarContainer style={{ height: '6px' }}>
            <BarFill color="#ffd700" percent={expPercent} />
          </BarContainer>

          <div
            style={{
              marginTop: '10px',
              fontSize: '0.8rem',
              color: '#999',
              textAlign: 'right',
            }}
          >
            Gold: {player.gold}
          </div>
        </StatusBars>
      </TopLeft>

      <WeaponSlot>
        <WeaponIcon>⚔️</WeaponIcon>
        {settings.cooldownVisualMode === 2 && cooldownProgress > 0 && (
          <CooldownOverlay progress={cooldownProgress} />
        )}
      </WeaponSlot>

      <BottomMenu>
        <MenuButton onClick={onOpenStatus}>
          <span>[C]</span> Status
        </MenuButton>
        <MenuButton onClick={onOpenInventory}>
          <span>[I]</span> Bags
        </MenuButton>
        <MenuButton onClick={onOpenBestiary}>
          <span>[B]</span> Bestiary
        </MenuButton>
        <MenuButton onClick={onOpenSettings}>
          <span>[O]</span> Settings
        </MenuButton>
      </BottomMenu>
    </HUDContainer>
  );
};

export default HUD;
