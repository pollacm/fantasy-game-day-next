'use client';

import React, { FC } from 'react';
import { TeamWrapper } from './Team.styled';
import Player from '../Player/Player';

interface TeamProps {}

const Team: FC<TeamProps> = () => (
 <TeamWrapper data-testid="Team" style={{  backgroundColor: "red", display: 'inline-block' }}>
    
    <Player></Player>
    <Player></Player>
    <Player></Player>
    <Player></Player>
    <Player></Player>
    <Player></Player>
    
 </TeamWrapper>
);

export default Team;
