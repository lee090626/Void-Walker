import React from 'react';
import styled from 'styled-components';

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

const PlanetCard = styled.div`
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
    background: rgba(255, 255, 255, 0.1);
    border-color: #5080ff;
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
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
}

const GALACTIC_PLANETS = [
  {
    id: 'proxima_luna',
    name: '프록시마 루나',
    desc: '고대 유적이 잠든 황량한 달',
    color: 'radial-gradient(circle at 30% 30%, #9e9e9e, #424242)',
  },
  {
    id: 'aetheria',
    name: '에테리아',
    desc: '구름 위에 떠 있는 환상적인 인공 행성',
    color: 'radial-gradient(circle at 30% 30%, #4fc3f7, #0288d1)',
  },
  {
    id: 'ignis_prime',
    name: '이그니스 프라임',
    desc: '끊임없이 용암이 분출하는 화산 행성',
    color: 'radial-gradient(circle at 30% 30%, #f44336, #b71c1c)',
  },
  {
    id: 'xylos',
    name: '자일로스',
    desc: '맹독성 포자와 거대 식물이 가득한 정글',
    color: 'radial-gradient(circle at 30% 30%, #9c27b0, #4a148c)',
  }
];

const PlanetSelectWindow: React.FC<PlanetSelectWindowProps> = ({
  onSelect,
  onClose,
}) => {
  return (
    <Overlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <Window>
        <Title>은하 항로 선택</Title>
        <PlanetGrid>
          {GALACTIC_PLANETS.map((planet) => (
            <PlanetCard key={planet.id} onClick={() => onSelect(planet.id)}>
              <PlanetIcon bg={planet.color} />
              <PlanetName>{planet.name}</PlanetName>
              <PlanetDesc>{planet.desc}</PlanetDesc>
            </PlanetCard>
          ))}
        </PlanetGrid>
        <CloseButton onClick={onClose}>항로 설정 취소</CloseButton>
      </Window>
    </Overlay>
  );
};

export default PlanetSelectWindow;
