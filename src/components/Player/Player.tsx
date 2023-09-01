'use client';

import React, { FC } from 'react';
import { PlayerWrapper } from './Player.styled';

interface PlayerProps {homePlayerPosition: string, homePlayerName: string, homePlayerPoints: number, awayPlayerPosition: string, awayPlayerName: string, awayPlayerPoints: number}

const Player: FC<PlayerProps> = ({homePlayerPosition, homePlayerName, homePlayerPoints, awayPlayerPosition, awayPlayerName, awayPlayerPoints}) => (
   homePlayerName !== "BENCH" ?
   <PlayerWrapper data-testid="Player">    
      <div className="player-container">
        <div className="position">
           {homePlayerPosition}
        </div>
        <div className="name">
           {homePlayerName}
        </div>    
        <div className="points">
           {homePlayerPoints}
        </div>
      </div>
      
      <div className="player-container">
        <div className="position">
           {awayPlayerPosition}
        </div>
        <div className="name">
           {awayPlayerName}
        </div>    
        <div className="points">
           {awayPlayerPoints}
        </div>
      </div> 
      </PlayerWrapper>:     
      <PlayerWrapper data-testid="Player">    
      <div className="player-container" style={{width: '100%', textAlign: 'center'}}>
        <div className="bench">
           {homePlayerName}      
        </div>
      </div>
     </PlayerWrapper>
   );

export default Player;
