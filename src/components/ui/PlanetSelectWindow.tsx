import React from 'react';
import styled from 'styled-components';
import { MONSTER_DATABASE } from '../../types/monster';

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2500;
  backdrop-filter: blur(8px);
`;

const Window = styled.div`
  width: 700px;
  background: #0a0a20;
  border: 2px solid #303060;
  border-radius: 20px;
  padding: 30px;
  color: white;
  box-shadow: 0 0 50px rgba(0, 0, 255, 0.2);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h2`
  margin: 0;
  text-align: center;
  font-family: 'Outfit', sans-serif;
  letter-spacing: 4px;
  color: #a0c0ff;
  text-shadow: 0 0 10px rgba(160, 192, 255, 0.5);
`;

const PlanetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 10px;
`;

const PlanetCard = styled.div<{ isLocked?: boolean }>`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  &:hover {
    background: ${(props) =>
      props.isLocked ? 'rgba(255, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.1)'};
    border-color: ${(props) => (props.isLocked ? '#ff5050' : '#5080ff')};
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
  opacity: ${(props) => (props.isLocked ? 0.6 : 1)};
  cursor: ${(props) => (props.isLocked ? 'not-allowed' : 'pointer')};
`;

const LockIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  color: #ff5050;
  font-size: 1.2rem;
`;

const RequiredBoss = styled.div`
  font-size: 0.8rem;
  color: #ff8080;
  margin-top: 5px;
  font-weight: bold;
`;

const PlanetIcon = styled.div<{ bg: string }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${(props) => props.bg};
  box-shadow:
    inset -10px -10px 20px rgba(0, 0, 0, 0.5),
    0 0 20px rgba(255, 255, 255, 0.1);
`;

const PlanetName = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const PlanetDesc = styled.div`
  font-size: 0.9rem;
  color: #889;
  text-align: center;
`;

const CloseButton = styled.button`
  background: #202040;
  border: 1px solid #303060;
  color: #aad;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background: #303060;
    color: white;
  }
`;

interface PlanetSelectWindowProps {
  onSelect: (planetId: string) => void;
  onClose: () => void;
  defeatedBosses: string[];
}

const GALACTIC_PLANETS = [
  {
    id: 'proxima_station',
    name: 'Proxima Luna',
    desc: 'Desolate moon where ancient ruins lie',
    color: 'radial-gradient(circle at 30% 30%, #9e9e9e, #424242)',
    requiredBossId: 'frost_dragon',
  },
  {
    id: 'aetheria',
    name: 'Aetheria',
    desc: 'A fantastic artificial planet floating above the clouds',
    color: 'radial-gradient(circle at 30% 30%, #4fc3f7, #0288d1)',
    requiredBossId: 'luna_overseer',
  },
  {
    id: 'ignis_prime',
    name: 'Ignis Prime',
    desc: 'Volcanic planet with constant lava eruptions',
    color: 'radial-gradient(circle at 30% 30%, #f44336, #b71c1c)',
    requiredBossId: 'celestial_architect',
  },
  {
    id: 'xylos',
    name: 'Xylos',
    desc: 'Jungle filled with toxic spores and giant plants',
    color: 'radial-gradient(circle at 30% 30%, #9c27b0, #4a148c)',
    requiredBossId: 'ignis_overlord',
  },
];

const PlanetSelectWindow: React.FC<PlanetSelectWindowProps> = ({
  onSelect,
  onClose,
  defeatedBosses,
}) => {
  return (
    <Overlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <Window>
        <Title>{'Galactic Travel'}</Title>
        <PlanetGrid>
          {GALACTIC_PLANETS.map((planet) => {
            const isLocked =
              planet.requiredBossId &&
              !defeatedBosses.includes(planet.requiredBossId);
            const bossName = planet.requiredBossId
              ? MONSTER_DATABASE[planet.requiredBossId]?.name ||
                planet.requiredBossId
              : '';

            return (
              <PlanetCard
                key={planet.id}
                onClick={() => !isLocked && onSelect(planet.id)}
                isLocked={!!isLocked}
                style={{ position: 'relative' }}
              >
                {isLocked && <LockIcon>🔒</LockIcon>}
                <PlanetIcon bg={planet.color} />
                <PlanetName>{planet.name}</PlanetName>
                <PlanetDesc>{planet.desc}</PlanetDesc>
                {isLocked && (
                  <RequiredBoss>
                    {`Defeat ${bossName} first to access this planet.`}
                  </RequiredBoss>
                )}
              </PlanetCard>
            );
          })}
        </PlanetGrid>
        <CloseButton onClick={onClose}>{'Cancel'}</CloseButton>
      </Window>
    </Overlay>
  );
};

export default PlanetSelectWindow;
