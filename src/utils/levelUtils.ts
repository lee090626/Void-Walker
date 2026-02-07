/**
 * Converts a numeric level to a Roman numeral Tier string.
 */
export const levelToTier = (level: number, isBoss: boolean = false): string => {
  if (isBoss) return 'Tier ✦';

  if (level <= 10) return 'Tier I';
  if (level <= 30) return 'Tier II';
  if (level <= 60) return 'Tier III';
  if (level <= 100) return 'Tier IV';
  if (level <= 200) return 'Tier V';
  if (level <= 350) return 'Tier VI';
  return 'Tier VII';
};

/**
 * Calculates a hex color code based on the level difference between player and monster.
 */
export const getDifficultyColor = (
  playerLevel: number,
  monsterLevel: number,
  isBoss: boolean = false,
): string => {
  if (isBoss) return '#ffd700'; // Gold for Bosses

  const diff = monsterLevel - playerLevel;

  if (diff >= 10) return '#ff4444'; // Red - Very Dangerous
  if (diff >= 5) return '#ffa500'; // Orange - Threatening
  if (diff <= -10) return '#44ff44'; // Green - Weak
  return '#ffffff'; // White - Normal
};
