import React, { useState } from 'react';
import styled from 'styled-components';
import type { Player } from '../../types/game';
import { getSkillsByCategory } from '../../types/skills';

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  pointer-events: auto;
`;

const Window = styled.div`
  width: 600px;
  max-height: 80vh;
  background: linear-gradient(
    135deg,
    rgba(20, 20, 20, 0.95) 0%,
    rgba(40, 40, 40, 0.9) 100%
  );
  border: 2px solid rgba(255, 215, 0, 0.4);
  border-radius: 16px;
  padding: 25px;
  color: white;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.8),
    inset 0 0 30px rgba(255, 215, 0, 0.05);
  backdrop-filter: blur(10px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
  }
  &::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 4px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(255, 215, 0, 0.3);
`;

const Title = styled.h2`
  color: var(--primary-color);
  margin: 0;
  font-size: 1.8rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
`;

const PointsDisplay = styled.div`
  font-size: 1.2rem;
  color: #ffd700;
  background: rgba(255, 215, 0, 0.1);
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid rgba(255, 215, 0, 0.3);
  font-weight: bold;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 12px;
  background: ${(props) =>
    props.active
      ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.1))'
      : 'rgba(255, 255, 255, 0.03)'};
  border: 1px solid
    ${(props) =>
      props.active ? 'rgba(255, 215, 0, 0.5)' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 8px;
  color: ${(props) => (props.active ? '#ffd700' : '#888')};
  font-size: 0.9rem;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) =>
      props.active
        ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.25), rgba(255, 215, 0, 0.15))'
        : 'rgba(255, 255, 255, 0.05)'};
    border-color: ${(props) =>
      props.active ? 'rgba(255, 215, 0, 0.6)' : 'rgba(255, 255, 255, 0.2)'};
  }
`;

const SkillList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SkillCard = styled.div<{ maxed: boolean }>`
  background: ${(props) =>
    props.maxed
      ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 215, 0, 0.05))'
      : 'rgba(255, 255, 255, 0.03)'};
  border: 1px solid
    ${(props) =>
      props.maxed ? 'rgba(255, 215, 0, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 12px;
  padding: 16px;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) =>
      props.maxed
        ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 215, 0, 0.08))'
        : 'rgba(255, 255, 255, 0.05)'};
    border-color: ${(props) =>
      props.maxed ? 'rgba(255, 215, 0, 0.4)' : 'rgba(255, 255, 255, 0.2)'};
  }
`;

const SkillHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const SkillName = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  color: #ffd700;
`;

