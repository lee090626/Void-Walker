import React from 'react';
import styled from 'styled-components';
import { MONSTER_DATABASE, getMonsterStatsByLevel } from '../../types/monster';
import { ITEM_DATABASE } from '../../types/item';
import { levelToTier } from '../../utils/levelUtils';

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
  background: linear-gradient(145deg, #1a1a2e, #16213e);
  width: 500px;
  height: 700px;
  border-radius: 16px;
  border: 1px solid rgba(255, 215, 0, 0.3);
  box-shadow:
    0 0 50px rgba(0, 0, 0, 0.9),
    inset 0 0 20px rgba(255, 215, 0, 0.05);
  display: flex;
  flex-direction: column;
  padding: 25px;
  position: relative;
  color: #e0e0e0;
`;

const Title = styled.h2`
  color: #ffd700;
  margin: 0 0 25px 0;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 4px;
  font-size: 1.5rem;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
`;

const MonsterList = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-right: 12px;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(#ffd700, #ff8c00);
    border-radius: 10px;
  }
`;

const MonsterCard = styled.div<{ unlocked: boolean; isBoss?: boolean }>`
  background: ${(props) =>
    props.unlocked
      ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 100%)'
      : 'rgba(0, 0, 0, 0.4)'};
  border: 1px solid
    ${(props) =>
      props.isBoss
        ? 'rgba(255, 215, 0, 0.4)'
        : props.unlocked
          ? 'rgba(255, 255, 255, 0.1)'
          : 'rgba(255, 255, 255, 0.05)'};
  border-radius: 12px;
  padding: 18px;
  display: flex;
  gap: 20px;
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease-out;
  filter: ${(props) =>
    props.unlocked ? 'none' : 'grayscale(100%) opacity(0.4)'};

  &:hover {
    ${(props) =>
      props.unlocked &&
      `
      transform: translateY(-2px);
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.04) 100%);
      border-color: ${props.isBoss ? '#ffd700' : 'rgba(255, 255, 255, 0.2)'};
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    `}
  }
`;

const MonsterImage = styled.div<{ color: string; spriteUrl?: string }>`
  width: 72px;
  height: 72px;
  background: ${(props) =>
    props.spriteUrl
      ? `url(${props.spriteUrl}) center/contain no-repeat`
      : props.color};
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  flex-shrink: 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const MonsterInfo = styled.div`
  flex: 1;
`;

const MonsterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

const MonsterName = styled.h3`
  margin: 0;
  color: #fff;
  font-size: 1.15rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const KillCount = styled.div`
  font-size: 0.7rem;
  color: #888;
  background: rgba(0, 0, 0, 0.3);
  padding: 3px 8px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const LevelLabel = styled.span`
  font-size: 0.65rem;
  color: #000;
  background: #ff4d4d;
  padding: 1px 6px;
  border-radius: 4px;
  font-weight: 900;
  text-transform: uppercase;
`;

const MonsterDesc = styled.p`
  margin: 5px 0;
  font-size: 0.85rem;
  color: #aaa;
  line-height: 1.4;
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  background: rgba(0, 0, 0, 0.2);
  padding: 10px;
  border-radius: 8px;
`;

const StatItem = styled.div`
  font-size: 0.75rem;
  display: flex;
  justify-content: space-between;
  padding: 0 4px;

  span:first-child {
    color: #666;
    text-transform: uppercase;
    font-size: 0.65rem;
    font-weight: 600;
  }
  span:last-child {
    color: #ddd;
    font-weight: 500;
  }
`;

const DropSection = styled.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

const DropTitle = styled.h4`
  font-size: 0.75rem;
  color: #555;
  margin: 0 0 8px 0;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const DropGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const DropItemTag = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 0.75rem;
  color: #bbb;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    color: #eee;
  }
`;

const DropRate = styled.span`
  color: #ffd700;
  font-weight: 600;
  font-size: 0.7rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.05);
  border: none;
  color: #888;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 100;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 77, 77, 0.2);
    color: #ff4d4d;
    transform: rotate(90deg);
  }
