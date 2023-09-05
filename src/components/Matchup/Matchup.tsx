'use client';

import React, { useEffect, useState } from 'react';
import { MatchupWrapper } from './Matchup.styled';
import Team from '../Team/Team'
import { MatchupData } from './MatchupData';
import { PlayerData } from '../Player/PlayerData';
import { Match } from '@testing-library/react';
import { start } from 'repl';

interface MatchupProps {league: string, matchupData:MatchupData, subsEnabled: boolean, captainsEnabled: boolean}

function Matchup(props: MatchupProps) {
   const [homeFilteredPlayers, setHomeFilteredPlayers] = useState<PlayerData[]>()
   const [homePlayersToSub, setHomePlayersToSub] = useState<string[]>([])
   const [homeSubs, setHomeSubs] = useState<string[]>([])
   const [homeTotalPoints, setHomeTotalPoints] = useState(0)
   const [awayFilteredPlayers, setAwayFilteredPlayers] = useState<PlayerData[]>()
   const [awaySubs, setAwaySubs] = useState<string[]>([])
   const [awayPlayersToSub, setAwayPlayersToSub] = useState<string[]>([])
   const [awayTotalPoints, setAwayTotalPoints] = useState(0)

   useEffect(() => {
      let mappedData = props.matchupData.homePlayers.map(item => {return item});
      // mappedData = [...subAllPlayers(mappedData, true)];
      
      setHomeFilteredPlayers(mappedData);
    }, [props.matchupData.homePlayers])

    useEffect(() => {
      const mappedData = props.matchupData.awayPlayers.map(item => {return item});
      setAwayFilteredPlayers(mappedData);
    }, [props.matchupData.awayPlayers])
    
   const getAvailableSubPositions = (matchupPosition: string) => {
      let availablePositions = [];      

      if(matchupPosition === "QB"){
         availablePositions.push("QB");
      }
      if(matchupPosition === "RB" ){
         availablePositions.push("RB");
      }
      if(matchupPosition === "WR" ){
         availablePositions.push("WR");
      }
      if(matchupPosition === "TE" ){
         availablePositions.push("TE");
      }
      if(matchupPosition === "W/R/T" ){         
         availablePositions.push("TE");
         availablePositions.push("WR");
         availablePositions.push("RB");
      }
      if(matchupPosition === "K" ){
         availablePositions.push("K");
      }
      if(matchupPosition === "D" ){
         availablePositions.push("LB");
         availablePositions.push("DT");
         availablePositions.push("DE");
         availablePositions.push("DL");
         availablePositions.push("DB");
      }
      if(matchupPosition === "DB" ){
         availablePositions.push("DB");
      }
      if(matchupPosition === "DL" ){
         availablePositions.push("DT");
         availablePositions.push("DE");
         availablePositions.push("DL");
      }
      if(matchupPosition === "LB" ){
         availablePositions.push("LB");
      }

      return availablePositions;
   }

   const calculateSubPoints = (starter: PlayerData, bench: PlayerData, homePlayers: boolean) => {
      const starterPositionSplit = starter.playerPosition.split(',');
      const benchPositionSplit = bench.playerPosition.split(',');
      let positionsOverlap = false;
      let fullSub = false;      
      starterPositionSplit.forEach(starterP => {
         benchPositionSplit.forEach(benchP => {
            if(starterP === benchP){
               positionsOverlap = true;
            }
         });
      });
      
      if(positionsOverlap)
      {
         fullSub = true;
      }

      return fullSub ? bench.playerPoints : (starter.playerPoints + bench.playerPoints) / 2;
   }

   const calculateTotalPoints = () => {
      let totalPoints = 0;
      if(homeFilteredPlayers)
      {
         homeFilteredPlayers.filter(p => p.isStarter).forEach(player => {
            if(player.subbedOutFor === ''){
               totalPoints += player.playerPoints;
            }
            else{
               let subbedPlayer = homeFilteredPlayers.filter(p => p.playerName === player.playerName)[0];
               totalPoints = subbedPlayer.subPoints;
            }
         });
         setHomeTotalPoints(totalPoints);
      }
      if(awayFilteredPlayers)
      {
         awayFilteredPlayers.filter(p => p.isStarter).forEach(player => {
            if(player.subbedOutFor === ''){
               totalPoints += player.playerPoints;
            }
            else{
               let subbedPlayer = awayFilteredPlayers.filter(p => p.playerName === player.playerName)[0];
               totalPoints = subbedPlayer.subPoints;
            }
         });
         setAwayTotalPoints(totalPoints);
      }
   }

   const subAllPlayers = (players: PlayerData[], home: boolean) => {
      let mappedPlayers: PlayerData[] = [];

      if(players && players.length > 0){
         if(home){
            homeSubs.forEach(homeSub => {
               let splitHomeSub = homeSub.split("::");
               mappedPlayers = [...setPlayerSubsByName(splitHomeSub[0], splitHomeSub[1], false, players)]
            }); 
         }
         else{
            awaySubs.forEach(homeSub => {
               let splitHomeSub = homeSub.split("::");
               mappedPlayers = [...setPlayerSubsByName(splitHomeSub[0], splitHomeSub[1], false, players)]
            });          
         }
      }
      return mappedPlayers;
   }

   const setPlayerSubsByName = (playerSubbedInFor:string, playerSubbedOutFor:string, homePlayers: boolean, playerData: PlayerData[]) =>
   {   
      let swappedPlayers: PlayerData[];
      if(playerData && playerData.length > 0)
      {
         let subbedOutPlayer = playerData.filter(p => p.playerName === playerSubbedOutFor)[0];
         let subbedInPlayer = playerData.filter(p => p.playerName === playerSubbedInFor)[0];

         let swappedPlayers = playerData.map(p => {
            if(p.playerName === playerSubbedOutFor){               
               return { ...p, subbedOutFor: playerSubbedInFor, subPoints: calculateSubPoints(subbedOutPlayer, subbedInPlayer, true) };
            }
            if(p.playerName === playerSubbedInFor){
               return { ...p, subbedInFor: playerSubbedOutFor, subPoints: 0 };
            }            
            return p;      
         });         
         
         [swappedPlayers[subbedOutPlayer.order], swappedPlayers[subbedInPlayer.order]] = [swappedPlayers[subbedInPlayer.order], swappedPlayers[subbedOutPlayer.order]];  
      }
      if(homePlayers && homeFilteredPlayers){         
         if(playerSubbedInFor === '')
         {            
            let subbedOutPlayer = homeFilteredPlayers.filter(p => p.playerName === playerSubbedOutFor)[0];
            let subbedInPlayer = homeFilteredPlayers.filter(p => p.playerName === subbedOutPlayer.subbedOutFor)[0];
            let subbedInForPlayerName = subbedOutPlayer.subbedOutFor;

            setHomePlayersToSub(homePlayersToSub.filter(p => p !== subbedOutPlayer.subbedOutFor));
            setHomeSubs(homeSubs.filter(s => s !== `${subbedInPlayer.playerName}::${playerSubbedOutFor}`))

            swappedPlayers = homeFilteredPlayers.map(p => {
               if(p.playerName === playerSubbedOutFor){                        
                  return { ...p, subbedOutFor: '', subPoints: 0 };
               }
               if(p.playerName === subbedInForPlayerName){
                  return { ...p, subbedInFor: '', subPoints: 0 };
               }            
               return p;      
            });    
            
            [swappedPlayers[subbedOutPlayer.order], swappedPlayers[subbedInPlayer.order]] = [swappedPlayers[subbedInPlayer.order], swappedPlayers[subbedOutPlayer.order]];    
         }
         else{
            let subbedOutPlayer = homeFilteredPlayers.filter(p => p.playerName === playerSubbedOutFor)[0];
            let subbedInPlayer = homeFilteredPlayers.filter(p => p.playerName === playerSubbedInFor)[0];

            swappedPlayers = homeFilteredPlayers.map(p => {
               if(p.playerName === playerSubbedOutFor){
                  setHomePlayersToSub([...homePlayersToSub, playerSubbedInFor]);
                  setHomeSubs([...homeSubs, `${playerSubbedInFor}::${playerSubbedOutFor}`])

                  return { ...p, subbedOutFor: playerSubbedInFor, subPoints: 0 };
               }
               if(p.playerName === playerSubbedInFor){
                  return { ...p, subbedInFor: playerSubbedOutFor, subPoints: calculateSubPoints(subbedOutPlayer, subbedInPlayer, true) };
               }            
               return p;      
            });         
            
            [swappedPlayers[subbedOutPlayer.order], swappedPlayers[subbedInPlayer.order]] = [swappedPlayers[subbedInPlayer.order], swappedPlayers[subbedOutPlayer.order]];            
         }
         
         setHomeFilteredPlayers([...swappedPlayers]);         
      }   
      if(!homePlayers && awayFilteredPlayers){
         
         let swappedPlayers;
         if(playerSubbedInFor === '')
         {            
            let subbedOutPlayer = awayFilteredPlayers.filter(p => p.playerName === playerSubbedOutFor)[0];
            let subbedInPlayer = awayFilteredPlayers.filter(p => p.playerName === subbedOutPlayer.subbedOutFor)[0];
            let subbedInForPlayerName = subbedOutPlayer.subbedOutFor;

            setAwayPlayersToSub(awayPlayersToSub.filter(p => p !== subbedOutPlayer.subbedOutFor));
            setAwaySubs(awaySubs.filter(s => s !== `${subbedInPlayer.playerName}::${playerSubbedOutFor}`))            

            swappedPlayers = awayFilteredPlayers.map(p => {
               if(p.playerName === playerSubbedOutFor){                        
                  return { ...p, subbedOutFor: '', subPoints: 0 };
               }
               if(p.playerName === subbedInForPlayerName){
                  return { ...p, subbedInFor: '', subPoints: 0 };
               }            
               return p;      
            });    
            
            [swappedPlayers[subbedOutPlayer.order], swappedPlayers[subbedInPlayer.order]] = [swappedPlayers[subbedInPlayer.order], swappedPlayers[subbedOutPlayer.order]];    
         }
         else{
            let subbedOutPlayer = awayFilteredPlayers.filter(p => p.playerName === playerSubbedOutFor)[0];
            let subbedInPlayer = awayFilteredPlayers.filter(p => p.playerName === playerSubbedInFor)[0];

            swappedPlayers = awayFilteredPlayers.map(p => {
               if(p.playerName === playerSubbedOutFor){
                  setAwayPlayersToSub([...awayPlayersToSub, playerSubbedInFor]);
                  setAwaySubs([...awaySubs, `${playerSubbedInFor}::${playerSubbedOutFor}`])

                  return { ...p, subbedOutFor: playerSubbedInFor, subPoints: 0 };
               }
               if(p.playerName === playerSubbedInFor){
                  return { ...p, subbedInFor: playerSubbedOutFor, subPoints: calculateSubPoints(subbedOutPlayer, subbedInPlayer, false) };
               }            
               return p;      
            });         
            
            [swappedPlayers[subbedOutPlayer.order], swappedPlayers[subbedInPlayer.order]] = [swappedPlayers[subbedInPlayer.order], swappedPlayers[subbedOutPlayer.order]];            
         }
         
         setAwayFilteredPlayers([...swappedPlayers]);         
      }   
      
      return swappedPlayers;
   }
   
   return (<MatchupWrapper data-testid="Matchup">        
      <h1>{props.league}</h1>
      <div className='team-container'>        
         {homeFilteredPlayers && awayFilteredPlayers && homeFilteredPlayers.map((p, index) => ( 
         <Team key={index} 
         homePlayerName={p.playerName} homePlayerPosition={p.playerPosition} homePlayerPoints={p.playerPoints} 
         homePlayerSubPoints={p.subPoints} homePlayerSubbedInFor={p.subbedInFor} homePlayerSubbedOutFor={p.subbedOutFor} 

         awayPlayerName={awayFilteredPlayers[index].playerName} awayPlayerPosition={awayFilteredPlayers[index].playerPosition} awayPlayerPoints={awayFilteredPlayers[index].playerPoints} 
         awayPlayerSubPoints={awayFilteredPlayers[index].subPoints} awayPlayerSubbedInFor={awayFilteredPlayers[index].subbedInFor} awayPlayerSubbedOutFor={awayFilteredPlayers[index].subbedOutFor}></Team>))}
         {/* {props.matchupData && props.matchupData.homePlayers && props.matchupData.homePlayers.map((p, index) => ( <Team key={index} homePlayer={p} awayPlayer={props.matchupData.awayPlayers[index]}></Team>))} */}
         <div style={{width: '50%'}}>         
            {props.subsEnabled && homeFilteredPlayers && homeFilteredPlayers.filter(p => p.isStarter)
            .sort((n1:PlayerData, n2:PlayerData) => n1.order < n2.order ? -1 : 1).map((p, index) => ( 
               <>                                          
               <p>{p.playerName !== '' ? p.playerName + ": " + p.matchupPosition : p.matchupPosition}</p>
               <select
                  className="select-button"     
                  value={p.subbedOutFor}
                  onChange={(e) => setPlayerSubsByName(e.target.value, p.playerName, true, [])}>
                  {p.subbedOutFor ? <><option selected>{p.subbedOutFor}</option> <option></option></> : <option></option>}
                  
                  {homeFilteredPlayers && homeFilteredPlayers.filter(b => !b.isStarter  && b.playerName !== "BENCH" && 
                                                      getAvailableSubPositions(p.matchupPosition).includes(b.playerPosition) && 
                                                      !homePlayersToSub.some(a => a === b.playerName)).map((b, index) =>
                  <option key={index} value={b.playerName}>{b.playerName}</option>
                  )};
               </select>
            </>
            ))}
         </div> 
         <div style={{width: '50%'}}>         
            {props.subsEnabled && awayFilteredPlayers && awayFilteredPlayers.filter(p => p.isStarter)
            .sort((n1:PlayerData, n2:PlayerData) => n1.order < n2.order ? -1 : 1).map((p, index) => ( 
               <>                                          
               <p>{p.playerName !== '' ? p.playerName + ": " + p.matchupPosition : p.matchupPosition}</p>
               <select
                  className="select-button"     
                  value={p.subbedOutFor}
                  onChange={(e) => setPlayerSubsByName(e.target.value, p.playerName, false, [])}>
                  {p.subbedOutFor ? <><option selected>{p.subbedOutFor}</option> <option></option></> : <option></option>}
                  
                  {awayFilteredPlayers && awayFilteredPlayers.filter(b => !b.isStarter  && b.playerName !== "BENCH" && 
                                                      getAvailableSubPositions(p.matchupPosition).includes(b.playerPosition) && 
                                                      !awayPlayersToSub.some(a => a === b.playerName)).map((b, index) =>
                  <option key={index} value={b.playerName}>{b.playerName}</option>
                  )};
               </select>
            </>
            ))}
         </div>         
      </div>
      
      </MatchupWrapper> )
}

export default Matchup;
   
