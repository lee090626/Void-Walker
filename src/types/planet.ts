/**
 * Planet interface defining the structure for all planets in the game
 * Requirements: 1.1, 1.4
 */
export interface Planet {
  /** Unique identifier for the planet */
  id: string;

  /** Display name of the planet */
  name: string;

  /** Theme/environment type of the planet */
  theme: string;

  /** Recommended level range for players */
  levelRange: {
    min: number;
    max: number;
  };

  /** Background color for the planet's maps */
  bgColor?: string;

  /** Description of the planet */
  description?: string;

  /** Whether the planet is currently accessible */
  isAccessible?: boolean;
}

/**
 * EtheriaPlanet class implementing the Planet interface
 * Represents the mystical Etheria planet with its ethereal theme
 * Requirements: 1.1, 1.4
 */
export class EtheriaPlanet implements Planet {
  public readonly id: string = 'aetheria';
  public readonly name: string = 'Aetheria';
  public readonly theme: string = 'ethereal';
  public readonly levelRange = {
    min: 25,
    max: 35,
  };
  public readonly bgColor: string = '#b3e5fc';
  public readonly description: string =
    'A fantastic planet where mysterious ethereal energy flows.';
  public readonly isAccessible: boolean = true;

  constructor() {
    // Initialize any additional setup if needed
  }

  /**
   * Get planet information as a plain object
   */
  getPlanetInfo(): Planet {
    return {
      id: this.id,
      name: this.name,
      theme: this.theme,
      levelRange: this.levelRange,
      bgColor: this.bgColor,
      description: this.description,
      isAccessible: this.isAccessible,
    };
  }

  /**
   * Check if the planet is suitable for a given player level
   */
  isSuitableForLevel(playerLevel: number): boolean {
    return (
      playerLevel >= this.levelRange.min && playerLevel <= this.levelRange.max
    );
  }

  /**
   * Get the difficulty rating based on player level
   */
  getDifficultyRating(
    playerLevel: number,
  ): 'easy' | 'normal' | 'hard' | 'extreme' {
    if (playerLevel > this.levelRange.max) {
      return 'easy';
    } else if (playerLevel >= this.levelRange.min) {
      return 'normal';
    } else if (playerLevel >= this.levelRange.min - 5) {
      return 'hard';
    } else {
      return 'extreme';
    }
  }
}
