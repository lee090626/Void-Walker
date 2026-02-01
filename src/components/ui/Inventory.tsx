import React, { useState } from 'react';
import styled from 'styled-components';
import { ITEM_DATABASE } from '../../types/item';

import type { InventoryItem } from '../../types/game';

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
  width: 500px;
  height: 650px;
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
  margin: 0 0 15px 0;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const TabBar = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 10px;
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  background: ${(props) =>
    props.active ? 'var(--primary-color)' : 'rgba(255, 255, 255, 0.05)'};
  color: ${(props) => (props.active ? '#000' : '#ccc')};
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.8rem;
  transition: all 0.2s;

  &:hover {
    background: ${(props) =>
      props.active ? 'var(--primary-color)' : 'rgba(255, 255, 255, 0.1)'};
  }
`;

const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: min-content;
  gap: 10px;
  overflow-y: auto;
  padding: 10px;
  flex-grow: 1;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
`;

const ItemSlot = styled.div<{ active?: boolean }>`
  aspect-ratio: 1;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid
    ${(props) =>
      props.active ? 'var(--primary-color)' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: var(--primary-color);
  }
`;

const ItemIcon = styled.div<{ color: string }>`
  width: 24px;
  height: 24px;
  background: ${(props) => props.color};
  border-radius: 3px;
`;

const QuantityBadge = styled.div`
  position: absolute;
  top: 2px;
  left: 4px;
  font-size: 10px;
  font-weight: bold;
  color: white;
  text-shadow: 1px 1px 2px black;
`;

const EnhanceBadge = styled.div`
  position: absolute;
  top: 2px;
  right: 4px;
  font-size: 10px;
  font-weight: bold;
  color: #ffd700;
  text-shadow: 1px 1px 2px black;
`;

const DetailPanel = styled.div`
  background: rgba(0, 0, 0, 0.3);
  margin-top: 20px;
  padding: 15px;
  border-radius: 8px;
  min-height: 120px;
`;

const ItemName = styled.div`
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 5px;
`;

const ItemDesc = styled.div`
  font-size: 0.85rem;
  color: #ccc;
  font-style: italic;
`;

