'use client';

import React, { FC } from 'react';
import { MatchupWrapper } from './Matchup.styled';
import Team from '../Team/Team'

interface MatchupProps {league: any}

const Matchup: FC<MatchupProps> = ({league}) => (
 <MatchupWrapper data-testid="Matchup">
        {/* <div style={{display: 'inline'}}>
           <Team></Team>
        </div>
     */}
     <h1>{league}</h1>
     <div className='team-container'>
         <Team></Team>
     </div>
     <div className='team-container'>
         <Team></Team>
     </div>
 </MatchupWrapper>
);

export default Matchup;
