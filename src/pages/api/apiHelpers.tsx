import { ElementHandle, Page } from "puppeteer";
import fs from 'fs'
import { MatchupData } from "@/components/Matchup/MatchupData";
import { PlayerData } from "@/components/Player/PlayerData";
import { match } from "assert";

export function delay(time: any) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
  }

export async function getElementByTitle(element: ElementHandle<Element>)
{
    return await element.evaluate(el => el.getAttribute('title'))
}

export async function getElementByContent(element: ElementHandle<Element>)
{
    return await element.evaluate(el => el.textContent)
}

export async function loadCookies(page: Page, name: string) {
    const loadedCookie = fs.readFile(`E:/Source/Repos/cookies-${name}.txt`, (err) => {
        if (err)
          console.log(err);
        else {
        }
      });
      if(loadedCookie != null){
        const parsedCookie = JSON.parse(loadedCookie);
        await page.setCookie(...parsedCookie);
      }
}

export async function openPage(page: Page, url: string)
{
    page.goto(url, {
      timeout: 15 * 1000,
      waitUntil: ['domcontentloaded'],
  });
}

export async function saveCookies(page: Page, name: string){
    const cookies = await page.cookies();
    await fs.writeFile(`E:/Source/Repos/cookies-${name}.txt`, JSON.stringify(cookies), (err) => {
      if (err)
        console.log(err);
      else {
      }
    });
}

export function isPlayerStarting(text: string){
    return text !== "BN" && text !== "IR" && text !== "BENCH" && text !== "Bench";
}

export function updateMatchupData(matchupData: MatchupData)
{
    if(matchupData){
        if(matchupData.homePlayers)
        {
            matchupData.homePlayers.forEach((player: PlayerData) => {
                updatePlayer(player);
            });
        }
        if(matchupData.awayPlayers){
            matchupData.awayPlayers.forEach((player: PlayerData) => {
                updatePlayer(player);
            });   
        }
    }    

    return matchupData;
}

export function updatePlayer(player: PlayerData)
{
    if(player.playerName !== player.incomingPlayerName)
        {
            player.playerName = player.incomingPlayerName;
            player.playerPointDiff = 0;
            player.playerLastUpdate = '';

            player.playerPoints = player.incomingPlayerPoints;
        }
        else if(player.playerPoints !== player.incomingPlayerPoints)
        {
            player.playerPointDiff = player.incomingPlayerPoints - player.playerPoints;
            player.playerLastUpdate = new Date().toString();

            player.playerPoints = player.incomingPlayerPoints;            
        }        
}

