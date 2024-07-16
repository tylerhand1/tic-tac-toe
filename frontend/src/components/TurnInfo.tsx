import { TurnInfoProps } from '@/types';
import { getPlayerName } from '@/utils/playerInfo';

const TurnInfo = ({ player } : TurnInfoProps) => (
  <>
    <h2>{getPlayerName(player)}&apos;s turn</h2>
  </>
);

export default TurnInfo;