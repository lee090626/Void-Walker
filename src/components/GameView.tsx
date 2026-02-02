import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGameState } from '../hooks/useGameState';
import HUD from './ui/HUD';
import StatusWindow from './ui/StatusWindow';
import Inventory from './ui/Inventory';
import MonsterBook from './ui/MonsterBook';
import QuickBar from './ui/QuickBar';
import { ShopWindow } from './ui/ShopWindow';
import { EnhanceWindow } from './ui/EnhanceWindow';
import PlanetSelectWindow from './ui/PlanetSelectWindow';
import DialogWindow from './ui/DialogWindow';
import SettingsWindow from './ui/SettingsWindow';
import Toast from './ui/Toast';
import { WORLD_DATABASE } from '../types/world';

const CanvasContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #111;
  position: relative;
  overflow: hidden;
`;

const MapTitle = styled.div`
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  pointer-events: none;
  z-index: 10;
`;

const RegionName = styled.h1`
  margin: 0;
  color: var(--primary-color);
  font-family: 'Outfit', sans-serif;
  font-size: 1.8rem;
  letter-spacing: 6px;
  text-transform: uppercase;
  text-shadow:
    0 0 10px rgba(255, 215, 0, 0.5),
    0 0 20px rgba(255, 215, 0, 0.2);
  font-weight: 800;
  background: linear-gradient(180deg, #fff 0%, var(--primary-color) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const CoordLabel = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.8rem;
  letter-spacing: 2px;
  background: rgba(0, 0, 0, 0.4);
  padding: 2px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255, 215, 0, 0.2);
