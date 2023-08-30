'use client';

import React, { FC } from 'react';
import { PlayerWrapper } from './Player.styled';

interface PlayerProps {}

const Player: FC<PlayerProps> = () => (
 <PlayerWrapper data-testid="Player">
    Player Component
 </PlayerWrapper>
);

export default Player;
