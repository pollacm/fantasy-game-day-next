'use client';

import React, { FC } from 'react';
import { TeamWrapper } from './Team.styled';
import Player from '../Player/Player';
import { PlayerData } from '../Player/PlayerData';

interface TeamProps {player: PlayerData}

const Team: FC<TeamProps> = (player) => (
 <TeamWrapper data-testid="Team" style={{  backgroundColor: "red", display: 'inline-block' }}>
    <Player homePlayerPosition={player.player.homePlayerPosition} 
            homePlayerName={player.player.homePlayerName}
            homePlayerPoints={player.player.homePlayerPoints}
            awayPlayerPosition={player.player.awayPlayerPosition}
            awayPlayerName={player.player.awayPlayerName}
            awayPlayerPoints={player.player.awayPlayerPoints} ></Player>
    
 </TeamWrapper>
);

export default Team;
