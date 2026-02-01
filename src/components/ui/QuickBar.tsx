import React from 'react';
import styled from 'styled-components';
import { ITEM_DATABASE } from '../../types/item';
import type { InventoryItem } from '../../types/game';

const QuickBarContainer = styled.div`
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  pointer-events: auto;
`;

const QuickSlot = styled.div<{ active: boolean }>`
  width: 50px;
  height: 50px;
  background: rgba(0, 0, 0, 0.6);
  border: 2px solid
    ${(props) =>
      props.active ? 'var(--primary-color)' : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  transition: all 0.2s;

  ${(props) =>
    props.active &&
    `
    box-shadow: 0 0 15px var(--primary-color);
  `}
`;

const KeyBind = styled.div`
  position: absolute;
  top: -10px;
  left: -10px;
  background: var(--primary-color);
  color: black;
  font-size: 0.7rem;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 4px;
`;

const Quantity = styled.div`
  position: absolute;
  bottom: 2px;
  right: 4px;
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  text-shadow: 1px 1px 2px black;
`;

const PotionIcon = styled.div<{ color: string }>`
  width: 24px;
  height: 24px;
  background: ${(props) => props.color};
  border-radius: 50% 50% 20% 20%;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 8px;
    height: 4px;
    background: #8b4513;
    border-radius: 2px;
  }
`;

const EmptySlot = styled.div`
  color: rgba(255, 255, 255, 0.2);
  font-size: 0.6rem;
  text-align: center;
`;

interface QuickBarProps {
  quickBar: (string | null)[];
  inventory: InventoryItem[];
  onClick: (index: number) => void;
}

const QuickBar: React.FC<QuickBarProps> = ({
  quickBar,
  inventory,
  onClick,
}) => {
  return (
    <QuickBarContainer>
      {quickBar.map((itemId, index) => {
        const itemData = itemId ? ITEM_DATABASE[itemId] : null;
        const inventoryItem = itemId
          ? inventory.find((inv) => inv.itemId === itemId)
          : null;

        return (
          <QuickSlot
            key={index}
            active={!!itemId}
            onClick={() => onClick(index)}
          >
            <KeyBind>{index + 1}</KeyBind>
            {itemId && itemData ? (
              <>
                <PotionIcon
                  color={
                    itemData.id === 'red_potion'
                      ? '#ff4b2b'
                      : itemData.id === 'blue_potion'
                        ? '#2b4bff'
                        : '#ff8c00'
                  }
                />
                {inventoryItem && inventoryItem.quantity > 1 && (
                  <Quantity>x{inventoryItem.quantity}</Quantity>
                )}
              </>
            ) : (
              <EmptySlot>-</EmptySlot>
            )}
          </QuickSlot>
        );
      })}
    </QuickBarContainer>
  );
};

export default QuickBar;
