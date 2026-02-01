import React from 'react';
import styled from 'styled-components';
import { MONSTER_DATABASE } from '../../types/monster';

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
  width: 450px;
  height: 600px;
  border-radius: 12px;
  border: 1px solid var(--primary-color);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
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

const MonsterList = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-right: 10px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 215, 0, 0.3);
    border-radius: 3px;
  }
`;

const MonsterCard = styled.div<{ unlocked: boolean }>`
  background: ${(props) =>
    props.unlocked ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.3)'};
  border: 1px solid
    ${(props) =>
      props.unlocked ? 'rgba(255, 215, 0, 0.2)' : 'rgba(255, 255, 255, 0.05)'};
  border-radius: 8px;
  padding: 15px;
  display: flex;
  gap: 15px;
  filter: ${(props) =>
    props.unlocked ? 'none' : 'grayscale(100%) opacity(0.5)'};
`;

const MonsterImage = styled.div<{ color: string; spriteUrl?: string }>`
  width: 64px;
  height: 64px;
  background: ${(props) =>
    props.spriteUrl
      ? `url(${props.spriteUrl}) center/contain no-repeat`
      : props.color};
  border-radius: 8px;
  flex-shrink: 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
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
  color: var(--primary-color);
  font-size: 1.1rem;
`;

const KillCount = styled.span`
  font-size: 0.8rem;
  color: #ccc;
  background: rgba(255, 215, 0, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
`;

const MonsterDesc = styled.p`
  margin: 5px 0;
  font-size: 0.85rem;
  color: #aaa;
  line-height: 1.4;
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
  margin-top: 10px;
`;

const StatItem = styled.div`
  font-size: 0.75rem;
  color: #888;
  display: flex;
  justify-content: space-between;
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

interface MonsterBookProps {
  bestiary: Record<string, number>;
  onClose: () => void;
}

const MonsterBook: React.FC<MonsterBookProps> = ({ bestiary, onClose }) => {
  const monsters = Object.values(MONSTER_DATABASE);

  return (
    <Overlay onClick={onClose}>
      <Window onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>Monster Bestiary</Title>

        <MonsterList>
          {monsters.map((monster) => {
            const kills = bestiary[monster.id] || 0;
            const unlocked = kills > 0;

            return (
              <MonsterCard key={monster.id} unlocked={unlocked}>
                <MonsterImage
                  color={unlocked ? monster.color : '#333'}
                  spriteUrl={unlocked ? monster.spriteUrl : undefined}
                />
                <MonsterInfo>
                  <MonsterHeader>
                    <MonsterName>{unlocked ? monster.name : '???'}</MonsterName>
                    <KillCount>처치: {kills}</KillCount>
                  </MonsterHeader>
                  <MonsterDesc>
                    {unlocked
                      ? monster.description
                      : '이 몬스터를 처치하여 정보를 해제하세요.'}
                  </MonsterDesc>
                  {unlocked && (
                    <StatGrid>
                      <StatItem>
                        <span>체력:</span> <span>{monster.maxHp}</span>
                      </StatItem>
                      <StatItem>
                        <span>공격력:</span> <span>{monster.atk}</span>
                      </StatItem>
                      <StatItem>
                        <span>경험치:</span> <span>{monster.expValue}</span>
                      </StatItem>
                      <StatItem>
                        <span>스피드:</span> <span>{monster.speed}</span>
                      </StatItem>
                    </StatGrid>
                  )}
                </MonsterInfo>
              </MonsterCard>
            );
          })}
        </MonsterList>
      </Window>
    </Overlay>
  );
};

export default MonsterBook;
