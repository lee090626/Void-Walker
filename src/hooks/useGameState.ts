import { useState, useCallback, useRef, useEffect } from 'react';
import type {
  GameState,
  Enemy,
  Player,
  Weapon,
  Armor,
  Helmet,
  RespawnTask,
} from '../types/game';

import { INITIAL_STATE, calculateDerivedStats } from '../types/game';
import { WORLD_DATABASE } from '../types/world';
import { ITEM_DATABASE } from '../types/item';
import { MONSTER_DATABASE, getMonsterStatsByLevel } from '../types/monster';
import { getBossInfo } from '../types/progression';
import { MAP_WIDTH, MAP_HEIGHT, TILE_SIZE } from '../game/data/townMap';
import type { PlayerSkills } from '../types/skills';
import { INITIAL_SKILLS, SKILL_DEFINITIONS } from '../types/skills';

// Helper to create enemies from fixed spawn data
const createFixedEnemies = (mapId: string): Enemy[] => {
  const currentMap = WORLD_DATABASE[mapId];
  if (!currentMap || !currentMap.fixedSpawns) return [];

  return currentMap.fixedSpawns
    .map((fs, idx) => {
      const template = MONSTER_DATABASE[fs.monsterId];
      if (!template) {
        console.warn(
          `Monster template not found for fixed spawn: ${fs.monsterId}`,
        );
        return null;
      }

      const spawnLevel = fs.level || 1;
      const scaledStats = getMonsterStatsByLevel(template, spawnLevel);

      const maxHp = scaledStats?.maxHp || template.maxHp;
      const expValue = scaledStats?.expValue || template.expValue;
      const atk = scaledStats?.atk || template.atk;

      return {
        id: `fixed-${fs.monsterId}-${Date.now()}-${idx}`,
        type: template.id,
        position: { x: fs.x, y: fs.y },
        velocity: { x: 0, y: 0 },
        size: { ...template.size },
        speed: template.speed,
        hp: maxHp,
        maxHp: maxHp,
        level: spawnLevel,
        expValue: expValue,
        atk: atk,
        def: scaledStats?.def || template.def || 0,
        attackRange: template.attackRange || 0,
        attackCooldown: template.attackCooldown || 999999,
        lastAttackTime: 0,
        hitboxSize: template.hitboxSize || { x: 32, y: 32 },
        hitboxOffset: template.hitboxOffset || { x: 0, y: 0 },
        shield: scaledStats?.shield,
        glacierFallDamage: scaledStats?.glacierFallDamage,
        tailSwipeDamage: scaledStats?.tailSwipeDamage,
      } as Enemy;
    })
    .filter((e): e is Enemy => e !== null);
};

