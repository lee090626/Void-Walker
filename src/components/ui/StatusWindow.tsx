import React from 'react';
import styled, { keyframes } from 'styled-components';
import type { Player } from '../../types/game';

const fadeIn = keyframes`
  from { opacity: 0; transform: translate(-50%, -45%); }
  to { opacity: 1; transform: translate(-50%, -50%); }
`;

const glowPulse = keyframes`
  0% { box-shadow: 0 0 5px rgba(255, 215, 0, 0.2); }
  50% { box-shadow: 0 0 15px rgba(255, 215, 0, 0.4); }
  100% { box-shadow: 0 0 5px rgba(255, 215, 0, 0.2); }
`;

const WindowOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 520px;
  background: linear-gradient(
    135deg,
    rgba(20, 20, 20, 0.9) 0%,
    rgba(40, 40, 40, 0.85) 100%
  );
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 20px;
  padding: 30px;
  color: white;
  pointer-events: auto;
  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.9),
    inset 0 0 20px rgba(255, 215, 0, 0.05);
  backdrop-filter: blur(15px);
  max-height: 90vh;
  overflow-y: auto;
  animation: ${fadeIn} 0.3s ease-out;
  z-index: 1000;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }
  &::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 3px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  border-bottom: 1px solid rgba(255, 215, 0, 0.2);
  padding-bottom: 15px;
`;

const Title = styled.h2`
  color: var(--primary-color);
  margin: 0;
  font-size: 1.8rem;
  font-family: 'Outfit', sans-serif;
  text-transform: uppercase;
  letter-spacing: 4px;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
`;

const ContentLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SectionTitle = styled.div`
  font-size: 0.8rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 5px;
  font-weight: 600;
`;

const StatRow = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 215, 0, 0.05);
    border-color: rgba(255, 215, 0, 0.2);
    transform: translateX(5px);
  }
`;

const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const StatLabel = styled.span`
  font-weight: 500;
  font-size: 0.95rem;
  color: #ddd;
`;

