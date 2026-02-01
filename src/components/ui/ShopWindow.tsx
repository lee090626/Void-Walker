import React from 'react';
import styled from 'styled-components';
import type { GameState } from '../../types/game';

import { ITEM_DATABASE } from '../../types/item';
import { WORLD_DATABASE } from '../../types/world';

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
  z-index: 2000;
  backdrop-filter: blur(4px);
`;

const Window = styled.div`
  width: 600px;
  height: 500px;
  background: #1a1a1a;
  border: 2px solid #444;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  color: white;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
`;

const Header = styled.div`
  padding: 15px;
  background: #2a2a2a;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #444;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  font-size: 24px;
  &:hover {
    color: white;
  }
`;

const TabContainer = styled.div`
  display: flex;
  background: #222;
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 10px;
  background: ${(props) => (props.active ? '#333' : 'transparent')};
  border: none;
  color: ${(props) => (props.active ? '#ffd700' : '#888')};
  cursor: pointer;
  border-bottom: 2px solid
    ${(props) => (props.active ? '#ffd700' : 'transparent')};
  &:hover {
    background: #2a2a2a;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
`;

const ItemCard = styled.div`
  background: #252525;
  border: 1px solid #333;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  &:hover {
    border-color: #ffd700;
  }
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ItemIcon = styled.div<{ color?: string }>`
  width: 40px;
  height: 40px;
  background: ${(props) => props.color || '#444'};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

const ItemDetail = styled.div`
  flex: 1;
`;

const ItemName = styled.div`
  font-weight: bold;
  color: #fff;
`;

const ItemPrice = styled.div`
  font-size: 14px;
  color: #ffd700;
`;

const ItemDesc = styled.div`
  font-size: 12px;
  color: #aaa;
  line-height: 1.4;
`;

const ActionButton = styled.button`
  padding: 8px;
  background: #3a3a3a;
  border: 1px solid #555;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #4a4a4a;
    border-color: #ffd700;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const GoldInfo = styled.div`
  padding: 15px;
  background: #2a2a2a;
  text-align: right;
  font-size: 18px;
  color: #ffd700;
  border-top: 1px solid #444;
`;

interface ShopWindowProps {
  state: GameState;
  onClose: () => void;
  onBuy: (itemId: string) => void;
  onSell: (invIndex: number) => void;
}

export const ShopWindow: React.FC<ShopWindowProps> = ({
  state,
  onClose,
  onBuy,
  onSell,
}) => {
  const [tab, setTab] = React.useState<'Buy' | 'Sell'>('Buy');

  const currentMap = WORLD_DATABASE[state.currentMapId];
  const merchant = currentMap?.npcs.find((n) => n.type === 'Merchant');
  const shopItems = merchant?.shopItems || [];

  return (
    <Overlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <Window>
        <Header>
          마을 상점
          <CloseButton onClick={onClose}>×</CloseButton>
        </Header>
        <TabContainer>
          <Tab active={tab === 'Buy'} onClick={() => setTab('Buy')}>
            구매
          </Tab>
          <Tab active={tab === 'Sell'} onClick={() => setTab('Sell')}>
            판매
          </Tab>
        </TabContainer>

        <Content>
          {tab === 'Buy'
            ? shopItems.map((itemId) => {
                const item = ITEM_DATABASE[itemId];
                if (!item) return null;
                return (
                  <ItemCard key={itemId}>
                    <ItemInfo>
                      <ItemIcon color="#334455">⚔️</ItemIcon>
                      <ItemDetail>
                        <ItemName>{item.name}</ItemName>
                        <ItemPrice>{item.price} Gold</ItemPrice>
                      </ItemDetail>
                    </ItemInfo>
                    <ItemDesc>{item.description}</ItemDesc>
                    <ActionButton
                      disabled={state.player.gold < item.price}
                      onClick={() => onBuy(itemId)}
                    >
                      구매하기
                    </ActionButton>
                  </ItemCard>
                );
              })
            : state.player.inventory.map((invItem, index) => {
                const item = ITEM_DATABASE[invItem.itemId];
                if (!item) return null;
                const sellPrice = Math.floor(item.price * 0.5);
                return (
                  <ItemCard key={`${invItem.itemId}-${index}`}>
                    <ItemInfo>
                      <ItemIcon color="#443333">📦</ItemIcon>
                      <ItemDetail>
                        <ItemName>
                          {item.name} (x{invItem.quantity})
                        </ItemName>
                        <ItemPrice>{sellPrice} Gold</ItemPrice>
                      </ItemDetail>
                    </ItemInfo>
                    <ItemDesc>{item.description}</ItemDesc>
                    <ActionButton onClick={() => onSell(index)}>
                      판매하기
                    </ActionButton>
                  </ItemCard>
                );
              })}
        </Content>

        <GoldInfo>보유 골드: {state.player.gold} G</GoldInfo>
      </Window>
    </Overlay>
  );
};
