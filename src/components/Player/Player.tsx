'use client';

import React, { FC } from 'react';
import { PlayerWrapper } from './Player.styled';

interface PlayerProps {playerPosition: string, playerName: string, playerPoints: number}

const Player: FC<PlayerProps> = ({playerPosition, playerName, playerPoints}) => (
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
            {playerPoints}
         </div>
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
