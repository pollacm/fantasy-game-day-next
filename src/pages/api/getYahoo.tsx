import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';
import { MatchupData } from '@/components/Matchup/MatchupData';
import { PlayerData } from '@/components/Player/PlayerData';
import {delay, getElementByContent, getElementByTitle, isPlayerStarting, loadCookies, openPage, saveCookies, swapOutTestData, updateMatchupData} from './apiHelpers';
  
const getYahoo = async (req: NextApiRequest, res: NextApiResponse) => {    
    //recieve input from request body, parse from json
    let {yahooMatchupData} :{yahooMatchupData: MatchupData} = JSON.parse(req.body);
    let syncedMatchupData = new MatchupData('','',[], []);
    let {input} = JSON.parse(req.body);
    let {league} = JSON.parse(req.body);
    console.log('input', input);

    // const browser = await puppeteer.launch({headless:true, args:[
    //     `--user-data-dir=${process.env.REACT_APP_DATAL}`]
    //     });

        const browser = await puppeteer.launch({headless:"new", args:[
          '--disable-web-security', ' --disable-features=IsolateOrigins', ' --disable-site-isolation-trials', ' --disable-features=site-per-process',  ` --user-data-dir=${process.env.REACT_APP_DATAL}`]});

      const page = await browser.newPage();
    //   await loadCookies(page, league);

      await page.setViewport({ width: 1920, height: 1080});
      await openPage(page, `https://football.fantasysports.yahoo.com/f1/${league}/matchup`);
  
    await page.waitForSelector('#statTable1', { timeout: 10000 });

  const teamNameElements = await page.$$('#matchup-header div.Ell a');
  
  if(teamNameElements.length == 2){
    let title = await getElementByContent(teamNameElements[0]);
    if(title != null){
        syncedMatchupData.homeTeamName = title;
    }
    title = await getElementByContent(teamNameElements[1]);
    if(title != null){
        syncedMatchupData.awayTeamName = title;
    }
  }
  else{
    res.status(400);
  }

  let firstBench = false;
  const rows = await page.$$('table.Datatable tr');
  let count = 0;
  for (const row of rows) {
    //skip non-valid rows
    let rowIsValid = await row.$$('td.player');
    if(rowIsValid.length === 0)
    {
        continue;
    }

    // player name
    let playerElements = await row.$$('td.player');
    let homeUpdatedPlayerName = '';
    let awayUpdatedPlayerName = '';
    if (playerElements.length == 2) {
      let playerTag = await playerElements[0].$$('div.ysf-player-name a');
      if(playerTag.length > 0)
      {
        let text = await getElementByContent(playerTag[0]);
        if (text) {
          homeUpdatedPlayerName = text;
        }
      }

      playerTag = await playerElements[1].$$('div.ysf-player-name a');
      if(playerTag.length > 0)
      {
        let text = await getElementByContent(playerTag[0]);
        if (text) {
          awayUpdatedPlayerName = text;
        }
      }
    }

    // player position
    let homePlayerPosition = '';
    let awayPlayerPosition = '';
    if (playerElements.length == 2) {
      let playerTag = await playerElements[0].$$('div.ysf-player-name span.Fz-xxs');
      if(playerTag.length > 0)
      {
        let text = await getElementByContent(playerTag[0]);
        if (text && text.length > 1) {
            homePlayerPosition = text.split(" - ")[1];
        }
      }

      playerTag = await playerElements[1].$$('div.ysf-player-name span.Fz-xxs');
      if(playerTag.length > 0)
      {
        let text = await getElementByContent(playerTag[0]);
        if (text && text.length > 1) {
            awayPlayerPosition = text.split(" - ")[1];
        }
      }
    }

    //player points
    let playePointsElements = await row.$$('td.Fw-b div');
    let homeUpdatedPlayerPoints = 0.00;
    let awayUpdatedPlayerPoints = 0.00;
    if (playePointsElements.length == 2) {
      let text = await getElementByContent(playePointsElements[0]);
      let points = Number(text);
      homeUpdatedPlayerPoints = points != null && !isNaN(points) ? points : 0;

      text = await getElementByContent(playePointsElements[1]);
      points = Number(text);
      awayUpdatedPlayerPoints = points != null && !isNaN(points) ? points : 0;
    }

    //is bench
    let matchupPositionElement = await row.$('td.Ta-c div');
    let matchupPosition = '';
    if (matchupPositionElement) {
      let text = await getElementByContent(matchupPositionElement);
      if (text) {
        matchupPosition = text;
      }
    }
    let homePlayerFromUI = yahooMatchupData.homePlayers.find((element) => element.playerName === homeUpdatedPlayerName);
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

    let awayPlayerFromUI = yahooMatchupData.awayPlayers.find((element) => element.playerName === awayUpdatedPlayerName);
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

    //add break in first bench position
    if(!isPlayerStarting(matchupPosition) && !firstBench)
    {
        syncedMatchupData.awayPlayers.push(new PlayerData(count, 'BENCH','BENCH','BENCH',0,0,0,'', '','', '', 0,false));
        syncedMatchupData.homePlayers.push(new PlayerData(count++, 'BENCH','BENCH','BENCH',0,0,0,'', '','','',0,false));
        firstBench = true;
    }
    else if((homeUpdatedPlayerName == '' && awayUpdatedPlayerName == '') || matchupPosition == "IR")
    {
      continue;
    }
    let homePlayerData = new PlayerData(count, homePlayerFromUIName, homeUpdatedPlayerName,homePlayerPosition,homePlayerFromUIPoints,homeUpdatedPlayerPoints, homePlayerFromUIPointDiff, homePlayerFromUILastUpdate,
        homePlayerFromUI?.subbedOutFor ?? '', homePlayerFromUI?.subbedInFor ?? '', matchupPosition, homePlayerFromUI?.subPoints ?? 0, isPlayerStarting(matchupPosition));
    let awayPlayerData = new PlayerData(count++, awayPlayerFromUIName, awayUpdatedPlayerName, awayPlayerPosition,awayPlayerFromUIPoints,awayUpdatedPlayerPoints, awayPlayerFromUIPointDiff, awayPlayerFromUILastUpdate,
        awayPlayerFromUI?.subbedOutFor ?? '', awayPlayerFromUI?.subbedInFor ?? '', matchupPosition, awayPlayerFromUI?.subPoints ?? 0,isPlayerStarting(matchupPosition));

    syncedMatchupData.homePlayers.push(homePlayerData);
    syncedMatchupData.awayPlayers.push(awayPlayerData);
  }

  syncedMatchupData = swapOutTestData(syncedMatchupData, input);

  const matchupData = updateMatchupData(syncedMatchupData);
  console.log('matchupdata', matchupData);
  console.log('player counts espn ', matchupData.awayPlayers.length + ' ' + matchupData.homePlayers.length)
//   await saveCookies(page,league);

  res.status(200).json({matchupData});
  browser.close();
}

export default getYahoo