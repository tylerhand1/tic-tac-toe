interface TurnInfoProps {
  player: number,
  getPlayerName: () => string
}


const TurnInfo = ({ player, getPlayerName} : TurnInfoProps) => {
  return (
    <>
      <h2>{getPlayerName()}'s turn</h2>
    </>
  );
};

export default TurnInfo;