const ActionButton = styled.button`
  margin-top: 10px;
  width: 100%;
  background: var(--primary-color);
  color: #000;
  border: none;
  padding: 10px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    filter: brightness(1.2);
  }
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

interface InventoryProps {
  items: InventoryItem[];
  equippedWeaponId?: string;
  equippedArmorId?: string;
  onUse: (index: number) => void;
  onClose: () => void;
}

type TabType = 'All' | 'Equipment' | 'Potion' | 'Material';

const Inventory: React.FC<InventoryProps> = ({
  items,
  equippedWeaponId,
  equippedArmorId,
  onUse,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('All');
  const [selectedInFilter, setSelectedInFilter] = useState<number | null>(null);

  const filteredData = items
    .map((invItem, index) => ({
      invItem,
      item: ITEM_DATABASE[invItem.itemId],
      originalIndex: index,
    }))
    .filter(({ item }) => {
      if (!item) return false;
      if (activeTab === 'All') return true;
      if (activeTab === 'Equipment')
        return item.type === 'Weapon' || item.type === 'Armor';
      return item.type === activeTab;
    });

  const selectedData =
    selectedInFilter !== null ? filteredData[selectedInFilter] : null;

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setSelectedInFilter(null);
  };

  return (
    <Overlay onClick={onClose}>
      <Window onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>Inventory</Title>

        <TabBar>
          <Tab
            active={activeTab === 'All'}
            onClick={() => handleTabChange('All')}
          >
            전체
          </Tab>
          <Tab
            active={activeTab === 'Equipment'}
            onClick={() => handleTabChange('Equipment')}
          >
            장비
          </Tab>

          <Tab
            active={activeTab === 'Potion'}
            onClick={() => handleTabChange('Potion')}
          >
            소모품
          </Tab>
          <Tab
            active={activeTab === 'Material'}
            onClick={() => handleTabChange('Material')}
          >
            재료
          </Tab>
        </TabBar>

        <ItemGrid>
          {filteredData.map(({ item, invItem, originalIndex }, filterIndex) => (
            <ItemSlot
              key={`${invItem.itemId}-${originalIndex}`}
              active={selectedInFilter === filterIndex}
              onClick={() => setSelectedInFilter(filterIndex)}
            >
              {item && (
                <ItemIcon
                  color={
                    item.type === 'Weapon'
                      ? '#ffd700'
                      : item.type === 'Armor'
                        ? '#00ced1'
                        : item.type === 'Potion'
                          ? '#ff4b2b'
                          : '#aaa'
                  }
                />
              )}
              {invItem.quantity > 1 && (
                <QuantityBadge>x{invItem.quantity}</QuantityBadge>
              )}
              {invItem.enhanceLevel && invItem.enhanceLevel > 0 && (
                <EnhanceBadge>+{invItem.enhanceLevel}</EnhanceBadge>
              )}
              {((invItem.itemId === equippedWeaponId &&
                item?.type === 'Weapon') ||
                (invItem.itemId === equippedArmorId &&
                  item?.type === 'Armor')) && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '2px',
                    right: '2px',
                    fontSize: '8px',
                    background: 'var(--primary-color)',
                    color: 'black',
                    padding: '1px 2px',
                    fontWeight: 'bold',
                    borderRadius: '2px',
                  }}
                >
                  E
                </div>
              )}
            </ItemSlot>
          ))}
          {filteredData.length < 25 &&
            Array.from({ length: 25 - filteredData.length }).map((_, i) => (
              <ItemSlot key={`empty-${i}`} style={{ cursor: 'default' }} />
            ))}
        </ItemGrid>

        <DetailPanel>
          {selectedData && selectedData.item ? (
            <>
              <ItemName>
                {selectedData.item.name}{' '}
                {selectedData.invItem.enhanceLevel
                  ? `(+${selectedData.invItem.enhanceLevel})`
                  : ''}
              </ItemName>
              {selectedData.item.type === 'Weapon' && (
                <div
                  style={{
                    color: '#ffd700',
                    fontWeight: 'bold',
                    marginBottom: '5px',
                  }}
                >
                  공격력 (ATK) +
                  {(selectedData.item as any).atk +
                    (selectedData.invItem.enhanceLevel || 0) * 3}
                  <span
                    style={{
                      fontSize: '0.8rem',
                      color: '#888',
                      marginLeft: '5px',
                    }}
                  >
                    (기본 {(selectedData.item as any).atk} + 강화{' '}
                    {(selectedData.invItem.enhanceLevel || 0) * 3})
                  </span>
                </div>
              )}
              {selectedData.item.type === 'Armor' && (
                <div
                  style={{
                    color: '#00ced1',
                    fontWeight: 'bold',
                    marginBottom: '5px',
                  }}
                >
                  방어력 (DEF) +
                  {(selectedData.item as any).def +
                    (selectedData.invItem.enhanceLevel || 0) * 2}
                  <span
                    style={{
                      fontSize: '0.8rem',
                      color: '#888',
                      marginLeft: '5px',
                    }}
                  >
                    (기본 {(selectedData.item as any).def} + 강화{' '}
                    {(selectedData.invItem.enhanceLevel || 0) * 2})
                  </span>
                </div>
              )}
              <ItemDesc>{selectedData.item.description}</ItemDesc>

              <div
                style={{ fontSize: '0.8rem', marginTop: '5px', color: '#999' }}
              >
                가격: {selectedData.item.price} gold | 수량:{' '}
                {selectedData.invItem.quantity}
              </div>
              <ActionButton
                onClick={() => {
                  onUse(selectedData.originalIndex);
                }}
              >
                {selectedData.item.type === 'Weapon' ||
                selectedData.item.type === 'Armor'
                  ? '장착하기'
                  : '사용하기'}
              </ActionButton>
            </>
          ) : (
            <div
              style={{ color: '#666', textAlign: 'center', paddingTop: '40px' }}
            >
              아이템을 선택하여 상세 정보를 확인하세요
            </div>
          )}
        </DetailPanel>
      </Window>
    </Overlay>
  );
};

export default Inventory;
