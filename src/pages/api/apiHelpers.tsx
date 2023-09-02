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
            player.playerLastUpdate = new Date().toLocaleTimeString();

            player.playerPoints = player.incomingPlayerPoints;            
        }        
}

export function swapOutTestData(matchupData: MatchupData, index: string)
{
    //goff -> 0 - 7, rham 0-4, hufunga 0-11, chubb - 0-14, waddle 0-6
    //initial player increases
    console.log('NEW matchup data')
    if(index === '1')
    {
        let json = '{"homeTeamName":"The Goonz","awayTeamName":"Bama BlackOut","homePlayers":[{"order":0,"playerName":"Jared Goff","incomingPlayerName":"Jared Goff","playerPosition":"QB","playerPoints":0,"incomingPlayerPoints":7,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":1,"playerName":"Isiah Pacheco","incomingPlayerName":"Isiah Pacheco","playerPosition":"RB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":2,"playerName":"D\'Andre Swift","incomingPlayerName":"D\'Andre Swift","playerPosition":"RB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":3,"playerName":"Jaylen Waddle","incomingPlayerName":"Jaylen Waddle","playerPosition":"WR","playerPoints":0,"incomingPlayerPoints":6,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":4,"playerName":"Tyreek Hill","incomingPlayerName":"Tyreek Hill","playerPosition":"WR","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":5,"playerName":"Davante Adams","incomingPlayerName":"Davante Adams","playerPosition":"WR","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":6,"playerName":"Calvin Ridley","incomingPlayerName":"Calvin Ridley","playerPosition":"WR","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":7,"playerName":"Cole Kmet","incomingPlayerName":"Cole Kmet","playerPosition":"TE","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":8,"playerName":"Brock Purdy","incomingPlayerName":"Brock Purdy","playerPosition":"QB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":9,"playerName":"Foyesade Oluokun","incomingPlayerName":"Foyesade Oluokun","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":10,"playerName":"Bobby Okereke","incomingPlayerName":"Bobby Okereke","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":11,"playerName":"Jalen Carter","incomingPlayerName":"Jalen Carter","playerPosition":"DT","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":12,"playerName":"Tre\'Davious White","incomingPlayerName":"Tre\'Davious White","playerPosition":"CB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":13,"playerName":"Marco Wilson","incomingPlayerName":"Marco Wilson","playerPosition":"CB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":14,"playerName":"Talanoa Hufanga","incomingPlayerName":"Talanoa Hufanga","playerPosition":"S","playerPoints":0,"incomingPlayerPoints":11,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":15,"playerName":"Jeremy Chinn","incomingPlayerName":"Jeremy Chinn","playerPosition":"S","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":16,"playerName":"Kyzir White","incomingPlayerName":"Kyzir White","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":17,"playerName":"Troy Andersen","incomingPlayerName":"Troy Andersen","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":18,"playerName":"Dolphins D/ST","incomingPlayerName":"Dolphins D/ST","playerPosition":"D/ST","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":19,"playerName":"Jason Myers","incomingPlayerName":"Jason Myers","playerPosition":"K","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true}],"awayPlayers":[{"order":0,"playerName":"Jalen Hurts","incomingPlayerName":"Jalen Hurts","playerPosition":"QB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":1,"playerName":"Nick Chubb","incomingPlayerName":"Nick Chubb","playerPosition":"RB","playerPoints":0,"incomingPlayerPoints":14,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":2,"playerName":"Josh Jacobs","incomingPlayerName":"Josh Jacobs","playerPosition":"RB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":3,"playerName":"Rhamondre Stevenson","incomingPlayerName":"Rhamondre Stevenson","playerPosition":"RB","playerPoints":0,"incomingPlayerPoints":4,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":4,"playerName":"Mecole Hardman Jr.","incomingPlayerName":"Mecole Hardman Jr.","playerPosition":"WR","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":5,"playerName":"Marquise Brown","incomingPlayerName":"Marquise Brown","playerPosition":"WR","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":6,"playerName":"Rashid Shaheed","incomingPlayerName":"Rashid Shaheed","playerPosition":"WR","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":7,"playerName":"Darren Waller","incomingPlayerName":"Darren Waller","playerPosition":"TE","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":8,"playerName":"Geno Smith","incomingPlayerName":"Geno Smith","playerPosition":"QB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":9,"playerName":"Josey Jewell","incomingPlayerName":"Josey Jewell","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":10,"playerName":"Dre Greenlaw","incomingPlayerName":"Dre Greenlaw","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":11,"playerName":"Maxx Crosby","incomingPlayerName":"Maxx Crosby","playerPosition":"DE","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":12,"playerName":"Dallis Flowers","incomingPlayerName":"Dallis Flowers","playerPosition":"CB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":13,"playerName":"Keisean Nixon","incomingPlayerName":"Keisean Nixon","playerPosition":"CB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":14,"playerName":"Jalen Pitre","incomingPlayerName":"Jalen Pitre","playerPosition":"S","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":15,"playerName":"Eddie Jackson","incomingPlayerName":"Eddie Jackson","playerPosition":"S","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":16,"playerName":"Frankie Luvu","incomingPlayerName":"Frankie Luvu","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":17,"playerName":"Jamin Davis","incomingPlayerName":"Jamin Davis","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":18,"playerName":"Browns D/ST","incomingPlayerName":"Browns D/ST","playerPosition":"D/ST","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":19,"playerName":"Brandon McManus","incomingPlayerName":"Brandon McManus","playerPosition":"K","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true}]}';
        let newMatchupData:MatchupData = JSON.parse(json);

        matchupData = newMatchupData;
    }

    //goff -> 7 - 7, hufunga 11-17, chubb - 14-14, waddle 6-21, swap Johan Dotson for Rham
    //players stay the same, number increases, player swaps
    if(index === '2')
    {
        let json = '{"homeTeamName":"The Goonz","awayTeamName":"Bama BlackOut","homePlayers":[{"order":0,"playerName":"Jared Goff","incomingPlayerName":"Jared Goff","playerPosition":"QB","playerPoints":7,"incomingPlayerPoints":7,"playerPointDiff":7,"playerLastUpdate":"10:18:48 PM","isStarter":true},{"order":1,"playerName":"Isiah Pacheco","incomingPlayerName":"Isiah Pacheco","playerPosition":"RB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":2,"playerName":"D\'Andre Swift","incomingPlayerName":"D\'Andre Swift","playerPosition":"RB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":3,"playerName":"Jaylen Waddle","incomingPlayerName":"Jaylen Waddle","playerPosition":"WR","playerPoints":6,"incomingPlayerPoints":21,"playerPointDiff":6,"playerLastUpdate":"10:18:48 PM","isStarter":true},{"order":4,"playerName":"Tyreek Hill","incomingPlayerName":"Tyreek Hill","playerPosition":"WR","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":5,"playerName":"Davante Adams","incomingPlayerName":"Davante Adams","playerPosition":"WR","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":6,"playerName":"Calvin Ridley","incomingPlayerName":"Calvin Ridley","playerPosition":"WR","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":7,"playerName":"Cole Kmet","incomingPlayerName":"Cole Kmet","playerPosition":"TE","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":8,"playerName":"Brock Purdy","incomingPlayerName":"Brock Purdy","playerPosition":"QB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":9,"playerName":"Foyesade Oluokun","incomingPlayerName":"Foyesade Oluokun","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":10,"playerName":"Bobby Okereke","incomingPlayerName":"Bobby Okereke","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":11,"playerName":"Jalen Carter","incomingPlayerName":"Jalen Carter","playerPosition":"DT","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":12,"playerName":"Tre\'Davious White","incomingPlayerName":"Tre\'Davious White","playerPosition":"CB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":13,"playerName":"Marco Wilson","incomingPlayerName":"Marco Wilson","playerPosition":"CB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":14,"playerName":"Talanoa Hufanga","incomingPlayerName":"Talanoa Hufanga","playerPosition":"S","playerPoints":11,"incomingPlayerPoints":17,"playerPointDiff":11,"playerLastUpdate":"10:18:48 PM","isStarter":true},{"order":15,"playerName":"Jeremy Chinn","incomingPlayerName":"Jeremy Chinn","playerPosition":"S","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":16,"playerName":"Kyzir White","incomingPlayerName":"Kyzir White","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":17,"playerName":"Troy Andersen","incomingPlayerName":"Troy Andersen","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":18,"playerName":"Dolphins D/ST","incomingPlayerName":"Dolphins D/ST","playerPosition":"D/ST","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":19,"playerName":"Jason Myers","incomingPlayerName":"Jason Myers","playerPosition":"K","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true}],"awayPlayers":[{"order":0,"playerName":"Jalen Hurts","incomingPlayerName":"Jalen Hurts","playerPosition":"QB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":1,"playerName":"Nick Chubb","incomingPlayerName":"Nick Chubb","playerPosition":"RB","playerPoints":14,"incomingPlayerPoints":14,"playerPointDiff":14,"playerLastUpdate":"10:18:48 PM","isStarter":true},{"order":2,"playerName":"Josh Jacobs","incomingPlayerName":"Josh Jacobs","playerPosition":"RB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":3,"playerName":"Rhamondre Stevenson","incomingPlayerName":"Johan Dotson","playerPosition":"WR","playerPoints":4,"incomingPlayerPoints":0,"playerPointDiff":4,"playerLastUpdate":"10:18:48 PM","isStarter":true},{"order":4,"playerName":"Mecole Hardman Jr.","incomingPlayerName":"Mecole Hardman Jr.","playerPosition":"WR","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":5,"playerName":"Marquise Brown","incomingPlayerName":"Marquise Brown","playerPosition":"WR","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":6,"playerName":"Rashid Shaheed","incomingPlayerName":"Rashid Shaheed","playerPosition":"WR","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":7,"playerName":"Darren Waller","incomingPlayerName":"Darren Waller","playerPosition":"TE","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":8,"playerName":"Geno Smith","incomingPlayerName":"Geno Smith","playerPosition":"QB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":9,"playerName":"Josey Jewell","incomingPlayerName":"Josey Jewell","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":10,"playerName":"Dre Greenlaw","incomingPlayerName":"Dre Greenlaw","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":11,"playerName":"Maxx Crosby","incomingPlayerName":"Maxx Crosby","playerPosition":"DE","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":12,"playerName":"Dallis Flowers","incomingPlayerName":"Dallis Flowers","playerPosition":"CB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":13,"playerName":"Keisean Nixon","incomingPlayerName":"Keisean Nixon","playerPosition":"CB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":14,"playerName":"Jalen Pitre","incomingPlayerName":"Jalen Pitre","playerPosition":"S","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":15,"playerName":"Eddie Jackson","incomingPlayerName":"Eddie Jackson","playerPosition":"S","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":16,"playerName":"Frankie Luvu","incomingPlayerName":"Frankie Luvu","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":17,"playerName":"Jamin Davis","incomingPlayerName":"Jamin Davis","playerPosition":"LB","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":18,"playerName":"Browns D/ST","incomingPlayerName":"Browns D/ST","playerPosition":"D/ST","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true},{"order":19,"playerName":"Brandon McManus","incomingPlayerName":"Brandon McManus","playerPosition":"K","playerPoints":0,"incomingPlayerPoints":0,"playerPointDiff":0,"playerLastUpdate":"","isStarter":true}]}';
        let newMatchupData:MatchupData = JSON.parse(json);

        matchupData = newMatchupData;
    }

    return matchupData;
}