'use client';

import React, { FC } from 'react';

interface PlayerProps { playerPosition: string, playerName: string, playerPoints: number, playerSubPoints: number, playerCaptainPoints: number, subbedInFor: string, subbedOutFor: string }

const Player: FC<PlayerProps> = ({ playerPosition, playerName, playerPoints, playerSubPoints, playerCaptainPoints, subbedInFor, subbedOutFor }) => (
   <div data-testid="Player">
      {playerName !== "BENCH" ?
         <div className="player-container flex-col my-1">
            <div className='player-position-wrapper flex flex-row gap-3 p-1'>
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
         </div> :
         <div className="player-container flex-1">
            <div className="bench">
               {playerName}
            </div>
         </div>
      }

   </div>
);

export default Player;