const SkillLevel = styled.div<{ maxed: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LevelText = styled.span<{ maxed: boolean }>`
  font-size: 0.9rem;
  color: ${(props) => (props.maxed ? '#00ff00' : '#aaa')};
  font-weight: ${(props) => (props.maxed ? 'bold' : 'normal')};
`;

const LevelUpButton = styled.button<{ disabled: boolean }>`
  padding: 6px 16px;
  background: ${(props) =>
    props.disabled
      ? 'rgba(100, 100, 100, 0.2)'
      : 'linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(255, 215, 0, 0.2))'};
  border: 1px solid
    ${(props) =>
      props.disabled ? 'rgba(100, 100, 100, 0.3)' : 'rgba(255, 215, 0, 0.5)'};
  border-radius: 6px;
  color: ${(props) => (props.disabled ? '#555' : '#ffd700')};
  font-size: 0.85rem;
  font-weight: bold;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) =>
      props.disabled
        ? 'rgba(100, 100, 100, 0.2)'
        : 'linear-gradient(135deg, rgba(255, 215, 0, 0.4), rgba(255, 215, 0, 0.3))'};
    border-color: ${(props) =>
      props.disabled ? 'rgba(100, 100, 100, 0.3)' : 'rgba(255, 215, 0, 0.6)'};
  }
`;

const SkillDescription = styled.div`
  font-size: 0.85rem;
  color: #aaa;
  margin-bottom: 8px;
  line-height: 1.4;
`;

const SkillEffect = styled.div`
  font-size: 0.9rem;
  color: #4af;
  font-weight: bold;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: #666;
  font-size: 28px;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #ffd700;
  }
`;

const ResetButton = styled.button`
  background: rgba(255, 50, 50, 0.1);
  border: 1px solid rgba(255, 50, 50, 0.3);
  color: #ff4d4d;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-right: 15px;

  &:hover {
    background: rgba(255, 50, 50, 0.2);
    border-color: rgba(255, 50, 50, 0.5);
    box-shadow: 0 0 10px rgba(255, 50, 50, 0.2);
  }

  &:active {
    transform: scale(0.95);
  }
`;

interface SkillWindowProps {
  player: Player;
  onClose: () => void;
  onUpgradeSkill: (skillId: keyof Player['skills']) => void;
  onResetSkills: () => void;
}

const SkillWindow: React.FC<SkillWindowProps> = ({
  player,
  onClose,
  onUpgradeSkill,
  onResetSkills,
}) => {
  const [activeCategory, setActiveCategory] = useState<
    'combat' | 'survival' | 'utility'
  >('combat');

  const handleReset = () => {
    if (
      window.confirm(
        'Are you sure you want to reset all skills? You will get all skill points back.',
      )
    ) {
      onResetSkills();
    }
  };

  const skills = getSkillsByCategory(activeCategory);

  return (
    <Overlay onClick={onClose}>
      <Window onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Header>
          <Title>{'Skills'}</Title>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ResetButton onClick={handleReset}>{'Reset Skills'}</ResetButton>
            <PointsDisplay>
              {'Available Points'}: <span>{player.skillPoints}</span>
            </PointsDisplay>
          </div>
        </Header>

        <TabContainer>
          <Tab
            active={activeCategory === 'combat'}
            onClick={() => setActiveCategory('combat')}
          >
            ⚔️ {'Combat'}
          </Tab>
          <Tab
            active={activeCategory === 'survival'}
            onClick={() => setActiveCategory('survival')}
          >
            🛡️ {'Survival'}
          </Tab>
          <Tab
            active={activeCategory === 'utility'}
            onClick={() => setActiveCategory('utility')}
          >
            ⚙️ {'Utility'}
          </Tab>
        </TabContainer>

        <SkillList>
          {skills.map((skill) => {
            const currentLevel = player.skills[skill.id];
            const isMaxed = currentLevel >= skill.maxLevel;
            const canUpgrade = player.skillPoints > 0 && !isMaxed;
            const currentEffect = currentLevel * skill.effectPerLevel;
            const nextEffect = (currentLevel + 1) * skill.effectPerLevel;

            return (
              <SkillCard key={skill.id} maxed={isMaxed}>
                <SkillHeader>
                  <SkillName>{skill.name}</SkillName>
                  <SkillLevel maxed={isMaxed}>
                    <LevelText maxed={isMaxed}>
                      {'Lv'} {currentLevel}/{skill.maxLevel}
                      {isMaxed && ` ${'MAX'}`}
                    </LevelText>
                    <LevelUpButton
                      disabled={!canUpgrade}
                      onClick={() => canUpgrade && onUpgradeSkill(skill.id)}
                    >
                      +
                    </LevelUpButton>
                  </SkillLevel>
                </SkillHeader>
                <SkillDescription>{skill.description}</SkillDescription>
                <SkillEffect>
                  {currentLevel > 0 && (
                    <>
                      {'Current'}: +{currentEffect}
                      {skill.effectUnit}
                    </>
                  )}
                  {currentLevel === 0 && <>{'No bonus yet'}</>}
                  {!isMaxed && currentLevel > 0 && (
                    <>
                      {' '}
                      → {'Next'}: +{nextEffect}
                      {skill.effectUnit}
                    </>
                  )}
                  {!isMaxed && currentLevel === 0 && (
                    <>
                      {' '}
                      → {'Next'}: +{nextEffect}
                      {skill.effectUnit}
                    </>
                  )}
                </SkillEffect>
              </SkillCard>
            );
          })}
        </SkillList>
      </Window>
    </Overlay>
  );
};

export default SkillWindow;
