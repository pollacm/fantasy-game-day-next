'use client';

import React, { FC } from 'react';
import { TeamWrapper } from './Team.styled';
import Player from '../Player/Player';
import { PlayerData } from '../Player/PlayerData';

interface TeamProps {homePlayerName: string, homePlayerPosition:string, homePlayerPoints:number, homePlayerSubbedInFor:string, homePlayerSubbedOutFor:string,
    awayPlayerName: string, awayPlayerPosition:string, awayPlayerPoints:number, awayPlayerSubbedInFor:string, awayPlayerSubbedOutFor:string,}

const Team: FC<TeamProps> = ({homePlayerName, homePlayerPosition, homePlayerPoints, homePlayerSubbedInFor, homePlayerSubbedOutFor, 
    awayPlayerName, awayPlayerPosition, awayPlayerPoints, awayPlayerSubbedInFor, awayPlayerSubbedOutFor, }) => (
 <TeamWrapper data-testid="Team" style={{  backgroundColor: "red", display: 'inline-block' }}>
        
        <Player key="1" playerPosition={homePlayerPosition} 
            playerName={homePlayerName}
            playerPoints={homePlayerPoints} 
            subbedInFor={homePlayerSubbedInFor}
            subbedOutFor={homePlayerSubbedOutFor}></Player>
        <Player key="2" playerPosition={awayPlayerPosition} 
            playerName={awayPlayerName}
            playerPoints={awayPlayerPoints} 
            subbedInFor={awayPlayerSubbedInFor}
            subbedOutFor={awayPlayerSubbedOutFor}></Player>
        
 </TeamWrapper>
);

export default Team;
