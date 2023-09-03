'use client';

import React from 'react';
import { MatchupWrapper } from './Matchup.styled';
import Team from '../Team/Team'
import { MatchupData } from './MatchupData';
import { PlayerData } from '../Player/PlayerData';

interface MatchupProps {league: string, matchupData:MatchupData, subsEnabled: boolean, captainsEnabled: boolean}

class Matchup extends React.Component<{ league: string, matchupData:MatchupData, subsEnabled: boolean, captainsEnabled: boolean }, { count: number }> {
   
   getAvailableSubPositions = (position: string) => {
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

   setPlayerSubsByName = (playerSubbedInFor:string, playerSubbedOutFor:string, homePlayers: boolean) =>
   {
      if(homePlayers){
         this.props.matchupData.homePlayers = this.props.matchupData.homePlayers.map(p => {
            if(p.playerName === playerSubbedInFor){
               return { ...p, subbedInFor: playerSubbedOutFor };
            }
            if(p.playerName === playerSubbedOutFor){
               return { ...p, playerSubbedOutFor: playerSubbedInFor };
            }
            return p;      
         });

         let subIn = this.props.matchupData.homePlayers.filter(p => p.playerName === playerSubbedOutFor)[0];
         let subOut = this.props.matchupData.homePlayers.filter(p => p.playerName === playerSubbedInFor)[0];

         [this.props.matchupData.homePlayers[subIn.order], this.props.matchupData.homePlayers[subOut.order]] = [this.props.matchupData.homePlayers[subOut.order], this.props.matchupData.homePlayers[subIn.order]];

         this.forceUpdate();
      }      

      return;
   }

   render (){
      let subsHome;
      let subsAway;
      
      if(this.props.subsEnabled && this.props.matchupData.homePlayers.length > 0) { 
         subsHome = 
               <p>Subs</p>
               {this.props.subsEnabled && this.props.matchupData.homePlayers.length > 0 && this.props.matchupData.homePlayers.filter(p => p.isStarter).map(p => {
                  {console.log('player', p.playerName)}
                  <div>                                          
                     <div>{p.playerName}</div>
                     <select
                        className="select-button"
                        
                        onChange={(e) => this.setPlayerSubsByName(e.target.value, p.playerName, true)}>
                        <option></option>
                        {this.props.matchupData.homePlayers.filter(b => !b.isStarter && b.playerName !== "BENCH" &&
                                                            this.getAvailableSubPositions(p.playerPosition).includes(b.playerPosition) && 
                                                            this.props.matchupData.homePlayers.some(a => 
                                                               {
                                                                   return a.subbedOutFor !== b.playerName;
                                                               })).map((b, index) =>
                        <option key={index} value={b.playerName}>{b.playerName}</option>
                        )};
                     </select>
                  </div>;         
               });
               
      }}

      return (<MatchupWrapper data-testid="Matchup">
        {/* <div style={{display: 'inline'}}>
           <Team></Team>
        </div>
     */}
      <h1>{this.props.league}</h1>
      <div className='team-container'>        
         {this.props.matchupData && this.props.matchupData.homePlayers && this.props.matchupData.homePlayers.map((p, index) => ( <Team key={index} homePlayer={p} awayPlayer={this.props.matchupData.awayPlayers[index]}></Team>))}
         {this.props.subsEnabled && this.props.matchupData && this.props.matchupData.homePlayers && this.props.matchupData.homePlayers.filter(p => p.isStarter)
         .sort((n1:PlayerData, n2:PlayerData) => n1.order < n2.order ? -1 : 1).map((p, index) => ( 
            <div key={index}>                                          
            <p>{p.playerName}</p>
            <select
               className="select-button"     
               
               onChange={(e) => this.setPlayerSubsByName(e.target.value, p.playerName, true)}>
               <option></option>
               {this.props.matchupData.homePlayers.filter(b => !b.isStarter  && b.playerName !== "BENCH" && 
                                                   this.getAvailableSubPositions(p.playerPosition).includes(b.playerPosition) && 
                                                   !this.props.matchupData.homePlayers.some(a => a.subbedOutFor === b.playerName)).map((b, index) =>
               <option key={index} value={b.playerName}>{b.playerName}</option>
               )};
            </select>
         </div>
         ))}
      </div>
      
      </MatchupWrapper> )

   }
}

export default Matchup;
   
