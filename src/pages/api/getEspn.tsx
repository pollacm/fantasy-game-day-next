import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';
import { MatchupData } from '@/components/Matchup/MatchupData';
import { PlayerData } from '@/components/Player/PlayerData';
import fs from 'fs'
import {delay, loadCookies, openPage, saveCookies} from './apiHelpers';
  
// let browser:any = null;
// let page:any = null;

const getEspn = async (req: NextApiRequest, res: NextApiResponse) => {    
    // Launch a headless browser instance
    // if(browser == null){
      const browser = await puppeteer.launch({headless:false, args:[
        '--user-data-dir=E:/ChromeProfiles/AdditionalProfiles/User Data']
        });

      // Create a new browser page
      const page = await browser.newPage();
      loadCookies(page);

      await page.setViewport({ width: 1920, height: 1080});
      
      // Navigate to the ESPN Fantasy Football matchup page
    await openPage(page, `https://fantasy.espn.com/football/fantasycast?leagueId=127291`);
  
  try{
    await page.waitForSelector('.teamName', { timeout: 10000 });
  }
  catch(err){
      // Navigate to the ESPN login page
      await openPage(page, `http://www.espn.com/login`);

      const elementHandle = await page.waitForSelector('div#disneyid-wrapper iframe');
      console.log('iframe is ready. Loading iframe content');
      const frame = await elementHandle?.contentFrame();
      if(frame != null){
        console.log('iframe is found');
        await frame.waitForSelector('[ng-model="vm.password"]');
        console.log('password found');
        
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
        console.log('iframe set');
        await frame.click('button[type=submit]')
        // Wait for the user to be logged in
        await page.waitForNavigation();
      }
    // }    
    
    // Navigate to the ESPN Fantasy Football matchup page
    await openPage(page, `https://fantasy.espn.com/football/fantasycast?leagueId=127291`);
}
  
  // Now you can interact with the page and extract data
  // const teamNames = await page.evaluate(() => {
  //   const teamNameElements = document.querySelectorAll('.teamName');
  //   return Array.from(teamNameElements).map(element => element.querySelector('td')?.getAttribute('title'));
  // });
  let matchupData = new MatchupData('','', []);

  const teamNameElements = await page.$$('.teamName');
  
  if(teamNameElements.length == 2){
    let title = await teamNameElements[0].evaluate(el => el.getAttribute('title'));
    if(title != null){
      matchupData.homeTeamName = title;
    }
    title = await teamNameElements[1].evaluate(el => el.getAttribute('title'));
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
      let text = await playerNameElements[0].evaluate(el => el.getAttribute('title'));
      if (text) {
        homePlayerName = text;
      }

      text = await playerNameElements[1].evaluate(el => el.getAttribute('title'));
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
    
    // console.log('in loop')
  }
  // Process and use the extracted data as needed
  // console.log('Matchups:', matchupData);
  // console.log('Players:', players);

  //recieve input from request body, parse from json
    // const {input} = JSON.parse(req.body);
    // console.log('input', input);

    // const response = await fetch(`https://www.npmjs.com/package/${input}`);
    // const response = await fetch(`https://fantasy.espn.com/football/fantasycast?leagueId=127291`)
    // .then(response => {
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! Status: ${response.status}`);
    //     }
    //     console.log('html', response.body);
        
    //     // fs.writeFile('E:/Source/Repos/test.txt', , err => {
    //     //   if (err) {
    //     //     console.error(err);
    //     //   }
    //     //   // file written successfully
    //     // });
    //     return response.text();
    //   })
    //   .then(data => {
    //     console.log(data);
    //     fs.writeFile('E:/Source/Repos/test.txt', data, err => {
    //       if (err) {
    //         console.error(err);
    //       }
    //       // file written successfully
    //     });
    //   })
    //   .catch(error => {
    //     console.error('Fetch error:', error);
    //   });

    // const html = ''//await response.text();

    // console.log('html', html);
    // const dom = new JSDOM(html);
    // const document = dom.window.document;

    // const espn = document?.textContent ?? '';

    // await fs.writeFile('E:/Source/Repos/test.txt', html, err => {
    //     if (err) {
    //       console.error(err);
    //     }
    //     // file written successfully
    //   });

    console.log('matchupdata', matchupData);
    // //send downloads back to client

    saveCookies(page);

    res.status(200).json({matchupData});
    browser.close();
    // console.log('out of loop')
    // res.status(200);
}

export default getEspn