const StatValue = styled.span`
  color: var(--primary-color);
  font-size: 1.1rem;
  font-weight: 700;
  font-family: 'JetBrains Mono', monospace;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const AddButton = styled.button<{ $amount: number }>`
  background: ${(props) => {
    if (props.$amount >= 1000)
      return 'linear-gradient(135deg, #ffd700 0%, #ff8c00 100%)';
    if (props.$amount >= 100)
      return 'linear-gradient(135deg, #c0c0c0 0%, #708090 100%)';
    if (props.$amount >= 10)
      return 'linear-gradient(135deg, #cd7f32 0%, #8b4513 100%)';
    return 'rgba(255, 255, 255, 0.1)';
  }};
  color: ${(props) => (props.$amount >= 10 ? 'black' : 'var(--primary-color)')};
  border: 1px solid
    ${(props) =>
      props.$amount >= 10 ? 'rgba(0,0,0,0.2)' : 'rgba(255, 215, 0, 0.3)'};
  min-width: 42px;
  height: 28px;
  font-size: 0.7rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 800;
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  text-transform: uppercase;

  &::before {
    content: '+';
    font-size: 0.8rem;
    opacity: 0.7;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    filter: brightness(1.2);
    box-shadow: 0 4px 12px
      ${(props) => {
        if (props.$amount >= 1000) return 'rgba(255, 215, 0, 0.4)';
        if (props.$amount >= 100) return 'rgba(192, 192, 192, 0.4)';
        if (props.$amount >= 10) return 'rgba(205, 127, 50, 0.4)';
        return 'rgba(255, 215, 0, 0.2)';
      }};
  }

  &:active:not(:disabled) {
    transform: translateY(0) scale(0.95);
  }

  &:disabled {
    background: rgba(255, 255, 255, 0.05);
    color: #555;
    border-color: rgba(255, 255, 255, 0.05);
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
`;

const DetailCard = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.span`
  font-size: 0.85rem;
  color: #aaa;
`;

const DetailValue = styled.span`
  font-size: 0.9rem;
  color: #eee;
  font-weight: 600;
`;

const Footer = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const PointsBadge = styled.div`
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid var(--primary-color);
  padding: 12px;
  border-radius: 10px;
  text-align: center;
  font-size: 0.9rem;
  animation: ${glowPulse} 2s infinite ease-in-out;

  span {
    color: var(--primary-color);
    font-weight: bold;
    font-size: 1.1rem;
    margin-left: 8px;
  }
`;

const DescriptionArea = styled.div`
  padding: 12px 16px;
  background: rgba(255, 215, 0, 0.03);
  border-radius: 10px;
  font-size: 0.85rem;
  color: #bbb;
  line-height: 1.5;
  min-height: 60px;
  border-left: 3px solid var(--primary-color);
`;

const ActionButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const ResetButton = styled.button`
  background: rgba(255, 75, 43, 0.1);
  color: #ff4b2b;
  border: 1px solid rgba(255, 75, 43, 0.3);
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.2s;

  &:hover {
    background: #ff4b2b;
    color: white;
  }
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.8rem;
  text-transform: uppercase;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

interface StatusWindowProps {
  player: Player;
  onAllocate: (statName: keyof Player['stats'], amount: number) => void;
  onReset: () => void;
  onClose: () => void;
}

const StatusWindow: React.FC<StatusWindowProps> = ({
  player,
  onAllocate,
  onReset,
  onClose,
}) => {
  const [hoveredStat, setHoveredStat] = React.useState<
    keyof Player['stats'] | null
  >(null);

  const stats: (keyof Player['stats'])[] = ['str', 'dex', 'int', 'vit'];
  const statLabels: Record<string, string> = {
    str: '근력 (STR)',
    dex: '민첩 (DEX)',
    int: '지능 (INT)',
    vit: '체력 (VIT)',
  };

  const statDescriptions: Record<string, string> = {
    str: '물리 공격력을 대폭 상승시킵니다. 물리적인 힘의 척도입니다.',
    dex: '이동 속도와 공격 속도, 회피율을 상승시킵니다. 정교한 움직임을 가능케 합니다.',
    int: '마법 공격력과 최대 마력(MP)을 상승시킵니다. 정신적인 힘의 척도입니다.',
    vit: '최대 체력(HP)과 방어력을 상승시킵니다. 생존력과 인내심을 강화합니다.',
  };

  return (
    <WindowOverlay>
      <Header>
        <Title>Character Status</Title>
      </Header>

      <ContentLayout>
        <Section>
          <SectionTitle>Base Stats</SectionTitle>
          {stats.map((stat) => (
            <StatRow
              key={stat}
              onMouseEnter={() => setHoveredStat(stat)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <StatHeader>
                <StatLabel>{statLabels[stat]}</StatLabel>
                <StatValue>{player.stats[stat]}</StatValue>
              </StatHeader>
              <ButtonGroup>
                {[1, 5, 10, 100, 1000].map((amt) => (
                  <AddButton
                    key={amt}
                    $amount={amt}
                    disabled={player.statPoints < amt}
                    onClick={(e) => {
                      e.stopPropagation();
                      onAllocate(stat, amt);
                    }}
                  >
                    {amt >= 1000 ? '1k' : amt}
                  </AddButton>
                ))}
              </ButtonGroup>
            </StatRow>
          ))}
        </Section>

        <Section>
          <SectionTitle>Combat Details</SectionTitle>
          <DetailCard>
            <DetailRow>
              <DetailLabel>공격력 (ATK)</DetailLabel>
              <DetailValue>{player.atk}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>방어력 (DEF)</DetailLabel>
              <DetailValue>{player.def}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>공격 속도 (ASPD)</DetailLabel>
              <DetailValue>
                {(0.5 * (1 + Math.log(player.stats.dex) * 2.0)).toFixed(2)}/s
              </DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>이동 속도 (SPD)</DetailLabel>
              <DetailValue>{player.speed.toFixed(0)}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>최대 체력 (HP)</DetailLabel>
              <DetailValue>{player.maxHp}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>최대 마력 (MP)</DetailLabel>
              <DetailValue>{player.maxMp}</DetailValue>
            </DetailRow>
          </DetailCard>

          <PointsBadge>
            Available Points <span>{player.statPoints}</span>
          </PointsBadge>
        </Section>
      </ContentLayout>

      <Footer>
        <DescriptionArea>
          {hoveredStat
            ? statDescriptions[hoveredStat]
            : '상세 설명을 보려면 스탯에 마우스를 올리세요.'}
        </DescriptionArea>

        <ActionButtons>
          <ResetButton
            onClick={() => {
              if (window.confirm('정말 모든 스탯을 초기화하시겠습니까?')) {
                onReset();
              }
            }}
          >
            Reset Stats
          </ResetButton>
          <CloseButton onClick={onClose}>Close</CloseButton>
        </ActionButtons>
      </Footer>
    </WindowOverlay>
  );
};

export default StatusWindow;
