import { Scene } from 'phaser';
import type { GameState } from '../../types/game';
import { TILE_SIZE, MAP_WIDTH, MAP_HEIGHT } from '../data/townMap';
import { getMapTileData } from '../data/worldMaps';
import { WORLD_DATABASE } from '../../types/world';
import { MONSTER_DATABASE } from '../../types/monster';
import { levelToTier, getDifficultyColor } from '../../utils/levelUtils';
import { ITEM_DATABASE } from '../../types/item';

export class MainScene extends Scene {
  private player!: Phaser.GameObjects.Sprite;
  private enemies: Map<
    string,
    Phaser.GameObjects.Sprite | Phaser.GameObjects.Rectangle
  > = new Map();
  private enemyHpBars: Map<
    string,
    {
      bg: Phaser.GameObjects.Rectangle;
      fg: Phaser.GameObjects.Rectangle;
      shield?: Phaser.GameObjects.Rectangle;
    }
  > = new Map();
  private enemyLevelTexts: Map<string, Phaser.GameObjects.Text> = new Map();
  private enemyHpMap: Map<string, number> = new Map();
  private enemyLastTailSwipeMap: Map<string, number> = new Map();
  private enemyLastTailSwipeStartMap: Map<string, number> = new Map();
  private enemyLastGlacierFallMap: Map<string, number> = new Map();
  private enemyLastOrbitalLaserStartMap: Map<string, number> = new Map();
  private enemyLastEnergyPulseMap: Map<string, number> = new Map();
  private bossUiContainer: Phaser.GameObjects.Container | null = null;
  private bossHpBar: Phaser.GameObjects.Rectangle | null = null;
  private bossShieldBar: Phaser.GameObjects.Rectangle | null = null;
  private bossNameText: Phaser.GameObjects.Text | null = null;
  private bossHpText: Phaser.GameObjects.Text | null = null;
  private attackRangeCircle!: Phaser.GameObjects.Arc;
  private playerHp: number = 0;
  private portals: Map<string, Phaser.GameObjects.Container> = new Map();
  private droppedItems: Map<string, Phaser.GameObjects.Container> = new Map();
  private npcs: Map<string, Phaser.GameObjects.Container> = new Map();
  private currentMapId: string = 'town';
  private hasSyncedSpawnFromState = false;
  private lastPortalTimeMs = -Infinity;
  private lastPlayerSyncMs = -Infinity;
  private lastNpcCheckMs = 0; // Added NPC check cooldown
  private tilemap?: Phaser.Tilemaps.Tilemap;
  private mapLayer?: Phaser.Tilemaps.TilemapLayer;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
  };
  private spawnedDamageIds: Set<string> = new Set();
  private rangeGraphics!: Phaser.GameObjects.Graphics;
  private enemyHitboxGraphics!: Phaser.GameObjects.Graphics;
  private currentSettings = {
    showRange: false,
    showHitbox: false,
    cooldownVisualMode: 0,
  };
  private currentWeapon: { range: number; swingArc: number } | null = null;
  private currentEnemies: any[] = [];
  private playerAttackStatus = {
    isAttacking: false,
    progress: 0,
  };
  private cooldownGraphics!: Phaser.GameObjects.Graphics;
  private isPlayerFlashing = false;
  private activeUI = 'None';
  private isNearSpaceship = false;
  private currentPlayerStyle = -1; // Added to track style changes
  private playerMoveSpeedMultiplier = 1;
  private interactHint!: Phaser.GameObjects.Text;
  private glacierFallGraphics!: Phaser.GameObjects.Graphics;
  private orbitalLaserGraphics!: Phaser.GameObjects.Graphics;
  private mapTintOverlay!: Phaser.GameObjects.Rectangle;
  private currentGlacierFalls: any[] = [];
  private currentOrbitalLasers: any[] = [];
  private glacierSpikes: Map<string, Phaser.GameObjects.Sprite> = new Map();
  private activeOrbitalLaserIds: Set<string> = new Set();
  private bossAuraEmitters: Map<
    string,
    Phaser.GameObjects.Particles.ParticleEmitter
  > = new Map();

  constructor() {
    super('MainScene');
  }

  preload() {
    for (const monster of Object.values(MONSTER_DATABASE)) {
      if (!monster.spriteUrl) continue;
      this.load.image(`monster-${monster.id}`, monster.spriteUrl);
    }
    this.load.image('spaceship', 'assets/Npc/spaceship.png');
    this.load.image('npc-merchant', 'assets/Npc/Merchant.png');
    this.load.image('npc-blacksmith', 'assets/Npc/Blacksmith.png');

    // Preload Custom NPC Sprites
    for (const map of Object.values(WORLD_DATABASE)) {
      for (const npc of map.npcs) {
        if (npc.spriteUrl) {
          this.load.image(`npc-${npc.id}`, npc.spriteUrl);
        }
      }
    }

    for (const item of Object.values(ITEM_DATABASE)) {
      if (item.icon) {
        this.load.image(`item-${item.id}`, item.icon);
      }
    }

    // Player Assets (Fixed to Chibi Style)
    this.load.image('player-main', 'assets/player/player_style_4.png');
    this.load.image('player-up', 'assets/player/player_style_4_up.png');
    this.load.image('player-side', 'assets/player/player_style_4_side.png');

    // Walking Frames (Consistency matching Style 4)
    this.load.image('player-down-walk-1', 'assets/player/player_walk_down.png');
    this.load.image('player-up-walk-1', 'assets/player/player_walk_up.png');
    this.load.image('player-side-walk-1', 'assets/player/player_walk_side.png');
  }

  create() {
    console.log('MainScene: create()');

    // 0. Initialize UI & Overlays (Early init to prevent null errors in loadMap)
    // Map Tint Overlay
    this.mapTintOverlay = this.add.rectangle(0, 0, 1280, 720, 0xffaa00, 0);
    this.mapTintOverlay.setOrigin(0);
    this.mapTintOverlay.setScrollFactor(0);
    this.mapTintOverlay.setDepth(200); // Topmost
    this.mapTintOverlay.setBlendMode(Phaser.BlendModes.ADD);

    // ... (rest of create)

    // 1. Generate Textures Programmatically (Map tileset only)
    // 2. Map (tileset texture)
    const stitcher = this.make.graphics({ x: 0, y: 0 });

    const drawTile = (
      xOffset: number,
      base: number,
      light: number,
      dark: number,
      type?: 'tree' | 'flower',
    ) => {
      // Base fill
      stitcher.fillStyle(base);
      stitcher.fillRect(xOffset, 0, TILE_SIZE, TILE_SIZE);

      // Soft Noise or Details
      if (type === 'tree') {
        // Draw a big soft circle for tree top
        stitcher.fillStyle(dark); // Darker Green for depth
        stitcher.fillCircle(
          xOffset + TILE_SIZE / 2,
          TILE_SIZE / 2,
          TILE_SIZE * 0.4,
        );
        stitcher.fillStyle(light); // Lighter Green for highlight
        stitcher.fillCircle(
          xOffset + TILE_SIZE / 2 - 2,
          TILE_SIZE / 2 - 2,
          TILE_SIZE * 0.3,
        );
      } else if (type === 'flower') {
        // Draw random colored dots
        const colors = [0xff69b4, 0xffff00, 0xffffff]; // Pink, Yellow, White
        for (let i = 0; i < 4; i++) {
          const cx = xOffset + Math.random() * (TILE_SIZE - 4) + 2;
          const cy = Math.random() * (TILE_SIZE - 4) + 2;
          stitcher.fillStyle(colors[Math.floor(Math.random() * colors.length)]);
          stitcher.fillRect(cx, cy, 2, 2);
        }
      } else {
        // Standard Noise
        for (let y = 0; y < TILE_SIZE; y++) {
          for (let x = 0; x < TILE_SIZE; x++) {
            const rand = Math.random();
            if (rand < 0.1) {
              stitcher.fillStyle(light);
              stitcher.fillRect(xOffset + x, y, 1, 1);
            } else if (rand > 0.9) {
              stitcher.fillStyle(dark);
              stitcher.fillRect(xOffset + x, y, 1, 1);
            }
          }
        }
      }
    };

    // New Pastel Palette (Soft & Round feel)
    // 0: Grass (Soft Green)
    drawTile(0, 0x7cbd6c, 0x8fd17e, 0x6ba85c);

    // 1: Path (Soft Earth)
    drawTile(TILE_SIZE, 0xe0cca3, 0xebdcb5, 0xd1bc94);

    // 2: Water (Soft Blue)
    drawTile(TILE_SIZE * 2, 0x67b0cf, 0x7dc3e0, 0x579ebd);

    // 3: Wall (Soft Stone)
    drawTile(TILE_SIZE * 3, 0x9ba4ae, 0xb0b9c2, 0x89919b);

    // 4: Floor (Soft Wood)
    drawTile(TILE_SIZE * 4, 0xcbb08a, 0xdbc29e, 0xba9e7a);

    // 5: Tree (Forest Green) - Base: Grass, Light: LightGreen, Dark: DarkForest
    drawTile(TILE_SIZE * 5, 0x7cbd6c, 0x8fd17e, 0x2d5a27, 'tree');

    // 6: Flower (Garden) - Base: Grass
    drawTile(TILE_SIZE * 6, 0x7cbd6c, 0, 0, 'flower'); // Light/Dark ignored for flowers

    // 7. Deep Space
    drawTile(TILE_SIZE * 7, 0x010103, 0x050510, 0x000000);
    for (let i = 0; i < 2; i++) {
      stitcher.fillStyle(0x606080);
      stitcher.fillRect(
        TILE_SIZE * 7 + Math.random() * TILE_SIZE,
        Math.random() * TILE_SIZE,
        1,
        1,
      );
    }

    // 8: Nebula (Soft Space Cloud)
    drawTile(TILE_SIZE * 8, 0x200040, 0x400080, 0x100020);

    // 9: Star Cluster (Dense Stars)
    drawTile(TILE_SIZE * 9, 0x000020, 0x8888ff, 0x000000);
    for (let i = 0; i < 8; i++) {
      stitcher.fillStyle(0xffffff);
      stitcher.fillRect(
        TILE_SIZE * 9 + Math.random() * TILE_SIZE,
        Math.random() * TILE_SIZE,
        1,
        1,
      );
    }

    // 10: Ice Floor (Light Cyan/Whiteish)
    drawTile(TILE_SIZE * 10, 0xe0f7fa, 0xffffff, 0xb2ebf2);

    // 11: Ice Wall (Crystalline Blue)
    drawTile(TILE_SIZE * 11, 0x4dd0e1, 0x80deea, 0x00acc1);

    // 12: Snow (Pure White)
    drawTile(TILE_SIZE * 12, 0xf5fafa, 0xffffff, 0xe0eeee);

    // 13: Frozen Tree (White/Blue)
    drawTile(TILE_SIZE * 13, 0xe0f7fa, 0xffffff, 0x81d4fa, 'tree');

    stitcher.generateTexture('tileset-texture', TILE_SIZE * 14, TILE_SIZE);
    stitcher.destroy();

    // 3. Portal Texture (Magic Light)
    const pLight = this.make.graphics({ x: 0, y: 0 });
    // Draw center
    pLight.fillStyle(0xffffff, 1);
    pLight.fillCircle(16, 16, 4);
    // Draw outer glow
    for (let i = 0; i < 4; i++) {
      pLight.fillStyle(0xffffff, 0.2);
      pLight.fillCircle(16, 16, 4 + i * 4);
    }
    pLight.generateTexture('portal-light', 32, 32);
    pLight.destroy();

    // 4. Ice Spike Texture (for Glacier Fall)
    const iceSpike = this.make.graphics({ x: 0, y: 0 });
    iceSpike.fillStyle(0xffffff, 1);
    // Draw a sharp triangular spike
    iceSpike.fillTriangle(16, 0, 0, 64, 32, 64);
    // Add some shading/depth
    iceSpike.fillStyle(0x00aaff, 0.5);
    iceSpike.fillTriangle(16, 0, 16, 64, 32, 64);
    iceSpike.lineStyle(2, 0x88e8ff, 1);
    iceSpike.strokeTriangle(16, 0, 0, 64, 32, 64);
    iceSpike.generateTexture('ice-spike', 32, 64);
    iceSpike.destroy();

    // 5. Frost Particle Texture
    const frostPart = this.make.graphics({ x: 0, y: 0 });
    frostPart.fillStyle(0xffffff, 1);
    frostPart.fillCircle(4, 4, 4);
    frostPart.generateTexture('frost-particle', 8, 8);
    frostPart.destroy();

    this.loadMap('town');

    // 3. Create Player
    this.player = this.add.sprite(400, 300, 'player-main');
    this.player.setDepth(10);
    this.player.setData('direction', 0);

    // Attack range circle is hidden (invisible) but still used for calculation
    this.attackRangeCircle = this.add.circle(
      400,
      300,
      60, // Default range for initialization
      0x000000,
      0,
    );
    this.attackRangeCircle.setVisible(false);

    // Range visualization graphics
    this.rangeGraphics = this.add.graphics();
    this.rangeGraphics.setDepth(4); // Behind entities but above map

    this.enemyHitboxGraphics = this.add.graphics();
    this.enemyHitboxGraphics.setDepth(4);

    this.cooldownGraphics = this.add.graphics();
    this.cooldownGraphics.setDepth(9); // Just below player (10)

    this.glacierFallGraphics = this.add.graphics();
    this.glacierFallGraphics.setDepth(6); // Above portals, below NPCs

    this.orbitalLaserGraphics = this.add.graphics();
    this.orbitalLaserGraphics.setDepth(15); // High depth for laser beams

    // 4. Camera Follow
    // Set bounds so camera doesn't show too much empty black space if map is small
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setZoom(1.0); // Reset zoom to 1 to see more context if needed, or keep 1.5

    // 4.5. Interaction Hint
    this.interactHint = this.add
      .text(0, 0, 'Interact [F]', {
        fontSize: '16px',
        color: '#ffffff',
        backgroundColor: '#00000088',
        padding: { x: 8, y: 4 },
      })
      .setDepth(20)
      .setOrigin(0.5)
      .setVisible(false);

    // 4.6. Location Notice UI (Initialized early)
    // 4.7. Map Tint Overlay (Initialized early)

    // 5. Input
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.wasd = this.input.keyboard.addKeys({
        W: Phaser.Input.Keyboard.KeyCodes.W,
        A: Phaser.Input.Keyboard.KeyCodes.A,
        S: Phaser.Input.Keyboard.KeyCodes.S,
        D: Phaser.Input.Keyboard.KeyCodes.D,
      }) as any;
    }

    // 6. Events
    this.game.events.on('updateState', this.handleStateUpdate, this);
    this.scale.on('resize', this.updateCameraBounds, this);

    // Player Animations (2-Frame high-quality loops)
    this.anims.create({
      key: 'player-walk-down',
      frames: [{ key: 'player-main' }, { key: 'player-down-walk-1' }],
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: 'player-walk-up',
      frames: [{ key: 'player-up' }, { key: 'player-up-walk-1' }],
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: 'player-walk-side',
      frames: [{ key: 'player-side' }, { key: 'player-side-walk-1' }],
      frameRate: 6,
      repeat: -1,
    });

    // Notify Ready
    this.game.events.emit('scene-ready');
    console.log('MainScene: Primitive setup complete');
  }

  private loadMap(mapId: string) {
    const data = getMapTileData(mapId);

    this.mapLayer?.destroy();
    this.tilemap?.destroy();

    this.tilemap = this.make.tilemap({
      data: data,
      tileWidth: TILE_SIZE,
      tileHeight: TILE_SIZE,
    });
    const tileset = this.tilemap.addTilesetImage('tileset-texture');
    if (tileset) {
      this.mapLayer = this.tilemap.createLayer(0, tileset, 0, 0) || undefined;
      if (this.mapLayer) {
        this.mapLayer.setScale(1);
        this.mapLayer.setDepth(0);
      }
    }

    this.updateCameraBounds();

    const world = WORLD_DATABASE[mapId];
    if (world) {
      this.cameras.main.setBackgroundColor(world.bgColor);
      // Apply Map Visual Effects via Overlay
      if (mapId === 'town') {
        this.mapTintOverlay.setAlpha(0.1); // Warm sunlight
        this.mapTintOverlay.setFillStyle(0xffaa00, 0.1);
      } else if (mapId === 'ice_cave' || mapId === 'frozen_cliff') {
        this.mapTintOverlay.setAlpha(0.15); // Cold blue
        this.mapTintOverlay.setFillStyle(0x00aaff, 0.15);
      } else {
        this.mapTintOverlay.setAlpha(0);
      }
    }
  }

  private updateCameraBounds() {
    const w = MAP_WIDTH * TILE_SIZE;
    const h = MAP_HEIGHT * TILE_SIZE;
    const viewW = this.cameras.main.width;
    const viewH = this.cameras.main.height;

    // Calculate bounds to center map if it's smaller than the viewport
    const boundsX = viewW > w ? -(viewW - w) / 2 : 0;
    const boundsY = viewH > h ? -(viewH - h) / 2 : 0;
    const boundsW = Math.max(w, viewW);
    const boundsH = Math.max(h, viewH);

    this.cameras.main.setBounds(boundsX, boundsY, boundsW, boundsH);
  }

  private flashPlayer() {
    if (this.isPlayerFlashing || !this.player) return;
    this.isPlayerFlashing = true;

    this.tweens.add({
      targets: this.player,
      alpha: 0.5,
      tint: 0xffffff,
      duration: 50,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        this.player.clearTint();
        this.player.alpha = 1;
        this.isPlayerFlashing = false;
      },
    });
  }

  handleStateUpdate(state: GameState) {
    if (!this.player) return;

    this.activeUI = state.activeUI;

    // Detect player damage
    if (this.playerHp > 0 && state.player.hp < this.playerHp) {
      this.flashPlayer();
    }
    this.playerHp = state.player.hp;

    const prevMapId = this.currentMapId;
    this.currentMapId = state.currentMapId;

    if (prevMapId !== this.currentMapId) {
      this.loadMap(this.currentMapId);
      this.hasSyncedSpawnFromState = false;
    }

    if (!this.hasSyncedSpawnFromState || prevMapId !== this.currentMapId) {
      this.player.setPosition(state.player.position.x, state.player.position.y);
      if (this.attackRangeCircle) {
        this.attackRangeCircle.setPosition(
          state.player.position.x,
          state.player.position.y,
        );
      }
      this.hasSyncedSpawnFromState = true;
    }

    // We will IGNORE position updates from React for the player to prevent jitter/overwrites
    // while we are controlling locally. We only accept enemy updates.
    // 1. Sync Style (Fixed to Chibi)
    if (this.currentPlayerStyle !== 4) {
      this.currentPlayerStyle = 4;
      this.player.setTexture('player-main');
      this.player.setDisplaySize(128, 128);
    }

    // 2. Sync Player Position & Animation Info from state
    this.playerMoveSpeedMultiplier = state.player.moveSpeedMultiplier;
    // this.player.setPosition(state.player.position.x, state.player.position.y);

    // Update Enemies
    const currentEnemyIds = new Set(state.enemies.map((e) => e.id));

    // Remove old
    for (const [id, sprite] of this.enemies) {
      if (!currentEnemyIds.has(id)) {
        sprite.destroy();
        this.enemies.delete(id);

        const bars = this.enemyHpBars.get(id);
        if (bars) {
          bars.bg.destroy();
          bars.fg.destroy();
          bars.shield?.destroy();
          this.enemyHpBars.delete(id);
        }

        const levelText = this.enemyLevelTexts.get(id);
        if (levelText) {
          levelText.destroy();
          this.enemyLevelTexts.delete(id);
        }

        const aura = this.bossAuraEmitters.get(id);
        if (aura) {
          aura.destroy();
          this.bossAuraEmitters.delete(id);
        }
      }
    }

    // Add/Update new
    state.enemies.forEach((enemy) => {
      const template = MONSTER_DATABASE[enemy.type];

      let sprite = this.enemies.get(enemy.id);
      if (!sprite) {
        const key = `monster-${enemy.type}`;
        if (this.textures.exists(key)) {
          sprite = this.add.sprite(enemy.position.x, enemy.position.y, key);
          (sprite as Phaser.GameObjects.Sprite).setDisplaySize(
            enemy.size.x,
            enemy.size.y,
          );
        } else {
          sprite = this.add.rectangle(
            enemy.position.x,
            enemy.position.y,
            enemy.size.x,
            enemy.size.y,
            0xff0000,
          );
        }
        sprite.setDepth(9);
        // Store base size from monster database
        sprite.setData('baseSize', { x: enemy.size.x, y: enemy.size.y });
        sprite.setData('scale', 1);
        // Set initial size using baseSize * scale
        const base = sprite.getData('baseSize');
        const scale = sprite.getData('scale');
        (sprite as any).setSize?.(base.x * scale, base.y * scale) ||
          (sprite as any).setDisplaySize?.(base.x * scale, base.y * scale);
        this.enemies.set(enemy.id, sprite);

        if (template) {
          const barH = 6;
          const bg = this.add.rectangle(
            0,
            0,
            template.hpBarWidth,
            barH,
            0x000000,
            0.6,
          );
          bg.setOrigin(0, 0.5);
          bg.setDepth(11);

          const hpRatio = enemy.maxHp > 0 ? enemy.hp / enemy.maxHp : 0;
          const fg = this.add.rectangle(
            0,
            0,
            template.hpBarWidth * hpRatio,
            barH,
            0xff3333,
            1,
          );
          fg.setOrigin(0, 0.5);
          fg.setDepth(12);

          let shield: Phaser.GameObjects.Rectangle | undefined;
          // Only create overhead shield bar if not a boss (since bosses use the top bar)
          if (template.isBoss) {
            this.createBossUI(template);
          } else {
            shield = this.add.rectangle(0, 0, 0, barH, 0x00ffff, 0.8);
            shield.setOrigin(0, 0.5);
            shield.setDepth(13);
          }

          this.enemyHpBars.set(enemy.id, { bg, fg, shield });
        }
      }

      // Hide overhead bars for boss
      const enemyBarsEntry = this.enemyHpBars.get(enemy.id);
      if (enemyBarsEntry && template?.isBoss) {
        enemyBarsEntry.bg.setVisible(false);
        enemyBarsEntry.fg.setVisible(false);
        enemyBarsEntry.shield?.setVisible(false);
      }

      // Level Text
      let levelText = this.enemyLevelTexts.get(enemy.id);
      if (template) {
        if (!levelText) {
          levelText = this.add.text(
            enemy.position.x,
            enemy.position.y,
            `Lv.${enemy.level} ${levelToTier(enemy.level)}. ${template.name}`,
            {
              fontSize: '14px',
              fontFamily: 'Outfit, Arial',
              color: '#ffffff',
              stroke: '#000000',
              strokeThickness: 3,
              fontStyle: 'bold',
            },
          );
          levelText.setOrigin(0.5, 1);
          levelText.setDepth(11);
          this.enemyLevelTexts.set(enemy.id, levelText);
        }
        levelText.setVisible(!template.isBoss);
        if (!template.isBoss) {
          const tierStr = levelToTier(enemy.level);
          const colorStr = getDifficultyColor(
            this.registry.get('playerLv') || 1,
            enemy.level,
            false,
          );
          levelText.setText(`Lv.${enemy.level} ${tierStr}. ${template.name}`);
          levelText.setColor(colorStr);
          levelText.setPosition(
            enemy.position.x + template.hpBarOffset.x,
            enemy.position.y + template.hpBarOffset.y - 12,
          );
        }
      }
      // Update position and size based on baseSize * scale
      sprite.setPosition(enemy.position.x, enemy.position.y);
      const base = sprite.getData('baseSize');
      const scale = sprite.getData('scale') || 1;
      (sprite as any).setSize?.(base.x * scale, base.y * scale) ||
        (sprite as any).setDisplaySize?.(base.x * scale, base.y * scale);

      // Hit Flash Effect
      const prevHp = this.enemyHpMap.get(enemy.id);
      if (prevHp !== undefined && enemy.hp < prevHp) {
        if (sprite instanceof Phaser.GameObjects.Sprite) {
          sprite.setTint(0xffffff);
          this.time.delayedCall(100, () => {
            if (sprite.active) sprite.clearTint();
          });
        }
      }
      this.enemyHpMap.set(enemy.id, enemy.hp);

      // Skill Announcements
      if (template?.id === 'frost_dragon') {
        // 1. Preparation Phase (Announcement)
        const prevTailSwipeStart =
          this.enemyLastTailSwipeStartMap.get(enemy.id) || 0;
        if (
          enemy.tailSwipeStartTime &&
          enemy.tailSwipeStartTime > prevTailSwipeStart
        ) {
          this.enemyLastTailSwipeStartMap.set(
            enemy.id,
            enemy.tailSwipeStartTime,
          );
          this.spawnSkillAnnouncement(enemy, 'Tail Swipe', '#ff8800');
        }

        // 2. Impact Phase (Visual Effect & Camera Shake)
        const prevTailSwipe = this.enemyLastTailSwipeMap.get(enemy.id) || 0;
        if (
          enemy.lastTailSwipeTime &&
          enemy.lastTailSwipeTime > prevTailSwipe
        ) {
          this.enemyLastTailSwipeMap.set(enemy.id, enemy.lastTailSwipeTime);
          this.triggerTailSwipeEffect(enemy);
        }

        const prevGlacierFall = this.enemyLastGlacierFallMap.get(enemy.id) || 0;
        if (
          enemy.lastGlacierFallTime &&
          enemy.lastGlacierFallTime > prevGlacierFall
        ) {
          this.enemyLastGlacierFallMap.set(enemy.id, enemy.lastGlacierFallTime);
          this.spawnSkillAnnouncement(enemy, 'Glacier Fall', '#00aaff');
        }
      }

      // [FIXED] Update Boss UI for ALL bosses, not just Frost Dragon
      if (template?.isBoss) {
        this.updateBossUI(enemy);
      }

      // [NEW] Luna Overseer Skill Announcements
      if (template?.id === 'luna_overseer') {
        // 1. Orbital Laser (Preparation Phase)
        const prevLaserStart =
          this.enemyLastOrbitalLaserStartMap.get(enemy.id) || 0;
        if (
          enemy.orbitalLaserStartTime &&
          enemy.orbitalLaserStartTime > prevLaserStart
        ) {
          this.enemyLastOrbitalLaserStartMap.set(
            enemy.id,
            enemy.orbitalLaserStartTime,
          );
          this.spawnSkillAnnouncement(enemy, 'Orbital Laser', '#ffff00');
        }

        // 2. Energy Pulse (Instant / Cooldown based)
        const prevPulse = this.enemyLastEnergyPulseMap.get(enemy.id) || 0;
        if (
          enemy.lastEnergyPulseTime &&
          enemy.lastEnergyPulseTime > prevPulse
        ) {
          this.enemyLastEnergyPulseMap.set(enemy.id, enemy.lastEnergyPulseTime);
          this.spawnSkillAnnouncement(enemy, 'Energy Pulse', '#00ffff');
        }
      }

      // Boss Aura Particle System
      if (template?.id === 'frost_dragon') {
        let emitter = this.bossAuraEmitters.get(enemy.id);
        if (!emitter) {
          emitter = this.add.particles(
            enemy.position.x,
            enemy.position.y,
            'frost-particle',
            {
              speed: { min: 50, max: 150 },
              scale: { start: 0.6, end: 0 },
              alpha: { start: 0.5, end: 0 },
              lifespan: 2000,
              blendMode: 'ADD',
              frequency: 50,
              tint: enemy.isEnraged ? 0xff4444 : 0x88e8ff,
            },
          );
          emitter.setDepth(8); // Below boss
          this.bossAuraEmitters.set(enemy.id, emitter);
        }
        emitter.setPosition(enemy.position.x, enemy.position.y);
        emitter.setParticleTint(enemy.isEnraged ? 0xff4444 : 0x88e8ff);
      }

      const barsEntry = this.enemyHpBars.get(enemy.id);
      if (barsEntry && template) {
        const ratio =
          enemy.maxHp > 0
            ? Math.max(0, Math.min(1, enemy.hp / enemy.maxHp))
            : 0;
        const x =
          enemy.position.x + template.hpBarOffset.x - template.hpBarWidth / 2;
        const y = enemy.position.y + template.hpBarOffset.y;

        barsEntry.bg.setPosition(x, y);
        barsEntry.fg.setPosition(x, y);
        barsEntry.bg.setSize(template.hpBarWidth, 6);
        barsEntry.fg.setSize(template.hpBarWidth * ratio, 6);

        if (barsEntry.shield) {
          barsEntry.shield.setPosition(x, y);
          // Show shield as an overlay or extension
          // Here we'll show it as an overlay that can exceed the HP bar width if needed
          const shieldRatio =
            enemy.maxHp > 0 ? (enemy.shield || 0) / enemy.maxHp : 0;
          barsEntry.shield.width = template.hpBarWidth * shieldRatio;
          barsEntry.shield.setVisible((enemy.shield || 0) > 0);
        }
      }
    });

    // Cleanup Boss UI if no bosses
    const anyBoss = state.enemies.some((e) => MONSTER_DATABASE[e.type]?.isBoss);
    if (!anyBoss && this.bossUiContainer) {
      this.bossUiContainer.destroy();
      this.bossUiContainer = null;
      this.bossHpBar = null;
      this.bossShieldBar = null;
      this.bossNameText = null;
    }

    // Update Portals (visual only)
    const currentMap = WORLD_DATABASE[state.currentMapId];
    if (currentMap) {
      const currentPortalIds = new Set(currentMap.portals.map((p) => p.id));

      // Remove old
      for (const [id, sprite] of this.portals) {
        if (!currentPortalIds.has(id)) {
          sprite.destroy();
          this.portals.delete(id);
        }
      }

      // Add/Update new
      currentMap.portals.forEach((portal) => {
        let container = this.portals.get(portal.id);
        if (!container) {
          container = this.add.container(
            portal.x + portal.width / 2,
            portal.y + portal.height / 2,
          );

          // 1. Outer Glow (Pulsing)
          const glow = this.add.sprite(0, 0, 'portal-light');
          glow.setTint(0xffff00);
          glow.setScale(2);
          glow.setAlpha(0.6);

          this.tweens.add({
            targets: glow,
            scale: 2.5,
            alpha: 0.3,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
          });

          // 2. Swirl Core
          const core = this.add.sprite(0, 0, 'portal-light');
          core.setTint(0xffaa00);
          core.setScale(1);

          this.tweens.add({
            targets: core,
            rotation: Math.PI * 2,
            duration: 3000,
            repeat: -1,
          });

          // 3. Particles (Magic Dust)
          const emitter = this.add.particles(0, 0, 'portal-light', {
            speed: { min: 20, max: 40 },
            scale: { start: 0.3, end: 0 },
            alpha: { start: 0.6, end: 0 },
            lifespan: 1000,
            blendMode: 'ADD',
            frequency: 100,
            tint: 0xffffaa,
            gravityY: -20,
          });

          container.add([glow, core, emitter]);
          container.setDepth(5);
          this.portals.set(portal.id, container);
        } else {
          container.setPosition(
            portal.x + portal.width / 2,
            portal.y + portal.height / 2,
          );
        }
      });
    }

    // Update NPCs (visual only)
    if (currentMap) {
      const currentNpcIds = new Set(currentMap.npcs.map((n) => n.id));

      // Remove old
      for (const [id, obj] of this.npcs) {
        if (!currentNpcIds.has(id)) {
          obj.destroy();
          this.npcs.delete(id);
        }
      }

      // Add/Update new
      currentMap.npcs.forEach((npc) => {
        let obj = this.npcs.get(npc.id);
        if (!obj) {
          let textureKey = '';
          // Check for custom sprite first
          if (npc.spriteUrl && this.textures.exists(`npc-${npc.id}`)) {
            textureKey = `npc-${npc.id}`;
          } else if (npc.type === 'Spaceship') {
            textureKey = 'spaceship';
          } else if (npc.type === 'Merchant') {
            textureKey = 'npc-merchant';
          } else if (npc.type === 'Blacksmith') {
            textureKey = 'npc-blacksmith';
          } else if (npc.id === 'village_head') {
            textureKey = 'npc-merchant';
          }

          if (textureKey || npc.type === 'Guide' || npc.id === 'town_sign') {
            if (npc.type === 'Spaceship') {
              const container = this.add.container(
                npc.position.x,
                npc.position.y,
              );

              const sprite = this.add.sprite(0, 0, textureKey);
              sprite.setDisplaySize(npc.size.x, npc.size.y);

              container.add([sprite]);
              container.setDepth(8);
              obj = container;
            } else if (npc.id === 'town_sign') {
              const container = this.add.container(
                npc.position.x,
                npc.position.y,
              );
              const post = this.add.rectangle(0, 20, 10, 40, 0x5d4037);
              const board = this.add.rectangle(
                0,
                -10,
                npc.size.x,
                npc.size.y / 2,
                0x8d6e63,
              );
              board.setStrokeStyle(2, 0x3e2723);
              container.add([post, board]);
              container.setDepth(8);
              obj = container;
            } else if (npc.type === 'Guide') {
              // Holographic Guide
              const container = this.add.container(
                npc.position.x,
                npc.position.y,
              );

              // 1. Hologram Base (Glow)
              const glow = this.add.graphics();
              glow.fillStyle(0x00ffff, 0.2);
              glow.fillEllipse(0, 0, npc.size.x / 1.5, npc.size.y / 2.5);

              // 2. Hologram Body (Wireframe-ish)
              const body = this.add.graphics();
              body.lineStyle(2, 0x00ffff, 0.8);
              body.strokeRoundedRect(
                -npc.size.x / 2,
                -npc.size.y / 2,
                npc.size.x,
                npc.size.y,
                10,
              );
              body.fillStyle(0x00ffff, 0.1);
              body.fillRoundedRect(
                -npc.size.x / 2,
                -npc.size.y / 2,
                npc.size.x,
                npc.size.y,
                10,
              );

              // 3. Scanline Effect
              const scanline = this.add.rectangle(
                0,
                -npc.size.y / 2,
                npc.size.x,
                2,
                0xffffff,
                0.5,
              );
              this.tweens.add({
                targets: scanline,
                y: npc.size.y / 2,
                duration: 1500,
                repeat: -1,
                yoyo: true,
                ease: 'Sine.easeInOut',
              });

              // 4. Floating Animation (Whole Container)
              this.tweens.add({
                targets: container,
                y: npc.position.y - 10,
                duration: 2000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut',
              });

              // 5. Alpha Pulse
              this.tweens.add({
                targets: [body, glow],
                alpha: 0.6,
                duration: 100,
                yoyo: true,
                repeat: -1,
                hold: 2000, // Flickers efficiently
                repeatDelay: Math.random() * 1000,
              });

              const offsetX = npc.nameOffset?.x ?? 0;
              const offsetY = npc.nameOffset?.y ?? -npc.size.y / 2 - 15;

              const nameLabel = this.add
                .text(offsetX, offsetY, npc.name, {
                  fontSize: '14px',
                  color: '#00ffff', // Cyan text for hologram
                  stroke: '#000000',
                  strokeThickness: 3,
                  fontStyle: 'bold', // Bold for emphasis
                })
                .setOrigin(0.5);

              container.add([glow, body, scanline, nameLabel]);
              container.setDepth(8);

              obj = container;
            } else {
              // Merchant/Blacksmith: Sprite + Label in Container
              const container = this.add.container(
                npc.position.x,
                npc.position.y,
              );
              const sprite = this.add.sprite(0, 0, textureKey);
              sprite.setDisplaySize(npc.size.x, npc.size.y);

              const offsetX = npc.nameOffset?.x ?? 0;
              const offsetY = npc.nameOffset?.y ?? -npc.size.y / 2 - 15;

              const nameLabel = this.add
                .text(offsetX, offsetY, npc.name, {
                  fontSize: '14px',
                  color: '#ffffff',
                  stroke: '#000000',
                  strokeThickness: 3,
                })
                .setOrigin(0.5);

              container.add([sprite, nameLabel]);
              container.setDepth(8);

              obj = container;
            }
          } else {
            // Default NPC representation (Rectangle + Label)
            const container = this.add.container(
              npc.position.x,
              npc.position.y,
            );
            const body = this.add.rectangle(
              0,
              0,
              npc.size.x,
              npc.size.y,
              0x00ff00,
              1,
            );
            body.setStrokeStyle(2, 0xffffff);

            const offsetX = npc.nameOffset?.x ?? 0;
            const offsetY = npc.nameOffset?.y ?? -npc.size.y / 2 - 15;

            const nameLabel = this.add
              .text(offsetX, offsetY, npc.name, {
                fontSize: '12px',
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 3,
              })
              .setOrigin(0.5);

            container.add([body, nameLabel]);
            container.setDepth(8);

            obj = container;
          }
          this.npcs.set(npc.id, obj);
        } else {
          // Update position if needed (though static for now)
          // obj.setPosition(npc.position.x, npc.position.y);
        }
      });
    }

    // Update range visualization data
    this.currentSettings.showRange = state.settings.showRange;
    this.currentSettings.showHitbox = state.settings.showHitbox;
    this.currentSettings.cooldownVisualMode = state.settings.cooldownVisualMode;

    this.playerAttackStatus.isAttacking = state.player.attack.isAttacking;
    this.playerAttackStatus.progress = state.player.attack.progress;

    if (state.player.equipment.weapon) {
      this.currentWeapon = {
        range: state.player.equipment.weapon.range,
        swingArc: state.player.equipment.weapon.swingArc,
      };
    } else {
      this.currentWeapon = null;
    }
    this.currentEnemies = state.enemies;
    this.currentGlacierFalls = state.glacierFalls;
    this.currentOrbitalLasers = state.orbitalLasers;

    // Update Damage Numbers
    state.damageNumbers.forEach((dmg) => {
      if (!this.spawnedDamageIds.has(dmg.id)) {
        this.spawnDamageNumber(dmg);
        this.spawnedDamageIds.add(dmg.id);
      }
    });

    // Cleanup old damage IDs
    const currentDmgIds = new Set(state.damageNumbers.map((d) => d.id));
    for (const id of this.spawnedDamageIds) {
      if (!currentDmgIds.has(id)) {
        this.spawnedDamageIds.delete(id);
      }
    }

    // Update Dropped Items
    const currentDropIds = new Set(state.droppedItems.map((d) => d.id));

    // Remove old drops
    for (const [id, container] of this.droppedItems) {
      if (!currentDropIds.has(id)) {
        container.destroy();
        this.droppedItems.delete(id);
      }
    }

    // Add/Update new drops
    state.droppedItems.forEach((drop) => {
      if (!this.droppedItems.has(drop.id)) {
        const itemInfo = ITEM_DATABASE[drop.itemId];
        const container = this.add.container(drop.position.x, drop.position.y);

        // Glow effect
        const glow = this.add.circle(0, 0, 15, 0xffffff, 0.2);

        // Use icon if exists
        const itemKey = `item-${drop.itemId}`;
        let itemVisual;
        if (this.textures.exists(itemKey)) {
          itemVisual = this.add.sprite(0, 0, itemKey);
          const size = itemInfo?.worldSize ||
            itemInfo?.size || { x: 24, y: 24 };
          itemVisual.setDisplaySize(size.x, size.y);
        } else {
          // Fallback box
          const size = itemInfo?.worldSize ||
            itemInfo?.size || { x: 16, y: 16 };
          itemVisual = this.add.rectangle(0, 0, size.x, size.y, 0xffff00, 1);
          (itemVisual as Phaser.GameObjects.Rectangle).setStrokeStyle(
            2,
            0xffd700,
          );
        }

        // Item Name Label
        const label = this.add
          .text(0, -25, itemInfo?.name || 'Item', {
            fontSize: '12px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3,
          })
          .setOrigin(0.5);

        container.add([glow, itemVisual, label]);
        container.setDepth(4);

        // Floating animation
        this.tweens.add({
          targets: container,
          y: drop.position.y - 8,
          duration: 800,
          yoyo: true,
          repeat: -1,
          ease: 'Sine.easeInOut',
        });

        this.droppedItems.set(drop.id, container);
      } else {
        // Update size of existing items (Reactivity Fix)
        const container = this.droppedItems.get(drop.id)!;
        const itemInfo = ITEM_DATABASE[drop.itemId];
        const itemVisual = container.list[1] as
          | Phaser.GameObjects.Sprite
          | Phaser.GameObjects.Rectangle;

        if (itemVisual) {
          const size = itemInfo?.worldSize ||
            itemInfo?.size || { x: 24, y: 24 };
          if (itemVisual instanceof Phaser.GameObjects.Sprite) {
            itemVisual.setDisplaySize(size.x, size.y);
          } else {
            // Rectangles need to be recreated or resized via width/height
            // For simplicity with existing code, we update width/height
            itemVisual.setSize(size.x, size.y);
            itemVisual.setDisplaySize(size.x, size.y);
          }
        }
      }
    });
  }

  private spawnDamageNumber(dmg: any) {
    const text = this.add.text(
      dmg.position.x,
      dmg.position.y,
      dmg.value.toString(),
      {
        fontSize: dmg.color === '#ff00ff' ? '28px' : '20px',
        color: dmg.color,
        fontStyle: 'bold',
        stroke: '#000000',
        strokeThickness: 4,
      },
    );
    text.setOrigin(0.5);
    text.setDepth(20);

    this.tweens.add({
      targets: text,
      y: dmg.position.y - 60,
      x: dmg.position.x + (dmg.vx || 0) * 15,
      alpha: 0,
      duration: 1000,
      ease: 'Cubic.out',
      onComplete: () => text.destroy(),
    });
  }

  private spawnSkillAnnouncement(enemy: any, skillName: string, color: string) {
    const text = this.add.text(
      enemy.position.x,
      enemy.position.y - 100,
      skillName,
      {
        fontSize: '32px',
        color: color,
        fontStyle: 'bold',
        stroke: '#000000',
        strokeThickness: 6,
        fontFamily: 'Outfit, Arial',
      },
    );
    text.setOrigin(0.5);
    text.setDepth(30);

    this.tweens.add({
      targets: text,
      y: text.y - 80,
      alpha: 0,
      scale: 1.5,
      duration: 1500,
      ease: 'Cubic.out',
      onComplete: () => text.destroy(),
    });
  }

  // Draw ranges and hitboxes - will be called in update for movement sync
  private drawRanges() {
    this.rangeGraphics.clear();
    this.enemyHitboxGraphics.clear();
    this.cooldownGraphics.clear();

    const weaponRange = this.currentWeapon?.range || 0;
    const px = this.player.x;
    const py = this.player.y;

    // Draw debug info only if debug settings are enabled
    if (
      !this.currentSettings.showRange &&
      !this.currentSettings.showHitbox &&
      this.currentSettings.cooldownVisualMode === 0
    ) {
      return; // Early exit if no debug features are enabled
    }

    // 1. Draw Player Attack Range
    if (this.currentSettings.showRange && this.currentWeapon) {
      // Use weapon absolute range for visualization
      const range = this.currentWeapon.range;
      this.rangeGraphics.lineStyle(2, 0x00ff00, 0.5);
      this.rangeGraphics.fillStyle(0x00ff00, 0.1);

      this.rangeGraphics.fillCircle(px, py, range);
      this.rangeGraphics.strokeCircle(px, py, range);
    }

    // 2. Draw Cooldown Gauge (Clock Icon on Ground)
    if (
      this.currentSettings.cooldownVisualMode === 1 &&
      this.playerAttackStatus.isAttacking
    ) {
      const radiusX = 10;
      const radiusY = 10;
      const offsetP = 48;
      const progress = this.playerAttackStatus.progress;
      const cx = px;
      const cy = py + offsetP;

      // 1. Clock Face (Black Rim at the tips)
      this.cooldownGraphics.lineStyle(2, 0x000000, 1);
      this.cooldownGraphics.fillStyle(0x000000, 1);
      this.cooldownGraphics.strokeEllipse(cx, cy, radiusX * 2, radiusY * 2);
      // this.cooldownGraphics.strokeEllipse(cx, cy, radiusX, radiusY);

      // 2. Clock Ticks (White) - Touching the black rim
      this.cooldownGraphics.lineStyle(1, 0xffffff, 0.8);
      // 12 o'clock
      this.cooldownGraphics.lineBetween(cx, cy - radiusY, cx, cy - radiusY + 3);
      // 6 o'clock
      this.cooldownGraphics.lineBetween(cx, cy + radiusY, cx, cy + radiusY - 3);
      // 3 o'clock
      this.cooldownGraphics.lineBetween(cx + radiusX, cy, cx + radiusX - 3, cy);
      // 9 o'clock
      this.cooldownGraphics.lineBetween(cx - radiusX, cy, cx - radiusX + 3, cy);

      // 3. Progress Fill
      const startAngle = -Math.PI / 2;
      const sweepAngle = progress * Math.PI * 2;
      this.cooldownGraphics.fillStyle(0xffffff, 0.2);
      this.cooldownGraphics.beginPath();
      this.cooldownGraphics.moveTo(cx, cy);
      this.cooldownGraphics.arc(
        cx,
        cy,
        radiusX,
        startAngle,
        startAngle + sweepAngle,
        false,
      );
      this.cooldownGraphics.lineTo(cx, cy);
      this.cooldownGraphics.closePath();
      this.cooldownGraphics.fillPath();

      // 4. Clock Hand (Needle) - Points exactly to the black rim
      const handAngle = startAngle + sweepAngle;
      const hx = cx + Math.cos(handAngle) * radiusX;
      const hy = cy + Math.sin(handAngle) * radiusY;
      this.cooldownGraphics.lineStyle(2, 0xffffff, 0.9);
      this.cooldownGraphics.lineBetween(cx, cy, hx, hy);

      // Center Pin
      this.cooldownGraphics.fillStyle(0xffffff, 1);
      this.cooldownGraphics.fillCircle(cx, cy, 2);
    }

    // 3. Draw Enemy Hitboxes
    if (this.currentSettings.showHitbox) {
      this.currentEnemies.forEach((enemy) => {
        // Safety check for hitboxSize and offset
        const hbX = enemy.hitboxSize?.x ?? enemy.size.x;
        const hbY = enemy.hitboxSize?.y ?? enemy.size.y;
        const offsetX = enemy.hitboxOffset?.x ?? 0;
        const offsetY = enemy.hitboxOffset?.y ?? 0;

        const hw = hbX / 2;
        const hh = hbY / 2;

        const hbx = enemy.position.x + offsetX;
        const hby = enemy.position.y + offsetY;

        const closestX = Math.max(hbx - hw, Math.min(px, hbx + hw));
        const closestY = Math.max(hby - hh, Math.min(py, hby + hh));

        const dxToClosest = closestX - px;
        const dyToClosest = closestY - py;
        const dist = Math.sqrt(
          dxToClosest * dxToClosest + dyToClosest * dyToClosest,
        );

        const effectiveWeaponRange = weaponRange; // No offset

        const inRange =
          effectiveWeaponRange > 0 && dist <= effectiveWeaponRange;

        const color = inRange ? 0xff0000 : 0xffff00;
        const alpha = inRange ? 0.6 : 0.2;

        this.enemyHitboxGraphics.lineStyle(2, color, alpha);
        this.enemyHitboxGraphics.strokeRect(hbx - hw, hby - hh, hbX, hbY);
      });
    }

    // 5. Draw Boss Effects
    this.currentEnemies.forEach((enemy: any) => {
      const template = MONSTER_DATABASE[enemy.type];
      if (!template?.isBoss) return;

      // 5b. Enrage Visual (Red pulsing border)
      if (enemy.isEnraged) {
        this.rangeGraphics.lineStyle(3, 0xff0000, 0.6);
        this.rangeGraphics.strokeCircle(
          enemy.position.x,
          enemy.position.y,
          Math.max(enemy.size.x, enemy.size.y) * 0.7,
        );
      }

      // 5c. Standard Attack Range Visualization
      if (template.attackRange && template.id === 'frost_dragon') {
        const range = template.attackRange;
        const color = 0x00ffff;

        // Outer dashed-like circle
        this.rangeGraphics.lineStyle(2, color, 0.3);
        this.rangeGraphics.strokeCircle(
          enemy.position.x,
          enemy.position.y,
          range,
        );

        // Inner very faint fill
        this.rangeGraphics.fillStyle(color, 0.05);
        this.rangeGraphics.fillCircle(
          enemy.position.x,
          enemy.position.y,
          range,
        );
      }
    });

    // 6. Draw Glacier Fall Warning Circles & Spikes
    this.glacierFallGraphics.clear();
    const now = Date.now();
    const activeGlacierIds = new Set<string>();

    (this.currentGlacierFalls || []).forEach((glacier: any) => {
      activeGlacierIds.add(glacier.id);
      const elapsed = now - glacier.createdAt;
      const progress = elapsed / glacier.impactTime;

      if (progress < 1) {
        // Warning circle - shrinks as impact approaches
        const currentRadius = glacier.radius * (1.5 - progress * 0.5);
        const alpha = 0.3 + progress * 0.4;

        // Outer warning
        this.glacierFallGraphics.lineStyle(3, 0x00aaff, alpha);
        this.glacierFallGraphics.strokeCircle(
          glacier.position.x,
          glacier.position.y,
          currentRadius,
        );

        // Inner danger zone
        this.glacierFallGraphics.fillStyle(0x00aaff, alpha * 0.5);
        this.glacierFallGraphics.fillCircle(
          glacier.position.x,
          glacier.position.y,
          glacier.radius * progress,
        );

        // 6b. Falling Ice Spike
        let spike = this.glacierSpikes.get(glacier.id);
        if (!spike) {
          spike = this.add.sprite(
            glacier.position.x,
            glacier.position.y - 400,
            'ice-spike',
          );
          spike.setDepth(15);
          spike.setAlpha(0);
          this.glacierSpikes.set(glacier.id, spike);
        }

        // Falling animation based on progress
        const startY = glacier.position.y - 400;
        const targetY = glacier.position.y;
        spike.y = startY + (targetY - startY) * progress;
        spike.setAlpha(Math.min(1, progress * 2));
        spike.setScale(1 + progress * 0.5);
      }
    });

    // 7. Draw Orbital Laser Effects
    this.orbitalLaserGraphics.clear();
    (this.currentOrbitalLasers || []).forEach((laser: any) => {
      const elapsed = now - laser.createdAt;
      const progress = elapsed / laser.impactTime;

      if (progress < 1) {
        // Warning circle (Pulsing)
        const pulse = (Math.sin(now / 100) + 1) / 2;
        const alpha = 0.4 + pulse * 0.4;

        this.orbitalLaserGraphics.lineStyle(4, 0xffff00, alpha);
        this.orbitalLaserGraphics.strokeCircle(
          laser.position.x,
          laser.position.y,
          laser.radius,
        );

        // Targeted focus line from top
        this.orbitalLaserGraphics.lineStyle(1, 0xffff00, alpha * 0.5);
        this.orbitalLaserGraphics.lineBetween(
          laser.position.x,
          laser.position.y - 1000,
          laser.position.x,
          laser.position.y,
        );
      }
    });

    // Handle Laser Impacts (when they disappear from state)
    const currentLaserIds = new Set<string>(
      (this.currentOrbitalLasers || []).map((l: any) => l.id),
    );
    for (const id of this.activeOrbitalLaserIds) {
      if (!currentLaserIds.has(id)) {
        // Find the laser data from previous frame to get position
        const oldLaser = (this.currentOrbitalLasers || []).find(
          (l: any) => l.id === id,
        );
        if (oldLaser) {
          this.spawnOrbitalLaserBeam(oldLaser.position.x, oldLaser.position.y);
        }
      }
    }
    this.activeOrbitalLaserIds = currentLaserIds;

    // 8. Handle Energy Pulse Visuals (Lunacia Overseer)
    this.currentEnemies.forEach((enemy: any) => {
      if (enemy.type === 'luna_overseer' && enemy.lastEnergyPulseTime) {
        const lastTime = this.enemyLastEnergyPulseMap.get(enemy.id) || 0;
        if (enemy.lastEnergyPulseTime > lastTime) {
          this.spawnEnergyPulse(
            enemy.position.x,
            enemy.position.y,
            MONSTER_DATABASE[enemy.type]?.energyPulseRadius || 350,
          );
          this.enemyLastEnergyPulseMap.set(enemy.id, enemy.lastEnergyPulseTime);
        }
      }
    });

    // Cleanup finished spikes and spawn impact effects
    for (const [id, spike] of this.glacierSpikes) {
      if (!activeGlacierIds.has(id)) {
        // Just disappeared from state, means it impacted!
        const impactX = spike.x;
        const impactY = spike.y;

        // Spawn impact particles
        const emitter = this.add.particles(impactX, impactY, 'frost-particle', {
          speed: { min: 100, max: 200 },
          scale: { start: 1, end: 0 },
          alpha: { start: 1, end: 0 },
          lifespan: 500,
          gravityY: 300,
          blendMode: 'ADD',
          emitting: false,
        });
        emitter.explode(20);
        this.time.delayedCall(600, () => emitter.destroy());

        spike.destroy();
        this.glacierSpikes.delete(id);
      }
    }

    // 7. Draw Monster Attack Telegraphs (Normal Attacks)
    this.currentEnemies.forEach((enemy: any) => {
      const sprite = this.enemies.get(enemy.id);

      if (enemy.attackStartTime) {
        const template = MONSTER_DATABASE[enemy.type];
        const rawPreDelay = template?.attackPreDelay ?? 0.4;
        const preDelay =
          Math.min(rawPreDelay, enemy.attackCooldown * 0.5) * 1000;
        const elapsed = now - enemy.attackStartTime;
        const progress = Math.min(1, elapsed / preDelay);

        const color = 0xff0000;
        const range = enemy.attackRange;

        // Draw a circle that fills up
        this.rangeGraphics.lineStyle(2, color, 0.4);
        this.rangeGraphics.strokeCircle(
          enemy.position.x,
          enemy.position.y,
          range,
        );

        this.rangeGraphics.fillStyle(color, 0.1 + progress * 0.2);
        this.rangeGraphics.fillCircle(
          enemy.position.x,
          enemy.position.y,
          range * progress,
        );

        // Add vibration to the sprite
        if (sprite) {
          sprite.x = enemy.position.x + (Math.random() - 0.5) * 8 * progress;
          sprite.y = enemy.position.y + (Math.random() - 0.5) * 8 * progress;
        }
      } else {
        // Reset sprite position if not attacking (safeguard for vibration)
        if (sprite) {
          sprite.x = enemy.position.x;
          sprite.y = enemy.position.y;
        }
      }
    });
  }

  update() {
    if (!this.player || !this.cursors || !this.wasd) return;

    const currentMap = WORLD_DATABASE[this.currentMapId];

    // Check for nearest NPC for hint (Added cooldown)
    const now = this.time.now;
    if (now - this.lastNpcCheckMs > 100) {
      // Check every 100ms
      this.lastNpcCheckMs = now;

      if (currentMap && this.activeUI === 'None') {
        const nearestNPC = currentMap.npcs.find((npc) => {
          const dx = npc.position.x - this.player.x;
          const dy = npc.position.y - this.player.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          return dist < 100;
        });

        if (nearestNPC) {
          this.interactHint
            .setPosition(this.player.x, this.player.y - 80)
            .setVisible(true);
        } else {
          this.interactHint.setVisible(false);
        }
      } else {
        this.interactHint.setVisible(false);
      }
    }

    // Block movement if UI is open
    if (this.activeUI !== 'None') {
      // Ensure player stops if they were moving when UI opened
      return;
    }

    // ...
    let vx = 0;
    let vy = 0;

    if (this.cursors.left.isDown || this.wasd.A.isDown) vx -= 1;
    if (this.cursors.right.isDown || this.wasd.D.isDown) vx += 1;
    if (this.cursors.up.isDown || this.wasd.W.isDown) vy -= 1;
    if (this.cursors.down.isDown || this.wasd.S.isDown) vy += 1;

    // Normalize
    if (vx !== 0 || vy !== 0) {
      const mag = Math.sqrt(vx * vx + vy * vy);
      vx /= mag;
      vy /= mag;

      const baseSpeed = 20;
      const finalSpeed = baseSpeed * this.playerMoveSpeedMultiplier;

      this.player.x += vx * finalSpeed;
      this.player.y += vy * finalSpeed;
      this.player.setData('direction', Math.atan2(vy, vx));

      // 1. Update Directional Visuals & Animations
      if (Math.abs(vy) > Math.abs(vx)) {
        // Vertical movement is dominant
        if (vy < 0) {
          this.player.play('player-walk-up', true);
        } else {
          this.player.play('player-walk-down', true);
        }
        this.player.setFlipX(false);
      } else {
        // Horizontal movement is dominant
        this.player.play('player-walk-side', true);
        this.player.setFlipX(vx > 0);
      }

      // Ensure absolute reset of procedural effects (NO WADDLING)
      this.player.setScale(128 / this.player.width, 128 / this.player.height);
      this.player.setRotation(0);
    } else {
      // Idle State: Reset all and stop animations
      this.player.stop();
      this.player.setScale(128 / this.player.width, 128 / this.player.height);
      this.player.setRotation(0);
    }

    // Update visualizations in real-time
    this.drawRanges();

    // Clamp to map bounds
    const mapW = MAP_WIDTH * TILE_SIZE;
    const mapH = MAP_HEIGHT * TILE_SIZE;
    const marginX = 16;
    const marginY = 16;
    this.player.x = Math.max(marginX, Math.min(mapW - marginX, this.player.x));
    this.player.y = Math.max(marginY, Math.min(mapH - marginY, this.player.y));

    // Update attack range circle position
    if (this.attackRangeCircle) {
      this.attackRangeCircle.setPosition(this.player.x, this.player.y);
    }

    const nowMs = this.time.now;
    if (nowMs - this.lastPlayerSyncMs > 50) {
      this.game.events.emit('playerPosition', {
        x: this.player.x,
        y: this.player.y,
        direction: this.player.getData('direction'),
      });
      this.lastPlayerSyncMs = nowMs;
    }

    // Portal & Interaction Check (Phaser-side)
    if (currentMap) {
      // 1. Portal Check
      if (nowMs - this.lastPortalTimeMs > 500) {
        for (const [portalId, portalContainer] of this.portals) {
          const portalData = currentMap.portals.find((p) => p.id === portalId);
          if (!portalData) continue;

          // Check distance to portal center
          const dx = portalContainer.x - this.player.x;
          const dy = portalContainer.y - this.player.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 40) {
            // [NEW] Boss Requirement Check
            if (portalData.requiredBossId) {
              const state: GameState = this.registry.get('state');
              if (
                !state ||
                !state.player.defeatedBosses.includes(portalData.requiredBossId)
              ) {
                const bossName =
                  MONSTER_DATABASE[portalData.requiredBossId]?.name ||
                  portalData.requiredBossId;

                this.game.events.emit('showToast', {
                  id: `portal-locked-${Date.now()}`,
                  message: `You must defeat ${bossName} to use this portal!`,
                });
                this.lastPortalTimeMs = nowMs;
                break;
              }
            }

            console.log('Portal hit!', portalData.targetMapId);
            this.game.events.emit('changeMap', {
              mapId: portalData.targetMapId,
              x: portalData.targetX,
              y: portalData.targetY,
            });
            this.lastPortalTimeMs = nowMs;
            break;
          }
        }
      }

      // 2. Spaceship Interaction Check (Special "on touch" trigger)
      const spaceship = currentMap.npcs.find((n) => n.type === 'Spaceship');
      if (spaceship) {
        const dx = spaceship.position.x - this.player.x;
        const dy = spaceship.position.y - this.player.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          if (!this.isNearSpaceship && this.activeUI === 'None') {
            // Near the spaceship for the first time
            this.game.events.emit('npcClicked', spaceship);
            this.isNearSpaceship = true;
          }
        } else {
          this.isNearSpaceship = false;
        }
      }
    }

    // Check enemies in range and highlight them subtly
    for (const [, enemy] of this.enemies) {
      const dx = enemy.x - this.player.x;
      const dy = enemy.y - this.player.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const weaponRange = this.currentWeapon?.range || 80;
      if (distance <= weaponRange) {
        // In range - update scale for pulse effect
        const pulse = 1 + 0.1 * Math.sin(this.time.now / 150);
        enemy.setData('scale', pulse);
        enemy.setAlpha(1);
      } else {
        // Out of range - reset scale to 1
        enemy.setData('scale', 1);
        enemy.setAlpha(0.8);
      }

      // Remove subtle procedural walking/breathing bobbing for all enemies as requested
    }
  }

  private triggerTailSwipeEffect(enemy: any) {
    // 1. Camera Shake
    this.cameras.main.shake(200, 0.01);

    // 2. Crescent Swing Visual
    const graphics = this.add.graphics();
    graphics.setDepth(15);
    const angle = Phaser.Math.Angle.Between(
      this.player.x,
      this.player.y,
      enemy.position.x,
      enemy.position.y,
    );

    const template = MONSTER_DATABASE[enemy.type];
    const range = template?.tailSwipeRange || 250;

    this.tweens.addCounter({
      from: 0,
      to: 1,
      duration: 300,
      onUpdate: (tween: Phaser.Tweens.Tween) => {
        const v = (tween as any).getValue();
        if (v === null || v === undefined) return;
        graphics.clear();
        graphics.lineStyle(20 * (1 - v), 0xff8800, 0.8 * (1 - v));
        graphics.beginPath();
        graphics.arc(
          enemy.position.x,
          enemy.position.y,
          range, // Linked to template data
          angle - Math.PI / 4,
          angle + Math.PI / 4,
          false,
        );
        graphics.strokePath();
      },
      onComplete: () => graphics.destroy(),
    });
  }

  private spawnOrbitalLaserBeam(x: number, y: number) {
    // 1. Vertical Beam
    const beam = this.add.rectangle(x, y - 500, 40, 1000, 0xffffff, 1);
    beam.setDepth(20);
    beam.setOrigin(0.5, 0.5);

    this.tweens.add({
      targets: beam,
      alpha: 0,
      width: 100,
      duration: 300,
      onComplete: () => beam.destroy(),
    });

    // 2. Camera Shake
    this.cameras.main.shake(200, 0.02);
  }

  private spawnEnergyPulse(x: number, y: number, radius: number) {
    const graphics = this.add.graphics();
    graphics.setDepth(15);

    this.tweens.addCounter({
      from: 0,
      to: radius,
      duration: 500,
      onUpdate: (tween: Phaser.Tweens.Tween) => {
        const r = (tween as any).getValue();
        graphics.clear();
        graphics.lineStyle(10, 0x00ffff, 1 - r / radius);
        graphics.strokeCircle(x, y, r);
      },
      onComplete: () => graphics.destroy(),
    });

    // Optional: Add particle burst
  }

  private createBossUI(template: any) {
    if (this.bossUiContainer) return;

    const width = 600;
    const height = 30;
    const x = this.cameras.main.width / 2;
    const y = 60;

    this.bossUiContainer = this.add.container(x, y);
    this.bossUiContainer.setScrollFactor(0);
    this.bossUiContainer.setDepth(100);

    // Background Shadow
    const bg = this.add.rectangle(0, 0, width + 4, height + 4, 0x000000, 0.7);

    // Health Bar Placeholder
    const hpBg = this.add.rectangle(0, 0, width, height, 0x330000, 1);
    this.bossHpBar = this.add.rectangle(
      -width / 2,
      0,
      width,
      height,
      0xff0000,
      1,
    );
    this.bossHpBar.setOrigin(0, 0.5);

    // Shield Bar Placeholder (overlays HP bar)
    this.bossShieldBar = this.add.rectangle(
      -width / 2,
      0,
      0,
      height,
      0x00ffff,
      0.6,
    );
    this.bossShieldBar.setOrigin(0, 0.5);

    // Boss Name
    this.bossNameText = this.add.text(0, -height - 10, template.name, {
      fontSize: '24px',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 4,
      fontFamily: 'Outfit, Arial',
    });
    this.bossNameText.setOrigin(0.5, 0.5);

    // HP Text (Current / Max)
    this.bossHpText = this.add.text(0, 0, '', {
      fontSize: '16px',
      fontStyle: 'bold',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 3,
      fontFamily: 'Outfit, Arial',
    });
    this.bossHpText.setOrigin(0.5, 0.5);

    this.bossUiContainer.add([
      bg,
      hpBg,
      this.bossHpBar,
      this.bossShieldBar,
      this.bossHpText,
      this.bossNameText,
    ]);
  }

  private updateBossUI(enemy: any) {
    if (!this.bossHpBar || !this.bossShieldBar) return;

    const hpRatio = enemy.maxHp > 0 ? Math.max(0, enemy.hp / enemy.maxHp) : 0;
    const shieldRatio = enemy.maxHp > 0 ? (enemy.shield || 0) / enemy.maxHp : 0;
    const width = 600;

    this.bossHpBar.width = width * hpRatio;
    this.bossShieldBar.width = width * shieldRatio;
    this.bossShieldBar.setVisible((enemy.shield || 0) > 0);

    if (this.bossHpText) {
      const currentHp = Math.floor(enemy.hp).toLocaleString();
      const maxHp = Math.floor(enemy.maxHp).toLocaleString();
      this.bossHpText.setText(`${currentHp} / ${maxHp}`);
    }
  }
  private updateTexts() {
    // Update Boss Name
    if (
      this.bossNameText &&
      this.bossUiContainer &&
      this.bossUiContainer.visible
    ) {
      // We can't easily get the boss template name here without storing it.
      // However, since we cleared enemies on map change, the boss specific UI is recreated.
      // If language changes mid-fight, the boss name might remain in old language until respawn/map change
      // unless we store the name key.
      // For now, let's assume boss name update is less critical or handled if we had the key.
      // Actually, we can try to look up the boss in `this.enemies`.
      const boss = Array.from(this.enemies.values()).find((e) =>
        e.getData('isBoss'),
      );
      if (boss) {
        const monsterId = boss.getData('monsterId');
        if (monsterId && MONSTER_DATABASE[monsterId]) {
          this.bossNameText.setText(MONSTER_DATABASE[monsterId].name);
        }
      }
    }

    // Update Level Texts
    this.enemyLevelTexts.forEach((text, id) => {
      const enemy = this.enemies.get(id);
      if (enemy) {
        const monsterId = enemy.getData('monsterId');
        const level = enemy.getData('level');
        if (monsterId && level) {
          const template = MONSTER_DATABASE[monsterId];
          if (template) {
            const tierStr = levelToTier(level);
            const name = template.name;
            text.setText(`Lv.${level} ${tierStr}. ${name}`);
          }
        }
      }
    });

    // Interaction Hint
    if (this.interactHint) {
      this.interactHint.setText('Interact [F]');
    }
  }
}
