import { socket } from '@/socket';
import { InviteFriendProps } from '@/types';

const InviteFriend = ({ inviteCode, setInviteCode }: InviteFriendProps) => {
  socket.on('create-success', (inviteCode: number | undefined) => {
    if (inviteCode !== undefined) {
      setInviteCode(inviteCode);
    }
  });

  const handleClick = async (): Promise<void> => {
    if (inviteCode !== undefined) {
      await navigator.clipboard.writeText(inviteCode.toString());
    }
  };

  return (
    <>
      <div className='invite-code-container'>
        <button
          className='invite-code-btn'
          value={inviteCode}
          onClick={() => {
            void handleClick();
          }}
        >
          Invite your friend {inviteCode}
        </button>
      </div>
    </>
  );
};

export default InviteFriend;