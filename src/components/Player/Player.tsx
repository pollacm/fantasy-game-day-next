'use client';

import React, { FC, useEffect, useState } from 'react';

interface PlayerProps {
   playerPosition: string,
   playerName: string,
   playerPoints: number,
   playerSubPoints: number,
   playerCaptainPoints: number,
   subbedInFor: string,
   subbedOutFor: string,
   lastUpdateTime: string,
   gameInfo: string,
   isMyTeam: boolean
}

function Player(props: PlayerProps) 
{
   const [highlightColor, setHighlightColor] = useState(false)
   const [gameInfoColor, setGameInfoColor] = useState('gray')
   
   useEffect(() => {
      const subtractMinutes = (date: Date, minutes: number): Date => {
         const result = new Date(date);
         result.setMinutes(result.getMinutes() - minutes);
         return result;
      };

      if(props.lastUpdateTime !== '')
      {
         const lastUpdateActualTime = new Date(props.lastUpdateTime)
         const threeMinutesAgo = subtractMinutes(new Date(), 3);

         if(lastUpdateActualTime > threeMinutesAgo){
            setHighlightColor(true);
         }
         else{
            setHighlightColor(false);
         }
      }
      
   }, [props.lastUpdateTime]);

   useEffect(() => {
      if(props.gameInfo.toLowerCase().includes('final'))
      {
         setGameInfoColor('gray');
      }
      else if(props.gameInfo.toLowerCase().includes('sun') || props.gameInfo.toLowerCase().includes('mon') || props.gameInfo.toLowerCase().includes('tue') ||
      props.gameInfo.toLowerCase().includes('wed') || props.gameInfo.toLowerCase().includes('thu') || props.gameInfo.toLowerCase().includes('fri') ||
      props.gameInfo.toLowerCase().includes('sat'))
      {
         setGameInfoColor('black');
      }
      else{
         setGameInfoColor('blue');
      }
      
   }, [props.gameInfo]);

   return (
      <>
         {props.playerName !== "BENCH" ?
            <>
               <div className='player-info flex gap-2 col-span-2 text-xs p-1'>
                  <div className="position text-blue-400">
                     {props.playerPosition}
                  </div>
                  <div className="name truncate">
                     {props.playerName}
                  </div>
                  <div className="text-gray-500 text-sm"
                  style={{
                     color: gameInfoColor
                  }}>
                   {props.gameInfo}
                  </div>                    
                  <div className="points text-blue-300"
                  style={{
                     color: highlightColor ? props.isMyTeam ? "green" : "red" : "black",
                     fontSize: highlightColor ? "15px" : "12px",
                     fontWeight: highlightColor ? "900" : "normal",
                     transition: "all .5s ease",
                     WebkitTransition: "all .5s ease",
                     MozTransition: "all .5s ease"
                   }}>
                     {props.playerSubPoints !== 0 ? props.playerSubPoints : props.playerCaptainPoints !== 0 ? props.playerCaptainPoints : props.playerPoints}
                  </div>
               </div>                            
               <div className='subs'>
                  <div className="position">
                     {props.subbedInFor !== '' ? `Subbed: ${props.subbedInFor}` : <></>}
                     {props.subbedOutFor !== '' ? props.subbedOutFor : <></>}
                  </div>
               </div>
            </>
            :
            <div className="player-container flex-1">
               <div className="bench">
                  {props.playerName}
               </div>
            </div>
         }
      </>
   )
}

export default Player;
