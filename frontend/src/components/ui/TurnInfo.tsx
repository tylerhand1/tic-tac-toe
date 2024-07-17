import { TurnInfoProps } from '@/types';
import { getPlayerName } from '@/utils/playerInfo';

const TurnInfo = ({ playerTurn, player } : TurnInfoProps) => (
  <div className='player-info-container'>
    <h2>{getPlayerName(playerTurn)}&apos;s turn</h2>
    <h3>You are {getPlayerName(player)}</h3>
  </div>
);

export default TurnInfo;