`;

interface MonsterBookProps {
  bestiary: Record<string, number>;
  acquiredEquipment: string[];
  dropRateSkillLevel: number;
  onClose: () => void;
}

const MONSTER_HIERARCHY = [
  {
    id: 'terran',
    name: 'Terra',
    regions: [
      {
        id: 'slime_grasslands',
        name: 'Slime Grasslands',
        monsters: [{ id: 'slime', level: 1 }],
      },
      {
        id: 'goblin_forest',
        name: 'Goblin Forest',
        monsters: [{ id: 'goblin', level: 5 }],
      },
      {
        id: 'dark_cave',
        name: 'Dark Cave',
        monsters: [{ id: 'bat', level: 8 }],
      },
      {
        id: 'frozen_zone',
        name: 'Frozen Zone',
        monsters: [
          { id: 'yeti', level: 20 },
          { id: 'ice_spirit', level: 20 },
          { id: 'frost_dragon', level: 30 },
        ],
      },
    ],
  },
  {
    id: 'proxima',
    name: 'Proxima',
    regions: [
      {
        id: 'moon_plains',
        name: 'Moon Plains',
        monsters: [{ id: 'quantum_wraith', level: 50 }],
      },
      {
        id: 'lunar_ruins',
        name: 'Lunar Ruins',
        monsters: [
          { id: 'grav_drifter', level: 60 },
          { id: 'optical_sentinel', level: 60 },
        ],
      },
      {
        id: 'lunar_void',
        name: 'Lunar Void',
        monsters: [{ id: 'star_eater', level: 80 }],
      },
      {
        id: 'lunar_core',
        name: 'Lunar Core',
        monsters: [{ id: 'luna_overseer', level: 100 }],
      },
    ],
  },
  {
    id: 'aetheria',
    name: 'Aetheria',
    regions: [
      {
        id: 'aetheria_island',
        name: 'Aetheria Island',
        monsters: [
          { id: 'sky_wisp', level: 120 },
          { id: 'cloud_guardian', level: 120 },
        ],
      },
      {
        id: 'wind_crystal',
        name: 'Wind Crystal',
        monsters: [{ id: 'storm_elemental', level: 130 }],
      },
      {
        id: 'mystic_forest',
        name: 'Mystic Forest',
        monsters: [{ id: 'aether_drake', level: 160 }],
      },
      {
        id: 'celestial_sanctuary',
        name: 'Celestial Sanctuary',
        monsters: [{ id: 'celestial_architect', level: 400 }],
      },
    ],
  },
];

const TabContainer = styled.div`
  display: flex;
  background: rgba(0, 0, 0, 0.2);
  padding: 4px;
  border-radius: 10px;
  margin-bottom: 25px;
  gap: 4px;
`;

const Tab = styled.button<{ active: boolean }>`
  background: ${(props) => (props.active ? '#ffd700' : 'transparent')};
  color: ${(props) => (props.active ? '#000' : '#888')};
  border: none;
  flex: 1;
  padding: 8px 0;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    ${(props) => !props.active && 'color: #fff;'}
  }
`;

const RegionSection = styled.div`
  margin-bottom: 25px;
`;

const RegionTitle = styled.div`
  font-size: 0.75rem;
  color: #ffd700;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 800;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 12px;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(255, 215, 0, 0.2), transparent);
  }
`;

const FullDetailOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, #1e1e30 0%, #0a0a0f 100%);
  border-radius: 16px;
  z-index: 150;
  display: flex;
  flex-direction: column;
  padding: 30px;
  animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const DetailHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 30px;
`;

const BigMonsterImage = styled.div<{ color: string; spriteUrl?: string }>`
  width: 140px;
  height: 140px;
  background: ${(props) =>
    props.spriteUrl
      ? `url(${props.spriteUrl}) center/contain no-repeat`
      : props.color};
  border-radius: 20px;
  margin-bottom: 20px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 160%;
    height: 160%;
    background: radial-gradient(
      circle,
      ${(props) => props.color}22 0%,
      transparent 70%
    );
    z-index: -1;
  }
`;