export const useGameState = () => {
  const [state, setState] = useState<GameState>(INITIAL_STATE);
  const stateRef = useRef<GameState>(INITIAL_STATE);

  const saveNeededRef = useRef<boolean>(false);

  const addToast = useCallback((message: string, duration: number = 1000) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setState((prev) => ({
      ...prev,
      toasts: [...prev.toasts, { id, message, duration }],
    }));

    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        toasts: prev.toasts.filter((t) => t.id !== id),
      }));
    }, duration);
  }, []);

  const saveGame = useCallback(
    (isAutosave = false) => {
      const currentState = stateRef.current;

      // Extract only persistent data
      const persistentState = {
        player: {
          ...currentState.player,
        },
        bestiary: currentState.bestiary,
        settings: currentState.settings,
        quickBar: currentState.quickBar,
        currentMapId: 'town', // Always start at town
      };

      // Remove non-persistent player attributes (position)
      const { position, ...playerWithoutPosition } = persistentState.player;
      persistentState.player = playerWithoutPosition as any;

      try {
        localStorage.setItem(
          'void_walker_save',
          JSON.stringify(persistentState),
        );
        console.log(
          isAutosave ? 'Autosave completed' : 'Manual save completed',
        );

        if (isAutosave) {
          addToast('Game auto-saved');
        } else {
          addToast('Game saved successfully');
        }
      } catch (error) {
        console.error('Failed to save game:', error);
        addToast('Failed to save game');
      }
    },
    [addToast],
  );

  const loadGame = useCallback((silent = false) => {
    const saved = localStorage.getItem('void_walker_save');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Reset volatile data and player position on load
        parsed.enemies = createFixedEnemies(parsed.currentMapId || 'town');
        parsed.droppedItems = [];
        parsed.damageNumbers = [];
        parsed.glacierFalls = [];
        parsed.orbitalLasers = [];
        parsed.activeUI = 'None';
        parsed.currentDialog = null;
        parsed.lastUpdate = Date.now();
        parsed.toasts = [];
        parsed.glacierFalls = [];
        // Migration: ensure new fields exist
        if (parsed.lastSpawnTime === undefined) parsed.lastSpawnTime = 0;
        if (parsed.lastBossKillTime === undefined) parsed.lastBossKillTime = 0;
        if (parsed.respawnQueue === undefined) parsed.respawnQueue = [];

        // [NEW] Migration: create acquiredEquipment from existing data
        if (!parsed.player.acquiredEquipment) {
          const acquiredEquipment: string[] = [];

          // 1. Add equipped items
          if (parsed.player.equipment.weapon) {
            acquiredEquipment.push(parsed.player.equipment.weapon.id);
          }
          if (parsed.player.equipment.armor) {
            acquiredEquipment.push(parsed.player.equipment.armor.id);
          }
          if (parsed.player.equipment.helmet) {
            acquiredEquipment.push(parsed.player.equipment.helmet.id);
          }

          // 2. Add equipment from inventory
          if (parsed.player.inventory) {
            parsed.player.inventory.forEach((invItem: any) => {
              const itemData = ITEM_DATABASE[invItem.itemId];
              if (
                itemData &&
                (itemData.type === 'Weapon' ||
                  itemData.type === 'Armor' ||
                  itemData.type === 'Helmet')
              ) {
                if (!acquiredEquipment.includes(invItem.itemId)) {
                  acquiredEquipment.push(invItem.itemId);
                }

                // Fix quantity for equipment (should be 1)
                invItem.quantity = 1;
              }
            });
          }

          parsed.player.acquiredEquipment = acquiredEquipment;
          console.log('Migrated acquiredEquipment:', acquiredEquipment);
        }

        // [NEW] Migration: initialize skills for old save files
        if (!parsed.player.skills) {
          parsed.player.skills = {
            critDamage: 0,
            attackSpeed: 0,
            maxHpBonus: 0,
            defenseBonus: 0,
            hpRegen: 0,
            expBonus: 0,
            dropRate: 0,
            goldBonus: 0,
            moveSpeed: 0,
          };
          console.log('Migrated skills: initialized to 0');
        }
        if (parsed.player.skillPoints === undefined) {
          parsed.player.skillPoints = 0;
          console.log('Migrated skillPoints: initialized to 0');
        }

        // [REBALANCING] Recalculate skill points based on level and spent points
        // Rule: 10 points every 10 levels starting at Lv.50 (50, 60, 70...)
        // Formula: Math.floor(level / 10 - 4) * 5
        const currentLevel = parsed.player.level || 1;
        const totalEarnedPoints =
          currentLevel < 50 ? 0 : Math.floor(currentLevel / 10 - 4) * 5;
        const spentPoints = Object.values(parsed.player.skills || {}).reduce(
          (sum: number, val: any) => sum + (typeof val === 'number' ? val : 0),
          0,
        );
        const correctedAvailablePoints = Math.max(
          0,
          totalEarnedPoints - spentPoints,
        );

        if (parsed.player.skillPoints !== correctedAvailablePoints) {
          console.log(
            `Skill Points recalibrated: ${parsed.player.skillPoints} -> ${correctedAvailablePoints} (Level: ${currentLevel}, Spent: ${spentPoints})`,
          );
          parsed.player.skillPoints = correctedAvailablePoints;
        }

        // 플레이어 위치를 초기 위치로 설정
        parsed.player.position = { ...INITIAL_STATE.player.position };
        parsed.currentMapId = INITIAL_STATE.currentMapId;

        // Migration: 만약 이전 버전의 proxima_luna 맵을 사용 중이라면 proxima_station으로 변경
        if (parsed.currentMapId === 'proxima_luna') {
          parsed.currentMapId = 'proxima_station';
        }

        if (parsed.player.stats.def === undefined) {
          parsed.player.stats.def = 1;
        }

        setState(parsed);
        if (!silent) alert('Game loaded successfully');
      } catch (e) {
        console.error('Failed to load game', e);
        if (!silent) alert('Failed to load game');
      }
    } else {
      if (!silent) alert('No save data found');
    }
  }, []);

  // No longer needed as loadGame(true) on mount handles initial town spawns

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
        glacierFalls: [],
        orbitalLasers: [],
      }));

      // Initialize Fixed Spawns if any
      const fixedEnemies = createFixedEnemies(payload.mapId);
      if (fixedEnemies.length > 0) {
        setState((prev) => ({
          ...prev,
          enemies: fixedEnemies,
        }));
      }
    },
    [],
  );

  const handlePlayerPosition = useCallback(
    (payload: { x: number; y: number; direction?: number }) => {
      setState((prev) => {
        // Prevent updates if Dialog is open to avoid state race conditions or unwanted movement
        if (prev.activeUI === 'Dialog') return prev;

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
        let newAcquiredEquipment = [...player.acquiredEquipment];

        pickedItems.forEach((pi) => {
          const itemData = ITEM_DATABASE[pi.itemId];
          if (itemData) {
            // [NEW] Track equipment acquisition
            const isEquipment =
              itemData.type === 'Weapon' ||
              itemData.type === 'Armor' ||
              itemData.type === 'Helmet';

            if (isEquipment && !newAcquiredEquipment.includes(pi.itemId)) {
              newAcquiredEquipment.push(pi.itemId);
            }

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
              // Equipment (non-stackable)
              newInventory.push({
                itemId: pi.itemId,
                quantity: 1,
                enhanceLevel: 0,
              });
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
            acquiredEquipment: newAcquiredEquipment,
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

  useEffect(() => {
    stateRef.current = state;

    // Immediate save if needed (anti-scumming)
    if (saveNeededRef.current) {
      saveNeededRef.current = false;
      saveGame(true);
    }

    // Auto-start attack if not attacking and weapon equipped
    if (!state.player.attack.isAttacking && state.player.equipment.weapon) {
      triggerAttack();
    }
  }, [state, triggerAttack, saveGame]);

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

      // Attack triggers at 100% progress - only calculate damage once
      window.dispatchEvent(new CustomEvent('attack-ready'));

      let newLevel = player.level;
      let newExp = player.exp;
      let newMaxExp = player.maxExp;
      let newStatPoints = player.statPoints;
      let newSkillPoints = player.skillPoints;
      let newHp = player.hp;
      let newBestiary = { ...prev.bestiary };
      const newDamageNumbers = [...prev.damageNumbers];
      const newDroppedItems = [...prev.droppedItems];
      let newLastBossKillTime = prev.lastBossKillTime;
      const newRespawnQueue = [...prev.respawnQueue];

      // Find all enemies in range (최적화: 이미 맞은 적은 제외)
      const effectiveRange = weapon.range;
      const enemiesInRange = enemies
        .filter((enemy) => !player.attack.hitEnemies.includes(enemy.id)) // 이미 맞은 적 제외
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
        let enemyDef = target.def; // Use instance-specific scaled def

        // 통일된 지수형 데미지 공식 적용 (방어력 지수 1.1, 최소 데미지 5%)
        const rawDamage =
          Math.pow(Math.max(0, player.atk - Math.pow(enemyDef, 1.1)), 1.5) / 5;
        const minDamage = player.atk * 0.05;
        const baseDamage = Math.max(minDamage, rawDamage);

        const variance = 0.9 + Math.random() * 0.2;
        let finalDamage = Math.floor(baseDamage * variance);

        let isCritical = false;
        const critChance = player.stats.dex * 0.005;
        if (Math.random() < critChance) {
          isCritical = true;
          // [NEW] Apply critDamage skill (+10% per level, max 20 levels = +200%)
          // Base crit: 150% (1.5x), Max with skill: 350% (3.5x)
          const baseCritMultiplier = 1.5;
          const skillCritBonus = player.skills.critDamage * 0.1;
          const totalCritMultiplier = baseCritMultiplier + skillCritBonus;
          finalDamage = Math.floor(finalDamage * totalCritMultiplier);
        }

        // Boss Shield (Ice Armor) - absorb damage first
        let shieldDamage = 0;
        let newShield = target.shield ?? 0;
        if (newShield > 0) {
          shieldDamage = Math.min(newShield, finalDamage);
          newShield -= shieldDamage;
          finalDamage -= shieldDamage;
        }

        const newEnemyHp = Math.max(0, target.hp - finalDamage);

        // Check for Enrage Mode trigger
        let newEnraged = target.isEnraged ?? false;
        if (
          template?.enrageThreshold &&
          !newEnraged &&
          newEnemyHp / target.maxHp <= template.enrageThreshold
        ) {
          newEnraged = true;
        }

        // Add damage number (show shield absorbed damage differently)
        const displayDamage = shieldDamage > 0 ? shieldDamage : finalDamage;
        const damageColor =
          shieldDamage > 0 ? '#00ffff' : isCritical ? '#ff00ff' : '#ffd700';
        newDamageNumbers.push({
          id: `dmg-${Date.now()}-${Math.random()}`,
          value: displayDamage,
          vx: (Math.random() - 0.5) * 4,
          position: {
            x: target.position.x + (Math.random() - 0.5) * 20,
            y: target.position.y - 20 - Math.random() * 20,
          },
          color: damageColor,
          createdAt: Date.now(),
        });

        // Update the specific enemy with new shield and enrage state
        updatedEnemies = updatedEnemies.map((e) =>
          e.id === target.id
            ? { ...e, hp: newEnemyHp, shield: newShield, isEnraged: newEnraged }
            : e,
        );

        // Handle death rewards if this target died
        if (newEnemyHp <= 0) {
          // [NEW] Apply expBonus skill (+10% per level, max 20 levels = +200%)
          const expMultiplier = 1 + player.skills.expBonus * 0.1;
          newExp += Math.floor(target.expValue * expMultiplier);
          newBestiary[target.type] = (newBestiary[target.type] || 0) + 1;

          if (template?.isBoss) {
            newLastBossKillTime = Date.now();
            saveNeededRef.current = true;
          }

          // Handle boss defeat progression
          const bossInfo = getBossInfo(target.type);
          if (bossInfo) {
            // Add to defeated bosses list if not already there
            if (!player.defeatedBosses.includes(target.type)) {
              player.defeatedBosses.push(target.type);
            }

            // Add boss defeat rewards
            // [NEW] Apply goldBonus skill (+15% per level, max 20 levels = +300%)
            const goldMultiplier = 1 + player.skills.goldBonus * 0.15;
            newExp += bossInfo.rewards.exp;
            player.gold += Math.floor(bossInfo.rewards.gold * goldMultiplier);

            // [REMOVED] Bonus skill points for boss kill (Per user request)
            // newSkillPoints += 3;
          }

          if (template && template.drops && template.drops.length > 0) {
            // [IMPROVED] Weighted drop system (Option 2)
            // Filter out owned equipment from drop table
            const availableDrops = template.drops.filter((drop) => {
              const dropItemData = ITEM_DATABASE[drop.itemId];
              const isEquipment =
                dropItemData &&
                (dropItemData.type === 'Weapon' ||
                  dropItemData.type === 'Armor' ||
                  dropItemData.type === 'Helmet');

              // Include if not equipment, or if equipment but not owned
              return (
                !isEquipment || !player.acquiredEquipment.includes(drop.itemId)
              );
            });

            // Only attempt drop if there are available items
            if (availableDrops.length > 0) {
              const dropRateMultiplier = 1 + player.skills.dropRate * 0.1;

              // [IMPROVED] Identify rare items: those with the minimum chance in the table
              const minChance = Math.min(
                ...availableDrops.map((d) => d.chance),
              );

              let totalWeight = 0;
              const adjustedWeights = availableDrops.map((drop) => {
                // Apply bonus ONLY to the rarest item(s)
                const isRare = drop.chance === minChance;
                const weight = isRare
                  ? drop.chance * dropRateMultiplier
                  : drop.chance;
                totalWeight += weight;
                return { ...drop, adjustedWeight: weight };
              });

              // Weighted random selection
              const random = Math.random() * totalWeight;
              let accumulatedWeight = 0;

              for (const drop of adjustedWeights) {
                accumulatedWeight += drop.adjustedWeight;
                if (random <= accumulatedWeight) {
                  // Selected this item, now drop it
                  newDroppedItems.push({
                    id: `drop-${Date.now()}-${Math.random()}`,
                    itemId: drop.itemId,
                    position: { ...target.position },
                    droppedAt: Date.now(),
                  });
                  break;
                }
              }
            }
          }

          // [NEW] Fixed Respawn Logic
          if (target.id.startsWith('fixed-')) {
            const parts = target.id.split('-');
            const idxStr = parts[parts.length - 1];
            const idx = parseInt(idxStr, 10);
            const currentMap = WORLD_DATABASE[prev.currentMapId];

            if (
              !isNaN(idx) &&
              currentMap &&
              currentMap.fixedSpawns &&
              currentMap.fixedSpawns[idx]
            ) {
              const fixedData = currentMap.fixedSpawns[idx];
              // Check if already in queue to prevent duplicates
              const alreadyQueued = newRespawnQueue.some(
                (t) => t.monsterId === target.id,
              );
              if (!alreadyQueued) {
                const cooldownSeconds = fixedData.respawnCooldown || 60; // Default 60 seconds
                newRespawnQueue.push({
                  monsterId: target.id,
                  templateId: target.type,
                  level: fixedData.level || target.level || 1,
                  position: { x: fixedData.x, y: fixedData.y },
                  respawnTime: Date.now() + cooldownSeconds * 1000,
                });
              }
            }
          }

          const oldLevel = player.level;
          while (newExp >= newMaxExp) {
            newLevel += 1;
            newExp -= newMaxExp;
            newMaxExp = Math.floor(Math.pow(newLevel - 1, 1.5) * 150) + 100;
            newStatPoints += 5;

            // [REBALANCED] Skill point gain
            // Rule: 5 points every 10 levels starting at Lv.50 (50, 60, 70...)
            let skillPointGain = 0;
            if (newLevel >= 50 && newLevel % 10 === 0) {
              skillPointGain = 5;
            }
            newSkillPoints += skillPointGain;
          }

          if (newLevel > oldLevel) {
            const derived = calculateDerivedStats(
              player.stats,
              player.equipment,
              newLevel,
              prev.currentMapId,
              player.skills,
            );
            newHp = derived.maxHp;
          }
        }
      }

      // Filter out dead enemies
      const remainingEnemies = updatedEnemies.filter((e) => e.hp > 0);

      // Status update for EXP Display (제거됨)
      const gainedExp = newExp - player.exp;
      const expGainUpdate =
        gainedExp > 0
          ? {
              amount: gainedExp,
              timestamp: Date.now(),
            }
          : prev.lastExpGain;

      return {
        ...prev,
        player: {
          ...player,
          level: newLevel,
          exp: newExp,
          maxExp: newMaxExp,
          statPoints: newStatPoints,
          skillPoints: newSkillPoints,
          hp: newHp,
          gold: player.gold, // Updated by boss defeat logic
          defeatedBosses: player.defeatedBosses, // Updated by boss defeat logic
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
        lastBossKillTime: newLastBossKillTime,
        respawnQueue: newRespawnQueue,
        lastExpGain: expGainUpdate,
      };
    });
  }, []);

  const spawnEnemy = useCallback(() => {
    setState((prev) => {
      const currentMap = WORLD_DATABASE[prev.currentMapId];
      if (!currentMap.canSpawnMonsters) {
        return prev;
      }

      // [NEW] Process Respawn Queue (Fixed Spawns)
      const now = Date.now();
      const readyTasks = prev.respawnQueue.filter((t) => t.respawnTime <= now);
      const remainingQueue = prev.respawnQueue.filter(
        (t) => t.respawnTime > now,
      );

      let respawnedEnemies: Enemy[] = [];
      if (readyTasks.length > 0) {
        respawnedEnemies = readyTasks
          .map((task) => {
            const template = MONSTER_DATABASE[task.templateId];
            if (!template) return null;
            const scaledStats = getMonsterStatsByLevel(template, task.level);
            const maxHp = scaledStats?.maxHp || template.maxHp;
            const expValue = scaledStats?.expValue || template.expValue;
            const atk = scaledStats?.atk || template.atk;

            return {
              id: task.monsterId,
              type: template.id,
              position: task.position,
              velocity: { x: 0, y: 0 },
              size: { ...template.size },
              speed: template.speed,
              hp: maxHp,
              maxHp: maxHp,
              level: task.level,
              expValue: expValue,
              atk: atk,
              def: scaledStats?.def || template.def || 0,
              attackRange: template.attackRange || 0,
              attackCooldown: template.attackCooldown || 999999,
              lastAttackTime: 0,
              hitboxSize: template.hitboxSize || { x: 32, y: 32 },
              hitboxOffset: template.hitboxOffset || { x: 0, y: 0 },
              shield: scaledStats?.shield,
              glacierFallDamage: scaledStats?.glacierFallDamage,
              tailSwipeDamage: scaledStats?.tailSwipeDamage,
            } as Enemy;
          })
          .filter((e): e is Enemy => e !== null);
      }

      // If we spawned something from queue, update state immediately
      // Note: We respect the max enemies limit generally, but fixed spawns are special.
      // However, to be safe, let's just add them.
      if (respawnedEnemies.length > 0) {
        return {
          ...prev,
          enemies: [...prev.enemies, ...respawnedEnemies],
          respawnQueue: remainingQueue,
        };
      }

      // If nothing to respawn, check random spawn limits
      const maxMonsters = currentMap.maxMonsters || 10;
      if (prev.enemies.length >= maxMonsters) {
        return prev;
      }

      // Special Boss Spawn for Ice Cave
      if (prev.currentMapId === 'ice_cave') {
        const bossId = 'frost_dragon';
        const hasBoss = prev.enemies.some((e) => e.type === bossId);
        const now = Date.now();
        const cooldown = 30 * 1000; // 30 seconds (previously 5 minutes)

        if (hasBoss || now - prev.lastBossKillTime < cooldown) return prev;

        const template = MONSTER_DATABASE['frost_dragon'];
        if (!template) return prev;

        const spawnLevel = 30; // Frost Dragon scale level
        const scaledStats = getMonsterStatsByLevel(template, spawnLevel);

        const bossEnemy: Enemy = {
          id: `boss-frost-dragon-${Date.now()}`,
          type: template.id,
          position: {
            x: (MAP_WIDTH * TILE_SIZE) / 2,
            y: (MAP_HEIGHT * TILE_SIZE) / 2,
          },
          velocity: { x: 0, y: 0 },
          size: { ...template.size },
          speed: template.speed,
          hp: scaledStats?.maxHp || template.maxHp,
          maxHp: scaledStats?.maxHp || template.maxHp,
          level: spawnLevel,
          expValue: scaledStats?.expValue || template.expValue,
          atk: scaledStats?.atk || template.atk,
          def: scaledStats?.def || template.def || 0,
          attackRange: template.attackRange,
          attackCooldown: template.attackCooldown,
          lastAttackTime: 0,
          hitboxSize: { ...template.hitboxSize! },
          hitboxOffset: { ...template.hitboxOffset! },
          shield: scaledStats?.shield || template.shield, // Use scaled shield
          isEnraged: false,
          lastGlacierFallTime: 0,
          lastTailSwipeTime: 0,
          glacierFallDamage: scaledStats?.glacierFallDamage,
          tailSwipeDamage: scaledStats?.tailSwipeDamage,
        };

        return {
          ...prev,
          enemies: [bossEnemy],
        };
      }

      const templatesToSpawn: { id: string; level: number }[] = [];

      // Special Duo Spawning for Ice Maps (frozen_cliff only now)
      if (prev.currentMapId === 'frozen_cliff') {
        templatesToSpawn.push(
          { id: 'yeti', level: 20 },
          { id: 'ice_spirit', level: 20 },
        );
      } else if (prev.currentMapId === 'proxima_plains') {
        templatesToSpawn.push({ id: 'quantum_wraith', level: 50 });
      } else if (prev.currentMapId === 'proxima_ruins') {
        const type = Math.random() < 0.5 ? 'grav_drifter' : 'optical_sentinel';
        templatesToSpawn.push({ id: type, level: 60 });
      } else if (prev.currentMapId === 'proxima_void') {
        templatesToSpawn.push({ id: 'star_eater', level: 80 });
      } else if (prev.currentMapId === 'proxima_core') {
        // Special logic for Boss map - mostly boss, occasionally star_eater
        const hasBoss = prev.enemies.some((e) => e.type === 'luna_overseer');
        const now = Date.now();
        const cooldown = 60 * 1000; // 5 minutes

        if (!hasBoss && now - prev.lastBossKillTime > cooldown) {
          templatesToSpawn.push({ id: 'luna_overseer', level: 100 });
        } else if (hasBoss) {
          // Boss is present, spawn "summoned" version with no exp/drops
          templatesToSpawn.push({ id: 'summoned_star_eater', level: 80 });
        } else {
          // Boss is dead and on cooldown, normal ones might spawn?
          // Actually, let's keep the map empty or spawn regular ones
          templatesToSpawn.push({ id: 'star_eater', level: 80 });
        }
      } else if (prev.currentMapId === 'aetheria') {
        const type = Math.random() < 0.6 ? 'sky_wisp' : 'cloud_guardian';
        templatesToSpawn.push({ id: type, level: 120 });
      } else if (prev.currentMapId === 'sky_gardens') {
        templatesToSpawn.push({ id: 'sky_wisp', level: 110 });
      } else if (prev.currentMapId === 'wind_workshop') {
        const type = Math.random() < 0.7 ? 'sky_wisp' : 'storm_elemental';
        templatesToSpawn.push({ id: type, level: 130 });
      } else if (prev.currentMapId === 'mystic_grove') {
        const rand = Math.random();
        if (rand < 0.4) {
          templatesToSpawn.push({ id: 'cloud_guardian', level: 150 });
        } else if (rand < 0.8) {
          templatesToSpawn.push({ id: 'storm_elemental', level: 150 });
        } else {
          templatesToSpawn.push({ id: 'aether_drake', level: 160 });
        }
      } else if (prev.currentMapId === 'crystal_forge') {
        const type = Math.random() < 0.6 ? 'storm_elemental' : 'aether_drake';
        templatesToSpawn.push({ id: type, level: 180 });
      } else if (prev.currentMapId === 'crystal_caves') {
        const rand = Math.random();
        let type = 'cloud_guardian';
        if (rand > 0.6) type = 'aether_drake';
        else if (rand > 0.3) type = 'storm_elemental';
        templatesToSpawn.push({ id: type, level: 200 });
      } else if (prev.currentMapId === 'aetheria_upper') {
        const rand = Math.random();
        if (rand < 0.4) {
          templatesToSpawn.push({ id: 'storm_elemental', level: 250 });
        } else if (rand < 0.8) {
          templatesToSpawn.push({ id: 'aether_drake', level: 250 });
        } else {
          templatesToSpawn.push(
            { id: 'storm_elemental', level: 250 },
            { id: 'aether_drake', level: 250 },
          );
        }
      } else if (prev.currentMapId === 'star_observatory') {
        const type = Math.random() < 0.5 ? 'aether_drake' : 'storm_elemental';
        templatesToSpawn.push({ id: type, level: 300 });
      } else if (prev.currentMapId === 'celestial_sanctum') {
        const hasBoss = prev.enemies.some(
          (e) => e.type === 'celestial_architect',
        );
        const now = Date.now();
        const cooldown = 5 * 60 * 1000; // 5 minutes

        if (!hasBoss && now - prev.lastBossKillTime > cooldown) {
          templatesToSpawn.push({ id: 'celestial_architect', level: 400 });
        } else {
          const type = Math.random() < 0.5 ? 'storm_elemental' : 'aether_drake';
          templatesToSpawn.push({ id: type, level: 300 });
        }
      } else {
        // Fallback for Meadow, Forest, Cave, Burning Abyss
        let spawnMonsterId = 'slime';
        let spawnLevel = 1;
        if (prev.currentMapId === 'meadow') {
          spawnMonsterId = 'slime';
          spawnLevel = 1;
        } else if (prev.currentMapId === 'forest') {
          spawnMonsterId = 'goblin';
          spawnLevel = 5;
        } else if (prev.currentMapId === 'cave') {
          spawnMonsterId = 'bat';
          spawnLevel = 10;
        }
        templatesToSpawn.push({ id: spawnMonsterId, level: spawnLevel });
      }

      const newEnemies: Enemy[] = [];
      const basePos = {
        x: Math.random() * (MAP_WIDTH * TILE_SIZE - 200) + 100,
        y: Math.random() * (MAP_HEIGHT * TILE_SIZE - 200) + 100,
      };

      templatesToSpawn.forEach((spawn, index) => {
        const template = MONSTER_DATABASE[spawn.id];
        if (!template) return;

        // Offset positions slightly for duos
        const pos =
          templatesToSpawn.length > 1
            ? { x: basePos.x + index * 60 - 30, y: basePos.y + index * 60 - 30 }
            : basePos;

        const spawnLevel = spawn.level;
        const scaledStats = getMonsterStatsByLevel(template, spawnLevel);

        newEnemies.push({
          id: `enemy-${Date.now()}-${index}`,
          type: template.id,
          position: pos,
          velocity: { x: 0, y: 0 },
          size: { ...template.size },
          speed: template.speed,
          hp: scaledStats?.maxHp || template.maxHp,
          maxHp: scaledStats?.maxHp || template.maxHp,
          level: spawnLevel,
          expValue: scaledStats?.expValue || template.expValue,
          atk: scaledStats?.atk || template.atk,
          def: scaledStats?.def || template.def || 0,
          attackRange: template.attackRange,
          attackCooldown: template.attackCooldown,
          lastAttackTime: 0,
          hitboxSize: { ...template.hitboxSize! }, // Use defaults from DB
          hitboxOffset: { ...template.hitboxOffset! },
          shield: scaledStats?.shield,
          glacierFallDamage: scaledStats?.glacierFallDamage,
          tailSwipeDamage: scaledStats?.tailSwipeDamage,
          orbitalLaserDamage: scaledStats?.orbitalLaserDamage,
          energyPulseDamage: scaledStats?.energyPulseDamage,
        });
      });

      return {
        ...prev,
        enemies: [...prev.enemies, ...newEnemies],
        lastSpawnTime: Date.now(),
      };
    });
  }, []);

  const updateEnemies = useCallback((deltaTime: number) => {
    setState((prev) => {
      const { player, enemies } = prev;
      let newPlayerHp = player.hp;
      let newLastDamageTime = player.lastDamageTime;
      let newMoveSpeedMultiplier = player.moveSpeedMultiplier;
      let newSlowEndTime = player.slowEndTime;
      const now = Date.now();
      const newDamageNumbers = [...prev.damageNumbers];
      const newGlacierFalls = [...prev.glacierFalls];

      // Restore player speed if slow expired
      if (newMoveSpeedMultiplier < 1 && now > newSlowEndTime) {
        newMoveSpeedMultiplier = 1;
      }

      // Proxima Luna Low Gravity (+20% speed)
      // Proxima Luna Low Gravity effect is now handled in calculateDerivedStats

      // Process Glacier Fall impacts
      const remainingGlaciers = newGlacierFalls.filter((glacier) => {
        const elapsed = now - glacier.createdAt;
        if (elapsed >= glacier.impactTime) {
          const dx = player.position.x - glacier.position.x;
          const dy = player.position.y - glacier.position.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist <= glacier.radius) {
            newPlayerHp -= glacier.damage;
            newLastDamageTime = now;
            newDamageNumbers.push({
              id: `dmg-glacier-${Date.now()}-${Math.random()}`,
              value: glacier.damage,
              vx: (Math.random() - 0.5) * 3,
              position: {
                x: player.position.x + (Math.random() - 0.5) * 15,
                y: player.position.y - 10 - Math.random() * 10,
              },
              color: '#00aaff',
              createdAt: Date.now(),
            });
          }
          return false;
        }
        return true;
      });

      const newOrbitalLasers = [...prev.orbitalLasers];
      const remainingLasers = newOrbitalLasers.filter((laser) => {
        const elapsed = now - laser.createdAt;
        if (elapsed >= laser.impactTime) {
          const dx = player.position.x - laser.position.x;
          const dy = player.position.y - laser.position.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist <= laser.radius) {
            newPlayerHp -= laser.damage;
            newLastDamageTime = now;
            newDamageNumbers.push({
              id: `dmg-laser-${Date.now()}-${Math.random()}`,
              value: laser.damage,
              vx: (Math.random() - 0.5) * 3,
              position: {
                x: player.position.x + (Math.random() - 0.5) * 15,
                y: player.position.y - 10 - Math.random() * 10,
              },
              color: '#ffff00',
              createdAt: Date.now(),
            });
          }
          return false;
        }
        return true;
      });

      const updatedEnemies = enemies.map((enemy) => {
        const template = MONSTER_DATABASE[enemy.type];

        // Apply Enrage Mode speed multiplier
        let currentSpeed = enemy.speed;
        if (enemy.isEnraged && template?.enrageSpeedMultiplier) {
          currentSpeed *= template.enrageSpeedMultiplier;
        }

        const dx = player.position.x - enemy.position.x;
        const dy = player.position.y - enemy.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let vx = 0;
        let vy = 0;
        if (distance > 5 && !template?.isStationary) {
          vx = (dx / distance) * currentSpeed;
          vy = (dy / distance) * currentSpeed;
        }

        // Boss Glacier Fall ability
        let lastGlacierFall = enemy.lastGlacierFallTime ?? 0;
        if (
          template?.glacierFallCooldown &&
          now - lastGlacierFall >= template.glacierFallCooldown * 1000
        ) {
          // Spawn glacier near player
          const offsetX = (Math.random() - 0.5) * 150;
          const offsetY = (Math.random() - 0.5) * 150;
          remainingGlaciers.push({
            id: `glacier-${now}-${Math.random()}`,
            position: {
              x: player.position.x + offsetX,
              y: player.position.y + offsetY,
            },
            createdAt: now,
            damage: enemy.glacierFallDamage ?? template.glacierFallDamage ?? 30,
            radius: template.glacierFallRadius ?? 60,
            impactTime: template.glacierFallImpactTime ?? 1500, // Now configurable
          });
          lastGlacierFall = now;
        }

        // Boss Tail Swipe (New Melee Skill)
        let lastTailSwipe = enemy.lastTailSwipeTime ?? 0;
        let tailSwipeStart = enemy.tailSwipeStartTime ?? 0;

        if (template?.tailSwipeCooldown) {
          // 1. Check if we should start the pre-delay
          if (
            tailSwipeStart === 0 &&
            distance <= template.tailSwipeRange! &&
            now - lastTailSwipe >= template.tailSwipeCooldown * 1000
          ) {
            tailSwipeStart = now;
          }

          // 2. If pre-delay is active, check if it's time to impact
          if (tailSwipeStart > 0) {
            const preDelay = (template.tailSwipePreDelay || 0) * 1000;
            if (now - tailSwipeStart >= preDelay) {
              // Impact!
              // Re-check distance at impact time
              if (distance <= template.tailSwipeRange!) {
                const damage =
                  enemy.tailSwipeDamage ?? template.tailSwipeDamage ?? 200;
                newPlayerHp -= damage;
                newLastDamageTime = now;

                newDamageNumbers.push({
                  id: `dmg-tail-${now}-${Math.random()}`,
                  value: damage,
                  vx: (Math.random() - 0.5) * 4,
                  position: {
                    x: player.position.x,
                    y: player.position.y - 20,
                  },
                  color: '#ff8800', // Orange for tail swipe
                  createdAt: now,
                });
              }

              lastTailSwipe = now;
              tailSwipeStart = 0; // Reset for next time
            }
          }
        }

        // Lunacia Overseer Orbital Laser
        let lastLaser = enemy.lastOrbitalLaserTime ?? 0;
        let laserStart = enemy.orbitalLaserStartTime ?? 0;

        if (template?.orbitalLaserCooldown) {
          if (
            laserStart === 0 &&
            distance <= (template.orbitalLaserRadius || 0) * 4 &&
            now - lastLaser >= template.orbitalLaserCooldown * 1000
          ) {
            laserStart = now;
          }

          if (laserStart > 0) {
            const preDelay = (template.orbitalLaserPreDelay || 0) * 1000;
            if (now - laserStart >= preDelay) {
              remainingLasers.push({
                id: `laser-${now}-${Math.random()}`,
                position: { ...player.position },
                createdAt: now,
                damage:
                  enemy.orbitalLaserDamage ??
                  template.orbitalLaserDamage ??
                  400,
                radius: template.orbitalLaserRadius ?? 100,
                impactTime: 1000,
              });
              lastLaser = now;
              laserStart = 0;
            }
          }
        }

        // Lunacia Overseer Energy Pulse
        let lastPulse = enemy.lastEnergyPulseTime ?? 0;
        if (
          template?.energyPulseCooldown &&
          now - lastPulse >= template.energyPulseCooldown * 1000
        ) {
          if (distance <= template.energyPulseRadius!) {
            const damage =
              enemy.energyPulseDamage ?? template.energyPulseDamage ?? 300;
            newPlayerHp -= damage;
            newLastDamageTime = now;

            newDamageNumbers.push({
              id: `dmg-pulse-${now}-${Math.random()}`,
              value: damage,
              vx: (dx / distance) * 5,
              position: { x: player.position.x, y: player.position.y },
              color: '#00ffff',
              createdAt: now,
            });
          }
          lastPulse = now;
        }

        // Apply Enrage Mode attack multiplier
        let currentAtk = enemy.atk;
        if (enemy.isEnraged && template?.enrageAtkMultiplier) {
          currentAtk = Math.floor(enemy.atk * template.enrageAtkMultiplier);
        }

        // 몬스터 공격 로직 개선 (공격 전조 도입)
        let lastAttack = enemy.lastAttackTime;
        let attackStart = enemy.attackStartTime ?? 0;
        // Limit attackPreDelay to always be <= 50% of the attack cooldown
        const rawPreDelay = template?.attackPreDelay ?? 0.4;
        const preDelay =
          Math.min(rawPreDelay, enemy.attackCooldown * 0.5) * 1000;

        // 1. Attack Start (Not waiting, cooldown ready, and within range)
        if (
          attackStart === 0 &&
          distance <= enemy.attackRange &&
          now - lastAttack >= enemy.attackCooldown * 1000
        ) {
          attackStart = now;
        }

        // 2. Attack Execution (After preparation time has passed)
        if (attackStart > 0 && now - attackStart >= preDelay) {
          // Re-check distance at impact time - player might have moved away
          if (distance <= enemy.attackRange) {
            // Apply unified exponential damage formula (exp 1.1, min damage 5%)
            const rawDamage =
              Math.pow(
                Math.max(0, currentAtk - Math.pow(player.def, 1.1)),
                1.5,
              ) / 5;
            const minDamage = currentAtk * 0.05;
            const baseDamage = Math.max(minDamage, rawDamage);

            const variance = 0.9 + Math.random() * 0.2;
            const damage = Math.floor(baseDamage * variance);

            newPlayerHp -= damage;

            // Apply Debuff (Slow)
            if (template?.debuffType === 'slow') {
              newMoveSpeedMultiplier = 0.6;
              newSlowEndTime = now + 2000; // 2 seconds slow
            }

            // Add damage number for player hit
            newDamageNumbers.push({
              id: `dmg-p-${Date.now()}-${Math.random()}`,
              value: damage,
              vx: (Math.random() - 0.5) * 3,
              position: {
                x: player.position.x + (Math.random() - 0.5) * 15,
                y: player.position.y - 10 - Math.random() * 10,
              },
              color: enemy.isEnraged ? '#ff0000' : '#ff4b2b',
              createdAt: Date.now(),
            });

            newLastDamageTime = now;
          }

          // Always reset attack state after attempt
          lastAttack = now;
          attackStart = 0;
        }

        return {
          ...enemy,
          position: {
            x: enemy.position.x + vx * deltaTime,
            y: enemy.position.y + vy * deltaTime,
          },
          lastAttackTime: lastAttack,
          attackStartTime: attackStart === 0 ? undefined : attackStart,
          lastGlacierFallTime: lastGlacierFall,
          lastTailSwipeTime: lastTailSwipe,
          tailSwipeStartTime: tailSwipeStart === 0 ? undefined : tailSwipeStart,
          lastOrbitalLaserTime: lastLaser,
          orbitalLaserStartTime: laserStart === 0 ? undefined : laserStart,
          lastEnergyPulseTime: lastPulse,
        };
      });

      if (newPlayerHp <= 0) {
        return {
          ...prev,
          currentMapId: 'town',
          enemies: [],
          droppedItems: [],
          glacierFalls: [],
          player: {
            ...player,
            hp: player.maxHp,
            position: { x: 400, y: 300 },
            lastDamageTime: 0,
            moveSpeedMultiplier: 1,
            slowEndTime: 0,
          },
        };
      }

      return {
        ...prev,
        player: {
          ...player,
          hp: Math.max(0, newPlayerHp),
          lastDamageTime: newLastDamageTime,
          moveSpeedMultiplier: newMoveSpeedMultiplier,
          slowEndTime: newSlowEndTime,
        },
        enemies: updatedEnemies,
        damageNumbers: newDamageNumbers,
        glacierFalls: remainingGlaciers,
        orbitalLasers: remainingLasers,
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

        const derived = calculateDerivedStats(
          newStats,
          prev.player.equipment,
          prev.player.level,
          prev.currentMapId,
          prev.player.skills,
        );
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

  const upgradeSkill = useCallback((skillId: keyof PlayerSkills) => {
    setState((prev) => {
      const currentLevel = prev.player.skills[skillId];
      const skillDef = SKILL_DEFINITIONS.find((def) => def.id === skillId);

      // Validation
      if (!skillDef) return prev;
      if (currentLevel >= skillDef.maxLevel) return prev; // Already max level
      if (prev.player.skillPoints < 1) return prev; // No points available

      const newSkills = { ...prev.player.skills };
      newSkills[skillId] = currentLevel + 1;

      return {
        ...prev,
        player: {
          ...prev.player,
          skills: newSkills,
          skillPoints: prev.player.skillPoints - 1,
        },
      };
    });
  }, []);

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
      let newHelmet = player.equipment.helmet;
      let newAcquiredEquipment = [...player.acquiredEquipment];

      const originalIndex = itemIndex;

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
        // [FIX] Return old weapon to inventory if exists
        if (newWeapon) {
          newInventory.push({
            itemId: newWeapon.id,
            quantity: 1,
            enhanceLevel: newWeapon.enhanceLevel || 0,
          });
        }

        newWeapon = {
          ...(itemData as Weapon),
          enhanceLevel: invItem.enhanceLevel || 0,
        };

        // [NEW] Track acquired equipment
        if (!newAcquiredEquipment.includes(itemData.id)) {
          newAcquiredEquipment.push(itemData.id);
        }

        // Remove equipment item from inventory
        newInventory.splice(originalIndex, 1);
      } else if (itemData.type === 'Armor') {
        // [FIX] Return old armor to inventory if exists
        if (newArmor) {
          newInventory.push({
            itemId: newArmor.id,
            quantity: 1,
            enhanceLevel: newArmor.enhanceLevel || 0,
          });
        }

        newArmor = {
          ...(itemData as Armor),
          enhanceLevel: invItem.enhanceLevel || 0,
        };

        // [NEW] Track acquired equipment
        if (!newAcquiredEquipment.includes(itemData.id)) {
          newAcquiredEquipment.push(itemData.id);
        }

        // Remove equipment item from inventory
        newInventory.splice(originalIndex, 1);
      } else if (itemData.type === 'Helmet') {
        // [FIX] Return old helmet to inventory if exists
        if (newHelmet) {
          newInventory.push({
            itemId: newHelmet.id,
            quantity: 1,
            enhanceLevel: newHelmet.enhanceLevel || 0,
          });
        }

        newHelmet = {
          ...(itemData as Helmet),
          enhanceLevel: invItem.enhanceLevel || 0,
        };

        // [NEW] Track acquired equipment
        if (!newAcquiredEquipment.includes(itemData.id)) {
          newAcquiredEquipment.push(itemData.id);
        }

        // Remove equipment item from inventory
        newInventory.splice(originalIndex, 1);
      }

      const derived = calculateDerivedStats(
        player.stats,
        {
          weapon: newWeapon,
          armor: newArmor,
          helmet: newHelmet,
        },
        player.level,
        prev.currentMapId,
        player.skills,
      );

      return {
        ...prev,
        player: {
          ...player,
          hp: Math.min(newHp, derived.maxHp),
          inventory: newInventory,
          acquiredEquipment: newAcquiredEquipment,
          equipment: {
            ...player.equipment,
            weapon: newWeapon,
            armor: newArmor,
            helmet: newHelmet,
          },
          ...derived,
        },
      };
    });
  }, []);

  const unEquip = useCallback((type: 'Weapon' | 'Armor' | 'Helmet') => {
    setState((prev) => {
      const { player } = prev;
      const equippedItem =
        type === 'Weapon'
          ? player.equipment.weapon
          : type === 'Armor'
            ? player.equipment.armor
            : player.equipment.helmet;

      if (!equippedItem) return prev;

      const newInventory = [...player.inventory];
      newInventory.push({
        itemId: equippedItem.id,
        quantity: 1,
        enhanceLevel: equippedItem.enhanceLevel || 0,
      });

      const newEquipment = {
        ...player.equipment,
        [type.toLowerCase()]: null,
      };

      const derived = calculateDerivedStats(
        player.stats,
        newEquipment,
        player.level,
        prev.currentMapId,
        player.skills,
      );

      return {
        ...prev,
        player: {
          ...player,
          inventory: newInventory,
          equipment: newEquipment,
          ...derived,
          hp: Math.min(player.hp, derived.maxHp),
        },
      };
    });
  }, []);

  const resetStats = useCallback(() => {
    setState((prev) => {
      const { player } = prev;
      const totalPoints = (player.level - 1) * 5;
      const newStats = { str: 1, dex: 1, int: 1, vit: 1, def: 1 };
      const derived = calculateDerivedStats(
        newStats,
        player.equipment,
        player.level,
        prev.currentMapId,
        player.skills,
      );

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
    saveNeededRef.current = true;
  }, [calculateDerivedStats, setState]);

  const resetSkills = useCallback(() => {
    setState((prev) => {
      const { player } = prev;
      const currentLevel = player.level;

      // Calculate total points based on current level (same logic as loadGame)
      const totalEarnedPoints =
        currentLevel < 50 ? 0 : Math.floor(currentLevel / 10 - 4) * 5;

      const derived = calculateDerivedStats(
        player.stats,
        player.equipment,
        currentLevel,
        prev.currentMapId,
        INITIAL_SKILLS,
      );

      return {
        ...prev,
        player: {
          ...player,
          skills: { ...INITIAL_SKILLS },
          skillPoints: totalEarnedPoints,
          ...derived,
          // Update HP/MP if max values changed
          hp: Math.min(player.hp, derived.maxHp),
          mp: Math.min(player.mp, derived.maxMp),
        },
      };
    });
    saveNeededRef.current = true;
  }, [calculateDerivedStats, setState]);

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

      // Return Scroll: Transport to town, reset monsters/drops after use
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

      // [NEW] Guard: Prevent using potions if HP/MP is already full
      const isHpPotion = !!(itemData.hpRestore || itemData.hpRestorePercent);
      const isMpPotion = !!(itemData.mpRestore || itemData.mpRestorePercent);

      if (isHpPotion && !isMpPotion && player.hp >= player.maxHp) {
        return prev;
      }
      if (isMpPotion && !isHpPotion && player.mp >= player.maxMp) {
        return prev;
      }
      if (
        isHpPotion &&
        isMpPotion &&
        player.hp >= player.maxHp &&
        player.mp >= player.maxMp
      ) {
        return prev;
      }

      if (itemData.hpRestore) {
        newHp = Math.min(player.maxHp, player.hp + itemData.hpRestore);
      }
      if (itemData.hpRestorePercent) {
        newHp = Math.min(
          player.maxHp,
          player.hp + Math.floor(player.maxHp * itemData.hpRestorePercent),
        );
      }
      if (itemData.mpRestore) {
        newMp = Math.min(player.maxMp, player.mp + itemData.mpRestore);
      }
      if (itemData.mpRestorePercent) {
        newMp = Math.min(
          player.maxMp,
          player.mp + Math.floor(player.maxMp * itemData.mpRestorePercent),
        );
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

      const derived = calculateDerivedStats(
        player.stats,
        player.equipment,
        player.level,
        prev.currentMapId,
        player.skills,
      );

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

  const unassignQuickBarItem = useCallback(
    (slotIndex: number) => {
      setState((prev) => {
        const newQuickBar = [...prev.quickBar];
        newQuickBar[slotIndex] = null;
        return { ...prev, quickBar: newQuickBar };
      });
      saveNeededRef.current = true;
    },
    [setState],
  );

  const buyItem = useCallback(
    (itemId: string) => {
      setState((prev) => {
        const itemData = ITEM_DATABASE[itemId];
        if (!itemData || prev.player.gold < itemData.price) return prev;

        // [NEW] Prevent buying equipment already owned
        if (
          (itemData.type === 'Weapon' ||
            itemData.type === 'Armor' ||
            itemData.type === 'Helmet') &&
          prev.player.acquiredEquipment.includes(itemId)
        ) {
          return prev; // Already owned, cannot buy
        }

        let newInventory = [...prev.player.inventory];
        let newAcquiredEquipment = [...prev.player.acquiredEquipment];

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
          // [NEW] Equipment (non-stackable) - add to inventory and track
          newInventory.push({ itemId, quantity: 1, enhanceLevel: 0 });
          newAcquiredEquipment.push(itemId);
        }

        return {
          ...prev,
          player: {
            ...prev.player,
            gold: prev.player.gold - itemData.price,
            inventory: newInventory,
            acquiredEquipment: newAcquiredEquipment,
          },
        };
      });
      saveNeededRef.current = true;
    },
    [ITEM_DATABASE, setState],
  );

  const sellItem = useCallback(
    (index: number, sellAll: boolean = false) => {
      setState((prev) => {
        const invItem = prev.player.inventory[index];
        if (!invItem) return prev;
        const itemData = ITEM_DATABASE[invItem.itemId];
        if (!itemData) return prev;

        const quantityToSell = sellAll ? invItem.quantity : 1;
        const totalSellPrice =
          Math.floor(itemData.price * 0.5) * quantityToSell;
        let newInventory = [...prev.player.inventory];

        if (!sellAll && invItem.quantity > 1) {
          newInventory[index] = {
            ...invItem,
            quantity: invItem.quantity - 1,
          };
        } else {
          newInventory.splice(index, 1);
        }

        return {
          ...prev,
          player: {
            ...prev.player,
            gold: prev.player.gold + totalSellPrice,
            inventory: newInventory,
          },
        };
      });
      saveNeededRef.current = true;
    },
    [ITEM_DATABASE, setState],
  );

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

      const player = prev.player;

      // [NEW] HP Regeneration from skill (+1 HP/s per level)
      const hpRegenRate = player.skills.hpRegen * 1;
      let newHp = player.hp;

      if (hpRegenRate > 0 && player.hp < player.maxHp) {
        newHp = Math.min(player.hp + hpRegenRate * dt, player.maxHp);
      }

      return {
        ...prev,
        player: {
          ...player,
          hp: newHp,
        },
        lastUpdate: now,
      };
    });
  }, []);

  const enhanceEquipment = useCallback(
    (inventoryIndex: number) => {
      setState((prev) => {
        const { player } = prev;
        let invItem;
        let isSpecialEquippedIdx = false;

        if (inventoryIndex === -1) {
          invItem = player.equipment.weapon
            ? {
                itemId: player.equipment.weapon.id,
                quantity: 1,
                enhanceLevel: player.equipment.weapon.enhanceLevel || 0,
              }
            : null;
          isSpecialEquippedIdx = true;
        } else if (inventoryIndex === -2) {
          invItem = player.equipment.armor
            ? {
                itemId: player.equipment.armor.id,
                quantity: 1,
                enhanceLevel: player.equipment.armor.enhanceLevel || 0,
              }
            : null;
          isSpecialEquippedIdx = true;
        } else if (inventoryIndex === -3) {
          invItem = player.equipment.helmet
            ? {
                itemId: player.equipment.helmet.id,
                quantity: 1,
                enhanceLevel: player.equipment.helmet.enhanceLevel || 0,
              }
            : null;
          isSpecialEquippedIdx = true;
        } else {
          invItem = player.inventory[inventoryIndex];
        }

        if (!invItem) return prev;

        const itemData = ITEM_DATABASE[invItem.itemId];
        if (
          !itemData ||
          (itemData.type !== 'Weapon' &&
            itemData.type !== 'Armor' &&
            itemData.type !== 'Helmet')
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

        const successChance = Math.max(0.3, 1 - currentLevel * 0.1);
        const isSuccess = Math.random() < successChance;
        let nextLevel = currentLevel;

        if (isSuccess) {
          nextLevel = currentLevel + 1;
        } else {
          if (currentLevel > 3) {
            nextLevel = Math.max(0, currentLevel - 1);
          }
        }

        // If it was a normal inventory item, update it in newInventory
        if (!isSpecialEquippedIdx) {
          // Find the index again because splice might have shifted items
          const targetIdxAfterSplice = newInventory.findIndex(
            (inv) =>
              inv.itemId === invItem.itemId &&
              (inv.enhanceLevel || 0) === currentLevel,
          );
          if (targetIdxAfterSplice !== -1) {
            newInventory[targetIdxAfterSplice] = {
              ...newInventory[targetIdxAfterSplice],
              enhanceLevel: nextLevel,
            };
          }
        }

        // Update equipment if the enhanced item was equipped
        let newWeapon = player.equipment.weapon;
        let newArmor = player.equipment.armor;
        let newHelmet = player.equipment.helmet;

        if (
          inventoryIndex === -1 ||
          (newWeapon &&
            invItem.itemId === newWeapon.id &&
            (invItem.enhanceLevel || 0) === (newWeapon.enhanceLevel || 0))
        ) {
          newWeapon = newWeapon
            ? { ...newWeapon, enhanceLevel: nextLevel }
            : null;
        }
        if (
          inventoryIndex === -2 ||
          (newArmor &&
            invItem.itemId === newArmor.id &&
            (invItem.enhanceLevel || 0) === (newArmor.enhanceLevel || 0))
        ) {
          newArmor = newArmor ? { ...newArmor, enhanceLevel: nextLevel } : null;
        }
        if (
          inventoryIndex === -3 ||
          (newHelmet &&
            invItem.itemId === newHelmet.id &&
            (invItem.enhanceLevel || 0) === (newHelmet.enhanceLevel || 0))
        ) {
          newHelmet = newHelmet
            ? { ...newHelmet, enhanceLevel: nextLevel }
            : null;
        }

        const derived = calculateDerivedStats(
          player.stats,
          {
            weapon: newWeapon,
            armor: newArmor,
            helmet: newHelmet,
          },
          player.level,
          prev.currentMapId,
          player.skills,
        );

        return {
          ...prev,
          player: {
            ...player,
            gold: player.gold - cost,
            inventory: newInventory,
            equipment: {
              weapon: newWeapon,
              armor: newArmor,
              helmet: newHelmet,
            },
            ...derived,
          },
        };
      });
      saveNeededRef.current = true;
    },
    [ITEM_DATABASE, calculateDerivedStats, setState],
  );

  // Moved up to be accessible by handleInteraction
  const handleOpenDialog = useCallback((npc: any) => {
    console.log('useGameState: Interact with', npc.name, npc.type);

    let text = '......';
    let action = undefined;
    let actionLabel = undefined;

    let messages: string[] | undefined = undefined;
    let messageIndex: number | undefined = undefined;

    if (npc.dialogues && npc.dialogues.length > 0) {
      if (npc.dialogueMode === 'sequential') {
        messages = npc.dialogues;
        messageIndex = 0;
        if (messages && messages.length > 0) {
          text = messages[0];
        }
      } else {
        // Default random
        text = npc.dialogues[Math.floor(Math.random() * npc.dialogues.length)];
      }
    } else if (npc.type === 'Merchant') {
      text = 'Welcome! I have many good items for you.';
      action = 'Shop';
      actionLabel = 'Open Shop';
    } else if (npc.type === 'Blacksmith') {
      text = 'Need some equipment enhancement? I can hammer it out for you!';
      action = 'Enhance';
      actionLabel = 'Enhance';
    } else if (npc.type === 'Guide') {
      text = 'Greetings, explorer. Welcome to Stellar Station.';
    } else if (npc.type === 'Spaceship') {
      text = 'System active. Please set your destination.';
      action = 'PlanetSelect';
      actionLabel = 'Launch';
    }

    setState((prev) => ({
      ...prev,
      activeUI: 'Dialog',
      currentDialog: {
        speaker: npc.name,
        text,
        action,
        actionLabel,
        messages,
        messageIndex,
      },
    }));
  }, []);

  const handleNextDialog = useCallback(() => {
    setState((prev) => {
      const { currentDialog } = prev;
      if (
        !currentDialog ||
        !currentDialog.messages ||
        currentDialog.messageIndex === undefined
      ) {
        // If not sequential or error, close it
        return {
          ...prev,
          activeUI: 'None',
          currentDialog: null,
        };
      }

      const nextIndex = currentDialog.messageIndex + 1;
      if (nextIndex < currentDialog.messages.length) {
        return {
          ...prev,
          currentDialog: {
            ...currentDialog,
            messageIndex: nextIndex,
            text: currentDialog.messages[nextIndex],
          },
        };
      } else {
        // End of dialog
        return {
          ...prev,
          activeUI: 'None',
          currentDialog: null,
        };
      }
    });
  }, []);

  const handleCloseDialog = useCallback(() => {
    setState((prev) => ({
      ...prev,
      activeUI: 'None',
      currentDialog: null,
    }));
  }, []);

  const handleInteraction = useCallback(() => {
    const currentState = stateRef.current;
    const currentMap = WORLD_DATABASE[currentState.currentMapId];
    if (!currentMap) return;

    const nearestNPC = currentMap.npcs.find((npc) => {
      const dx = npc.position.x - currentState.player.position.x;
      const dy = npc.position.y - currentState.player.position.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      return dist < 100;
    });

    if (nearestNPC) {
      handleOpenDialog(nearestNPC);
    }
  }, [handleOpenDialog]);

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

  useEffect(() => {
    // Auto-load on application start
    loadGame(true);
  }, [loadGame]);
  useEffect(() => {
    // Auto-save game every 15 seconds
    const saveInterval = setInterval(() => {
      saveGame(true);
    }, 15000);

    return () => clearInterval(saveInterval);
  }, [saveGame]);

  const resetGame = useCallback(() => {
    if (window.confirm('Are you sure you want to reset all data?')) {
      localStorage.removeItem('void_walker_save');
      setState(INITIAL_STATE);
      alert('Data has been reset.');
    }
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
    upgradeSkill,
    useItem,
    unEquip,
    resetStats,
    resetSkills,
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
    handleOpenDialog,
    handleCloseDialog,
    handleNextDialog,
    saveGame,
    loadGame,
    resetGame,
    addToast,
  };
};
