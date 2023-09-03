import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer-extra';
import { MatchupData } from '@/components/Matchup/MatchupData';
import { PlayerData } from '@/components/Player/PlayerData';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

import {delay, getElementByTitle, isPlayerStarting, loadCookies, openPage, saveCookies, swapOutTestData, updateMatchupData} from './apiHelpers';
  
const getEspn = async (req: NextApiRequest, res: NextApiResponse) => {    
    //recieve input from request body, parse from json
    let {espnMatchupData} :{espnMatchupData: MatchupData} = JSON.parse(req.body);
    let syncedMatchupData = new MatchupData('','',[], []);
    let {input} = JSON.parse(req.body);
    console.log('input', input);
    console.log('user data location', process.env.REACT_APP_DATAL);

    puppeteer.use(StealthPlugin());

    const browser = await puppeteer.launch({headless:"new", executablePath:"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",  
    userDataDir:`${process.env.REACT_APP_DATAL}`
    , args:['--disable-web-security', ' --disable-features=site-per-process']
        });

      const page = await browser.newPage();
      // await loadCookies(page, 'espn');

      await page.setViewport({ width: 1920, height: 1080});
      await openPage(page, `https://fantasy.espn.com/football/fantasycast?leagueId=127291`);
  
  try{
    await page.waitForSelector('.teamName', { timeout: 10000 });
  }
  catch(err){
      // await openPage(page, `http://www.espn.com/login`);
      console.log('espn failed login.. attempting to login')
      const elementHandle = await page.waitForSelector('div#oneid-wrapper iframe');
      const frame = await elementHandle?.contentFrame();
      console.log('looking for frame')
      if(frame != null){      
        console.log('frame found')
        await frame.waitForSelector('input.input-InputPassword');
        console.log('waiting for pass')
        
        console.log('looking for user')
        const username = await frame.$('input.input-InputLoginValue');
        if(username) 
        {        
          console.log('setting user')
          await frame.click('input.input-InputLoginValue'); 
          delay(1000);
          // @ts-ignore
          await username?.type(process.env.REACT_APP_EU);
        }
        console.log('waiting for pass')
        const password = await frame.$('input.input-InputPassword');
        console.log('setting pass')
        await frame.click('input.input-InputPassword'); 
        await delay(2000);
        // @ts-ignore
        await password?.type(process.env.REACT_APP_EP);
        await delay(500);
        console.log('submitting login')
        await frame.click('#BtnSubmit')
        await delay(5000);
        console.log('completed login')
      }
  }

  const teamNameElements = await page.$$('.teamName');
  
  if(teamNameElements.length == 2){
    let title = await getElementByTitle(teamNameElements[0]);
    if(title != null){
      syncedMatchupData.homeTeamName = title;
    }
    title = await getElementByTitle(teamNameElements[1]);
    if(title != null){
      syncedMatchupData.awayTeamName = title;
    }
  }
  else{
    res.status(400);
  }
  
  const rows = await page.$$('.Table__TBODY tr');
  let count = 0;
  for (const row of rows) {
    // player name    
    let playerNameElements = await row.$$('div.player-column__athlete');
    let homeUpdatedPlayerName = '';
    let awayUpdatedPlayerName = '';
    if (playerNameElements.length == 2) {
      let text = await getElementByTitle(playerNameElements[0]);
      if (text) {
        homeUpdatedPlayerName = text;
      }

      text = await getElementByTitle(playerNameElements[1]);
      if (text) {
        awayUpdatedPlayerName = text;
      }
    }
    if(homeUpdatedPlayerName == '' && awayUpdatedPlayerName == '')
    {
      continue;
    }

    //player position
    let playerPositionElements = await row.$$('div div.player-column_info div div.player-column__position span.playerinfo__playerpos');
    let homePlayerPosition = '';
    let awayPlayerPosition = '';
    if (playerPositionElements.length == 2) {
      let text = await playerPositionElements[0].evaluate(el => el.textContent);
      if (text) {
        homePlayerPosition = text;
      }

      text = await playerPositionElements[1].evaluate(el => el.textContent);
      if (text) {
        awayPlayerPosition = text;
      }
    }

    //player points
    let playePointsElements = await row.$$('td div.points-column');
    let homeUpdatedPlayerPoints = 0.00;
    let awayUpdatedPlayerPoints = 0.00;
    if (playePointsElements.length == 2) {
      let text = await playePointsElements[0].evaluate(el => el.textContent);
      let points = Number(text);
      homeUpdatedPlayerPoints = points != null && !isNaN(points) ? points : 0;

      text = await playePointsElements[1].evaluate(el => el.textContent);
      points = Number(text);
      awayUpdatedPlayerPoints = points != null && !isNaN(points) ? points : 0;
    }

    //is bench
    let matchupPositionElement = await row.$('td.slotColumn div');
    let matchupPosition = '';
    if (matchupPositionElement) {
      let text = await matchupPositionElement.evaluate(el => el.textContent);
      if (text) {
        matchupPosition = text;
      }
    }
    if(matchupPosition != "Bench" && matchupPosition != "IR"){
      
      let homePlayerFromUI = espnMatchupData.homePlayers.find((element) => element.playerName === homeUpdatedPlayerName);
      let homePlayerFromUIName = '';
      let homePlayerFromUIPoints = 0.00;
      let homePlayerFromUIPointDiff = 0.00;
      let homePlayerFromUILastUpdate = '';

      if(homePlayerFromUI != null){
          homePlayerFromUIName = homePlayerFromUI.playerName;
          homePlayerFromUIPoints = homePlayerFromUI.playerPoints;
          homePlayerFromUIPointDiff = homePlayerFromUI.playerPointDiff;
          homePlayerFromUILastUpdate = homePlayerFromUI.playerLastUpdate;
      }

      let awayPlayerFromUI = espnMatchupData.awayPlayers.find((element) => element.playerName === awayUpdatedPlayerName);
      let awayPlayerFromUIName = '';
      let awayPlayerFromUIPoints = 0.00;
      let awayPlayerFromUIPointDiff = 0.00;
      let awayPlayerFromUILastUpdate = '';

      if(awayPlayerFromUI != null){
          awayPlayerFromUIName = awayPlayerFromUI.playerName;
          awayPlayerFromUIPoints = awayPlayerFromUI.playerPoints;
          awayPlayerFromUIPointDiff = awayPlayerFromUI.playerPointDiff;
          awayPlayerFromUILastUpdate = awayPlayerFromUI.playerLastUpdate;
      }

      let homePlayerData = new PlayerData(count, homePlayerFromUIName, homeUpdatedPlayerName,homePlayerPosition,homePlayerFromUIPoints,homeUpdatedPlayerPoints, homePlayerFromUIPointDiff, homePlayerFromUILastUpdate,
                                         homePlayerFromUI?.subbedOutFor ?? '', homePlayerFromUI?.subbedInFor ?? '',  isPlayerStarting(matchupPosition));

      let awayPlayerData = new PlayerData(count++, awayPlayerFromUIName, awayUpdatedPlayerName, awayPlayerPosition,awayPlayerFromUIPoints,awayUpdatedPlayerPoints, awayPlayerFromUIPointDiff, awayPlayerFromUILastUpdate,
                                         awayPlayerFromUI?.subbedOutFor ?? '', awayPlayerFromUI?.subbedInFor ?? '',isPlayerStarting(matchupPosition));
                                          
      syncedMatchupData.homePlayers.push(homePlayerData);
      syncedMatchupData.awayPlayers.push(awayPlayerData);
    }
  }

  syncedMatchupData = swapOutTestData(syncedMatchupData, input);

  const matchupData = updateMatchupData(syncedMatchupData);
  console.log('matchupdata', matchupData);
  console.log('player counts espn ', matchupData.awayPlayers.length + ' ' + matchupData.homePlayers.length)
  // console.log('MATCHUPDATA: ', JSON.stringify(matchupData));
  // await saveCookies(page, 'espn');

  res.status(200).json({matchupData});
  browser.close();
}

export default getEspn