const BossTag = styled.div`
  background: linear-gradient(90deg, #ffd700, #ff8c00);
  color: #000;
  padding: 4px 14px;
  border-radius: 20px;
  font-weight: 800;
  font-size: 0.7rem;
  letter-spacing: 1px;
  margin-bottom: 15px;
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
  text-transform: uppercase;
`;

const DetailTitle = styled.h2`
  color: #fff;
  margin: 0 0 10px 0;
  font-size: 2rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
`;

const SkillSection = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 10px;

  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }
`;

const SkillCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: border-color 0.2s;

  &:hover {
    border-color: rgba(255, 215, 0, 0.3);
  }
`;

const SkillName = styled.div`
  color: #ffd700;
  font-weight: 700;
  margin-bottom: 6px;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    background: #ffd700;
    border-radius: 50%;
    box-shadow: 0 0 8px #ffd700;
  }
`;

const SkillDesc = styled.div`
  color: #aaa;
  font-size: 0.85rem;
  line-height: 1.6;
`;

const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #eee;
  padding: 12px 0;
  width: 100%;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 20px;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    background: rgba(211, 47, 47, 0.1);
    border-color: rgba(211, 47, 47, 0.3);
    color: #ff4d4d;
  }
`;

const ClickCatcher = styled.div`
  cursor: pointer;
  transition: transform 0.1s;
  &:active {
    transform: scale(0.98);
  }
