'use client';

// import {type NextPage} from 'next'
import Matchup from '@/components/Matchup/Matchup'
import { MatchupData } from '@/components/Matchup/MatchupData';
import { match } from 'assert';
import { useState } from 'react';

export default function Home() {
  const [downloads, setDownloads] = useState<string>('');
  const [espnMatchupData, setEspnMatchupData] = useState<MatchupData>(new MatchupData('','', []));
  const [yahooMatchupData, setYahooMatchupData] = useState<MatchupData>(new MatchupData('','', []));
  const [input, setInput] = useState<string>('');
  const [sub1, setSub1] = useState<string>('');
  const [sub1Second, setSub1Second] = useState<string>('');
  
  const setDropdown1 = (player: string) => {
    setSub1(player);
    setSub1Second('');
  }

  const getDownloads = async () => {
    const res = await fetch('http://localhost:3000/api/getDownloads', {
      method: 'POST',
      body: JSON.stringify({input})
    })
    const { downloads } = await res.json();
    setDownloads(downloads);
  }

  const getData = async () => {
    getEspn();
    getYahooReplacements();

  }

  const getEspn = async () => {
    const res = await fetch('http://localhost:3000/api/getEspn', {
      method: 'POST',
      body: JSON.stringify({espnMatchupData, input})
    })
    console.log('out of api')
    const { matchupData } = await res.json();
    setEspnMatchupData(matchupData);
    console.log(matchupData);
  }

  const getYahooReplacements = async () => {
    const res = await fetch('http://localhost:3000/api/getYahoo', {
      method: 'POST',
      body: JSON.stringify({yahooMatchupData, league: '32919', input: ''})
    })
    console.log('out of api')
    const { matchupData } = await res.json();
    setYahooMatchupData(matchupData);
    console.log(matchupData);
  }

  return (
    <main className="flex min-h-screen flex-col p-12">
      {/* https://www.youtube.com/watch?v=bGShHOOoC-U */}

      {/* https://codesandbox.io/s/awesome-napier-rnveq?fontsize=14 */}

      
      {/* <input 
      type='textbox' 
      className='rounded-lg' 
      onChange={(e) => setInput(e.target.value)}
      value={input}
      /> */}
      {/* <button onClick={getDownloads} type='button' className='rounded-lg'>Go</button> */}

      <input 
      type='textbox' 
      className='rounded-lg' 
      onChange={(e) => setInput(e.target.value)}
      value={input}
      />
      {/* <button onClick={getDownloads} type='button' className='rounded-lg'>Go</button> */}
      <button onClick={getData} type='button' className='rounded-lg'>Go</button>


      {downloads && <p className='text-sm'>This package has {downloads} downloads.</p>}
      <div style={{display: 'block'}}>
        {espnMatchupData && <Matchup league="R.M.L." matchupData={espnMatchupData}></Matchup> }
        {yahooMatchupData && <Matchup league="The Replacements" matchupData={yahooMatchupData}></Matchup> }
        <div>
          <select
          onChange={(e) => setDropdown1(e.target.value)}>
            <option></option>
          {yahooMatchupData.playerDatas.filter(p => p.isStarter).map((p, index) =>
            <option key={index} value={p.homePlayerPosition}>{p.homePlayerName}</option>
          )};
          </select>
          <select
          value={sub1Second}
          onChange={(e) => setSub1Second(e.target.value)}>
          <option></option>
          {yahooMatchupData.playerDatas.filter(p => p.homePlayerPosition === sub1 && !p.isStarter).map((p, index) =>
            <option key={index} value={p.homePlayerName}>{p.homePlayerName}</option>
          )};
          </select>
        </div>
        {/* <Matchup league="T.R.L."></Matchup>
        <Matchup league="P.J.V."></Matchup>
        <Matchup league="Soopa Brawl"></Matchup>
        <Matchup league="T.R.L. Dynasty"></Matchup> */}
      </div>      
    </main>
  )
}
