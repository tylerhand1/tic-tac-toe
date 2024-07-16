interface TurnInfoProps {
  getPlayerName: () => string
}

const TurnInfo = ({ getPlayerName } : TurnInfoProps) => (
  <>
    <h2>{getPlayerName()}`&apos;s turn</h2>
  </>
);

export default TurnInfo;