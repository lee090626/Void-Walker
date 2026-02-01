import { useState, useCallback, useRef, useEffect } from 'react';
import type { GameState, Enemy, Player, Weapon, Armor } from '../types/game';

import { INITIAL_STATE, calculateDerivedStats } from '../types/game';
import { WORLD_DATABASE } from '../types/world';
import { ITEM_DATABASE } from '../types/item';
import { MONSTER_DATABASE } from '../types/monster';
import { MAP_WIDTH, MAP_HEIGHT, TILE_SIZE } from '../game/data/townMap';

export const useGameState = () => {
  const [state, setState] = useState<GameState>(INITIAL_STATE);
  const stateRef = useRef<GameState>(INITIAL_STATE);

  useEffect(() => {
    stateRef.current = state;
    // Auto-start attack if not attacking and weapon equipped
    if (!state.player.attack.isAttacking && state.player.equipment.weapon) {
      triggerAttack();
    }
  }, [state]);

  const handleChangeMap = useCallback(
    (payload: { mapId: string; x: number; y: number }) => {
      console.log('handleChangeMap', payload);
      setState((prev) => ({
        ...prev,
        currentMapId: payload.mapId,
        player: {
          ...prev.player,
          position: { x: payload.x, y: payload.y },
        },
        enemies: [],
        droppedItems: [],
      }));
    },
    [],
  );

  const handlePlayerPosition = useCallback(
    (payload: { x: number; y: number; direction?: number }) => {
      setState((prev) => {
        const { player } = prev;
        const nextPosX = payload.x;
        const nextPosY = payload.y;
        const newDirection =
          payload.direction !== undefined
            ? payload.direction
            : prev.player.direction;

        // Item Pickup Check
        const remainingDroppedItems = prev.droppedItems.filter((item) => {
          const distance = Math.sqrt(
            Math.pow(nextPosX - item.position.x, 2) +
              Math.pow(nextPosY - item.position.y, 2),
          );
          return distance > 50; // Pickup range increased to 50
        });

        const pickedItems = prev.droppedItems.filter((item) => {
          const distance = Math.sqrt(
            Math.pow(nextPosX - item.position.x, 2) +
              Math.pow(nextPosY - item.position.y, 2),
          );
          return distance <= 50;
        });

        let newInventory = [...player.inventory];
        pickedItems.forEach((pi) => {
          const itemData = ITEM_DATABASE[pi.itemId];
          if (itemData) {
            if (itemData.stackable) {
              const existingIndex = newInventory.findIndex(
                (inv) => inv.itemId === pi.itemId,
              );
              if (existingIndex !== -1) {
                newInventory[existingIndex] = {
                  ...newInventory[existingIndex],
                  quantity: newInventory[existingIndex].quantity + 1,
                };
              } else {
                newInventory.push({ itemId: pi.itemId, quantity: 1 });
              }
            } else {
              newInventory.push({ itemId: pi.itemId, quantity: 1 });
            }
          }
        });

        return {
          ...prev,
          player: {
            ...player,
            position: { x: nextPosX, y: nextPosY },
            direction: newDirection,
            inventory: newInventory,
          },
          droppedItems: remainingDroppedItems,
        };
      });
    },
    [],
  );

  const triggerAttack = useCallback(() => {
    setState((prev) => {
      if (prev.player.attack.isAttacking || !prev.player.equipment.weapon)
        return prev;

      const weapon = prev.player.equipment.weapon;
      return {
        ...prev,
        player: {
          ...prev.player,
          attack: {
            isAttacking: true,
            progress: 0,
            angle: -weapon.swingArc / 2,
            targetAngle: weapon.swingArc / 2,
            hitEnemies: [], // Initialize hit list
          },
        },
      };
    });
  }, []);

  const updateAttack = useCallback((deltaTime: number) => {
    setState((prev) => {
      if (!prev.player.attack.isAttacking || !prev.player.equipment.weapon)
        return prev;

      const { player, enemies } = prev;
      const weapon = player.equipment.weapon!;

      const baseSpeed = 0.5; // Equipment no longer affects attack speed
      const dexBonus = 1 + Math.log(player.stats.dex) * 2.0;
      let progressDelta = baseSpeed * dexBonus * deltaTime;
      if (progressDelta > 0.2) progressDelta = 0.2;
      const newProgress = player.attack.progress + progressDelta;

      if (newProgress < 1) {
        return {
          ...prev,
          player: {
            ...player,
            attack: {
              ...player.attack,
              progress: newProgress,
            },
          },
        };
      }

      // Attack triggers at 100% progress
      window.dispatchEvent(new CustomEvent('attack-ready'));

      let newLevel = player.level;
      let newExp = player.exp;
      let newMaxExp = player.maxExp;
      let newStatPoints = player.statPoints;
      let newHp = player.hp;
      let newBestiary = { ...prev.bestiary };
      const newDamageNumbers = [...prev.damageNumbers];
      const newDroppedItems = [...prev.droppedItems];

      // Find all enemies in range
      const effectiveRange = weapon.range;
      const enemiesInRange = enemies
        .map((enemy) => {
          const hbX = enemy.hitboxSize?.x ?? enemy.size.x;
          const hbY = enemy.hitboxSize?.y ?? enemy.size.y;
          const offsetX = enemy.hitboxOffset?.x ?? 0;
          const offsetY = enemy.hitboxOffset?.y ?? 0;
          const hw = hbX / 2;
          const hh = hbY / 2;
          const hitboxCenterX = enemy.position.x + offsetX;
          const hitboxCenterY = enemy.position.y + offsetY;

          const closestX = Math.max(
            hitboxCenterX - hw,
            Math.min(player.position.x, hitboxCenterX + hw),
          );
          const closestY = Math.max(
            hitboxCenterY - hh,
            Math.min(player.position.y, hitboxCenterY + hh),
          );

          const dx = closestX - player.position.x;
          const dy = closestY - player.position.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          return { enemy, dist };
        })
        .filter((item) => item.dist <= effectiveRange)
        .sort((a, b) => a.dist - b.dist);

      let updatedEnemies = [...enemies];
      if (enemiesInRange.length > 0) {
        const target = enemiesInRange[0].enemy;
        const template = MONSTER_DATABASE[target.type];
        const enemyDef = template?.def || 0;

        // 지수형 데미지 공식
        let baseDamage = Math.max(0, Math.pow(player.atk, 1.5) / 5 - enemyDef);
        const variance = 0.9 + Math.random() * 0.2;
        let finalDamage = Math.floor(baseDamage * variance);

        let isCritical = false;
        const critChance = player.stats.dex * 0.005;
        if (Math.random() < critChance) {
          isCritical = true;
          finalDamage = Math.floor(finalDamage * (1.5 + Math.random() * 0.5));
        }

        const newEnemyHp = Math.max(0, target.hp - finalDamage);

        // Add damage number
        newDamageNumbers.push({
          id: `dmg-${Date.now()}-${Math.random()}`,
          value: finalDamage,
          vx: (Math.random() - 0.5) * 4,
          position: {
            x: target.position.x + (Math.random() - 0.5) * 20,
            y: target.position.y - 20 - Math.random() * 20,
          },
          color: isCritical ? '#ff00ff' : '#ffd700',
          createdAt: Date.now(),
        });

        // Update the specific enemy
        updatedEnemies = updatedEnemies.map((e) =>
          e.id === target.id ? { ...e, hp: newEnemyHp } : e,
        );

        // Handle death rewards if this target died
        if (newEnemyHp <= 0) {
          newExp += target.expValue;
          newBestiary[target.type] = (newBestiary[target.type] || 0) + 1;

          if (template && template.drops && template.drops.length > 0) {
            const randomIndex = Math.floor(
              Math.random() * template.drops.length,
            );
            const drop = template.drops[randomIndex];
            if (Math.random() < drop.chance) {
              newDroppedItems.push({
                id: `drop-${Date.now()}-${Math.random()}`,
                itemId: drop.itemId,
                position: { ...target.position },
                droppedAt: Date.now(),
              });
            }
          }

          const oldLevel = player.level;
          while (newExp >= newMaxExp) {
            newLevel += 1;
            newExp -= newMaxExp;
            newMaxExp = Math.floor(newMaxExp * 1.5);
            newStatPoints += 5;
          }

          if (newLevel > oldLevel) {
            const derived = calculateDerivedStats(
              player.stats,
              player.equipment,
            );
            newHp = derived.maxHp;
          }
        }
      }

      // Filter out dead enemies
      const remainingEnemies = updatedEnemies.filter((e) => e.hp > 0);

      return {
        ...prev,
        player: {
          ...player,
          level: newLevel,
          exp: newExp,
          maxExp: newMaxExp,
          statPoints: newStatPoints,
          hp: newHp,
          attack: {
            ...player.attack,
            isAttacking: false,
            progress: 0,
            hitEnemies: [],
          },
        },
        enemies: remainingEnemies,
        bestiary: newBestiary,
        damageNumbers: newDamageNumbers,
        droppedItems: newDroppedItems,
      };
    });
  }, []);

  const spawnEnemy = useCallback(() => {
    setState((prev) => {
      const currentMap = WORLD_DATABASE[prev.currentMapId];
      if (!currentMap.canSpawnMonsters || prev.enemies.length >= 10)
        return prev;

      // Select monster based on map
      let monsterId = 'slime';
      if (prev.currentMapId === 'forest') monsterId = 'goblin';
      if (prev.currentMapId === 'cave') monsterId = 'bat';
      if (prev.currentMapId === 'frozen_cliff') monsterId = 'ice_spirit';
      if (prev.currentMapId === 'burning_abyss') monsterId = 'burning_slime';

      const template = MONSTER_DATABASE[monsterId];
      if (!template) return prev;

      const newEnemy: Enemy = {
        id: `enemy-${Date.now()}`,
        type: template.id,
        position: {
          x: Math.random() * (MAP_WIDTH * TILE_SIZE - 100) + 50,
          y: Math.random() * (MAP_HEIGHT * TILE_SIZE - 100) + 50,
        },
        velocity: { x: 0, y: 0 },
        size: { ...template.size },
        speed: template.speed,
        hp: template.maxHp,
        maxHp: template.maxHp,
        level: 1,
        expValue: template.expValue,
        atk: template.atk,
        attackRange: template.attackRange,
        attackCooldown: template.attackCooldown,
        lastAttackTime: 0,
        hitboxSize: { ...template.hitboxSize },
        hitboxOffset: { ...template.hitboxOffset },
      };

      return {
        ...prev,
        enemies: [...prev.enemies, newEnemy],
      };
    });
  }, []);

  const updateEnemies = useCallback((deltaTime: number) => {
    setState((prev) => {
      const { player, enemies } = prev;
      let newPlayerHp = player.hp;
      let newLastDamageTime = player.lastDamageTime;
      const now = Date.now();
      const newDamageNumbers = [...prev.damageNumbers];

      const updatedEnemies = enemies.map((enemy) => {
        const dx = player.position.x - enemy.position.x;
        const dy = player.position.y - enemy.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let vx = 0;
        let vy = 0;
        if (distance > 5) {
          vx = (dx / distance) * enemy.speed;
          vy = (dy / distance) * enemy.speed;
        }

        let lastAttack = enemy.lastAttackTime;
        if (
          distance <= enemy.attackRange &&
          now - enemy.lastAttackTime >= enemy.attackCooldown * 1000
        ) {
          // 몬스터 데미지 공식에도 난수 적용
          const baseDamage = Math.max(0, enemy.atk - player.def);
          const variance = 0.9 + Math.random() * 0.2;
          const damage = Math.floor(baseDamage * variance);

          newPlayerHp -= damage;

          // Add damage number for player hit
          newDamageNumbers.push({
            id: `dmg-p-${Date.now()}-${Math.random()}`,
            value: damage,
            vx: (Math.random() - 0.5) * 3, // Random horizontal spread for player taking damage
            position: {
              x: player.position.x + (Math.random() - 0.5) * 15,
              y: player.position.y - 10 - Math.random() * 10,
            },
            color: '#ff4b2b', // Red for enemy hitting player
            createdAt: Date.now(),
          });

          lastAttack = now;
          newLastDamageTime = now;
        }

        return {
          ...enemy,
          position: {
            x: enemy.position.x + vx * deltaTime,
            y: enemy.position.y + vy * deltaTime,
          },
          lastAttackTime: lastAttack,
        };
      });

      if (newPlayerHp <= 0) {
        return {
          ...prev,
          currentMapId: 'town',
          enemies: [],
          droppedItems: [],
          player: {
            ...player,
            hp: player.maxHp,
            position: { x: 400, y: 300 },
            lastDamageTime: 0,
          },
        };
      }

      return {
        ...prev,
        player: {
          ...player,
          hp: newPlayerHp,
          lastDamageTime: newLastDamageTime,
        },
        enemies: updatedEnemies,
        damageNumbers: newDamageNumbers.filter(
          (dn) => now - dn.createdAt < 1000,
        ),
      };
    });
  }, []);

  const allocateStat = useCallback(
    (statName: keyof Player['stats'], amount: number = 1) => {
      setState((prev) => {
        const actualAmount = Math.min(amount, prev.player.statPoints);
        if (actualAmount <= 0) return prev;

        const newStats = { ...prev.player.stats };
        (newStats as any)[statName] += actualAmount;

        const derived = calculateDerivedStats(newStats, prev.player.equipment);
        let newHp = prev.player.hp;
        let newMp = prev.player.mp;

        // If HP was full, keep it full
        if (prev.player.hp === prev.player.maxHp) newHp = derived.maxHp;
        if (prev.player.mp === prev.player.maxMp) newMp = derived.maxMp;

        return {
          ...prev,
          player: {
            ...prev.player,
            stats: newStats,
            statPoints: prev.player.statPoints - actualAmount,
            ...derived,
            hp: Math.min(newHp, derived.maxHp),
            mp: Math.min(newMp, derived.maxMp),
          },
        };
      });
    },
    [],
  );

  const useItem = useCallback((itemIndex: number) => {
    setState((prev) => {
      const invItem = prev.player.inventory[itemIndex];
      if (!invItem) return prev;

      const itemData = ITEM_DATABASE[invItem.itemId] as any;
      if (!itemData) return prev;

      let { player } = prev;
      let newInventory = [...player.inventory];
      let newHp = player.hp;
      let newWeapon = player.equipment.weapon;
      let newArmor = player.equipment.armor;

      if (itemData.type === 'Potion') {
        const firstEmptyIndex = prev.quickBar.indexOf(null);
        const alreadyAssignedIndex = prev.quickBar.indexOf(itemData.id);

        if (alreadyAssignedIndex !== -1) {
          // Already assigned, do nothing or show message (for now, just return)
          return prev;
        }

        const newQuickBar = [...prev.quickBar];
        if (firstEmptyIndex !== -1) {
          newQuickBar[firstEmptyIndex] = itemData.id;
        } else {
          // All slots full, replace the first one
          newQuickBar[0] = itemData.id;
        }

        return {
          ...prev,
          quickBar: newQuickBar,
        };
      } else if (itemData.type === 'Weapon') {
        newWeapon = {
          ...(itemData as Weapon),
          enhanceLevel: invItem.enhanceLevel || 0,
        };
      } else if (itemData.type === 'Armor') {
        newArmor = {
          ...(itemData as Armor),
          enhanceLevel: invItem.enhanceLevel || 0,
        };
      }

      const derived = calculateDerivedStats(player.stats, {
        weapon: newWeapon,
        armor: newArmor,
      });

      return {
        ...prev,
        player: {
          ...player,
          hp: Math.min(newHp, derived.maxHp),
          inventory: newInventory,
          equipment: {
            ...player.equipment,
            weapon: newWeapon,
            armor: newArmor,
          },
          ...derived,
        },
      };
    });
  }, []);

  const resetStats = useCallback(() => {
    setState((prev) => {
      const { player } = prev;
      const totalPoints = (player.level - 1) * 5;
      const newStats = { str: 1, dex: 1, int: 1, vit: 1 };
      const derived = calculateDerivedStats(newStats, player.equipment);

      return {
        ...prev,
        player: {
          ...player,
          stats: newStats,
          statPoints: totalPoints,
          ...derived,
          hp: derived.maxHp,
          mp: derived.maxMp,
        },
      };
    });
  }, []);

  const useQuickBarItem = useCallback((slotIndex: number) => {
    setState((prev) => {
      const itemId = prev.quickBar[slotIndex];
      if (!itemId) return prev;

      const itemIndex = prev.player.inventory.findIndex(
        (inv) => inv.itemId === itemId,
      );
      if (itemIndex === -1) return prev;

      const invItem = prev.player.inventory[itemIndex];
      const itemData = ITEM_DATABASE[itemId] as any;
      if (!itemData) return prev;

      let { player } = prev;
      let newInventory = [...player.inventory];
      let newHp = player.hp;
      let newMp = player.mp;

      // 마을 귀환서: 소비 후 마을로 이동, 몹/드롭 초기화
      if (itemData.id === 'return_scroll') {
        if (invItem.quantity > 1) {
          newInventory[itemIndex] = {
            ...invItem,
            quantity: invItem.quantity - 1,
          };
        } else {
          newInventory.splice(itemIndex, 1);
        }
        const newQuickBar = [...prev.quickBar];
        const stillHasItem = newInventory.some((inv) => inv.itemId === itemId);
        if (!stillHasItem) newQuickBar[slotIndex] = null;

        return {
          ...prev,
          currentMapId: 'town',
          enemies: [],
          droppedItems: [],
          player: {
            ...player,
            position: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
            inventory: newInventory,
          },
          quickBar: newQuickBar,
        };
      }

      if (itemData.hpRestore) {
        newHp = Math.min(player.maxHp, player.hp + itemData.hpRestore);
      }
      if (itemData.mpRestore) {
        newMp = Math.min(player.maxMp, player.mp + itemData.mpRestore);
      }

      if (invItem.quantity > 1) {
        newInventory[itemIndex] = {
          ...invItem,
          quantity: invItem.quantity - 1,
        };
      } else {
        newInventory.splice(itemIndex, 1);
      }

      // If item is used up, remove from quick bar
      const newQuickBar = [...prev.quickBar];
      const stillHasItem = newInventory.some((inv) => inv.itemId === itemId);
      if (!stillHasItem) {
        newQuickBar[slotIndex] = null;
      }

      const derived = calculateDerivedStats(player.stats, player.equipment);

      return {
        ...prev,
        player: {
          ...player,
          hp: Math.min(newHp, derived.maxHp),
          mp: Math.min(newMp, derived.maxMp),
          inventory: newInventory,
        },
        quickBar: newQuickBar,
      };
    });
  }, []);

  const unassignQuickBarItem = useCallback((slotIndex: number) => {
    setState((prev) => {
      const newQuickBar = [...prev.quickBar];
      newQuickBar[slotIndex] = null;
      return { ...prev, quickBar: newQuickBar };
    });
  }, []);

  const buyItem = useCallback((itemId: string) => {
    setState((prev) => {
      const itemData = ITEM_DATABASE[itemId];
      if (!itemData || prev.player.gold < itemData.price) return prev;

      let newInventory = [...prev.player.inventory];
      if (itemData.stackable) {
        const existingIndex = newInventory.findIndex(
          (inv) => inv.itemId === itemId,
        );
        if (existingIndex !== -1) {
          newInventory[existingIndex] = {
            ...newInventory[existingIndex],
            quantity: newInventory[existingIndex].quantity + 1,
          };
        } else {
          newInventory.push({ itemId, quantity: 1 });
        }
      } else {
        newInventory.push({ itemId, quantity: 1 });
      }

      return {
        ...prev,
        player: {
          ...prev.player,
          gold: prev.player.gold - itemData.price,
          inventory: newInventory,
        },
      };
    });
  }, []);

  const sellItem = useCallback((index: number) => {
    setState((prev) => {
      const invItem = prev.player.inventory[index];
      if (!invItem) return prev;
      const itemData = ITEM_DATABASE[invItem.itemId];
      if (!itemData) return prev;

      const sellPrice = Math.floor(itemData.price * 0.5);
      let newInventory = [...prev.player.inventory];

      if (invItem.quantity > 1) {
        newInventory[index] = { ...invItem, quantity: invItem.quantity - 1 };
      } else {
        newInventory.splice(index, 1);
      }

      return {
        ...prev,
        player: {
          ...prev.player,
          gold: prev.player.gold + sellPrice,
          inventory: newInventory,
        },
      };
    });
  }, []);

  const closeUI = useCallback(() => {
    setState((prev) => ({ ...prev, activeUI: 'None' }));
  }, [setState]);

  const setUI = useCallback(
    (ui: GameState['activeUI']) => {
      setState((prev) => ({ ...prev, activeUI: ui }));
    },
    [setState],
  );

  const openShop = useCallback(() => {
    setState((prev) => ({ ...prev, activeUI: 'Shop' }));
  }, []);

  const updateStats = useCallback(() => {
    setState((prev) => {
      const now = Date.now();
      const dt = (now - prev.lastUpdate) / 1000;
      if (dt < 0.1) return prev;

      return {
        ...prev,
        lastUpdate: now,
      };
    });
  }, []);

  const enhanceEquipment = useCallback((inventoryIndex: number) => {
    setState((prev) => {
      const { player } = prev;
      const invItem = player.inventory[inventoryIndex];
      if (!invItem) return prev;

      const itemData = ITEM_DATABASE[invItem.itemId];
      if (
        !itemData ||
        (itemData.type !== 'Weapon' && itemData.type !== 'Armor')
      )
        return prev;

      const currentLevel = invItem.enhanceLevel || 0;
      const stoneIndex = player.inventory.findIndex(
        (inv) => inv.itemId === 'enhance_stone',
      );
      const cost = (currentLevel + 1) * 500; // Increased cost for balance

      if (stoneIndex === -1 || player.gold < cost) return prev;

      let newInventory = [...player.inventory];

      // Consume stone
      if (newInventory[stoneIndex].quantity > 1) {
        newInventory[stoneIndex] = {
          ...newInventory[stoneIndex],
          quantity: newInventory[stoneIndex].quantity - 1,
        };
      } else {
        newInventory.splice(stoneIndex, 1);
      }

      // Re-find target item index since inventory might have changed
      const targetItem = newInventory.find(
        (inv) =>
          inv.itemId === invItem.itemId &&
          (inv.enhanceLevel || 0) === currentLevel,
      );

      if (!targetItem) return prev;
      const targetIdx = newInventory.indexOf(targetItem);

      const successChance = Math.max(0.3, 1 - currentLevel * 0.1);
      const isSuccess = Math.random() < successChance;

      if (isSuccess) {
        newInventory[targetIdx] = {
          ...targetItem,
          enhanceLevel: currentLevel + 1,
        };
      } else {
        // Simple fail, no break for now
        if (currentLevel > 3) {
          newInventory[targetIdx] = {
            ...targetItem,
            enhanceLevel: Math.max(0, currentLevel - 1),
          };
        }
      }

      // Update equipment if the enhanced item was equipped
      let newWeapon = player.equipment.weapon;
      let newArmor = player.equipment.armor;

      if (
        newWeapon &&
        invItem.itemId === newWeapon.id &&
        (invItem.enhanceLevel || 0) === (newWeapon.enhanceLevel || 0)
      ) {
        newWeapon = {
          ...newWeapon,
          enhanceLevel: newInventory[targetIdx].enhanceLevel,
        };
      }
      if (
        newArmor &&
        invItem.itemId === newArmor.id &&
        (invItem.enhanceLevel || 0) === (newArmor.enhanceLevel || 0)
      ) {
        newArmor = {
          ...newArmor,
          enhanceLevel: newInventory[targetIdx].enhanceLevel,
        };
      }

      const derived = calculateDerivedStats(player.stats, {
        weapon: newWeapon,
        armor: newArmor,
      });

      return {
        ...prev,
        player: {
          ...player,
          gold: player.gold - cost,
          inventory: newInventory,
          equipment: {
            weapon: newWeapon,
            armor: newArmor,
          },
          ...derived,
        },
      };
    });
  }, []);

  const handleInteraction = useCallback(() => {
    setState((prev) => {
      const currentMap = WORLD_DATABASE[prev.currentMapId];
      if (!currentMap) return prev;

      const nearestNPC = currentMap.npcs.find((npc) => {
        const dx = npc.position.x - prev.player.position.x;
        const dy = npc.position.y - prev.player.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        return dist < 60;
      });

      if (nearestNPC) {
        if (nearestNPC.type === 'Merchant')
          return { ...prev, activeUI: 'Shop' };
        if (nearestNPC.type === 'Blacksmith')
          return { ...prev, activeUI: 'Enhance' };
        if (nearestNPC.type === 'Spaceship')
          return { ...prev, activeUI: 'PlanetSelect' };
      }

      return prev;
    });
  }, []);

  const toggleSetting = useCallback((key: keyof GameState['settings']) => {
    setState((prev) => {
      if (key === 'cooldownVisualMode') {
        return {
          ...prev,
          settings: {
            ...prev.settings,
            cooldownVisualMode: (prev.settings.cooldownVisualMode + 1) % 4,
          },
        };
      }
      return {
        ...prev,
        settings: {
          ...prev.settings,
          [key]: !prev.settings[key],
        },
      };
    });
  }, []);

  return {
    state,
    stateRef,
    updateEnemies,
    spawnEnemy,
    updateAttack,
    updateStats,
    triggerAttack,
    allocateStat,
    useItem,
    resetStats,
    buyItem,
    sellItem,
    closeUI,
    openShop,
    handleInteraction,
    setUI,
    enhanceEquipment,
    useQuickBarItem,
    unassignQuickBarItem,
    handleChangeMap,
    handlePlayerPosition,
    toggleSetting,
  };
};
