import { Scene } from 'phaser';
import type { GameState } from '../../types/game';
import { TILE_SIZE, MAP_WIDTH, MAP_HEIGHT } from '../data/townMap';
import { getMapTileData } from '../data/worldMaps';
import { WORLD_DATABASE } from '../../types/world';
import { MONSTER_DATABASE } from '../../types/monster';
import { ITEM_DATABASE } from '../../types/item';

export class MainScene extends Scene {
  private player!: Phaser.GameObjects.Sprite;
  private enemies: Map<
    string,
    Phaser.GameObjects.Sprite | Phaser.GameObjects.Rectangle
  > = new Map();
  private enemyHpBars: Map<
    string,
    { bg: Phaser.GameObjects.Rectangle; fg: Phaser.GameObjects.Rectangle }
  > = new Map();
  private enemyHpMap: Map<string, number> = new Map();
  private attackRangeCircle!: Phaser.GameObjects.Arc;
  private portals: Map<string, Phaser.GameObjects.Container> = new Map();
  private droppedItems: Map<string, Phaser.GameObjects.Container> = new Map();
  private currentMapId: string = 'town';
  private hasSyncedSpawnFromState = false;
  private lastPortalTimeMs = -Infinity;
  private lastPlayerSyncMs = -Infinity;
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
  private npcs: Map<
    string,
    | Phaser.GameObjects.Sprite
    | Phaser.GameObjects.Rectangle
    | Phaser.GameObjects.Container
  > = new Map();
  private activeUI = 'None';
  private isNearSpaceship = false;
  private currentPlayerStyle = -1; // Added to track style changes
  private playerMoveSpeedMultiplier = 1;
  private interactHint!: Phaser.GameObjects.Text;

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

    for (const item of Object.values(ITEM_DATABASE)) {
      if (item.icon) {
        this.load.image(`item-${item.id}`, item.icon);
      }
    }

    // Player Assets (Fixed to Chibi Style)
    this.load.image('player-main', 'assets/player/player_style_4.png');
    this.load.image('player-up', 'assets/player/player_style_4_up.png');
    this.load.image('player-side', 'assets/player/player_style_4_side.png');
  }

  create() {
    console.log('MainScene: create()');

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

    // 4. Camera Follow
    // Set bounds so camera doesn't show too much empty black space if map is small
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setZoom(1.0); // Reset zoom to 1 to see more context if needed, or keep 1.5

    // 4.5. Interaction Hint
    this.interactHint = this.add
      .text(0, 0, '[F] 대화하기', {
        fontSize: '16px',
        color: '#ffffff',
        backgroundColor: '#00000088',
        padding: { x: 8, y: 4 },
      })
      .setDepth(20)
      .setOrigin(0.5)
      .setVisible(false);

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

    window.addEventListener('attack-ready', () => {
      if (this.currentSettings.cooldownVisualMode === 3 && this.player) {
        this.flashPlayer();
      }
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
      data,
      tileWidth: TILE_SIZE,
      tileHeight: TILE_SIZE,
    });

    const tileset = this.tilemap.addTilesetImage(
      'tileset-texture',
      'tileset-texture',
      TILE_SIZE,
      TILE_SIZE,
      0,
      0,
    );

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
          this.enemyHpBars.delete(id);
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

          const fg = this.add.rectangle(
            0,
            0,
            template.hpBarWidth,
            barH,
            0xff3333,
            1,
          );
          fg.setOrigin(0, 0.5);
          fg.setDepth(12);

          this.enemyHpBars.set(enemy.id, { bg, fg });
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

      const bars = this.enemyHpBars.get(enemy.id);
      if (bars && template) {
        const ratio =
          enemy.maxHp > 0
            ? Math.max(0, Math.min(1, enemy.hp / enemy.maxHp))
            : 0;
        const x =
          enemy.position.x + template.hpBarOffset.x - template.hpBarWidth / 2;
        const y = enemy.position.y + template.hpBarOffset.y;

        bars.bg.setPosition(x, y);
        bars.fg.setPosition(x, y);
        bars.bg.setSize(template.hpBarWidth, 6);
        bars.fg.setSize(template.hpBarWidth * ratio, 6);
      }
    });

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
          if (npc.type === 'Spaceship') textureKey = 'spaceship';
          else if (npc.type === 'Merchant') textureKey = 'npc-merchant';
          else if (npc.type === 'Blacksmith') textureKey = 'npc-blacksmith';

          if (textureKey || npc.type === 'Guide') {
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

  // Draw ranges and hitboxes - will be called in update for movement sync
  private drawRanges() {
    this.rangeGraphics.clear();
    this.enemyHitboxGraphics.clear();
    this.cooldownGraphics.clear();

    const weaponRange = this.currentWeapon?.range || 0;
    const px = this.player.x;
    const py = this.player.y;

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

    // 4. Draw Synergy Auras
    this.currentEnemies.forEach((enemy: any) => {
      if (enemy.synergyActive) {
        this.rangeGraphics.lineStyle(2, 0x00ffff, 0.4);
        this.rangeGraphics.fillStyle(0x00ffff, 0.1);

        const auraSize = Math.max(enemy.size.x, enemy.size.y) * 0.8;
        this.rangeGraphics.fillEllipse(
          enemy.position.x,
          enemy.position.y + 20,
          auraSize,
          auraSize / 2,
        );
        this.rangeGraphics.strokeEllipse(
          enemy.position.x,
          enemy.position.y + 20,
          auraSize,
          auraSize / 2,
        );
      }
    });
  }

  update() {
    if (!this.player || !this.cursors || !this.wasd) return;

    // Check for nearest NPC for hint
    const currentMap = WORLD_DATABASE[this.currentMapId];
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

      const baseSpeed = 4;
      const finalSpeed = baseSpeed * this.playerMoveSpeedMultiplier;

      this.player.x += vx * finalSpeed;
      this.player.y += vy * finalSpeed;
      this.player.setData('direction', Math.atan2(vy, vx));

      // 1. Update Directional Visuals in real-time
      if (Math.abs(vy) > Math.abs(vx)) {
        // Vertical movement is dominant
        if (vy < 0) {
          this.player.setTexture('player-up');
        } else {
          this.player.setTexture('player-main');
        }
        this.player.setFlipX(false);
      } else {
        // Horizontal movement is dominant
        this.player.setTexture('player-side');
        this.player.setFlipX(vx > 0); // Asset faces left, so flip if moving right
      }
      this.player.setDisplaySize(128, 128); // Ensure size is kept after texture swap
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
    }
  }
}
