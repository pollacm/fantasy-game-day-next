'use client';

import React, { FC } from 'react';
import { TeamWrapper } from './Team.styled';
import Player from '../Player/Player';
import { PlayerData } from '../Player/PlayerData';

interface TeamProps {homePlayerName: string, homePlayerPosition:string, homePlayerPoints:number, homePlayerSubbedInFor:string, homePlayerSubbedOutFor:string, awayPlayer: PlayerData}

const Team: FC<TeamProps> = ({homePlayerName, homePlayerPosition, homePlayerPoints, homePlayerSubbedInFor, homePlayerSubbedOutFor, awayPlayer}) => (
 <TeamWrapper data-testid="Team" style={{  backgroundColor: "red", display: 'inline-block' }}>
        
        <Player key="1" playerPosition={homePlayerPosition} 
            playerName={homePlayerName}
            playerPoints={homePlayerPoints} 
            subbedInFor={homePlayerSubbedInFor}
            subbedOutFor={homePlayerSubbedOutFor}></Player>
        <Player key="2" playerPosition={awayPlayer.playerPosition}
            playerName={awayPlayer.playerName}
            playerPoints={awayPlayer.playerPoints} 
            subbedInFor={awayPlayer.subbedInFor}
            subbedOutFor={awayPlayer.subbedOutFor}></Player>
        
 </TeamWrapper>
);

export default Team;
