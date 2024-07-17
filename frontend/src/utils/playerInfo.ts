export const getPlayerName = (player: number): string => {
  switch (player) {
  case 0:
    return 'X';
  case 1:
    return 'O';
  }
  return 'Invalid Player';
};