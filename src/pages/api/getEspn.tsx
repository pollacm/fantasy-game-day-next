import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';
import { MatchupData } from '@/components/Matchup/MatchupData';
import { PlayerData } from '@/components/Player/PlayerData';
import {delay, getElementByTitle, loadCookies, openPage, saveCookies} from './apiHelpers';
  
const getEspn = async (req: NextApiRequest, res: NextApiResponse) => {    
          const browser = await puppeteer.launch({headless:true, args:[
        '--user-data-dir=E:/ChromeProfiles/AdditionalProfiles/User Data']
        });

      const page = await browser.newPage();
      loadCookies(page);

      await page.setViewport({ width: 1920, height: 1080});
      await openPage(page, `https://fantasy.espn.com/football/fantasycast?leagueId=127291`);
  
  try{
    await page.waitForSelector('.teamName', { timeout: 10000 });
  }
  catch(err){
      await openPage(page, `http://www.espn.com/login`);

      const elementHandle = await page.waitForSelector('div#disneyid-wrapper iframe');
      const frame = await elementHandle?.contentFrame();
      if(frame != null){      
        await frame.waitForSelector('[ng-model="vm.password"]');
        await delay(1500);
        
        const username = await frame.$('[ng-model="vm.username"]');
        if(username) 
        {        
          // @ts-ignore
          await username?.type(process.env.REACT_APP_EU);
        }
        await delay(1500);
        const password = await frame.$('[ng-model="vm.password"]');
        // @ts-ignore
        await password?.type(process.env.REACT_APP_EP);
        await frame.click('button[type=submit]')
        await page.waitForNavigation();
      }

      await openPage(page, `https://fantasy.espn.com/football/fantasycast?leagueId=127291`);
  }

  let matchupData = new MatchupData('','', []);

  const teamNameElements = await page.$$('.teamName');
  
  if(teamNameElements.length == 2){
    let title = await getElementByTitle(teamNameElements[0]);
    if(title != null){
      matchupData.homeTeamName = title;
    }
    title = await getElementByTitle(teamNameElements[1]);
    if(title != null){
      matchupData.awayTeamName = title;
    }
  }
  else{
    res.status(400);
  }

  const rows = await page.$$('.Table__TBODY tr');
  for (const row of rows) {
    // player name
    let playerNameElements = await row.$$('div.player-column__athlete');
    let homePlayerName = '';
    let awayPlayerName = '';
    if (playerNameElements.length == 2) {
      let text = await getElementByTitle(playerNameElements[0]);
      if (text) {
        homePlayerName = text;
      }

      text = await getElementByTitle(playerNameElements[1]);
      if (text) {
        awayPlayerName = text;
      }
    }
    if(homePlayerName == '' && awayPlayerName == '')
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
    let homePlayerPoints = 0.00;
    let awayPlayerPoints = 0.00;
    if (playePointsElements.length == 2) {
      let text = await playePointsElements[0].evaluate(el => el.textContent);
      let points = Number(text);
      homePlayerPoints = points != null && !isNaN(points) ? points : 0;

      text = await playePointsElements[1].evaluate(el => el.textContent);
      points = Number(text);
      awayPlayerPoints = points != null && !isNaN(points) ? points : 0;
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
      let playerData = new PlayerData(homePlayerName,homePlayerPosition,homePlayerPoints, awayPlayerName, awayPlayerPosition,awayPlayerPoints, matchupPosition != "Bench" && matchupPosition != "IR");
      matchupData.playerDatas.push(playerData);
    }
  }
  console.log('matchupdata', matchupData);
  saveCookies(page);
  
  res.status(200).json({matchupData});
  browser.close();
}

export default getEspn