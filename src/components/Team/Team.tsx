'use client';

import React, { FC } from 'react';
import Player from '../Player/Player';
import { PlayerData } from '../Player/PlayerData';

interface TeamProps {
    homePlayerName: string,
    homePlayerPosition: string,
    homePlayerPoints: number,
    homePlayerSubPoints: number,
    homePlayerCaptainPoints: number,
    homePlayerSubbedInFor: string,
    homePlayerSubbedOutFor: string,
    homePlayerLastUpdateTime: string,
    homePlayerGameInfo: string,
    homePlayerIsMyTeam: boolean,
    awayPlayerName: string,
    awayPlayerPosition: string,
    awayPlayerPoints: number,
    awayPlayerSubPoints: number,
    awayPlayerCaptainPoints: number,
    awayPlayerSubbedInFor: string,
    awayPlayerSubbedOutFor: string,
    awayPlayerLastUpdateTime: string
    awayPlayerGameInfo: string,
    awayPlayerIsMyTeam: boolean,
}

const Team: FC<TeamProps> = ({
    homePlayerName,
    homePlayerPosition,
    homePlayerPoints,
    homePlayerSubPoints,
    homePlayerCaptainPoints,
    homePlayerSubbedInFor,
    homePlayerSubbedOutFor,
    homePlayerLastUpdateTime,
    homePlayerGameInfo,
    homePlayerIsMyTeam,
    awayPlayerName,
    awayPlayerPosition,
    awayPlayerPoints,
    awayPlayerSubPoints,
    awayPlayerCaptainPoints,
    awayPlayerSubbedInFor,
    awayPlayerSubbedOutFor,    
    awayPlayerLastUpdateTime,
    awayPlayerGameInfo,
    awayPlayerIsMyTeam }) => (
    <div data-testid={`position-${homePlayerPosition}`} className="flex col-span-2 justify-between">
        <Player key="1" playerPosition={homePlayerPosition}
            playerName={homePlayerName}
            playerPoints={homePlayerPoints}
            playerSubPoints={homePlayerSubPoints}
            playerCaptainPoints={homePlayerCaptainPoints}
            subbedInFor={homePlayerSubbedInFor}            
            subbedOutFor={homePlayerSubbedOutFor}
            lastUpdateTime={homePlayerLastUpdateTime}
            gameInfo={homePlayerGameInfo}
            isMyTeam={homePlayerIsMyTeam}></Player>
        <Player key="2" playerPosition={awayPlayerPosition}
            playerName={awayPlayerName}
            playerPoints={awayPlayerPoints}
            playerSubPoints={awayPlayerSubPoints}
            playerCaptainPoints={awayPlayerCaptainPoints}
            subbedInFor={awayPlayerSubbedInFor}
            subbedOutFor={awayPlayerSubbedOutFor}
            lastUpdateTime={awayPlayerLastUpdateTime}
            gameInfo={awayPlayerGameInfo}
            isMyTeam={awayPlayerIsMyTeam}></Player>
    </div>
);

export default Team;