`;

const GameView: React.FC = () => {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);
  const [phaserGame, setPhaserGame] = useState<Phaser.Game | null>(null);

  const {
    state,
    stateRef,
    updateEnemies,
    spawnEnemy,
    updateAttack,
    updateStats,
    allocateStat,
    triggerAttack,
    useItem,
    resetStats,
    buyItem,
    sellItem,
    closeUI,
    handleInteraction,
    setUI,
    enhanceEquipment,
    useQuickBarItem,
    unassignQuickBarItem,
    handleChangeMap,
    handlePlayerPosition,
    toggleSetting,
    handleOpenDialog,
    handleCloseDialog,
    saveGame,
    loadGame,
    resetGame,
  } = useGameState();

  const keysRef = useRef<Set<string>>(new Set());
  const requestRef = useRef<number>(0);
  const previousTimeRef = useRef<number>(0); // Added this line to define previousTimeRef

  // Initialize Phaser
  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      if (!gameContainerRef.current || gameRef.current) return;

      const { createPhaserGame } = await import('../game/PhaserGame');
      if (cancelled || !gameContainerRef.current || gameRef.current) return;

      const game = createPhaserGame(gameContainerRef.current);
      gameRef.current = game;
      setPhaserGame(game);

      // Listen for scene ready
      game.events.once('scene-ready', () => {
        game.events.emit('updateState', stateRef.current);
      });
    };

    void init();

    return () => {
      cancelled = true;
      gameRef.current?.destroy(true);
      gameRef.current = null;
      setPhaserGame(null);
    };
  }, []);

  // Sync State with Phaser
  useEffect(() => {
    if (phaserGame) {
      phaserGame.events.emit('updateState', state);
    }
  }, [phaserGame, state]);

  // Listen for map change from Phaser
  useEffect(() => {
    if (!phaserGame) return;
    phaserGame.events.on('changeMap', handleChangeMap);
    phaserGame.events.on('npcClicked', (npc: any) => {
      console.log('GameView: npcClicked received', npc);
      handleOpenDialog(npc);
    });
    return () => {
      phaserGame.events.off('changeMap', handleChangeMap);
      phaserGame.events.off('npcClicked');
    };
  }, [phaserGame, handleChangeMap, setUI, handleOpenDialog]);

  // Sync player position from Phaser -> React state
  useEffect(() => {
    if (!phaserGame) return;
    phaserGame.events.on('playerPosition', handlePlayerPosition);
    return () => {
      phaserGame.events.off('playerPosition', handlePlayerPosition);
    };
  }, [phaserGame, handlePlayerPosition]);

  // Keyboard controls (Keep existing logic)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      keysRef.current.add(key);

      if (key === 'c') setUI(state.activeUI === 'Status' ? 'None' : 'Status');
      if (key === 'i')
        setUI(state.activeUI === 'Inventory' ? 'None' : 'Inventory');
      if (key === 'b')
        setUI(state.activeUI === 'MonsterBook' ? 'None' : 'MonsterBook');
      if (key === 'o')
        setUI(state.activeUI === 'Settings' ? 'None' : 'Settings');
      if (key === 'f') handleInteraction();
      if (e.key === '1') useQuickBarItem(0);
      if (e.key === '2') useQuickBarItem(1);
      if (e.key === '3') useQuickBarItem(2);
      if (e.key === '4') useQuickBarItem(3);
      if (e.key === '5') useQuickBarItem(4);
      if (e.key === ' ') triggerAttack();
      if (e.key === 'Escape') closeUI();
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key.toLowerCase());
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [
    state.activeUI,
    handleInteraction,
    useQuickBarItem,
    triggerAttack,
    closeUI,
    setUI,
  ]);

  // Main game loop (Keep React Logic running)
  useEffect(() => {
    const animate = (time: number) => {
      if (previousTimeRef.current === 0) {
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
        return;
      }

      const deltaTime = (time - previousTimeRef.current) / 1000;
      previousTimeRef.current = time;
      const clampedDelta = Math.min(deltaTime, 0.1);

      updateEnemies(clampedDelta);
      updateAttack(clampedDelta);
      updateStats();

      const currentMap = WORLD_DATABASE[stateRef.current.currentMapId];
      if (currentMap.canSpawnMonsters && Math.random() < 0.02) spawnEnemy();

      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [updateEnemies, updateAttack, updateStats, spawnEnemy, stateRef]);

  // Handle Window Resize for Phaser
  useEffect(() => {
    const handleResize = () => {
      if (gameRef.current) {
        gameRef.current.scale.resize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <CanvasContainer>
      <div ref={gameContainerRef} style={{ width: '100%', height: '100%' }} />
      <MapTitle>
        <RegionName>{WORLD_DATABASE[state.currentMapId].name}</RegionName>
        {state.settings.showCoordinates && (
          <CoordLabel>
            X: {Math.round(state.player.position.x)} Y:{' '}
            {Math.round(state.player.position.y)}
          </CoordLabel>
        )}
      </MapTitle>

      <HUD
        player={state.player}
        settings={state.settings}
        onOpenStatus={() => setUI('Status')}
        onOpenInventory={() => setUI('Inventory')}
        onOpenBestiary={() => setUI('MonsterBook')}
        onOpenSettings={() => setUI('Settings')}
      />

      <QuickBar
        quickBar={state.quickBar}
        inventory={state.player.inventory}
        onClick={unassignQuickBarItem}
      />

      {state.activeUI === 'Status' && (
        <StatusWindow
          player={state.player}
          onAllocate={allocateStat}
          onReset={resetStats}
          onClose={closeUI}
        />
      )}
      {state.activeUI === 'Inventory' && (
        <Inventory
          items={state.player.inventory}
          equippedWeaponId={state.player.equipment.weapon?.id}
          equippedArmorId={state.player.equipment.armor?.id}
          onUse={useItem}
          onClose={closeUI}
        />
      )}
      {state.activeUI === 'MonsterBook' && (
        <MonsterBook bestiary={state.bestiary} onClose={closeUI} />
      )}
      {state.activeUI === 'Shop' && (
        <ShopWindow
          state={state}
          onClose={closeUI}
          onBuy={buyItem}
          onSell={sellItem}
        />
      )}
      {state.activeUI === 'Enhance' && (
        <EnhanceWindow
          state={state}
          onClose={closeUI}
          onEnhance={enhanceEquipment}
        />
      )}
      {state.activeUI === 'PlanetSelect' && (
        <PlanetSelectWindow
          onSelect={(planetId) => {
            handleChangeMap({
              mapId: planetId,
              x: 1280 / 2,
              y: 960 / 2,
            });
            closeUI();
          }}
          onClose={closeUI}
        />
      )}
      {state.activeUI === 'Dialog' && state.currentDialog && (
        <DialogWindow
          dialog={state.currentDialog}
          onClose={handleCloseDialog}
          onAction={(action) => setUI(action as any)}
        />
      )}
      {state.activeUI === 'Settings' && (
        <SettingsWindow
          settings={state.settings}
          onToggle={toggleSetting}
          onClose={closeUI}
          onSave={saveGame}
          onLoad={loadGame}
          onReset={resetGame}
        />
      )}

      <Toast toasts={state.toasts} />
    </CanvasContainer>
  );
};

export default GameView;
