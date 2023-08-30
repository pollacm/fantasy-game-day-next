'use client';

import React, { FC } from 'react';
import { GameTeamWrapper } from './GameTeam.styled';

interface GameTeamProps {}

const GameTeam: FC<GameTeamProps> = () => (
 <GameTeamWrapper data-testid="GameTeam">
    GameTeam Component
 </GameTeamWrapper>
);

export default GameTeam;
