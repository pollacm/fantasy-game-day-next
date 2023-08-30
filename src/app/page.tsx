'use client';

// import {type NextPage} from 'next'
import Matchup from '@/components/Matchup/Matchup'
import { useState } from 'react';

export default function Home() {
  const [downloads, setDownloads] = useState<string>('');
  const [input, setInput] = useState<string>('');
  
  const getDownloads = async () => {
    const res = await fetch('http://localhost:3000/api/getDownloads', {
      method: 'POST',
      body: JSON.stringify({input})
    })
    const { downloads } = await res.json();
    setDownloads(downloads);
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* https://www.youtube.com/watch?v=bGShHOOoC-U */}

      
      <input 
      type='textbox' 
      className='rounded-lg' 
      onChange={(e) => setInput(e.target.value)}
      value={input}
      />
      <button onClick={getDownloads} type='button' className='rounded-lg'>Go</button>
      {downloads && <p className='text-sm'>This package has {downloads} downloads.</p>}
      <div style={{display: 'block'}}>
        <Matchup league="R.M.L."></Matchup>
        <Matchup league="T.R.L."></Matchup>
        <Matchup league="P.J.V."></Matchup>
        <Matchup league="Soopa Brawl"></Matchup>
        <Matchup league="T.R.L. Dynasty"></Matchup>
      </div>      
    </main>
  )
}
