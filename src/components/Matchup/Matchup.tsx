'use client';

import React, { FC, useState } from 'react';
import { MatchupWrapper } from './Matchup.styled';
import Team from '../Team/Team'
import { MatchupData } from './MatchupData';
import Select from 'react-select';

interface MatchupProps {league: any, matchupData:MatchupData, subsEnabled: boolean, captainsEnabled: boolean}

const Matchup: React.FC<MatchupProps> = ({league, matchupData, subsEnabled, captainsEnabled}) => {
   const [sub1Position, setSub1Position] = useState<string>('');
   const [sub1Order, setSub1Order] = useState<number>(0);
   const [sub1SecondOrder, setSub1SecondOrder] = useState<number>(0);

   const setDropdown1 = (player: string) => {
      let playerOrder = Number(player.split('--')[0]);
      let playerPosition = player.split('--')[1];
      setSub1Position(playerPosition);
      setSub1Order(playerOrder);
      setSub1SecondOrder(0);
   }

   const sub1SecondOnChange = (playerOrder: number) => 
   {
      setSub1SecondOrder(playerOrder);
      [matchupData.homePlayers[3], matchupData.homePlayers[5]] = [matchupData.homePlayers[5], matchupData.homePlayers[3]];
      console.log('matchupdata', matchupData);
   }

   let subs;
   
   if(subsEnabled && matchupData.homePlayers.length > 0) { 
      subs = 
            <div>
               <p>Subs</p>
               <select
                  className="select-button"                  
                  onChange={(e) => setDropdown1(e.target.value)}>
                  <option></option>
                  {matchupData.homePlayers.filter(p => p.isStarter).map((p, index) =>
                  <option key={index} value={p.order + '--' + p.playerPosition}>{p.playerName}</option>
                  )};
               </select>
               <select
                  className="select-button"
                  value={sub1SecondOrder}
                  onChange={(e) => sub1SecondOnChange(Number(e.target.value))}>
                  <option></option>
                  {matchupData.homePlayers.filter(p => p.playerPosition === sub1Position && !p.isStarter).map((p, index) =>
                  <option key={index} value={p.order}>{p.playerName}</option>
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
        {matchupData && matchupData.awayPlayers && matchupData.awayPlayers.map((p, index) => ( <Team key={index} awayPlayer={p} homePlayer={matchupData.homePlayers[index]}></Team>))}
        {subs}
     </div>
     
   </MatchupWrapper>
   )
}

export default Matchup;
   
