import { socket } from '@/socket';
import { useState } from 'react';

const InviteFriend = () => {
  const [inviteCode, setInviteCode] = useState<number | undefined>(undefined);

  socket.on('create-success', (inviteCode: number | undefined) => {
    if (inviteCode !== undefined) {
      setInviteCode(inviteCode);
    }
  })

  const handleClick = () => {
    if (inviteCode !== undefined) {
      navigator.clipboard.writeText(inviteCode.toString());
    }
  };

  return (
    <>
      <div className='invite-code-container'>
        <button 
          className='invite-code-btn'
          value={inviteCode}
          onClick={() => {
            handleClick();
          }}
        >
          Invite your friend {inviteCode}
        </button>
      </div>
    </>
  )
};

export default InviteFriend;