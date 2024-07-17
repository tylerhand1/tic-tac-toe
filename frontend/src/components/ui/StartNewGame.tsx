const StartNewGame = () => {
  const handleClick = (): void => {
    window.location.reload();
  };

  return (
    <>
      <div className='invite-code-container'>
        <button
          className='new-game-btn'
          onClick={() => {
            void handleClick();
          }}
        >
          Find or create new game
        </button>
      </div>
    </>
  );
};

export default StartNewGame;