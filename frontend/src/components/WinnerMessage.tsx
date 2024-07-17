import { getPlayerName } from '@/utils/playerInfo';

interface WinnerProps {
  winner: number
}

const WinnerMessage = ({ winner }: WinnerProps) => {
  return (
    <h2>
      {getPlayerName(winner)} has won!
    </h2>
  );
};

export default WinnerMessage;