`;

const MonsterBook: React.FC<MonsterBookProps> = ({
  bestiary,
  acquiredEquipment,
  dropRateSkillLevel,
  onClose,
}) => {
  const [currentPlanet, setCurrentPlanet] = React.useState(
    MONSTER_HIERARCHY[0].id,
  );
  const [selectedMonsterId, setSelectedMonsterId] = React.useState<
    string | null
  >(null);

  const planet =
    MONSTER_HIERARCHY.find((p) => p.id === currentPlanet) ||
    MONSTER_HIERARCHY[0];

  const selectedMonster = selectedMonsterId
    ? MONSTER_DATABASE[selectedMonsterId]
    : null;

  const selectedMonsterKills = selectedMonsterId
    ? bestiary[selectedMonsterId] || 0
    : 0;

  return (
    <Overlay onClick={onClose}>
      <Window onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>{'Monster Book'}</Title>

        <TabContainer>
          {MONSTER_HIERARCHY.map((p) => (
            <Tab
              key={p.id}
              active={currentPlanet === p.id}
              onClick={() => {
                setCurrentPlanet(p.id);
                setSelectedMonsterId(null);
              }}
            >
              {p.name}
            </Tab>
          ))}
        </TabContainer>

        <MonsterList>
          {planet.regions.map((region, rIdx) => (
            <RegionSection key={rIdx}>
              <RegionTitle>{region.name || region.id}</RegionTitle>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px',
                }}
              >
                {region.monsters.map((mInfo) => {
                  const monster = MONSTER_DATABASE[mInfo.id];
                  if (!monster) return null;

                  const kills = bestiary[monster.id] || 0;
                  const unlocked = kills > 0;
                  const scaledStats = getMonsterStatsByLevel(
                    monster,
                    mInfo.level,
                  );

                  return (
                    <ClickCatcher
                      key={monster.id}
                      onClick={() =>
                        unlocked &&
                        monster.isBoss &&
                        setSelectedMonsterId(monster.id)
                      }
                    >
                      <MonsterCard
                        unlocked={unlocked}
                        isBoss={monster.isBoss}
                        style={{
                          cursor: monster.isBoss ? 'pointer' : 'default',
                        }}
                      >
                        <MonsterImage
                          color={unlocked ? monster.color : '#222'}
                          spriteUrl={unlocked ? monster.spriteUrl : undefined}
                        />
                        <MonsterInfo>
                          <MonsterHeader>
                            <MonsterName>
                              {unlocked ? (
                                <>
                                  <LevelLabel>
                                    T{levelToTier(mInfo.level, monster.isBoss)}
                                  </LevelLabel>
                                  {monster.name}
                                </>
                              ) : (
                                'Unknown Entity'
                              )}
                            </MonsterName>
                            {unlocked && (
                              <KillCount>
                                {'Kills'}: {kills}
                              </KillCount>
                            )}
                          </MonsterHeader>

                          {unlocked ? (
                            <>
                              <MonsterDesc>{monster.description}</MonsterDesc>
                              <StatGrid>
                                <StatItem>
                                  <span>{'HP'}</span>{' '}
                                  <span>
                                    {scaledStats.maxHp.toLocaleString()}
                                  </span>
                                </StatItem>
                                <StatItem>
                                  <span>{'ATK'}</span>{' '}
                                  <span>
                                    {scaledStats.atk.toLocaleString()}
                                  </span>
                                </StatItem>
                                <StatItem>
                                  <span>{'DEF'}</span>{' '}
                                  <span>
                                    {scaledStats.def.toLocaleString()}
                                  </span>
                                </StatItem>
                                <StatItem>
                                  <span>{'EXP'}</span>{' '}
                                  <span>
                                    {scaledStats.expValue.toLocaleString()}
                                  </span>
                                </StatItem>
                              </StatGrid>

                              {monster.isBoss && (
                                <div
                                  style={{
                                    marginTop: '12px',
                                    fontSize: '0.65rem',
                                    color: '#ffd700',
                                    fontWeight: 800,
                                    textAlign: 'right',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                  }}
                                >
                                  {'View Master Files'}
                                </div>
                              )}

                              {!monster.isBoss &&
                                monster.drops &&
                                monster.drops.length > 0 && (
                                  <DropSection>
                                    <DropTitle>{'Potential Yield'}</DropTitle>
                                    <DropGrid>
                                      {(() => {
                                        const dropRateMultiplier =
                                          1 + dropRateSkillLevel * 0.1;

                                        // [FIXED] Sync calculation with useGameState.ts (Rare Item Focus)
                                        const availableDrops =
                                          monster.drops.filter((drop) => {
                                            const itemData =
                                              ITEM_DATABASE[drop.itemId];
                                            const isEquipment =
                                              itemData &&
                                              (itemData.type === 'Weapon' ||
                                                itemData.type === 'Armor' ||
                                                itemData.type === 'Helmet');
                                            return (
                                              !isEquipment ||
                                              !acquiredEquipment.includes(
                                                drop.itemId,
                                              )
                                            );
                                          });

                                        const minChance =
                                          availableDrops.length > 0
                                            ? Math.min(
                                                ...availableDrops.map(
                                                  (d) => d.chance,
                                                ),
                                              )
                                            : 0;

                                        const adjustedDrops = monster.drops.map(
                                          (drop) => {
                                            const isAcquired =
                                              acquiredEquipment.includes(
                                                drop.itemId,
                                              );
                                            const itemData =
                                              ITEM_DATABASE[drop.itemId];
                                            const isEquipment =
                                              itemData &&
                                              (itemData.type === 'Weapon' ||
                                                itemData.type === 'Armor' ||
                                                itemData.type === 'Helmet');

                                            if (isAcquired && isEquipment)
                                              return {
                                                ...drop,
                                                weight: 0,
                                                isAcquired,
                                              };

                                            const isRare =
                                              drop.chance === minChance;
                                            const weight = isRare
                                              ? drop.chance * dropRateMultiplier
                                              : drop.chance;

                                            return {
                                              ...drop,
                                              weight,
                                              isAcquired,
                                            };
                                          },
                                        );

                                        const totalWeight =
                                          adjustedDrops.reduce(
                                            (sum, d) => sum + d.weight,
                                            0,
                                          );

                                        return monster.drops
                                          .slice(0, 3)
                                          .map((drop, idx) => {
                                            const item =
                                              ITEM_DATABASE[drop.itemId];
                                            const dropInfo = adjustedDrops.find(
                                              (d) => d.itemId === drop.itemId,
                                            );
                                            const isAcquired =
                                              dropInfo?.isAcquired;
                                            const currentWeight =
                                              dropInfo?.weight || 0;

                                            const weightedPercent =
                                              totalWeight > 0 &&
                                              currentWeight > 0
                                                ? (currentWeight /
                                                    totalWeight) *
                                                  100
                                                : 0;

                                            return (
                                              <DropItemTag
                                                key={idx}
                                                style={{
                                                  opacity: isAcquired ? 0.4 : 1,
                                                  textDecoration: isAcquired
                                                    ? 'line-through'
                                                    : 'none',
                                                }}
                                              >
                                                {item ? item.name : drop.itemId}
                                                {!isAcquired &&
                                                  weightedPercent > 0 && (
                                                    <DropRate>
                                                      {weightedPercent.toFixed(
                                                        1,
                                                      )}
                                                      %
                                                    </DropRate>
                                                  )}
                                              </DropItemTag>
                                            );
                                          });
                                      })()}
                                      {monster.drops.length > 3 && (
                                        <span
                                          style={{
                                            fontSize: '0.7rem',
                                            color: '#444',
                                          }}
                                        >
                                          ...
                                        </span>
                                      )}
                                    </DropGrid>
                                  </DropSection>
                                )}
                            </>
                          ) : (
                            <MonsterDesc style={{ color: '#444' }}>
                              {
                                'Insufficient combat data to formulate patterns.'
                              }
                            </MonsterDesc>
                          )}
                        </MonsterInfo>
                      </MonsterCard>
                    </ClickCatcher>
                  );
                })}
              </div>
            </RegionSection>
          ))}
        </MonsterList>

        {selectedMonster && (
          <FullDetailOverlay>
            <DetailHeader>
              <BossTag>{'Priority Threat'}</BossTag>
              <BigMonsterImage
                color={selectedMonster.color}
                spriteUrl={selectedMonster.spriteUrl}
              />
              <DetailTitle>{selectedMonster.name}</DetailTitle>
              <MonsterDesc
                style={{
                  fontSize: '0.95rem',
                  color: '#aaa',
                  maxWidth: '400px',
                  textAlign: 'center',
                }}
              >
                {selectedMonster.description}
              </MonsterDesc>
            </DetailHeader>

            <h3
              style={{
                color: '#fff',
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                paddingBottom: '10px',
                marginBottom: '15px',
              }}
            >
              {'Tactical Patterns'}
            </h3>
            <SkillSection>
              {selectedMonsterKills >= 3 ? (
                selectedMonster.skillDescriptions?.map((skill, idx) => {
                  return (
                    <SkillCard key={idx}>
                      <SkillName>{skill.name}</SkillName>
                      <SkillDesc>{skill.description}</SkillDesc>
                    </SkillCard>
                  );
                }) || (
                  <div
                    style={{
                      color: '#444',
                      fontStyle: 'italic',
                      fontSize: '0.85rem',
                    }}
                  >
                    {'Insufficient combat data to formulate patterns.'}
                  </div>
                )
              ) : (
                <div
                  style={{
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '12px',
                    padding: '30px 20px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '15px',
                  }}
                >
                  <div style={{ fontSize: '2rem', filter: 'grayscale(1)' }}>
                    👁️‍🗨️
                  </div>
                  <div style={{ color: '#666', fontSize: '0.9rem' }}>
                    <b>{'Data Encrypted'}</b>
                    <div style={{ marginTop: '5px', fontSize: '0.8rem' }}>
                      {'Analyze 3 specimens to decode combat patterns.'}
                    </div>
                  </div>
                  <div
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      height: '4px',
                      width: '100px',
                      borderRadius: '2px',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        background: '#ffd700',
                        height: '100%',
                        width: `${(selectedMonsterKills / 3) * 100}%`,
                        transition: 'width 0.5s ease-out',
                      }}
                    />
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#ffd700' }}>
                    {'Progress'}: {selectedMonsterKills} / 3
                  </div>
                </div>
              )}
            </SkillSection>

            {selectedMonster.drops && selectedMonster.drops.length > 0 && (
              <DropSection style={{ marginTop: '20px' }}>
                <DropTitle style={{ color: '#888' }}>
                  {'Drop Manifest'}
                </DropTitle>
                <DropGrid>
                  {(() => {
                    const dropRateMultiplier = 1 + dropRateSkillLevel * 0.1;

                    // [FIXED] Sync calculation with useGameState.ts (Rare Item Focus)
                    const availableDrops = selectedMonster.drops.filter(
                      (drop) => {
                        const itemData = ITEM_DATABASE[drop.itemId];
                        const isEquipment =
                          itemData &&
                          (itemData.type === 'Weapon' ||
                            itemData.type === 'Armor' ||
                            itemData.type === 'Helmet');
                        return (
                          !isEquipment ||
                          !acquiredEquipment.includes(drop.itemId)
                        );
                      },
                    );

                    const minChance =
                      availableDrops.length > 0
                        ? Math.min(...availableDrops.map((d) => d.chance))
                        : 0;

                    const adjustedDrops = selectedMonster.drops.map((drop) => {
                      const isAcquired = acquiredEquipment.includes(
                        drop.itemId,
                      );
                      const isEquipment =
                        ITEM_DATABASE[drop.itemId]?.type === 'Weapon' ||
                        ITEM_DATABASE[drop.itemId]?.type === 'Armor' ||
                        ITEM_DATABASE[drop.itemId]?.type === 'Helmet';

                      if (isAcquired && isEquipment)
                        return { ...drop, weight: 0, isAcquired };

                      const isRare = drop.chance === minChance;
                      const weight = isRare
                        ? drop.chance * dropRateMultiplier
                        : drop.chance;

                      return { ...drop, weight, isAcquired };
                    });

                    const totalWeight = adjustedDrops.reduce(
                      (sum, d) => sum + d.weight,
                      0,
                    );

                    return selectedMonster.drops.map((drop, idx) => {
                      const item = ITEM_DATABASE[drop.itemId];
                      const dropInfo = adjustedDrops.find(
                        (d) => d.itemId === drop.itemId,
                      );
                      const isAcquired = dropInfo?.isAcquired;
                      const currentWeight = dropInfo?.weight || 0;

                      const weightedPercent =
                        totalWeight > 0 && currentWeight > 0
                          ? (currentWeight / totalWeight) * 100
                          : 0;

                      return (
                        <DropItemTag
                          key={idx}
                          style={{
                            background: isAcquired
                              ? 'rgba(255,255,255,0.05)'
                              : 'rgba(255,215,0,0.05)',
                            borderColor: isAcquired
                              ? 'rgba(255,255,255,0.1)'
                              : 'rgba(255,215,0,0.2)',
                            opacity: isAcquired ? 0.4 : 1,
                            textDecoration: isAcquired
                              ? 'line-through'
                              : 'none',
                          }}
                        >
                          {item ? item.name : drop.itemId}
                          {!isAcquired && weightedPercent > 0 && (
                            <DropRate>{weightedPercent.toFixed(1)}%</DropRate>
                          )}
                          {isAcquired && (
                            <span
                              style={{
                                fontSize: '0.6rem',
                                color: '#888',
                                marginLeft: '5px',
                                textDecoration: 'none',
                                display: 'inline-block',
                              }}
                            >
                              {'Acquired'}
                            </span>
                          )}
                        </DropItemTag>
                      );
                    });
                  })()}
                </DropGrid>
              </DropSection>
            )}

            <BackButton onClick={() => setSelectedMonsterId(null)}>
              {'Return to Database'}
            </BackButton>
          </FullDetailOverlay>
        )}
      </Window>
    </Overlay>
  );
};

export default MonsterBook;
