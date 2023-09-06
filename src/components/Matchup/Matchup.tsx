'use client';

import React, { useEffect, useState } from 'react';
import Team from '../Team/Team'
import { MatchupData } from './MatchupData';
import { PlayerData } from '../Player/PlayerData';
import { Match } from '@testing-library/react';
import { start } from 'repl';
import debug from 'debug';

interface MatchupProps {league: string, input: string, matchupData:MatchupData, subsEnabled: boolean, captainsEnabled: boolean, onChange:any }

function Matchup(props: MatchupProps) {
   const [homeFilteredPlayers, setHomeFilteredPlayers] = useState<PlayerData[]>([])
   const [homePlayersToSub, setHomePlayersToSub] = useState<string[]>([])
   const [homeSubs, setHomeSubs] = useState<string[]>([])
   const [homeCaptain, setHomeCaptain] = useState<string>('')
   const [homeTotalPoints, setHomeTotalPoints] = useState(0)
   const [awayFilteredPlayers, setAwayFilteredPlayers] = useState<PlayerData[]>([])
   const [awaySubs, setAwaySubs] = useState<string[]>([])
   const [awayCaptain, setAwayCaptain] = useState<string>('')
   const [awayPlayersToSub, setAwayPlayersToSub] = useState<string[]>([])
   const [awayTotalPoints, setAwayTotalPoints] = useState(0)

    useEffect(() => {
      let mappedData = [...props.matchupData.awayPlayers].sort((n1:PlayerData, n2:PlayerData) => n1.subOrder < n2.subOrder ? -1 : 1).map(item => {return item});
      
      mappedData = subAllPlayers(mappedData, false);      

      setAwayFilteredPlayers([...mappedData]);

      mappedData = [...props.matchupData.homePlayers].sort((n1:PlayerData, n2:PlayerData) => n1.subOrder < n2.subOrder ? -1 : 1).map(item => {return item});
      mappedData = subAllPlayers(mappedData, true);      

      setHomeFilteredPlayers([...mappedData]);
      // props.onChange(mappedData)
    }, [props.matchupData.awayPlayers, props.matchupData.homePlayers])

    useEffect(() => {
      let mappedData = [...awayFilteredPlayers].sort((n1:PlayerData, n2:PlayerData) => n1.subOrder < n2.subOrder ? -1 : 1).map(item => {return item});
      setAwayFilteredPlayers([...mappedData])
      props.onChange(mappedData, false)

      mappedData = [...homeFilteredPlayers].sort((n1:PlayerData, n2:PlayerData) => n1.subOrder < n2.subOrder ? -1 : 1).map(item => {return item});
      setHomeFilteredPlayers([...mappedData])
      props.onChange(mappedData, true)

    }, [props.input])
    
    useEffect(() => {
      //implement captain calculation in here
      var orderedPlayers = [...homeFilteredPlayers].sort((n1:PlayerData, n2:PlayerData) => n1.subOrder < n2.subOrder ? -1 : 1).map((p, index) => {return p});
      let mappedPlayers = subAllPlayers(orderedPlayers, true);
      
      setHomeFilteredPlayers([...mappedPlayers]);
      props.onChange(mappedPlayers, true);
    }, [homeCaptain])

    useEffect(() => {
      //implement captain calculation in here
      var orderedPlayers = [...awayFilteredPlayers].sort((n1:PlayerData, n2:PlayerData) => n1.subOrder < n2.subOrder ? -1 : 1).map((p, index) => {return p});
      let mappedPlayers = subAllPlayers(orderedPlayers, false);
      
      setAwayFilteredPlayers([...mappedPlayers]);
      props.onChange(mappedPlayers, false);

    }, [awayCaptain])

    const setCaptainAndUpdatePoints = (captain: string, homeTeam: boolean) => {
         if(homeTeam){
            setHomeCaptain(captain);
         }
         else{
            setAwayCaptain(captain);
         }
    }

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
      let starterPoints = starter.captainPoints !== 0 ? starter.captainPoints : starter.playerPoints;
      let benchPoints = bench.captainPoints !== 0 ? bench.captainPoints : bench.playerPoints;
      return fullSub ? benchPoints : (starterPoints + benchPoints) / 2;
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
      let mappedPlayers: PlayerData[] = players;

      if(players && players.length > 0){
         mappedPlayers = setPlayerSubsByName('', '', home, players);
      }
      return [...mappedPlayers].sort((n1:PlayerData, n2:PlayerData) => n1.subOrder < n2.subOrder ? -1 : 1).map(item => {return item});
   }

   const setPlayerSubsByName = (playerSubbedInFor:string, playerSubbedOutFor:string, homePlayers: boolean, playerData: PlayerData[]) =>
   {   
      let swappedPlayers: PlayerData[] = [];
      
      if(playerData && playerData.length > 0){         
            swappedPlayers = playerData.map(player => {               
               let captain;
               if(homePlayers){
                  captain = playerData.filter(p => p.playerName === homeCaptain);
               }
               else{
                  captain = playerData.filter(p => p.playerName === awayCaptain);
               }

               if(captain && captain.length === 1 && player.playerName === captain[0].playerName){
                  return { ...player, captainPoints: player.playerPoints * 1.5 };
               }
               else{
                  return { ...player, captainPoints: 0 };
               }
            });
            
            swappedPlayers = swappedPlayers.map(player => {               
               
               if(player.isStarter){                    
                  return { ...player, subPoints: 0 };
               }
               else if(!player.isStarter && player.subbedInFor){
                  let subbedOutPlayer = swappedPlayers.filter(p => p.playerName === player.subbedInFor)[0];                     
                  return { ...player, subPoints: calculateSubPoints(subbedOutPlayer, player, homePlayers) };
               }
               else{
                  return player;
               }
            });         

            swappedPlayers = swappedPlayers.map((p, index) => {
               return { ...p, subOrder:  index};
            });   
      }  
      else
      {
         if(homePlayers && homeFilteredPlayers){         
            if(playerSubbedInFor === '')
            {            
               let subbedOutPlayer = homeFilteredPlayers.filter(p => p.playerName === playerSubbedOutFor)[0];
               let subbedInPlayer = homeFilteredPlayers.filter(p => p.playerName === subbedOutPlayer.subbedOutFor)[0];
               let subbedInForPlayerName = subbedOutPlayer.subbedOutFor;
   
               setHomePlayersToSub(homePlayersToSub.filter(p => p !== subbedOutPlayer.subbedOutFor));
               setHomeSubs(homeSubs.filter(s => s !== `${subbedInPlayer.playerName}::${playerSubbedOutFor}`))            
   
               swappedPlayers = [...homeFilteredPlayers].sort((n1:PlayerData, n2:PlayerData) => n1.subOrder < n2.subOrder ? -1 : 1).map(p => {
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
               let currenthomePlayers = [...homePlayersToSub]
               let currenthomeSubs = [...homeSubs];

               swappedPlayers = [...homeFilteredPlayers].sort((n1:PlayerData, n2:PlayerData) => n1.subOrder < n2.subOrder ? -1 : 1).map(p => {
                  if(p.playerName === playerSubbedOutFor){
                     currenthomePlayers = [...currenthomePlayers, playerSubbedInFor];
                     currenthomeSubs = [...currenthomeSubs, `${playerSubbedInFor}::${playerSubbedOutFor}`];
   
                     return { ...p, subbedOutFor: playerSubbedInFor, subPoints: 0 };
                  }                  
                  else if(p.playerName !== playerSubbedInFor && p.subbedInFor === playerSubbedOutFor){
                     // let currentBenchSubOrder = p.subOrder;
                     // let currentStarter = homeFilteredPlayers.filter(st => st.playerName === playerSubbedOutFor);
                     // let currentStarterSubOrder = currentStarter && currentStarter[0].subOrder;

                     currenthomePlayers = currenthomePlayers.filter(s => {return s !== p.playerName});
                     currenthomeSubs = currenthomeSubs.filter(s => {return s !== `${p.playerName}::${playerSubbedOutFor}`});

                     return { ...p, subbedInFor: '', subPoints: 0 };
                  }
                  if(p.playerName === playerSubbedInFor){
                     setHomePlayersToSub([...homePlayersToSub, playerSubbedInFor]);
                     return { ...p, subbedInFor: playerSubbedOutFor, subPoints: calculateSubPoints(subbedOutPlayer, subbedInPlayer, true) };
                  }            
                  return p;      
               });         
               
               setHomePlayersToSub([...currenthomePlayers]);
               setHomeSubs([...currenthomeSubs]);
               [swappedPlayers[subbedOutPlayer.order], swappedPlayers[subbedInPlayer.order]] = [swappedPlayers[subbedInPlayer.order], swappedPlayers[subbedOutPlayer.order]];                          
            }
            
            swappedPlayers = swappedPlayers.map((p, index) => {
               return { ...p, subOrder:  index};
            });
   
            setHomeFilteredPlayers([...swappedPlayers].sort((n1:PlayerData, n2:PlayerData) => n1.subOrder < n2.subOrder ? -1 : 1));  
            props.onChange(swappedPlayers, true);               
         }   
         if(!homePlayers && awayFilteredPlayers){
            
            if(playerSubbedInFor === '')
            {            
               let subbedOutPlayer = awayFilteredPlayers.filter(p => p.playerName === playerSubbedOutFor)[0];
               let subbedInPlayer = awayFilteredPlayers.filter(p => p.playerName === subbedOutPlayer.subbedOutFor)[0];
               let subbedInForPlayerName = subbedOutPlayer.subbedOutFor;
   
               setAwayPlayersToSub(awayPlayersToSub.filter(p => p !== subbedOutPlayer.subbedOutFor));
               setAwaySubs(awaySubs.filter(s => s !== `${subbedInPlayer.playerName}::${playerSubbedOutFor}`))            
   
               swappedPlayers = [...awayFilteredPlayers].sort((n1:PlayerData, n2:PlayerData) => n1.subOrder < n2.subOrder ? -1 : 1).map(p => {
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
               let currentAwayPlayers = [...awayPlayersToSub]
               let currentAwaySubs = [...awaySubs];

               swappedPlayers = [...awayFilteredPlayers].sort((n1:PlayerData, n2:PlayerData) => n1.subOrder < n2.subOrder ? -1 : 1).map(p => {
                  if(p.playerName === playerSubbedOutFor){
                     currentAwayPlayers = [...currentAwayPlayers, playerSubbedInFor];
                     currentAwaySubs = [...currentAwaySubs, `${playerSubbedInFor}::${playerSubbedOutFor}`];
   
                     return { ...p, subbedOutFor: playerSubbedInFor, subPoints: 0 };
                  }                  
                  else if(p.playerName !== playerSubbedInFor && p.subbedInFor === playerSubbedOutFor){
                     // let currentBenchSubOrder = p.subOrder;
                     // let currentStarter = awayFilteredPlayers.filter(st => st.playerName === playerSubbedOutFor);
                     // let currentStarterSubOrder = currentStarter && currentStarter[0].subOrder;

                     currentAwayPlayers = currentAwayPlayers.filter(s => {return s !== p.playerName});
                     currentAwaySubs = currentAwaySubs.filter(s => {return s !== `${p.playerName}::${playerSubbedOutFor}`});

                     return { ...p, subbedInFor: '', subPoints: 0 };
                  }
                  if(p.playerName === playerSubbedInFor){
                     setAwayPlayersToSub([...awayPlayersToSub, playerSubbedInFor]);
                     return { ...p, subbedInFor: playerSubbedOutFor, subPoints: calculateSubPoints(subbedOutPlayer, subbedInPlayer, false) };
                  }            
                  return p;      
               });         
               
               setAwayPlayersToSub([...currentAwayPlayers]);
               setAwaySubs([...currentAwaySubs]);
               [swappedPlayers[subbedOutPlayer.order], swappedPlayers[subbedInPlayer.order]] = [swappedPlayers[subbedInPlayer.order], swappedPlayers[subbedOutPlayer.order]];                          
            }
            
            swappedPlayers = swappedPlayers.map((p, index) => {
               return { ...p, subOrder:  index};
            });
   
            swappedPlayers = [...swappedPlayers].sort((n1:PlayerData, n2:PlayerData) => n1.subOrder < n2.subOrder ? -1 : 1);
            setAwayFilteredPlayers([...swappedPlayers]);  
            props.onChange(swappedPlayers, false);       
         }
      }         
      
      return swappedPlayers;
   }
   
   return (<div data-testid="Matchup" className="border p-1 border-slate-50 rounded-lg">
      <h1>{props.league}</h1>
      <div className='team-container'>  
       
         {homeFilteredPlayers && awayFilteredPlayers && homeFilteredPlayers.map((p, index) => (          
         <Team key={index} 
         homePlayerName={p.playerName} homePlayerPosition={p.playerPosition} homePlayerPoints={p.playerPoints} 
         homePlayerSubPoints={p.subPoints} homePlayerCaptainPoints={p.captainPoints} homePlayerSubbedInFor={p.subbedInFor} homePlayerSubbedOutFor={p.subbedOutFor} 

         awayPlayerName={awayFilteredPlayers[index].playerName} awayPlayerPosition={awayFilteredPlayers[index].playerPosition} awayPlayerPoints={awayFilteredPlayers[index].playerPoints} 
         awayPlayerSubPoints={awayFilteredPlayers[index].subPoints} awayPlayerCaptainPoints={awayFilteredPlayers[index].captainPoints} awayPlayerSubbedInFor={awayFilteredPlayers[index].subbedInFor} awayPlayerSubbedOutFor={awayFilteredPlayers[index].subbedOutFor}></Team>))}
         {/* {props.matchupData && props.matchupData.homePlayers && props.matchupData.homePlayers.map((p, index) => ( <Team key={index} homePlayer={p} awayPlayer={props.matchupData.awayPlayers[index]}></Team>))} */}
         
         {props.captainsEnabled && homeFilteredPlayers && homeFilteredPlayers.length > 0 &&
         <div style={{width: '50%'}}>                
               <p>Select Captain</p>
               <select
                  className="select-button"     
                  value={homeCaptain}
                  onChange={(e) => setCaptainAndUpdatePoints(e.target.value, true)}>
                  <option></option>
                  
                  {[...homeFilteredPlayers].sort((n1:PlayerData, n2:PlayerData) => n1.order < n2.order ? -1 : 1).map((p, index) => (
                     <option key={index} value={p.playerName}>{p.playerName}</option>
                  ))};
                  
               </select>            
         </div>
         } 
         {props.captainsEnabled && awayFilteredPlayers && awayFilteredPlayers.length > 0 &&
         <div style={{width: '50%'}}>                
               <p>Select Captain</p>
               <select
                  className="select-button"     
                  value={awayCaptain}
                  onChange={(e) => setCaptainAndUpdatePoints(e.target.value, false)}>
                  <option></option>
                  
                  {[...awayFilteredPlayers].sort((n1:PlayerData, n2:PlayerData) => n1.order < n2.order ? -1 : 1).map((p, index) => (
                     <option key={index} value={p.playerName}>{p.playerName}</option>
                  ))};
                  
               </select>            
         </div>
         }
         
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
      
      </div> )
}

export default Matchup;
   
