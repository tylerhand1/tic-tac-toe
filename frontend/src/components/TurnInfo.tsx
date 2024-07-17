import { TurnInfoProps } from '@/types';
import { getPlayerName } from '@/utils/playerInfo';

const TurnInfo = ({ playerTurn, player } : TurnInfoProps) => (
  <>
    <h2>{getPlayerName(playerTurn)}&apos;s turn</h2>
    <h2>You are {getPlayerName(player)}</h2>
  </>
);

export default TurnInfo;