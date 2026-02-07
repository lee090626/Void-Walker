import React from 'react';
import styled, { keyframes } from 'styled-components';
import type { Player } from '../../types/game';
import StatTooltip from './StatTooltip';
import { calculateStatBreakdown } from '../../utils/statCalculator';

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
  width: 950px;
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
  grid-template-columns: 1fr 1.2fr 1fr;
  gap: 25px;
  align-items: start;
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

const EquippedCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const EquipSlot = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.03);
  padding: 8px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const EquipIconWrapper = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  border: 1px solid #444;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EquipIcon = styled.img<{ $rarity: string }>`
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 0 2px ${(props) => props.$rarity});
`;

const EmptyIcon = styled.div`
  width: 100%;
  height: 100%;
  background:
    linear-gradient(
      45deg,
      transparent 45%,
      rgba(255, 255, 255, 0.1) 49%,
      transparent 51%
    ),
    linear-gradient(
      -45deg,
      transparent 45%,
      rgba(255, 255, 255, 0.1) 49%,
      transparent 51%
    );
`;

const EquipEnhance = styled.div`
  position: absolute;
  top: -4px;
  right: -4px;
  background: #000;
  color: #ffd700;
  border: 1px solid #ffd700;
  font-size: 0.6rem;
  padding: 1px 3px;
  border-radius: 4px;
  font-weight: bold;
`;

const EquipInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const EquipLabel = styled.span`
  font-size: 0.75rem;
  color: #888;
  text-transform: uppercase;
  margin-bottom: 4px;
`;

const EquipName = styled.span<{ $active: boolean }>`
  font-size: 1rem;
  font-weight: bold;
  color: ${(props) => (props.$active ? '#fff' : '#555')};
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

const UnequipButton = styled.button`
  background: rgba(255, 68, 68, 0.8);
  border: none;
  border-radius: 4px;
  color: white;
  padding: 2px 6px;
  font-size: 0.7rem;
  cursor: pointer;
  margin-top: 4px;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 68, 68, 1);
    transform: scale(1.05);
  }
`;

interface StatusWindowProps {
  player: Player;
  onAllocate: (statName: keyof Player['stats'], amount: number) => void;
  onReset: () => void;
  onUnequip: (slot: 'Weapon' | 'Armor' | 'Helmet') => void;
  onClose: () => void;
}

