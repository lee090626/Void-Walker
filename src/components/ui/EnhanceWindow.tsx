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

  const { equipment } = state.player;
  const itemsToEnhance: { inv: any; idx: number; isEquipped?: boolean }[] = [];

  // Add Equipped Items (These are removed from inventory upon equipping)
  if (equipment.weapon) {
    itemsToEnhance.push({
      inv: {
        itemId: equipment.weapon.id,
        quantity: 1,
        enhanceLevel: equipment.weapon.enhanceLevel || 0,
      },
      idx: -1, // Special index for equipped weapon
      isEquipped: true,
    });
  }
  if (equipment.armor) {
    itemsToEnhance.push({
      inv: {
        itemId: equipment.armor.id,
        quantity: 1,
        enhanceLevel: equipment.armor.enhanceLevel || 0,
      },
      idx: -2, // Special index for equipped armor
      isEquipped: true,
    });
  }
  if (equipment.helmet) {
    itemsToEnhance.push({
      inv: {
        itemId: equipment.helmet.id,
        quantity: 1,
        enhanceLevel: equipment.helmet.enhanceLevel || 0,
      },
      idx: -3, // Special index for equipped helmet
      isEquipped: true,
    });
  }

  // Find the selected entry and its details
  const selectedEntry = itemsToEnhance.find(
    (entry) => entry.idx === selectedIndex,
  );
  const selectedItem = selectedEntry ? selectedEntry.inv : null;
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
        <Title>{'Equipment Enhancement'}</Title>
        <Info>
          {'Enhance your weapons and armor to increase their stats.'} <br />
          {'Requires Enhancement Stones and Gold.'}
        </Info>

        <ItemList>
          {itemsToEnhance.length > 0 ? (
            itemsToEnhance.map(({ inv, idx }) => {
              return (
                <ItemRow
                  key={idx}
                  active={selectedIndex === idx}
                  onClick={() => setSelectedIndex(idx)}
                >
                  <div>
                    <strong>
                      {ITEM_DATABASE[inv.itemId]?.name || inv.itemId} (+
                      {inv.enhanceLevel || 0})
                    </strong>
                    <div style={{ fontSize: '0.8rem', color: '#888' }}>
                      {ITEM_DATABASE[inv.itemId]?.description || ''}
                    </div>
                  </div>
                  <div style={{ color: '#ffd700' }}>{'Equipped'}</div>
                </ItemRow>
              );
            })
          ) : (
            <div
              style={{ textAlign: 'center', padding: '20px', color: '#888' }}
            >
              {'No items available for enhancement.'}
            </div>
          )}
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
              <span>{'Required Gold'}:</span>
              <span
                style={{ color: state.player.gold >= cost ? '#0f0' : '#f00' }}
              >
                {cost} G ({'Owned'}: {state.player.gold} G)
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{'Required Stones'}:</span>
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
              {'Success Rate'}:{' '}
              {Math.floor(Math.max(0.3, 1 - currentLevel * 0.1) * 100)}%
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '10px' }}>
          <Button
            disabled={!canEnhance}
            onClick={() => selectedIndex !== null && onEnhance(selectedIndex)}
          >
            {'Enhance'}
          </Button>
          <Button
            style={{ background: '#555', color: 'white' }}
            onClick={onClose}
          >
            {'Close'}
          </Button>
        </div>
      </Window>
    </Overlay>
  );
};
