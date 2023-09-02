'use client';

import React, { FC, useState } from 'react';
import { MatchupWrapper } from './Matchup.styled';
import Team from '../Team/Team'
import { MatchupData } from './MatchupData';
import Select from 'react-select';

interface MatchupProps {league: any, matchupData:MatchupData, subsEnabled: boolean, captainsEnabled: boolean}

const Matchup: React.FC<MatchupProps> = ({league, matchupData, subsEnabled, captainsEnabled}) => {
   const [sub1, setSub1] = useState<string>('');
   const [sub1Second, setSub1Second] = useState<number>(0);

   const setDropdown1 = (player: string) => {
      setSub1(player);
      setSub1Second(0);
   }

   const sub1SecondOnChange = (playerIndex: number) => 
   {
      setSub1Second(playerIndex);
      [matchupData.playerDatas[3], matchupData.playerDatas[5]] = [matchupData.playerDatas[5], matchupData.playerDatas[3]];
      console.log('matchupdata', matchupData);
   }

   let subs;
   
   if(subsEnabled && matchupData.playerDatas.length > 0) { 
      subs = 
            <div>
               <p>Subs</p>
               <select
                  className="select-button"                  
                  onChange={(e) => setDropdown1(e.target.value)}>
                  <option></option>
                  {matchupData.playerDatas.filter(p => p.isStarter).map((p, index) =>
                  <option key={index} value={p.homePlayerPosition}>{p.homePlayerName}</option>
                  )};
               </select>
               <select
                  className="select-button"
                  value={sub1Second}
                  onChange={(e) => sub1SecondOnChange(Number(e.target.value))}>
                  <option></option>
                  {matchupData.playerDatas.filter(p => p.homePlayerPosition === sub1 && !p.isStarter).map((p, index) =>
                  <option key={index} value={p.position}>{p.homePlayerName}</option>
                  )};
               </select>
            </div>;         
   }

   return (
      <MatchupWrapper data-testid="Matchup">
        {/* <div style={{display: 'inline'}}>
           <Team></Team>
        </div>
     */}
     <h1>{league}</h1>
     <div className='team-container'>
        {matchupData && matchupData.playerDatas && matchupData.playerDatas.map((p, index) => (<Team key={index} player={p}></Team>))}
        {subs}
     </div>
     
   </MatchupWrapper>
   )
}

export default Matchup;
   
