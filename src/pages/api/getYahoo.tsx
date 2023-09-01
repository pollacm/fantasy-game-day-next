import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';
import { MatchupData } from '@/components/Matchup/MatchupData';
import { PlayerData } from '@/components/Player/PlayerData';
import {delay, getElementByContent, getElementByTitle, loadCookies, openPage, saveCookies, swapOutTestData, updateMatchupData} from './apiHelpers';
  
const getYahoo = async (req: NextApiRequest, res: NextApiResponse) => {    
    //recieve input from request body, parse from json
    let {yahooMatchupData} :{yahooMatchupData: MatchupData} = JSON.parse(req.body);
    let syncedMatchupData = new MatchupData('','',[]);
    let {input} = JSON.parse(req.body);
    let {league} = JSON.parse(req.body);
    console.log('input', input);

    const browser = await puppeteer.launch({headless:true, args:[
        '--user-data-dir=E:/ChromeProfiles/AdditionalProfiles/User Data']
        });

        // const browser = await puppeteer.launch({headless:true});

      const page = await browser.newPage();
      await loadCookies(page, league);

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
            homePlayerPosition = text.split(" - ")[1];
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
    let homePlayerFromUI = yahooMatchupData.playerDatas.find((element) => element.homePlayerName === homeUpdatedPlayerName);
    let homePlayerFromUIName = '';
    let homePlayerFromUIPoints = 0.00;
    let homePlayerFromUIPointDiff = 0.00;
    let homePlayerFromUILastUpdate = '';

    if(homePlayerFromUI != null){
        homePlayerFromUIName = homePlayerFromUI.homePlayerName;
        homePlayerFromUIPoints = homePlayerFromUI.homePlayerPoints;
        homePlayerFromUIPointDiff = homePlayerFromUI.homePlayerPointDiff;
        homePlayerFromUILastUpdate = homePlayerFromUI.homePlayerLastUpdate;
    }

    let awayPlayerFromUI = yahooMatchupData.playerDatas.find((element) => element.awayPlayerName === awayUpdatedPlayerName);
    let awayPlayerFromUIName = '';
    let awayPlayerFromUIPoints = 0.00;
    let awayPlayerFromUIPointDiff = 0.00;
    let awayPlayerFromUILastUpdate = '';

    if(awayPlayerFromUI != null){
        awayPlayerFromUIName = awayPlayerFromUI.awayPlayerName;
        awayPlayerFromUIPoints = awayPlayerFromUI.awayPlayerPoints;
        awayPlayerFromUIPointDiff = awayPlayerFromUI.awayPlayerPointDiff;
        awayPlayerFromUILastUpdate = awayPlayerFromUI.awayPlayerLastUpdate;
    }

    let playerData = new PlayerData(homePlayerFromUIName, homeUpdatedPlayerName,homePlayerPosition,homePlayerFromUIPoints,homeUpdatedPlayerPoints, homePlayerFromUIPointDiff, homePlayerFromUILastUpdate,
                                    awayPlayerFromUIName, awayUpdatedPlayerName, awayPlayerPosition,awayPlayerFromUIPoints,awayUpdatedPlayerPoints, awayPlayerFromUIPointDiff, awayPlayerFromUILastUpdate,
                                    matchupPosition != "BN" && matchupPosition != "IR");

    //add break in first bench position
    if(!playerData.isStarter && !firstBench)
    {
        syncedMatchupData.playerDatas.push(new PlayerData('BENCH','BENCH','BENCH',0,0,0,'','BENCH','BENCH','BENCH',0,0,0,'',false));
        firstBench = true;
    }
    else if((homeUpdatedPlayerName == '' && awayUpdatedPlayerName == '') || matchupPosition == "IR")
    {
      continue;
    }
    syncedMatchupData.playerDatas.push(playerData);
  }

  syncedMatchupData = swapOutTestData(syncedMatchupData, input);

  const matchupData = updateMatchupData(syncedMatchupData);
  console.log('matchupdata', matchupData);
  await saveCookies(page,league);

  res.status(200).json({matchupData});
  browser.close();
}

export default getYahoo