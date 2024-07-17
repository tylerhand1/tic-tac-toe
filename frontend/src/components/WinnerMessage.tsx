import { getPlayerName } from '@/utils/playerInfo';

interface WinnerProps {
  isTie: boolean,
  winner: number
}

const WinnerMessage = ({ isTie, winner }: WinnerProps) => {
  return (
    <>
      {isTie ? <h2>
          It&apos;s a tie!
      </h2>
        : <h2>
          {getPlayerName(winner)} has won!
        </h2>
      }
    </>
  );
};

export default WinnerMessage;