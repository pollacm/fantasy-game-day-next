'use client';

import React, { useEffect, useState } from 'react';
import { MatchupWrapper } from './Matchup.styled';
import Team from '../Team/Team'
import { MatchupData } from './MatchupData';
import { PlayerData } from '../Player/PlayerData';
import { Match } from '@testing-library/react';

interface MatchupProps {league: string, matchupData:MatchupData, subsEnabled: boolean, captainsEnabled: boolean}

function Matchup(props: MatchupProps) {
   const [filteredPlayers, setFilteredPlayers] = useState<PlayerData[]>()
   const [playersToSub, setPlayersToSub] = useState<string[]>([])

   useEffect(() => {
      const mappedData = props.matchupData.homePlayers.map(item => {return item});
      setFilteredPlayers(mappedData);
    }, [props.matchupData.homePlayers])

   //  useEffect(() => {
   //    if(filteredPlayers){
   //       let swappedPlayers;
   //       playersToSub.forEach(sub => {
   //          let splitSub = sub.split(':');            
   //          if(splitSub && splitSub.length === 2 )
   //          {
   //             const playerSubbedInFor = splitSub[0];
   //             const playerSubbedOutFor = splitSub[1];

   //             swappedPlayers = filteredPlayers.map(p => {
   //                if(p.playerName === playerSubbedInFor){
   //                   console.log('updating player', p.playerName + " subbing in for " + playerSubbedOutFor)
   //                   return { ...p, subbedInFor: playerSubbedOutFor };
   //                }
   //                if(p.playerName === playerSubbedOutFor){
   //                   console.log('updating player', p.playerName + " subbing out for " + playerSubbedInFor)
   //                   return { ...p, playerSubbedOutFor: playerSubbedInFor };
   //                }
   //                return p;      
   //             });
      
   //             let subIn = filteredPlayers.filter(p => p.playerName === playerSubbedOutFor)[0];
   //             let subOut = filteredPlayers.filter(p => p.playerName === playerSubbedInFor)[0];
               
   //             [swappedPlayers[subIn.order], swappedPlayers[subOut.order]] = [swappedPlayers[subOut.order], swappedPlayers[subIn.order]];
   //          }            
   //       });
   //          if(swappedPlayers){
   //             setFilteredPlayers(swappedPlayers)
   //          }            
   //       }      
   //  }, [playersToSub, filteredPlayers])
    
   const getAvailableSubPositions = (position: string) => {
      let availablePositions = [];
      const positionSplit = position.split(',');
      if(position === "QB"){
         availablePositions.push("QB");
      }
      if(position === "RB" ){
         availablePositions.push("RB");
      }
      if(position === "WR" ){
         availablePositions.push("WR");
      }
      if(position === "TE" ){
         availablePositions.push("TE");
      }
      if(position === "W/R/T" ){
         availablePositions.push("TE");
         availablePositions.push("WR");
         availablePositions.push("RB");
      }
      if(position === "K" ){
         availablePositions.push("K");
      }
      if(position === "D" ){
         availablePositions.push("LB");
         availablePositions.push("DT");
         availablePositions.push("DE");
         availablePositions.push("DL");
         availablePositions.push("DB");
      }
      if(position === "DB" ){
         availablePositions.push("DB");
      }
      if(position === "DL" ){
         availablePositions.push("DT");
         availablePositions.push("DE");
         availablePositions.push("DL");
      }
      if(position === "LB" ){
         availablePositions.push("LB");
      }

      return availablePositions;
   }

   const setPlayerSubsByName = (playerSubbedInFor:string, playerSubbedOutFor:string, homePlayers: boolean) =>
   {      
      
      if(homePlayers && filteredPlayers){
         
         let swappedPlayers;
         if(playerSubbedInFor === '')
         {            
            let subbedOutPlayer = filteredPlayers.filter(p => p.playerName === playerSubbedOutFor)[0];
            let subbedInPlayer = filteredPlayers.filter(p => p.playerName === subbedOutPlayer.subbedOutFor)[0];
            let subbedInForPlayerName = subbedOutPlayer.subbedOutFor;

            setPlayersToSub(playersToSub.filter(p => p !== subbedOutPlayer.subbedOutFor));

            swappedPlayers = filteredPlayers.map(p => {
               if(p.playerName === playerSubbedOutFor){                        
                  return { ...p, subbedOutFor: '' };
               }
               if(p.playerName === subbedInForPlayerName){
                  return { ...p, subbedInFor: '' };
               }            
               return p;      
            });    
            
            [swappedPlayers[subbedOutPlayer.order], swappedPlayers[subbedInPlayer.order]] = [swappedPlayers[subbedInPlayer.order], swappedPlayers[subbedOutPlayer.order]];    
         }
         else{
            let subbedOutPlayer = filteredPlayers.filter(p => p.playerName === playerSubbedOutFor)[0];
            let subbedInPlayer = filteredPlayers.filter(p => p.playerName === playerSubbedInFor)[0];

            swappedPlayers = filteredPlayers.map(p => {
               if(p.playerName === playerSubbedOutFor){
                  setPlayersToSub([...playersToSub, playerSubbedInFor]);
                  return { ...p, subbedOutFor: playerSubbedInFor };
               }
               if(p.playerName === playerSubbedInFor){
                  return { ...p, subbedInFor: playerSubbedOutFor };
               }            
               return p;      
            });         
            
            [swappedPlayers[subbedOutPlayer.order], swappedPlayers[subbedInPlayer.order]] = [swappedPlayers[subbedInPlayer.order], swappedPlayers[subbedOutPlayer.order]];            
         }
         
         setFilteredPlayers([...swappedPlayers]);         
      }      
      
      return;
   }

   // let subsHome;
   //    let subsAway;
      
   //    if(props.subsEnabled && props.matchupData.homePlayers.length > 0) { 
   //       subsHome = 
   //             <p>Subs</p>
   //             {props.subsEnabled && props.matchupData.homePlayers.length > 0 && props.matchupData.homePlayers.filter(p => p.isStarter).map(p => {
   //                {console.log('player', p.playerName)}
   //                <div>                                          
   //                   <div>{p.playerName}</div>
   //                   <select
   //                      className="select-button"
                        
   //                      onChange={(e) => this.setPlayerSubsByName(e.target.value, p.playerName, true)}>
   //                      <option></option>
   //                      {props.matchupData.homePlayers.filter(b => !b.isStarter && b.playerName !== "BENCH" &&
   //                                                          this.getAvailableSubPositions(p.playerPosition).includes(b.playerPosition) && 
   //                                                          props.matchupData.homePlayers.some(a => 
   //                                                             {
   //                                                                 return a.subbedOutFor !== b.playerName;
   //                                                             })).map((b, index) =>
   //                      <option key={index} value={b.playerName}>{b.playerName}</option>
   //                      )};
   //                   </select>
   //                </div>;         
   //             });
               
   //    }}
   return (<MatchupWrapper data-testid="Matchup">
        {/* <div style={{display: 'inline'}}>
           <Team></Team>
        </div>
     */}
      <h1>{props.league}</h1>
      <div className='team-container'>        
         {filteredPlayers && filteredPlayers.map((p, index) => ( 
         <Team key={index} homePlayerName={p.playerName} homePlayerPosition={p.playerPosition} homePlayerPoints={p.playerPoints} homePlayerSubbedInFor={p.subbedInFor} homePlayerSubbedOutFor={p.subbedOutFor} awayPlayer={props.matchupData.awayPlayers[index]}></Team>))}
         {/* {props.matchupData && props.matchupData.homePlayers && props.matchupData.homePlayers.map((p, index) => ( <Team key={index} homePlayer={p} awayPlayer={props.matchupData.awayPlayers[index]}></Team>))} */}
         {props.subsEnabled && filteredPlayers && filteredPlayers.filter(p => p.isStarter)
         .sort((n1:PlayerData, n2:PlayerData) => n1.order < n2.order ? -1 : 1).map((p, index) => ( 
            <div key={index}>                                          
            <p>{p.playerName}</p>
            <select
               className="select-button"     
               value={p.subbedOutFor}
               onChange={(e) => setPlayerSubsByName(e.target.value, p.playerName, true)}>
               {p.subbedOutFor ? <><option selected>{p.subbedOutFor}</option> <option></option></> : <option></option>}
               
               {filteredPlayers && filteredPlayers.filter(b => !b.isStarter  && b.playerName !== "BENCH" && 
                                                   getAvailableSubPositions(p.playerPosition).includes(b.playerPosition) && 
                                                   !playersToSub.some(a => a === b.playerName)).map((b, index) =>
                                                   
                                                   // getAvailableSubPositions(p.playerPosition).includes(b.playerPosition)).map((b, index) =>
                                                   

                                                   // getAvailableSubPositions(p.playerPosition).includes(b.playerPosition) && 
                                                   // !filteredPlayers.some(a => a.subbedOutFor === b.playerName)).map((b, index) =>
               <option key={index} value={b.playerName}>{b.playerName}</option>
               )};
            </select>
         </div>
         ))}
      </div>
      
      </MatchupWrapper> )
}

export default Matchup;
   
