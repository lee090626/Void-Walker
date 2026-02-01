import React from 'react';
import styled from 'styled-components';
import type { GameState } from '../../types/game';

import { ITEM_DATABASE } from '../../types/item';

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const Window = styled.div`
  background: #222;
  border: 4px solid #444;
  padding: 20px;
  width: 500px;
  color: white;
  font-family: 'Inter', sans-serif;
`;

const Title = styled.h2`
  color: #ffd700;
  text-align: center;
  margin-top: 0;
  border-bottom: 2px solid #444;
  padding-bottom: 10px;
`;

const ItemList = styled.div`
  max-height: 300px;
  overflow-y: auto;
  margin: 20px 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
`;

const ItemRow = styled.div<{ active?: boolean }>`
  background: ${(props) => (props.active ? '#443' : '#333')};
  border: 1px solid ${(props) => (props.active ? '#ffd700' : '#444')};
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: #444;
  }
`;

const Button = styled.button`
  background: #ffd700;
  color: black;
  border: none;
  padding: 10px 20px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;

  &:disabled {
    background: #555;
    cursor: not-allowed;
  }
`;

const Info = styled.div`
  margin-bottom: 20px;
  font-size: 0.9rem;
  color: #aaa;
`;

interface Props {
  state: GameState;
  onClose: () => void;
  onEnhance: (index: number) => void;
}

export const EnhanceWindow: React.FC<Props> = ({
  state,
  onClose,
  onEnhance,
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

  const itemsToEnhance = state.player.inventory
    .map((inv, idx) => ({ inv, idx }))
    .filter(({ inv }) => {
      const data = ITEM_DATABASE[inv.itemId];
      return data?.type === 'Weapon' || data?.type === 'Armor';
    });

  const selectedItem =
    selectedIndex !== null ? state.player.inventory[selectedIndex] : null;
  const currentLevel = selectedItem?.enhanceLevel || 0;

  const cost = (currentLevel + 1) * 500;
  const stoneCount =
    state.player.inventory.find((i) => i.itemId === 'enhance_stone')
      ?.quantity || 0;
  const canEnhance =
    selectedIndex !== null && state.player.gold >= cost && stoneCount > 0;

  return (
    <Overlay onClick={onClose}>
      <Window onClick={(e) => e.stopPropagation()}>
        <Title>대장간 - 장비 강화</Title>
        <Info>
          강화할 장비를 선택하세요. (성공 시 능력치 대폭 상승, 실패 시 강화도
          하락 위험)
        </Info>

        <ItemList>
          {itemsToEnhance.map(({ inv, idx }) => {
            const data = ITEM_DATABASE[inv.itemId];
            return (
              <ItemRow
                key={idx}
                active={selectedIndex === idx}
                onClick={() => setSelectedIndex(idx)}
              >
                <div>
                  <strong>
                    {data.name} (+{inv.enhanceLevel || 0})
                  </strong>
                  <div style={{ fontSize: '0.8rem', color: '#888' }}>
                    {data.description}
                  </div>
                </div>
                <div style={{ color: '#ffd700' }}>
                  Lv.{inv.enhanceLevel || 0}
                </div>
              </ItemRow>
            );
          })}
        </ItemList>

        {selectedItem && (
          <div
            style={{
              marginBottom: '20px',
              padding: '10px',
              background: '#111',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '5px',
              }}
            >
              <span>필요 골드:</span>
              <span
                style={{ color: state.player.gold >= cost ? '#0f0' : '#f00' }}
              >
                {cost} G (보유: {state.player.gold} G)
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>필요 강화석:</span>
              <span style={{ color: stoneCount > 0 ? '#0f0' : '#f00' }}>
                1 / {stoneCount}
              </span>
            </div>
            <div
              style={{
                marginTop: '10px',
                textAlign: 'center',
                fontSize: '1.1rem',
                color: '#ffd700',
              }}
            >
              성공 확률:{' '}
              {Math.floor(Math.max(0.3, 1 - currentLevel * 0.1) * 100)}%
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '10px' }}>
          <Button
            disabled={!canEnhance}
            onClick={() => selectedIndex !== null && onEnhance(selectedIndex)}
          >
            강화하기
          </Button>
          <Button
            style={{ background: '#555', color: 'white' }}
            onClick={onClose}
          >
            닫기
          </Button>
        </div>
      </Window>
    </Overlay>
  );
};
