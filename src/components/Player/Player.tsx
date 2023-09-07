'use client';

import React, { FC } from 'react';

interface PlayerProps {
   playerPosition: string,
   playerName: string,
   playerPoints: number,
   playerSubPoints: number,
   playerCaptainPoints: number,
   subbedInFor: string,
   subbedOutFor: string
}

const Player: FC<PlayerProps> = ({
   playerPosition,
   playerName,
   playerPoints,
   playerSubPoints,
   playerCaptainPoints,
   subbedInFor,
   subbedOutFor
}) => (
   <>
      {playerName !== "BENCH" ?
         <>
            <div className='player-info flex gap-2 col-span-2 text-xs p-1'>
               <div className="position text-blue-400">
                  {playerPosition}
               </div>
               <div className="name truncate">
                  {playerName}
               </div>
               <div className="points text-blue-300">
                  {playerSubPoints !== 0 ? playerSubPoints : playerCaptainPoints !== 0 ? playerCaptainPoints : playerPoints}
               </div>
            </div>
            <div className='subs'>
               <div className="position">
                  {subbedInFor !== '' ? `Subbed: ${subbedInFor}` : <></>}
                  {subbedOutFor !== '' ? subbedOutFor : <></>}
               </div>
            </div>
         </>
         :
         <div className="player-container flex-1">
            <div className="bench">
               {playerName}
            </div>
         </div>
      }
   </>
);

export default Player;