export function swapOutTestData(matchupData: MatchupData, index: string, league: string)
{
    //J. Hurts -> 0 - 21, R. Stevenson -> 0-100 -- s-straight, A. St. Brown -> 0-46, S. Barkley 0-125 -- s-straight, T. Pollard - 0-50 - s-partial, D. Campbell -> 0-30 -- s-straight
    //J. Mixon -> 0 - 200 -- RB1, R. White -> 0-300 --Flex 1, D. London -> 0-250 -- partial-Flex 2, C. Holcomb -> 0-150 -- LB1

    //T. Lawrence -> 0 - 50 --straight, M. Evans -> 0-105 -- straight, C. McCaffrey -> 0-110
    //J. Goff -> 0-150 -- QB1, B. Aiyuk -> 0-200 -- straight-WR1
    //initial player increases
    console.log('NEW matchup data')
    if(league === 'trl')
    {
        if(index === '1')
        {
            let json = '{"homeTeamName":"The Goonz","awayTeamName":"Bama BlackOut","homePlayers":[{"order":0,"playerName":"Jared Goff","incomingPlayerName":"Jared Goff","playerPosition":"QB","playerPoints":0,"incomingPlayerPoints":7,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":1,"playerName":"Isiah Pacheco","incomingPlayerName":"Isiah Pacheco","playerPosition":"RB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":2,"playerName":"D\'Andre Swift","incomingPlayerName":"D\'Andre Swift","playerPosition":"RB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":3,"playerName":"Jaylen Waddle","incomingPlayerName":"Jaylen Waddle","playerPosition":"WR","playerPoints":0,"incomingPlayerPoints":6,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":4,"playerName":"Tyreek Hill","incomingPlayerName":"Tyreek Hill","playerPosition":"WR","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":5,"playerName":"Davante Adams","incomingPlayerName":"Davante Adams","playerPosition":"WR","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":6,"playerName":"Calvin Ridley","incomingPlayerName":"Calvin Ridley","playerPosition":"WR","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":7,"playerName":"Cole Kmet","incomingPlayerName":"Cole Kmet","playerPosition":"TE","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":8,"playerName":"Brock Purdy","incomingPlayerName":"Brock Purdy","playerPosition":"QB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":9,"playerName":"Foyesade Oluokun","incomingPlayerName":"Foyesade Oluokun","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":10,"playerName":"Bobby Okereke","incomingPlayerName":"Bobby Okereke","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":11,"playerName":"Jalen Carter","incomingPlayerName":"Jalen Carter","playerPosition":"DT","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":12,"playerName":"Tre\'Davious White","incomingPlayerName":"Tre\'Davious White","playerPosition":"CB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":13,"playerName":"Marco Wilson","incomingPlayerName":"Marco Wilson","playerPosition":"CB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":14,"playerName":"Talanoa Hufanga","incomingPlayerName":"Talanoa Hufanga","playerPosition":"S","playerPoints":0,"incomingPlayerPoints":11,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":15,"playerName":"Jeremy Chinn","incomingPlayerName":"Jeremy Chinn","playerPosition":"S","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":16,"playerName":"Kyzir White","incomingPlayerName":"Kyzir White","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":17,"playerName":"Troy Andersen","incomingPlayerName":"Troy Andersen","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":18,"playerName":"Dolphins D/ST","incomingPlayerName":"Dolphins D/ST","playerPosition":"D/ST","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":19,"playerName":"Jason Myers","incomingPlayerName":"Jason Myers","playerPosition":"K","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true}],"awayPlayers":[{"order":0,"playerName":"Jalen Hurts","incomingPlayerName":"Jalen Hurts","playerPosition":"QB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":1,"playerName":"Nick Chubb","incomingPlayerName":"Nick Chubb","playerPosition":"RB","playerPoints":0,"incomingPlayerPoints":14,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":2,"playerName":"Josh Jacobs","incomingPlayerName":"Josh Jacobs","playerPosition":"RB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":3,"playerName":"Rhamondre Stevenson","incomingPlayerName":"Rhamondre Stevenson","playerPosition":"RB","playerPoints":0,"incomingPlayerPoints":4,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":4,"playerName":"Mecole Hardman Jr.","incomingPlayerName":"Mecole Hardman Jr.","playerPosition":"WR","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":5,"playerName":"Marquise Brown","incomingPlayerName":"Marquise Brown","playerPosition":"WR","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":6,"playerName":"Rashid Shaheed","incomingPlayerName":"Rashid Shaheed","playerPosition":"WR","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":7,"playerName":"Darren Waller","incomingPlayerName":"Darren Waller","playerPosition":"TE","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":8,"playerName":"Geno Smith","incomingPlayerName":"Geno Smith","playerPosition":"QB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":9,"playerName":"Josey Jewell","incomingPlayerName":"Josey Jewell","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":10,"playerName":"Dre Greenlaw","incomingPlayerName":"Dre Greenlaw","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":11,"playerName":"Maxx Crosby","incomingPlayerName":"Maxx Crosby","playerPosition":"DE","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":12,"playerName":"Dallis Flowers","incomingPlayerName":"Dallis Flowers","playerPosition":"CB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":13,"playerName":"Keisean Nixon","incomingPlayerName":"Keisean Nixon","playerPosition":"CB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":14,"playerName":"Jalen Pitre","incomingPlayerName":"Jalen Pitre","playerPosition":"S","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":15,"playerName":"Eddie Jackson","incomingPlayerName":"Eddie Jackson","playerPosition":"S","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":16,"playerName":"Frankie Luvu","incomingPlayerName":"Frankie Luvu","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":17,"playerName":"Jamin Davis","incomingPlayerName":"Jamin Davis","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":18,"playerName":"Browns D/ST","incomingPlayerName":"Browns D/ST","playerPosition":"D/ST","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":19,"playerName":"Brandon McManus","incomingPlayerName":"Brandon McManus","playerPosition":"K","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true}]}';
            
            let newMatchupData = matchupData.awayPlayers.map(p => {
                if(p.playerName === 'J. Hurts'){                        
                    return { ...p, playerPoints: 0, incomingPlayerPoints: 21, playerPointDiff: 0, playerLastUpdate: 'Thu Sep 06 2023 12:31:54 GMT-0400 (Eastern Daylight Time)' };
                }
                if(p.playerName === 'R. Stevenson'){                        
                    return { ...p, playerPoints: 0, incomingPlayerPoints: 100, playerPointDiff: 0, playerLastUpdate: new Date().toString() };
                }
                if(p.playerName === 'A. St. Brown'){                        
                    return { ...p, playerPoints: 0, incomingPlayerPoints: 46, playerPointDiff: 0, playerLastUpdate: subtractMinutes(new Date(), 2) };
                }
                if(p.playerName === 'S. Barkley'){                        
                    return { ...p, playerPoints: 0, incomingPlayerPoints: 125, playerPointDiff: 0, playerLastUpdate: 'Thu Sep 06 2023 12:31:54 GMT-0400 (Eastern Daylight Time)' };
                }
                if(p.playerName === 'T. Pollard'){                        
                    return { ...p, playerPoints: 0, incomingPlayerPoints: 50, playerPointDiff: 0, playerLastUpdate: 'Thu Sep 06 2023 12:31:54 GMT-0400 (Eastern Daylight Time)' };
                }
                if(p.playerName === 'D. Campbell'){                        
                    return { ...p, playerPoints: 0, incomingPlayerPoints: 30, playerPointDiff: 0, playerLastUpdate: '' };
                }
                if(p.playerName === 'J. Mixon'){                        
                    return { ...p, playerPoints: 0, incomingPlayerPoints: 200, playerPointDiff: 0, playerLastUpdate: '' };
                }
                if(p.playerName === 'R. White'){                        
                    return { ...p, playerPoints: 0, incomingPlayerPoints: 300, playerPointDiff: 0, playerLastUpdate: 'Thu Sep 06 2023 12:31:54 GMT-0400 (Eastern Daylight Time)' };
                }
                if(p.playerName === 'D. London'){                        
                    return { ...p, playerPoints: 0, incomingPlayerPoints: 250, playerPointDiff: 0, playerLastUpdate: 'Thu Sep 06 2023 12:31:54 GMT-0400 (Eastern Daylight Time)' };
                }
                if(p.playerName === 'C. Holcomb'){                        
                    return { ...p, playerPoints: 0, incomingPlayerPoints: 150, playerPointDiff: 0, playerLastUpdate: 'Thu Sep 06 2023 12:31:54 GMT-0400 (Eastern Daylight Time)' };
                }
                return p;      
            });    

            // let newMatchupData:MatchupData = JSON.parse(json);

            matchupData.awayPlayers = newMatchupData;

            newMatchupData = matchupData.homePlayers.map(p => {
                if(p.playerName === 'T. Lawrence'){                        
                    return { ...p, playerPoints: 0, incomingPlayerPoints: 50, playerPointDiff: 0, playerLastUpdate: subtractMinutes(new Date(), 2) };
                }
                if(p.playerName === 'M. Evans'){                        
                    return { ...p, playerPoints: 0, incomingPlayerPoints: 105, playerPointDiff: 0, playerLastUpdate: 'Thu Sep 06 2023 12:31:54 GMT-0400 (Eastern Daylight Time)' };
                }
                if(p.playerName === 'C. McCaffrey'){                        
                    return { ...p, playerPoints: 0, incomingPlayerPoints: 110, playerPointDiff: 0, playerLastUpdate: new Date().toString() };
                }
                if(p.playerName === 'J. Goff'){                        
                    return { ...p, playerPoints: 0, incomingPlayerPoints: 150, playerPointDiff: 0, playerLastUpdate: '' };
                }
                if(p.playerName === 'B. Aiyuk'){                        
                    return { ...p, playerPoints: 0, incomingPlayerPoints: 200, playerPointDiff: 0, playerLastUpdate: '' };
                }
                return p;      
            });    

            // let newMatchupData:MatchupData = JSON.parse(json);

            matchupData.homePlayers = newMatchupData;
        }

        //J. Hurts -> 21 - 40, R. Stevenson -> 100-110 -- s-straight, A. St. Brown -> 46-300--swap back, S. Barkley 125-125, T. Pollard - 50-150 - s-partial-swap back, D. Campbell -> 30-300 -- s-straight-swap back
        //J. Mixon -> 200 - 230 -- RB1, R. White -> 300-350 --Flex 1, D. London -> 250-250 -- partial-Flex 2, C. Holcomb -> 150-180 -- LB1

        //T. Lawrence -> 50 - 170 --straight--swap back, M. Evans -> 105-105 -- straight, C. McCaffrey -> 105-155, F. Warner -> 0-25
        //J. Goff -> 150-160 -- QB1, B. Aiyuk -> 200-250 -- straight-WR1
        //players stay the same, number increases, player swaps
        if(index === '2')
        {
            let json = '{"homeTeamName":"The Goonz","awayTeamName":"Bama BlackOut","homePlayers":[{"order":0,"playerName":"Jared Goff","incomingPlayerName":"Jared Goff","playerPosition":"QB","playerPoints":7,"incomingPlayerPoints":7,"playerPointDiff":7,"playerLastUpdate":"10:18:48 PM","isStarter":true},{"order":1,"playerName":"Isiah Pacheco","incomingPlayerName":"Isiah Pacheco","playerPosition":"RB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":2,"playerName":"D\'Andre Swift","incomingPlayerName":"D\'Andre Swift","playerPosition":"RB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":3,"playerName":"Jaylen Waddle","incomingPlayerName":"Jaylen Waddle","playerPosition":"WR","playerPoints":6,"incomingPlayerPoints":21,"playerPointDiff":6,"playerLastUpdate":"10:18:48 PM","isStarter":true},{"order":4,"playerName":"Tyreek Hill","incomingPlayerName":"Tyreek Hill","playerPosition":"WR","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":5,"playerName":"Davante Adams","incomingPlayerName":"Davante Adams","playerPosition":"WR","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":6,"playerName":"Calvin Ridley","incomingPlayerName":"Calvin Ridley","playerPosition":"WR","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":7,"playerName":"Cole Kmet","incomingPlayerName":"Cole Kmet","playerPosition":"TE","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":8,"playerName":"Brock Purdy","incomingPlayerName":"Brock Purdy","playerPosition":"QB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":9,"playerName":"Foyesade Oluokun","incomingPlayerName":"Foyesade Oluokun","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":10,"playerName":"Bobby Okereke","incomingPlayerName":"Bobby Okereke","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":11,"playerName":"Jalen Carter","incomingPlayerName":"Jalen Carter","playerPosition":"DT","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":12,"playerName":"Tre\'Davious White","incomingPlayerName":"Tre\'Davious White","playerPosition":"CB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":13,"playerName":"Marco Wilson","incomingPlayerName":"Marco Wilson","playerPosition":"CB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":14,"playerName":"Talanoa Hufanga","incomingPlayerName":"Talanoa Hufanga","playerPosition":"S","playerPoints":11,"incomingPlayerPoints":17,"playerPointDiff":11,"playerLastUpdate":"10:18:48 PM","isStarter":true},{"order":15,"playerName":"Jeremy Chinn","incomingPlayerName":"Jeremy Chinn","playerPosition":"S","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":16,"playerName":"Kyzir White","incomingPlayerName":"Kyzir White","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":17,"playerName":"Troy Andersen","incomingPlayerName":"Troy Andersen","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":18,"playerName":"Dolphins D/ST","incomingPlayerName":"Dolphins D/ST","playerPosition":"D/ST","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":19,"playerName":"Jason Myers","incomingPlayerName":"Jason Myers","playerPosition":"K","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true}],"awayPlayers":[{"order":0,"playerName":"Jalen Hurts","incomingPlayerName":"Jalen Hurts","playerPosition":"QB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":1,"playerName":"Nick Chubb","incomingPlayerName":"Nick Chubb","playerPosition":"RB","playerPoints":14,"incomingPlayerPoints":14,"playerPointDiff":14,"playerLastUpdate":"10:18:48 PM","isStarter":true},{"order":2,"playerName":"Josh Jacobs","incomingPlayerName":"Josh Jacobs","playerPosition":"RB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":3,"playerName":"Rhamondre Stevenson","incomingPlayerName":"Johan Dotson","playerPosition":"WR","playerPoints":4,"incomingPlayerPoints":0,"playerPointDiff":4,"playerLastUpdate":"10:18:48 PM","isStarter":true},{"order":4,"playerName":"Mecole Hardman Jr.","incomingPlayerName":"Mecole Hardman Jr.","playerPosition":"WR","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":5,"playerName":"Marquise Brown","incomingPlayerName":"Marquise Brown","playerPosition":"WR","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":6,"playerName":"Rashid Shaheed","incomingPlayerName":"Rashid Shaheed","playerPosition":"WR","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":7,"playerName":"Darren Waller","incomingPlayerName":"Darren Waller","playerPosition":"TE","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":8,"playerName":"Geno Smith","incomingPlayerName":"Geno Smith","playerPosition":"QB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":9,"playerName":"Josey Jewell","incomingPlayerName":"Josey Jewell","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":10,"playerName":"Dre Greenlaw","incomingPlayerName":"Dre Greenlaw","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":11,"playerName":"Maxx Crosby","incomingPlayerName":"Maxx Crosby","playerPosition":"DE","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":12,"playerName":"Dallis Flowers","incomingPlayerName":"Dallis Flowers","playerPosition":"CB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":13,"playerName":"Keisean Nixon","incomingPlayerName":"Keisean Nixon","playerPosition":"CB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":14,"playerName":"Jalen Pitre","incomingPlayerName":"Jalen Pitre","playerPosition":"S","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":15,"playerName":"Eddie Jackson","incomingPlayerName":"Eddie Jackson","playerPosition":"S","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":16,"playerName":"Frankie Luvu","incomingPlayerName":"Frankie Luvu","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":17,"playerName":"Jamin Davis","incomingPlayerName":"Jamin Davis","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":18,"playerName":"Browns D/ST","incomingPlayerName":"Browns D/ST","playerPosition":"D/ST","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":19,"playerName":"Brandon McManus","incomingPlayerName":"Brandon McManus","playerPosition":"K","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true}]}';
                    
            let newMatchupData = matchupData.awayPlayers.map(p => {
                if(p.playerName === 'J. Hurts'){                        
                    return { ...p, playerPoints: 0, incomingPlayerPoints: 0, playerPointDiff: 0, playerLastUpdate: 'Thu Sep 06 2023 12:31:54 GMT-0400 (Eastern Daylight Time)' };
                }
                if(p.playerName === 'R. Stevenson'){                        
                    return { ...p, playerPoints: 0, incomingPlayerPoints: 0, playerPointDiff: 0, playerLastUpdate: 'Thu Sep 06 2023 12:31:54 GMT-0400 (Eastern Daylight Time)' };
                }
                if(p.playerName === 'A. St. Brown'){                        
                    return { ...p, playerPoints: 0, incomingPlayerPoints: 0, playerPointDiff: 0, playerLastUpdate: 'Thu Sep 06 2023 12:31:54 GMT-0400 (Eastern Daylight Time)' };
                }
                if(p.playerName === 'S. Barkley'){                        
                    return { ...p, playerPoints: 0, incomingPlayerPoints: 0, playerPointDiff: 0, playerLastUpdate: 'Thu Sep 06 2023 12:31:54 GMT-0400 (Eastern Daylight Time)' };
                }
                if(p.playerName === 'T. Pollard'){                        
                    return { ...p, playerPoints: 0, incomingPlayerPoints: 0, playerPointDiff: 0, playerLastUpdate: 'Thu Sep 06 2023 12:31:54 GMT-0400 (Eastern Daylight Time)' };
                }
                if(p.playerName === 'D. Campbell'){                        
                    return { ...p, playerPoints: 0, incomingPlayerPoints: 0, playerPointDiff: 0, playerLastUpdate: 'Thu Sep 06 2023 12:31:54 GMT-0400 (Eastern Daylight Time)' };
                }
                if(p.playerName === 'J. Mixon'){                        
                    return { ...p, playerPoints: 0, incomingPlayerPoints: 0, playerPointDiff: 0, playerLastUpdate: 'Thu Sep 06 2023 12:31:54 GMT-0400 (Eastern Daylight Time)' };
                }
                if(p.playerName === 'R. White'){                        
                    return { ...p, playerPoints: 0, incomingPlayerPoints: 0, playerPointDiff: 0, playerLastUpdate: 'Thu Sep 06 2023 12:31:54 GMT-0400 (Eastern Daylight Time)' };
                }
                if(p.playerName === 'D. London'){                        
                    return { ...p, playerPoints: 0, incomingPlayerPoints: 0, playerPointDiff: 0, playerLastUpdate: 'Thu Sep 06 2023 12:31:54 GMT-0400 (Eastern Daylight Time)' };
                }
                if(p.playerName === 'C. Holcomb'){                        
                    return { ...p, playerPoints: 0, incomingPlayerPoints: 0, playerPointDiff: 0, playerLastUpdate: 'Thu Sep 06 2023 12:31:54 GMT-0400 (Eastern Daylight Time)' };
                }
                return p;      
            });    

            matchupData.awayPlayers = newMatchupData;

            newMatchupData = matchupData.homePlayers.map(p => {
                if(p.playerName === 'T. Lawrence'){                        
                    return { ...p, playerPoints: 0, incomingPlayerPoints: 0, playerPointDiff: 0, playerLastUpdate: 'Thu Sep 06 2023 12:31:54 GMT-0400 (Eastern Daylight Time)' };
                }
                if(p.playerName === 'M. Evans'){                        
                    return { ...p, playerPoints: 0, incomingPlayerPoints: 0, playerPointDiff: 0, playerLastUpdate: 'Thu Sep 06 2023 12:31:54 GMT-0400 (Eastern Daylight Time)' };
                }
                if(p.playerName === 'C. McCaffrey'){                        
                    return { ...p, playerPoints: 0, incomingPlayerPoints: 0, playerPointDiff: 0, playerLastUpdate: 'Thu Sep 06 2023 12:31:54 GMT-0400 (Eastern Daylight Time)' };
                }
                if(p.playerName === 'J. Goff'){                        
                    return { ...p, playerPoints: 0, incomingPlayerPoints: 0, playerPointDiff: 0, playerLastUpdate: 'Thu Sep 06 2023 12:31:54 GMT-0400 (Eastern Daylight Time)' };
                }
                if(p.playerName === 'B. Aiyuk'){                        
                    return { ...p, playerPoints: 0, incomingPlayerPoints: 0, playerPointDiff: 0, playerLastUpdate: 'Thu Sep 06 2023 12:31:54 GMT-0400 (Eastern Daylight Time)' };
                }
                if(p.playerName === 'F. Warner'){                        
                    return { ...p, playerPoints: 0, incomingPlayerPoints: 0, playerPointDiff: 0, playerLastUpdate: 'Thu Sep 06 2023 12:31:54 GMT-0400 (Eastern Daylight Time)' };
                }
                return p;      
            });    
            
            matchupData.homePlayers = newMatchupData;
        }
    }
    if(league === 'rml')
    {
        if(index === '1')
        {
            let json = '{"homeTeamName":"The Goonz","awayTeamName":"Bama BlackOut","homePlayers":[{"order":0,"playerName":"Jared Goff","incomingPlayerName":"Jared Goff","playerPosition":"QB","playerPoints":0,"incomingPlayerPoints":7,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":1,"playerName":"Isiah Pacheco","incomingPlayerName":"Isiah Pacheco","playerPosition":"RB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":2,"playerName":"D\'Andre Swift","incomingPlayerName":"D\'Andre Swift","playerPosition":"RB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":3,"playerName":"Jaylen Waddle","incomingPlayerName":"Jaylen Waddle","playerPosition":"WR","playerPoints":0,"incomingPlayerPoints":6,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":4,"playerName":"Tyreek Hill","incomingPlayerName":"Tyreek Hill","playerPosition":"WR","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":5,"playerName":"Davante Adams","incomingPlayerName":"Davante Adams","playerPosition":"WR","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":6,"playerName":"Calvin Ridley","incomingPlayerName":"Calvin Ridley","playerPosition":"WR","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":7,"playerName":"Cole Kmet","incomingPlayerName":"Cole Kmet","playerPosition":"TE","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":8,"playerName":"Brock Purdy","incomingPlayerName":"Brock Purdy","playerPosition":"QB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":9,"playerName":"Foyesade Oluokun","incomingPlayerName":"Foyesade Oluokun","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":10,"playerName":"Bobby Okereke","incomingPlayerName":"Bobby Okereke","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":11,"playerName":"Jalen Carter","incomingPlayerName":"Jalen Carter","playerPosition":"DT","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":12,"playerName":"Tre\'Davious White","incomingPlayerName":"Tre\'Davious White","playerPosition":"CB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":13,"playerName":"Marco Wilson","incomingPlayerName":"Marco Wilson","playerPosition":"CB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":14,"playerName":"Talanoa Hufanga","incomingPlayerName":"Talanoa Hufanga","playerPosition":"S","playerPoints":0,"incomingPlayerPoints":11,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":15,"playerName":"Jeremy Chinn","incomingPlayerName":"Jeremy Chinn","playerPosition":"S","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":16,"playerName":"Kyzir White","incomingPlayerName":"Kyzir White","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":17,"playerName":"Troy Andersen","incomingPlayerName":"Troy Andersen","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":18,"playerName":"Dolphins D/ST","incomingPlayerName":"Dolphins D/ST","playerPosition":"D/ST","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":19,"playerName":"Jason Myers","incomingPlayerName":"Jason Myers","playerPosition":"K","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true}],"awayPlayers":[{"order":0,"playerName":"Jalen Hurts","incomingPlayerName":"Jalen Hurts","playerPosition":"QB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":1,"playerName":"Nick Chubb","incomingPlayerName":"Nick Chubb","playerPosition":"RB","playerPoints":0,"incomingPlayerPoints":14,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":2,"playerName":"Josh Jacobs","incomingPlayerName":"Josh Jacobs","playerPosition":"RB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":3,"playerName":"Rhamondre Stevenson","incomingPlayerName":"Rhamondre Stevenson","playerPosition":"RB","playerPoints":0,"incomingPlayerPoints":4,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":4,"playerName":"Mecole Hardman Jr.","incomingPlayerName":"Mecole Hardman Jr.","playerPosition":"WR","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":5,"playerName":"Marquise Brown","incomingPlayerName":"Marquise Brown","playerPosition":"WR","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":6,"playerName":"Rashid Shaheed","incomingPlayerName":"Rashid Shaheed","playerPosition":"WR","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":7,"playerName":"Darren Waller","incomingPlayerName":"Darren Waller","playerPosition":"TE","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":8,"playerName":"Geno Smith","incomingPlayerName":"Geno Smith","playerPosition":"QB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":9,"playerName":"Josey Jewell","incomingPlayerName":"Josey Jewell","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":10,"playerName":"Dre Greenlaw","incomingPlayerName":"Dre Greenlaw","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":11,"playerName":"Maxx Crosby","incomingPlayerName":"Maxx Crosby","playerPosition":"DE","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":12,"playerName":"Dallis Flowers","incomingPlayerName":"Dallis Flowers","playerPosition":"CB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":13,"playerName":"Keisean Nixon","incomingPlayerName":"Keisean Nixon","playerPosition":"CB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":14,"playerName":"Jalen Pitre","incomingPlayerName":"Jalen Pitre","playerPosition":"S","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":15,"playerName":"Eddie Jackson","incomingPlayerName":"Eddie Jackson","playerPosition":"S","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":16,"playerName":"Frankie Luvu","incomingPlayerName":"Frankie Luvu","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":17,"playerName":"Jamin Davis","incomingPlayerName":"Jamin Davis","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":18,"playerName":"Browns D/ST","incomingPlayerName":"Browns D/ST","playerPosition":"D/ST","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":19,"playerName":"Brandon McManus","incomingPlayerName":"Brandon McManus","playerPosition":"K","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true}]}';
            
            let newMatchupData = matchupData.homePlayers.map(p => {
                if(p.playerName === 'Jared Goff'){                        
                return { ...p, incomingPlayerPoints: 7, playerLastUpdate: subtractMinutes(new Date(), 2) };
                }          
                if(p.playerName === 'Talanoa Hufanga'){
                    return { ...p, incomingPlayerPoints: 7, playerLastUpdate: new Date().toString() };
                }          
                if(p.playerName === 'Jaylen Waddle'){
                    return { ...p, incomingPlayerPoints: 7 };
                }          
                return p;      
            });    

            // let newMatchupData:MatchupData = JSON.parse(json);

            matchupData.homePlayers = newMatchupData;

            newMatchupData = matchupData.awayPlayers.map(p => {
                if(p.playerName === 'Rhamondre Stevenson'){
                    return { ...p, incomingPlayerPoints: 7, playerLastUpdate:  new Date().toString() };
                }          
                if(p.playerName === 'Nick Chubb'){
                    return { ...p, incomingPlayerPoints: 7, playerLastUpdate: subtractMinutes(new Date(), 2) };
                }                      
                return p;      
            });    

            // let newMatchupData:MatchupData = JSON.parse(json);

            matchupData.awayPlayers = newMatchupData;
        }

        //goff -> 7 - 7, hufunga 11-17, chubb - 14-14, waddle 6-21, swap Johan Dotson for Rham
        //players stay the same, number increases, player swaps
        if(index === '2')
        {
            let json = '{"homeTeamName":"The Goonz","awayTeamName":"Bama BlackOut","homePlayers":[{"order":0,"playerName":"Jared Goff","incomingPlayerName":"Jared Goff","playerPosition":"QB","playerPoints":7,"incomingPlayerPoints":7,"playerPointDiff":7,"playerLastUpdate":"10:18:48 PM","isStarter":true},{"order":1,"playerName":"Isiah Pacheco","incomingPlayerName":"Isiah Pacheco","playerPosition":"RB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":2,"playerName":"D\'Andre Swift","incomingPlayerName":"D\'Andre Swift","playerPosition":"RB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":3,"playerName":"Jaylen Waddle","incomingPlayerName":"Jaylen Waddle","playerPosition":"WR","playerPoints":6,"incomingPlayerPoints":21,"playerPointDiff":6,"playerLastUpdate":"10:18:48 PM","isStarter":true},{"order":4,"playerName":"Tyreek Hill","incomingPlayerName":"Tyreek Hill","playerPosition":"WR","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":5,"playerName":"Davante Adams","incomingPlayerName":"Davante Adams","playerPosition":"WR","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":6,"playerName":"Calvin Ridley","incomingPlayerName":"Calvin Ridley","playerPosition":"WR","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":7,"playerName":"Cole Kmet","incomingPlayerName":"Cole Kmet","playerPosition":"TE","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":8,"playerName":"Brock Purdy","incomingPlayerName":"Brock Purdy","playerPosition":"QB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":9,"playerName":"Foyesade Oluokun","incomingPlayerName":"Foyesade Oluokun","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":10,"playerName":"Bobby Okereke","incomingPlayerName":"Bobby Okereke","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":11,"playerName":"Jalen Carter","incomingPlayerName":"Jalen Carter","playerPosition":"DT","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":12,"playerName":"Tre\'Davious White","incomingPlayerName":"Tre\'Davious White","playerPosition":"CB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":13,"playerName":"Marco Wilson","incomingPlayerName":"Marco Wilson","playerPosition":"CB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":14,"playerName":"Talanoa Hufanga","incomingPlayerName":"Talanoa Hufanga","playerPosition":"S","playerPoints":11,"incomingPlayerPoints":17,"playerPointDiff":11,"playerLastUpdate":"10:18:48 PM","isStarter":true},{"order":15,"playerName":"Jeremy Chinn","incomingPlayerName":"Jeremy Chinn","playerPosition":"S","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":16,"playerName":"Kyzir White","incomingPlayerName":"Kyzir White","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":17,"playerName":"Troy Andersen","incomingPlayerName":"Troy Andersen","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":18,"playerName":"Dolphins D/ST","incomingPlayerName":"Dolphins D/ST","playerPosition":"D/ST","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":19,"playerName":"Jason Myers","incomingPlayerName":"Jason Myers","playerPosition":"K","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true}],"awayPlayers":[{"order":0,"playerName":"Jalen Hurts","incomingPlayerName":"Jalen Hurts","playerPosition":"QB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":1,"playerName":"Nick Chubb","incomingPlayerName":"Nick Chubb","playerPosition":"RB","playerPoints":14,"incomingPlayerPoints":14,"playerPointDiff":14,"playerLastUpdate":"10:18:48 PM","isStarter":true},{"order":2,"playerName":"Josh Jacobs","incomingPlayerName":"Josh Jacobs","playerPosition":"RB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":3,"playerName":"Rhamondre Stevenson","incomingPlayerName":"Johan Dotson","playerPosition":"WR","playerPoints":4,"incomingPlayerPoints":0,"playerPointDiff":4,"playerLastUpdate":"10:18:48 PM","isStarter":true},{"order":4,"playerName":"Mecole Hardman Jr.","incomingPlayerName":"Mecole Hardman Jr.","playerPosition":"WR","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":5,"playerName":"Marquise Brown","incomingPlayerName":"Marquise Brown","playerPosition":"WR","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":6,"playerName":"Rashid Shaheed","incomingPlayerName":"Rashid Shaheed","playerPosition":"WR","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":7,"playerName":"Darren Waller","incomingPlayerName":"Darren Waller","playerPosition":"TE","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":8,"playerName":"Geno Smith","incomingPlayerName":"Geno Smith","playerPosition":"QB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":9,"playerName":"Josey Jewell","incomingPlayerName":"Josey Jewell","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":10,"playerName":"Dre Greenlaw","incomingPlayerName":"Dre Greenlaw","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":11,"playerName":"Maxx Crosby","incomingPlayerName":"Maxx Crosby","playerPosition":"DE","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":12,"playerName":"Dallis Flowers","incomingPlayerName":"Dallis Flowers","playerPosition":"CB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":13,"playerName":"Keisean Nixon","incomingPlayerName":"Keisean Nixon","playerPosition":"CB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":14,"playerName":"Jalen Pitre","incomingPlayerName":"Jalen Pitre","playerPosition":"S","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":15,"playerName":"Eddie Jackson","incomingPlayerName":"Eddie Jackson","playerPosition":"S","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":16,"playerName":"Frankie Luvu","incomingPlayerName":"Frankie Luvu","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":17,"playerName":"Jamin Davis","incomingPlayerName":"Jamin Davis","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":18,"playerName":"Browns D/ST","incomingPlayerName":"Browns D/ST","playerPosition":"D/ST","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":19,"playerName":"Brandon McManus","incomingPlayerName":"Brandon McManus","playerPosition":"K","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true}]}';
                    
            let newMatchupData = matchupData.homePlayers.map(p => {
                if(p.playerName === 'Jared Goff'){                        
                    return { ...p, playerPoints: 7, incomingPlayerPoints: 7, playerPointDiff: 7, playerLastUpdate: 'Thu Sep 06 2023 12:31:54 GMT-0400 (Eastern Daylight Time)' };
                }          
                if(p.playerName === 'Talanoa Hufanga'){
                    return { ...p, playerPoints: 11, incomingPlayerPoints: 17, playerPointDiff: 11, playerLastUpdate: subtractMinutes(new Date(), 2) };
                }          
                if(p.playerName === 'Jaylen Waddle'){
                    return { ...p, playerPoints: 6, incomingPlayerPoints: 21, playerPointDiff: 6, playerLastUpdate: new Date().toString() };
                }          
                return p;      
            });    

            matchupData.homePlayers = newMatchupData;

            newMatchupData = matchupData.awayPlayers.map(p => {
                if(p.playerName === 'Rhamondre Stevenson'){
                    return { ...p, incomingPlayerName: 'Johan Dotson', playerPosition: 'WR', playerPoints: 4, incomingPlayerPoints: 0, playerPointDiff: 4, playerLastUpdate:subtractMinutes(new Date(), 2)};
                }          
                if(p.playerName === 'Nick Chubb'){
                    return { ...p, playerPoints: 14, incomingPlayerPoints: 14, playerPointDiff: 14, playerLastUpdate: 'Thu Sep 06 2023 12:31:54 GMT-0400 (Eastern Daylight Time)' };
                }                      
                return p;      
            });    
            
            matchupData.awayPlayers = newMatchupData;
        }
    }

    return matchupData;
}

const subtractMinutes = (date: Date, minutes: number): string => {
    const result = new Date(date);
    result.setMinutes(result.getMinutes() - minutes);
    return result.toString();
};