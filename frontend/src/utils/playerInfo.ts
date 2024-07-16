export const getPlayerName = (player: number): string => {
  return player === 0 ? 'X' : 'O';
};