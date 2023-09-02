'use client';

import React, { FC } from 'react';
import { TeamWrapper } from './Team.styled';
import Player from '../Player/Player';
import { PlayerData } from '../Player/PlayerData';

interface TeamProps {homePlayer: PlayerData, awayPlayer: PlayerData}

const Team: FC<TeamProps> = ({homePlayer, awayPlayer}) => (
 <TeamWrapper data-testid="Team" style={{  backgroundColor: "red", display: 'inline-block' }}>
        
        <Player playerPosition={homePlayer.playerPosition} 
            playerName={homePlayer.playerName}
            playerPoints={homePlayer.playerPoints} ></Player>
        <Player playerPosition={awayPlayer.playerPosition}
            playerName={awayPlayer.playerName}
            playerPoints={awayPlayer.playerPoints} ></Player>
        
 </TeamWrapper>
);

export default Team;
