'use client';

import React, { FC } from 'react';
import { PlayerWrapper } from './Player.styled';

interface PlayerProps {playerPosition: string, playerName: string, playerPoints: number, playerSubPoints: number, subbedInFor: string, subbedOutFor: string}

const Player: FC<PlayerProps> = ({playerPosition, playerName, playerPoints, playerSubPoints, subbedInFor, subbedOutFor}) => (
 <PlayerWrapper data-testid="Player">
    {playerName !== "BENCH" ?
         <div className="player-container">
         <div className="position">
            {playerPosition}
         </div>
         <div className="name">
            {playerName}
         </div>    
         <div className="points">
            {playerSubPoints !== 0 ? playerSubPoints : playerPoints}
         </div>
         {subbedInFor !== '' ? <div className="position">
            {subbedInFor}
         </div> : <></>}
         {subbedOutFor !== '' ? <div className="position">
            {subbedOutFor}
         </div> : <></>}
       </div> :
       <div className="player-container">
       <div className="bench">
          {playerName}      
       </div>
     </div>
   
   
   
   }
    
 </PlayerWrapper>
);

export default Player;