const StatusWindow: React.FC<StatusWindowProps> = ({
  player,
  onAllocate,
  onReset,
  onUnequip,
  onClose,
}) => {
  const [hoveredStat, setHoveredStat] = React.useState<
    keyof Player['stats'] | null
  >(null);

  const stats: (keyof Player['stats'])[] = ['str', 'dex', 'int', 'vit', 'def'];
  const statLabels: Record<string, string> = {
    str: 'STR',
    dex: 'DEX',
    int: 'INT',
    vit: 'VIT',
    def: 'DEF',
  };

  const statDescriptions: Record<string, string> = {
    str: 'Increases Attack Power and physical damage.',
    dex: 'Increases Critical Rate, Speed, and Evasion.',
    int: 'Increases Magic Power and Max Mana.',
    vit: 'Increases Max HP and Health Regeneration.',
    def: 'Increases Defense and reduces incoming damage.',
  };

  return (
    <WindowOverlay>
      <Header>
        <Title>{'Status'}</Title>
      </Header>

      <ContentLayout>
        <Section>
          <SectionTitle>{'Base Stats'}</SectionTitle>
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
          <PointsBadge style={{ marginTop: 'auto' }}>
            {'Available Points'} <span>{player.statPoints}</span>
          </PointsBadge>
        </Section>

        <Section>
          <SectionTitle>{'Combat Details'}</SectionTitle>
          <DetailCard>
            {(() => {
              const statBreakdown = calculateStatBreakdown(player);

              return (
                <>
                  <DetailRow>
                    <DetailLabel>
                      {'ATK'}
                      <StatTooltip
                        statName="ATK"
                        breakdown={statBreakdown.atk}
                        includePercentage
                      />
                    </DetailLabel>
                    <DetailValue>
                      {statBreakdown.atk.total.toFixed(1)}
                    </DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>
                      {'DEF'}
                      <StatTooltip
                        statName="DEF"
                        breakdown={statBreakdown.def}
                        includePercentage
                      />
                    </DetailLabel>
                    <DetailValue>
                      {statBreakdown.def.total.toFixed(1)}
                    </DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>
                      {'SPD'}
                      <StatTooltip
                        statName="SPD"
                        breakdown={statBreakdown.speed}
                        includePercentage
                      />
                    </DetailLabel>
                    <DetailValue>
                      {statBreakdown.speed.total.toFixed(0)}
                    </DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>
                      {'Max HP'}
                      <StatTooltip
                        statName="Max HP"
                        breakdown={statBreakdown.maxHp}
                        includePercentage
                      />
                    </DetailLabel>
                    <DetailValue>{statBreakdown.maxHp.total}</DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>
                      {'Max MP'}
                      <StatTooltip
                        statName="Max MP"
                        breakdown={statBreakdown.maxMp}
                        includePercentage
                      />
                    </DetailLabel>
                    <DetailValue>{statBreakdown.maxMp.total}</DetailValue>
                  </DetailRow>
                </>
              );
            })()}
          </DetailCard>

          <SectionTitle style={{ marginTop: '10px' }}>
            {'Skill Bonuses'}
          </SectionTitle>
          <DetailCard>
            {(() => {
              const statBreakdown = calculateStatBreakdown(player);

              return (
                <>
                  <DetailRow>
                    <DetailLabel>{'Crit Damage'}</DetailLabel>
                    <DetailValue>
                      {statBreakdown.critDamage.current}%
                      {statBreakdown.critDamage.current >
                        statBreakdown.critDamage.base && (
                        <span
                          style={{
                            color: '#4af',
                            fontSize: '0.8rem',
                            marginLeft: '6px',
                          }}
                        >
                          (+
                          {statBreakdown.critDamage.current -
                            statBreakdown.critDamage.base}
                          %)
                        </span>
                      )}
                    </DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>{'Attack Speed'}</DetailLabel>
                    <DetailValue>
                      {statBreakdown.attackSpeed.current > 0
                        ? `+${statBreakdown.attackSpeed.current}%`
                        : '0%'}
                    </DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>{'HP Regen'}</DetailLabel>
                    <DetailValue>
                      {statBreakdown.hpRegen.current > 0
                        ? `+${statBreakdown.hpRegen.current} HP/s`
                        : '0 HP/s'}
                    </DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>{'EXP Bonus'}</DetailLabel>
                    <DetailValue>
                      {statBreakdown.expBonus.current > 0
                        ? `+${statBreakdown.expBonus.current}%`
                        : '0%'}
                    </DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>{'Drop Rate'}</DetailLabel>
                    <DetailValue>
                      {statBreakdown.dropRate.current > 0
                        ? `+${statBreakdown.dropRate.current}%`
                        : '0%'}
                    </DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>{'Gold Bonus'}</DetailLabel>
                    <DetailValue>
                      {statBreakdown.goldBonus.current > 0
                        ? `+${statBreakdown.goldBonus.current}%`
                        : '0%'}
                    </DetailValue>
                  </DetailRow>
                </>
              );
            })()}
          </DetailCard>
        </Section>

        <Section>
          <SectionTitle>{'Equipped Items'}</SectionTitle>
          <EquippedCard>
            <EquipSlot>
              <EquipIconWrapper>
                {player.equipment.weapon ? (
                  <EquipIcon
                    src={player.equipment.weapon.icon}
                    $rarity="gold"
                  />
                ) : (
                  <EmptyIcon />
                )}
                {player.equipment.weapon?.enhanceLevel ? (
                  <EquipEnhance>
                    +{player.equipment.weapon.enhanceLevel}
                  </EquipEnhance>
                ) : null}
              </EquipIconWrapper>
              <EquipInfo>
                <EquipLabel>{'Main Weapon'}</EquipLabel>
                <EquipName $active={!!player.equipment.weapon}>
                  {player.equipment.weapon
                    ? player.equipment.weapon.name
                    : 'No Weapon equipped'}
                </EquipName>
                {player.equipment.weapon && (
                  <UnequipButton onClick={() => onUnequip('Weapon')}>
                    {'Unequip'}
                  </UnequipButton>
                )}
              </EquipInfo>
            </EquipSlot>

            <EquipSlot>
              <EquipIconWrapper>
                {player.equipment.helmet ? (
                  <EquipIcon
                    src={player.equipment.helmet.icon}
                    $rarity="#ff6b6b"
                  />
                ) : (
                  <EmptyIcon />
                )}
                {player.equipment.helmet?.enhanceLevel ? (
                  <EquipEnhance>
                    +{player.equipment.helmet.enhanceLevel}
                  </EquipEnhance>
                ) : null}
              </EquipIconWrapper>
              <EquipInfo>
                <EquipLabel>{'Helmet'}</EquipLabel>
                <EquipName $active={!!player.equipment.helmet}>
                  {player.equipment.helmet
                    ? player.equipment.helmet.name
                    : 'No Helmet equipped'}
                </EquipName>
                {player.equipment.helmet && (
                  <UnequipButton onClick={() => onUnequip('Helmet')}>
                    {'Unequip'}
                  </UnequipButton>
                )}
              </EquipInfo>
            </EquipSlot>

            <EquipSlot>
              <EquipIconWrapper>
                {player.equipment.armor ? (
                  <EquipIcon
                    src={player.equipment.armor.icon}
                    $rarity="#00ced1"
                  />
                ) : (
                  <EmptyIcon />
                )}
                {player.equipment.armor?.enhanceLevel ? (
                  <EquipEnhance>
                    +{player.equipment.armor.enhanceLevel}
                  </EquipEnhance>
                ) : null}
              </EquipIconWrapper>
              <EquipInfo>
                <EquipLabel>{'Armor'}</EquipLabel>
                <EquipName $active={!!player.equipment.armor}>
                  {player.equipment.armor
                    ? player.equipment.armor.name
                    : 'No Armor equipped'}
                </EquipName>
                {player.equipment.armor && (
                  <UnequipButton onClick={() => onUnequip('Armor')}>
                    {'Unequip'}
                  </UnequipButton>
                )}
              </EquipInfo>
            </EquipSlot>
          </EquippedCard>
        </Section>
      </ContentLayout>

      <Footer>
        <DescriptionArea>
          {hoveredStat
            ? statDescriptions[hoveredStat]
            : 'Hover over a stat to see details'}
        </DescriptionArea>

        <ActionButtons>
          <ResetButton
            onClick={() => {
              if (
                window.confirm(
                  'Are you sure you want to reset all stat points?',
                )
              ) {
                onReset();
              }
            }}
          >
            {'Reset Stats'}
          </ResetButton>
          <CloseButton onClick={onClose}>{'Close'}</CloseButton>
        </ActionButtons>
      </Footer>
    </WindowOverlay>
  );
};

export default StatusWindow;
