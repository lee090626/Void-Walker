import React, { useState } from 'react';
import styled from 'styled-components';
import { ITEM_DATABASE } from '../../types/item';

import type { InventoryItem } from '../../types/game';
import type { Item, Weapon, Armor, Helmet, Potion } from '../../types/item';

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
  width: 900px;
  height: 750px;
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
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: min-content;
  gap: 15px;
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

const ItemIcon = styled.div<{
  icon?: string;
  color: string;
  size?: { x: number; y: number };
}>`
  width: ${(props) => (props.size ? `${props.size.x}px` : '32px')};
  height: ${(props) => (props.size ? `${props.size.y}px` : '32px')};
  max-width: 100%;
  max-height: 100%;
  background: ${(props) => (props.icon ? `url(${props.icon})` : props.color)};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 4px;
  box-sizing: border-box;
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
  equipment: {
    weapon: (Weapon & { enhanceLevel?: number }) | null;
    armor: (Armor & { enhanceLevel?: number }) | null;
    helmet: (Helmet & { enhanceLevel?: number }) | null;
  };
  onUse: (index: number) => void;
  onUnEquip: (type: 'Weapon' | 'Armor' | 'Helmet') => void;
  onClose: () => void;
}

type TabType = 'All' | 'Equipment' | 'Potions' | 'Materials';

const Inventory: React.FC<InventoryProps> = ({
  items,
  equipment,
  onUse,
  onUnEquip,
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
        return (
          item.type === 'Weapon' ||
          item.type === 'Armor' ||
          item.type === 'Helmet'
        );
      if (activeTab === 'Potions') return item.type === 'Potion';
      if (activeTab === 'Materials') return item.type === 'Material';
      return item.type === activeTab;
    });

  const selectedData =
    selectedInFilter !== null ? filteredData[selectedInFilter] : null;

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setSelectedInFilter(null);
  };

  const getItemTooltip = (item: Item, invItem: InventoryItem): string => {
    let tooltip = `${item.name}\n${item.description}`;

    if (item.type === 'Weapon') {
      const weapon = item as Weapon;
      tooltip += `\n\nATK: ${weapon.atk}`;
      tooltip += `\nRange: ${weapon.range}`;
      tooltip += `\nSpeed: ${weapon.speed}`;
      tooltip += `\nType: ${weapon.weaponType}`;
    } else if (item.type === 'Armor' || item.type === 'Helmet') {
      const armor = item as Armor;
      tooltip += `\n\nDEF: ${armor.def}`;
    } else if (item.type === 'Potion') {
      const potion = item as Potion;
      if (potion.hpRestore) tooltip += `\n\nHP Restore: ${potion.hpRestore}`;
      if (potion.mpRestore) tooltip += `\nMP Restore: ${potion.mpRestore}`;
    }

    if (invItem.enhanceLevel && invItem.enhanceLevel > 0) {
      if (item.type === 'Weapon') {
        const bonus = (item as Weapon).atk * invItem.enhanceLevel * 0.1;
        tooltip += `\nEnhance: +${invItem.enhanceLevel} (ATK +${bonus.toFixed(1)})`;
      } else if (item.type === 'Armor' || item.type === 'Helmet') {
        const bonus = (item as Armor).def * invItem.enhanceLevel * 0.1;
        tooltip += `\nEnhance: +${invItem.enhanceLevel} (DEF +${bonus.toFixed(1)})`;
      } else {
        tooltip += `\nEnhance: +${invItem.enhanceLevel}`;
      }
    }

    tooltip += `\nPrice: ${item.price} Gold`;

    return tooltip;
  };

  return (
    <Overlay onClick={onClose}>
      <Window onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>{'Inventory'}</Title>

        <TabBar>
          <Tab
            active={activeTab === 'All'}
            onClick={() => handleTabChange('All')}
          >
            {'All'}
          </Tab>
          <Tab
            active={activeTab === 'Equipment'}
            onClick={() => handleTabChange('Equipment')}
          >
            {'Equipment'}
          </Tab>

          <Tab
            active={activeTab === 'Potions'}
            onClick={() => handleTabChange('Potions')}
          >
            {'Potions'}
          </Tab>
          <Tab
            active={activeTab === 'Materials'}
            onClick={() => handleTabChange('Materials')}
          >
            {'Materials'}
          </Tab>
        </TabBar>

        <ItemGrid>
          {filteredData.map(({ item, invItem, originalIndex }, filterIndex) => (
            <ItemSlot
              key={`${invItem.itemId}-${originalIndex}`}
              active={selectedInFilter === filterIndex}
              onClick={() => setSelectedInFilter(filterIndex)}
              title={item ? getItemTooltip(item, invItem) : ''}
            >
              {item && (
                <ItemIcon
                  icon={item.icon}
                  size={item.inventorySize || item.size}
                  color={
                    item.type === 'Weapon'
                      ? '#ffd700'
                      : item.type === 'Armor'
                        ? '#00ced1'
                        : item.type === 'Helmet'
                          ? '#ff6b6b'
                          : item.type === 'Potion'
                            ? '#ff4b2b'
                            : '#aaa'
                  }
                />
              )}
              {invItem.quantity > 1 && (
                <QuantityBadge>x{invItem.quantity}</QuantityBadge>
              )}
              {Number(invItem.enhanceLevel) > 0 && (
                <EnhanceBadge>+{invItem.enhanceLevel}</EnhanceBadge>
              )}
              {((equipment.weapon &&
                invItem.itemId === equipment.weapon.id &&
                item?.type === 'Weapon') ||
                (equipment.armor &&
                  invItem.itemId === equipment.armor.id &&
                  item?.type === 'Armor') ||
                (equipment.helmet &&
                  invItem.itemId === equipment.helmet.id &&
                  item?.type === 'Helmet')) && (
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
                  {'ATK'} +
                  {(
                    (selectedData.item as any).atk *
                    (1 + (selectedData.invItem.enhanceLevel || 0) * 0.1)
                  ).toFixed(1)}
                  <span
                    style={{
                      fontSize: '0.8rem',
                      color: '#888',
                      marginLeft: '5px',
                    }}
                  >
                    ({'Base'} {(selectedData.item as any).atk} + {'Enhance'}{' '}
                    {(
                      (selectedData.item as any).atk *
                      (selectedData.invItem.enhanceLevel || 0) *
                      0.1
                    ).toFixed(1)}
                    )
                  </span>
                </div>
              )}
              {(selectedData.item.type === 'Armor' ||
                selectedData.item.type === 'Helmet') && (
                <div
                  style={{
                    color:
                      selectedData.item.type === 'Armor'
                        ? '#00ced1'
                        : '#ff6b6b',
                    fontWeight: 'bold',
                    marginBottom: '5px',
                  }}
                >
                  {'DEF'} +
                  {(
                    (selectedData.item as any).def *
                    (1 + (selectedData.invItem.enhanceLevel || 0) * 0.1)
                  ).toFixed(1)}
                  <span
                    style={{
                      fontSize: '0.8rem',
                      color: '#888',
                      marginLeft: '5px',
                    }}
                  >
                    ({'Base'} {(selectedData.item as any).def} + {'Enhance'}{' '}
                    {(
                      (selectedData.item as any).def *
                      (selectedData.invItem.enhanceLevel || 0) *
                      0.1
                    ).toFixed(1)}
                    )
                  </span>
                </div>
              )}
              <ItemDesc>{selectedData.item.description}</ItemDesc>

              <div
                style={{ fontSize: '0.8rem', marginTop: '5px', color: '#999' }}
              >
                {'Price'}: {selectedData.item.price} Gold | {'Quantity'}:{' '}
                {selectedData.invItem.quantity}
              </div>
              {selectedData.item.type === 'Weapon' ||
              selectedData.item.type === 'Armor' ||
              selectedData.item.type === 'Helmet' ? (
                (() => {
                  const type = selectedData.item.type as
                    | 'Weapon'
                    | 'Armor'
                    | 'Helmet';
                  const equippedInSlot =
                    type === 'Weapon'
                      ? equipment.weapon
                      : type === 'Armor'
                        ? equipment.armor
                        : equipment.helmet;

                  // Is the selected item actually equipped?
                  const isThisEquipped =
                    equippedInSlot &&
                    equippedInSlot.id === selectedData.item.id &&
                    (equippedInSlot.enhanceLevel || 0) ===
                      (selectedData.invItem.enhanceLevel || 0);

                  if (isThisEquipped) {
                    return (
                      <ActionButton onClick={() => onUnEquip(type)}>
                        {'Unequip'}
                      </ActionButton>
                    );
                  } else if (equippedInSlot) {
                    // Slot is occupied by something else
                    return (
                      <ActionButton
                        disabled={true}
                        style={{ opacity: 0.5, cursor: 'not-allowed' }}
                      >
                        {'Cannot Equip'}
                      </ActionButton>
                    );
                  } else {
                    return (
                      <ActionButton
                        onClick={() => onUse(selectedData.originalIndex)}
                      >
                        {'Equip'}
                      </ActionButton>
                    );
                  }
                })()
              ) : (
                <ActionButton onClick={() => onUse(selectedData.originalIndex)}>
                  {'Use'}
                </ActionButton>
              )}
            </>
          ) : (
            <div
              style={{ color: '#666', textAlign: 'center', paddingTop: '40px' }}
            >
              {'Select an item to see details'}
            </div>
          )}
        </DetailPanel>
      </Window>
    </Overlay>
  );
};

export default Inventory;
