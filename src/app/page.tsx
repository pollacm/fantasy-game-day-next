'use client';

// import {type NextPage} from 'next'
import Matchup from '@/components/Matchup/Matchup'
import { MatchupData } from '@/components/Matchup/MatchupData';
import { useState } from 'react';

export default function Home() {
  const [downloads, setDownloads] = useState<string>('');
  const [espnMatchupData, setEspnMatchupData] = useState<MatchupData>();
  const [input, setInput] = useState<string>('');
  
  const getDownloads = async () => {
    const res = await fetch('http://localhost:3000/api/getDownloads', {
      method: 'POST',
      body: JSON.stringify({input})
    })
    const { downloads } = await res.json();
    setDownloads(downloads);
  }

  const getEspn = async () => {
    const res = await fetch('http://localhost:3000/api/getEspn', {
      method: 'POST',
      body: JSON.stringify({input})
    })
    console.log('out of api')
    const { matchupData } = await res.json();
    setEspnMatchupData(matchupData);
    console.log(matchupData);
  }


  return (
    <main className="flex min-h-screen flex-col p-12">
      {/* https://www.youtube.com/watch?v=bGShHOOoC-U */}

      
      {/* <input 
      type='textbox' 
      className='rounded-lg' 
      onChange={(e) => setInput(e.target.value)}
      value={input}
      /> */}
      {/* <button onClick={getDownloads} type='button' className='rounded-lg'>Go</button> */}
      <button onClick={getEspn} type='button' className='rounded-lg'>Go</button>
      {downloads && <p className='text-sm'>This package has {downloads} downloads.</p>}
      <div style={{display: 'block'}}>
        {espnMatchupData && <Matchup league="R.M.L." matchupData={espnMatchupData}></Matchup> }
        {/* <Matchup league="T.R.L."></Matchup>
        <Matchup league="P.J.V."></Matchup>
        <Matchup league="Soopa Brawl"></Matchup>
        <Matchup league="T.R.L. Dynasty"></Matchup> */}
      </div>      
    </main>
  )
}
