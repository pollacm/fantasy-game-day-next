'use client';

import React, { FC } from 'react';
import { MatchupWrapper } from './Matchup.styled';
import Team from '../Team/Team'
import { MatchupData } from './MatchupData';

interface MatchupProps {league: any, matchupData:MatchupData}

const Matchup: FC<MatchupProps> = ({league, matchupData}) => (
 <MatchupWrapper data-testid="Matchup">
        {/* <div style={{display: 'inline'}}>
           <Team></Team>
        </div>
     */}
     <h1>{league}</h1>
     <div className='team-container'>
        {matchupData && matchupData.playerDatas.map((p, index) => (<Team key={index} player={p}></Team>))}
     </div>
 </MatchupWrapper>
);

export default Matchup;
