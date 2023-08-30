'use client';

import React, { FC } from 'react';
import { GameScoreWrapper } from './GameScore.styled';

interface GameScoreProps {}

const GameScore: FC<GameScoreProps> = () => (
 <GameScoreWrapper data-testid="GameScore">
    GameScore Component
 </GameScoreWrapper>
);

export default GameScore;
