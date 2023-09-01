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

export function updateMatchupData(matchupData: MatchupData)
{

    matchupData.playerDatas.forEach((player: PlayerData) => {
        if(player.homePlayerName !== player.homeIncomingPlayerName)
        {
            player.homePlayerName = player.homeIncomingPlayerName;
            player.homePlayerPointDiff = 0;
            player.homePlayerLastUpdate = '';

            player.homePlayerPoints = player.homeIncomingPlayerPoints;
        }
        else if(player.homePlayerPoints !== player.homeIncomingPlayerPoints)
        {
            player.homePlayerPointDiff = player.homeIncomingPlayerPoints - player.homePlayerPoints;
            player.homePlayerLastUpdate = new Date().toLocaleTimeString();

            player.homePlayerPoints = player.homeIncomingPlayerPoints;            
        }

        if(player.awayPlayerName !== player.awayIncomingPlayerName)
        {
            player.awayPlayerName = player.awayIncomingPlayerName;
            player.awayPlayerPointDiff = 0;
            player.awayPlayerLastUpdate = '';

            player.awayPlayerPoints = player.awayIncomingPlayerPoints;
        }
        else if(player.awayPlayerPoints !== player.awayIncomingPlayerPoints)
        {
            player.awayPlayerPointDiff = player.awayIncomingPlayerPoints - player.awayPlayerPoints;
            player.awayPlayerLastUpdate = new Date().toLocaleTimeString();

            player.awayPlayerPoints = player.awayIncomingPlayerPoints;            
        }        
    });

    return matchupData;
}

export function swapOutTestData(matchupData: MatchupData, index: string)
{
    //goff -> 0 - 7, rham 0-4, hufunga 0-11, chubb - 0-14, waddle 0-6
    //initial player increases
    if(index === '1')
    {
        let json = '{"homeTeamName":"The Goonz","awayTeamName":"Bama BlackOut","playerDatas":[{"homePlayerName":"Jared Goff","homeIncomingPlayerName":"Jared Goff","homePlayerPosition":"QB","homePlayerPoints":0,"homeIncomingPlayerPoints":7,"homePlayerPointDiff":0,"homePlayerLastUpdate":"","awayPlayerName":"Jalen Hurts","awayIncomingPlayerName":"Jalen Hurts","awayPlayerPosition":"QB","awayPlayerPoints":0,"awayIncomingPlayerPoints":0,"awayPlayerPointDiff":0,"awayPlayerLastUpdate":"","isStarter":true},{"homePlayerName":"Isiah Pacheco","homeIncomingPlayerName":"Isiah Pacheco","homePlayerPosition":"RB","homePlayerPoints":0,"homeIncomingPlayerPoints":0,"homePlayerPointDiff":0,"homePlayerLastUpdate":"","awayPlayerName":"Nick Chubb","awayIncomingPlayerName":"Nick Chubb","awayPlayerPosition":"RB","awayPlayerPoints":0,"awayIncomingPlayerPoints":14,"awayPlayerPointDiff":0,"awayPlayerLastUpdate":"","isStarter":true},{"homePlayerName":"D\'Andre Swift","homeIncomingPlayerName":"D\'Andre Swift","homePlayerPosition":"RB","homePlayerPoints":0,"homeIncomingPlayerPoints":0,"homePlayerPointDiff":0,"homePlayerLastUpdate":"","awayPlayerName":"Josh Jacobs","awayIncomingPlayerName":"Josh Jacobs","awayPlayerPosition":"RB","awayPlayerPoints":0,"awayIncomingPlayerPoints":0,"awayPlayerPointDiff":0,"awayPlayerLastUpdate":"","isStarter":true},{"homePlayerName":"Jaylen Waddle","homeIncomingPlayerName":"Jaylen Waddle","homePlayerPosition":"WR","homePlayerPoints":0,"homeIncomingPlayerPoints":6,"homePlayerPointDiff":0,"homePlayerLastUpdate":"","awayPlayerName":"Rhamondre Stevenson","awayIncomingPlayerName":"Rhamondre Stevenson","awayPlayerPosition":"RB","awayPlayerPoints":0,"awayIncomingPlayerPoints":4,"awayPlayerPointDiff":0,"awayPlayerLastUpdate":"","isStarter":true},{"homePlayerName":"Tyreek Hill","homeIncomingPlayerName":"Tyreek Hill","homePlayerPosition":"WR","homePlayerPoints":0,"homeIncomingPlayerPoints":0,"homePlayerPointDiff":0,"homePlayerLastUpdate":"","awayPlayerName":"Mecole Hardman Jr.","awayIncomingPlayerName":"Mecole Hardman Jr.","awayPlayerPosition":"WR","awayPlayerPoints":0,"awayIncomingPlayerPoints":0,"awayPlayerPointDiff":0,"awayPlayerLastUpdate":"","isStarter":true},{"homePlayerName":"Davante Adams","homeIncomingPlayerName":"Davante Adams","homePlayerPosition":"WR","homePlayerPoints":0,"homeIncomingPlayerPoints":0,"homePlayerPointDiff":0,"homePlayerLastUpdate":"","awayPlayerName":"Marquise Brown","awayIncomingPlayerName":"Marquise Brown","awayPlayerPosition":"WR","awayPlayerPoints":0,"awayIncomingPlayerPoints":0,"awayPlayerPointDiff":0,"awayPlayerLastUpdate":"","isStarter":true},{"homePlayerName":"Calvin Ridley","homeIncomingPlayerName":"Calvin Ridley","homePlayerPosition":"WR","homePlayerPoints":0,"homeIncomingPlayerPoints":0,"homePlayerPointDiff":0,"homePlayerLastUpdate":"","awayPlayerName":"Rashid Shaheed","awayIncomingPlayerName":"Rashid Shaheed","awayPlayerPosition":"WR","awayPlayerPoints":0,"awayIncomingPlayerPoints":0,"awayPlayerPointDiff":0,"awayPlayerLastUpdate":"","isStarter":true},{"homePlayerName":"Cole Kmet","homeIncomingPlayerName":"Cole Kmet","homePlayerPosition":"TE","homePlayerPoints":0,"homeIncomingPlayerPoints":0,"homePlayerPointDiff":0,"homePlayerLastUpdate":"","awayPlayerName":"Darren Waller","awayIncomingPlayerName":"Darren Waller","awayPlayerPosition":"TE","awayPlayerPoints":0,"awayIncomingPlayerPoints":0,"awayPlayerPointDiff":0,"awayPlayerLastUpdate":"","isStarter":true},{"homePlayerName":"Brock Purdy","homeIncomingPlayerName":"Brock Purdy","homePlayerPosition":"QB","homePlayerPoints":0,"homeIncomingPlayerPoints":0,"homePlayerPointDiff":0,"homePlayerLastUpdate":"","awayPlayerName":"Geno Smith","awayIncomingPlayerName":"Geno Smith","awayPlayerPosition":"QB","awayPlayerPoints":0,"awayIncomingPlayerPoints":0,"awayPlayerPointDiff":0,"awayPlayerLastUpdate":"","isStarter":true},{"homePlayerName":"Foyesade Oluokun","homeIncomingPlayerName":"Foyesade Oluokun","homePlayerPosition":"LB","homePlayerPoints":0,"homeIncomingPlayerPoints":0,"homePlayerPointDiff":0,"homePlayerLastUpdate":"","awayPlayerName":"Josey Jewell","awayIncomingPlayerName":"Josey Jewell","awayPlayerPosition":"LB","awayPlayerPoints":0,"awayIncomingPlayerPoints":0,"awayPlayerPointDiff":0,"awayPlayerLastUpdate":"","isStarter":true},{"homePlayerName":"Bobby Okereke","homeIncomingPlayerName":"Bobby Okereke","homePlayerPosition":"LB","homePlayerPoints":0,"homeIncomingPlayerPoints":0,"homePlayerPointDiff":0,"homePlayerLastUpdate":"","awayPlayerName":"Dre Greenlaw","awayIncomingPlayerName":"Dre Greenlaw","awayPlayerPosition":"LB","awayPlayerPoints":0,"awayIncomingPlayerPoints":0,"awayPlayerPointDiff":0,"awayPlayerLastUpdate":"","isStarter":true},{"homePlayerName":"Jalen Carter","homeIncomingPlayerName":"Jalen Carter","homePlayerPosition":"DT","homePlayerPoints":0,"homeIncomingPlayerPoints":0,"homePlayerPointDiff":0,"homePlayerLastUpdate":"","awayPlayerName":"Maxx Crosby","awayIncomingPlayerName":"Maxx Crosby","awayPlayerPosition":"DE","awayPlayerPoints":0,"awayIncomingPlayerPoints":0,"awayPlayerPointDiff":0,"awayPlayerLastUpdate":"","isStarter":true},{"homePlayerName":"Tre\'Davious White","homeIncomingPlayerName":"Tre\'Davious White","homePlayerPosition":"CB","homePlayerPoints":0,"homeIncomingPlayerPoints":0,"homePlayerPointDiff":0,"homePlayerLastUpdate":"","awayPlayerName":"Dallis Flowers","awayIncomingPlayerName":"Dallis Flowers","awayPlayerPosition":"CB","awayPlayerPoints":0,"awayIncomingPlayerPoints":0,"awayPlayerPointDiff":0,"awayPlayerLastUpdate":"","isStarter":true},{"homePlayerName":"Marco Wilson","homeIncomingPlayerName":"Marco Wilson","homePlayerPosition":"CB","homePlayerPoints":0,"homeIncomingPlayerPoints":0,"homePlayerPointDiff":0,"homePlayerLastUpdate":"","awayPlayerName":"Keisean Nixon","awayIncomingPlayerName":"Keisean Nixon","awayPlayerPosition":"CB","awayPlayerPoints":0,"awayIncomingPlayerPoints":0,"awayPlayerPointDiff":0,"awayPlayerLastUpdate":"","isStarter":true},{"homePlayerName":"Talanoa Hufanga","homeIncomingPlayerName":"Talanoa Hufanga","homePlayerPosition":"S","homePlayerPoints":0,"homeIncomingPlayerPoints":11,"homePlayerPointDiff":0,"homePlayerLastUpdate":"","awayPlayerName":"Jalen Pitre","awayIncomingPlayerName":"Jalen Pitre","awayPlayerPosition":"S","awayPlayerPoints":0,"awayIncomingPlayerPoints":0,"awayPlayerPointDiff":0,"awayPlayerLastUpdate":"","isStarter":true},{"homePlayerName":"Jeremy Chinn","homeIncomingPlayerName":"Jeremy Chinn","homePlayerPosition":"S","homePlayerPoints":0,"homeIncomingPlayerPoints":0,"homePlayerPointDiff":0,"homePlayerLastUpdate":"","awayPlayerName":"Eddie Jackson","awayIncomingPlayerName":"Eddie Jackson","awayPlayerPosition":"S","awayPlayerPoints":0,"awayIncomingPlayerPoints":0,"awayPlayerPointDiff":0,"awayPlayerLastUpdate":"","isStarter":true},{"homePlayerName":"Kyzir White","homeIncomingPlayerName":"Kyzir White","homePlayerPosition":"LB","homePlayerPoints":0,"homeIncomingPlayerPoints":0,"homePlayerPointDiff":0,"homePlayerLastUpdate":"","awayPlayerName":"Frankie Luvu","awayIncomingPlayerName":"Frankie Luvu","awayPlayerPosition":"LB","awayPlayerPoints":0,"awayIncomingPlayerPoints":0,"awayPlayerPointDiff":0,"awayPlayerLastUpdate":"","isStarter":true},{"homePlayerName":"Troy Andersen","homeIncomingPlayerName":"Troy Andersen","homePlayerPosition":"LB","homePlayerPoints":0,"homeIncomingPlayerPoints":0,"homePlayerPointDiff":0,"homePlayerLastUpdate":"","awayPlayerName":"Jamin Davis","awayIncomingPlayerName":"Jamin Davis","awayPlayerPosition":"LB","awayPlayerPoints":0,"awayIncomingPlayerPoints":0,"awayPlayerPointDiff":0,"awayPlayerLastUpdate":"","isStarter":true},{"homePlayerName":"Dolphins D/ST","homeIncomingPlayerName":"Dolphins D/ST","homePlayerPosition":"D/ST","homePlayerPoints":0,"homeIncomingPlayerPoints":0,"homePlayerPointDiff":0,"homePlayerLastUpdate":"","awayPlayerName":"Browns D/ST","awayIncomingPlayerName":"Browns D/ST","awayPlayerPosition":"D/ST","awayPlayerPoints":0,"awayIncomingPlayerPoints":0,"awayPlayerPointDiff":0,"awayPlayerLastUpdate":"","isStarter":true},{"homePlayerName":"Jason Myers","homeIncomingPlayerName":"Jason Myers","homePlayerPosition":"K","homePlayerPoints":0,"homeIncomingPlayerPoints":0,"homePlayerPointDiff":0,"homePlayerLastUpdate":"","awayPlayerName":"Brandon McManus","awayIncomingPlayerName":"Brandon McManus","awayPlayerPosition":"K","awayPlayerPoints":0,"awayIncomingPlayerPoints":0,"awayPlayerPointDiff":0,"awayPlayerLastUpdate":"","isStarter":true}]}';
        let newMatchupData = JSON.parse(json);

        matchupData = newMatchupData;
    }

    //goff -> 7 - 7, hufunga 11-17, chubb - 14-14, waddle 6-17, swap Johan Dotson for Rham
    //players stay the same, number increases, player swaps
    if(index === '2')
    {
        let json = '{"homeTeamName":"The Goonz","awayTeamName":"Bama BlackOut","playerDatas":[{"homePlayerName":"Jared Goff","homeIncomingPlayerName":"Jared Goff","homePlayerPosition":"QB","homePlayerPoints":7,"homeIncomingPlayerPoints":7,"homePlayerPointDiff":7,"homePlayerLastUpdate":"10:18:48 PM","awayPlayerName":"Jalen Hurts","awayIncomingPlayerName":"Jalen Hurts","awayPlayerPosition":"QB","awayPlayerPoints":0,"awayIncomingPlayerPoints":0,"awayPlayerPointDiff":0,"awayPlayerLastUpdate":"","isStarter":true},{"homePlayerName":"Isiah Pacheco","homeIncomingPlayerName":"Isiah Pacheco","homePlayerPosition":"RB","homePlayerPoints":0,"homeIncomingPlayerPoints":0,"homePlayerPointDiff":0,"homePlayerLastUpdate":"","awayPlayerName":"Nick Chubb","awayIncomingPlayerName":"Nick Chubb","awayPlayerPosition":"RB","awayPlayerPoints":14,"awayIncomingPlayerPoints":14,"awayPlayerPointDiff":14,"awayPlayerLastUpdate":"10:18:48 PM","isStarter":true},{"homePlayerName":"D\'Andre Swift","homeIncomingPlayerName":"D\'Andre Swift","homePlayerPosition":"RB","homePlayerPoints":0,"homeIncomingPlayerPoints":0,"homePlayerPointDiff":0,"homePlayerLastUpdate":"","awayPlayerName":"Josh Jacobs","awayIncomingPlayerName":"Josh Jacobs","awayPlayerPosition":"RB","awayPlayerPoints":0,"awayIncomingPlayerPoints":0,"awayPlayerPointDiff":0,"awayPlayerLastUpdate":"","isStarter":true},{"homePlayerName":"Jaylen Waddle","homeIncomingPlayerName":"Jaylen Waddle","homePlayerPosition":"WR","homePlayerPoints":6,"homeIncomingPlayerPoints":17,"homePlayerPointDiff":6,"homePlayerLastUpdate":"10:18:48 PM","awayPlayerName":"Rhamondre Stevenson","awayIncomingPlayerName":"Johan Dotson","awayPlayerPosition":"WR","awayPlayerPoints":4,"awayIncomingPlayerPoints":0,"awayPlayerPointDiff":4,"awayPlayerLastUpdate":"","isStarter":true},{"homePlayerName":"Tyreek Hill","homeIncomingPlayerName":"Tyreek Hill","homePlayerPosition":"WR","homePlayerPoints":0,"homeIncomingPlayerPoints":0,"homePlayerPointDiff":0,"homePlayerLastUpdate":"","awayPlayerName":"Mecole Hardman Jr.","awayIncomingPlayerName":"Mecole Hardman Jr.","awayPlayerPosition":"WR","awayPlayerPoints":0,"awayIncomingPlayerPoints":0,"awayPlayerPointDiff":0,"awayPlayerLastUpdate":"","isStarter":true},{"homePlayerName":"Davante Adams","homeIncomingPlayerName":"Davante Adams","homePlayerPosition":"WR","homePlayerPoints":0,"homeIncomingPlayerPoints":0,"homePlayerPointDiff":0,"homePlayerLastUpdate":"","awayPlayerName":"Marquise Brown","awayIncomingPlayerName":"Marquise Brown","awayPlayerPosition":"WR","awayPlayerPoints":0,"awayIncomingPlayerPoints":0,"awayPlayerPointDiff":0,"awayPlayerLastUpdate":"","isStarter":true},{"homePlayerName":"Calvin Ridley","homeIncomingPlayerName":"Calvin Ridley","homePlayerPosition":"WR","homePlayerPoints":0,"homeIncomingPlayerPoints":0,"homePlayerPointDiff":0,"homePlayerLastUpdate":"","awayPlayerName":"Rashid Shaheed","awayIncomingPlayerName":"Rashid Shaheed","awayPlayerPosition":"WR","awayPlayerPoints":0,"awayIncomingPlayerPoints":0,"awayPlayerPointDiff":0,"awayPlayerLastUpdate":"","isStarter":true},{"homePlayerName":"Cole Kmet","homeIncomingPlayerName":"Cole Kmet","homePlayerPosition":"TE","homePlayerPoints":0,"homeIncomingPlayerPoints":0,"homePlayerPointDiff":0,"homePlayerLastUpdate":"","awayPlayerName":"Darren Waller","awayIncomingPlayerName":"Darren Waller","awayPlayerPosition":"TE","awayPlayerPoints":0,"awayIncomingPlayerPoints":0,"awayPlayerPointDiff":0,"awayPlayerLastUpdate":"","isStarter":true},{"homePlayerName":"Brock Purdy","homeIncomingPlayerName":"Brock Purdy","homePlayerPosition":"QB","homePlayerPoints":0,"homeIncomingPlayerPoints":0,"homePlayerPointDiff":0,"homePlayerLastUpdate":"","awayPlayerName":"Geno Smith","awayIncomingPlayerName":"Geno Smith","awayPlayerPosition":"QB","awayPlayerPoints":0,"awayIncomingPlayerPoints":0,"awayPlayerPointDiff":0,"awayPlayerLastUpdate":"","isStarter":true},{"homePlayerName":"Foyesade Oluokun","homeIncomingPlayerName":"Foyesade Oluokun","homePlayerPosition":"LB","homePlayerPoints":0,"homeIncomingPlayerPoints":0,"homePlayerPointDiff":0,"homePlayerLastUpdate":"","awayPlayerName":"Josey Jewell","awayIncomingPlayerName":"Josey Jewell","awayPlayerPosition":"LB","awayPlayerPoints":0,"awayIncomingPlayerPoints":0,"awayPlayerPointDiff":0,"awayPlayerLastUpdate":"","isStarter":true},{"homePlayerName":"Bobby Okereke","homeIncomingPlayerName":"Bobby Okereke","homePlayerPosition":"LB","homePlayerPoints":0,"homeIncomingPlayerPoints":0,"homePlayerPointDiff":0,"homePlayerLastUpdate":"","awayPlayerName":"Dre Greenlaw","awayIncomingPlayerName":"Dre Greenlaw","awayPlayerPosition":"LB","awayPlayerPoints":0,"awayIncomingPlayerPoints":0,"awayPlayerPointDiff":0,"awayPlayerLastUpdate":"","isStarter":true},{"homePlayerName":"Jalen Carter","homeIncomingPlayerName":"Jalen Carter","homePlayerPosition":"DT","homePlayerPoints":0,"homeIncomingPlayerPoints":0,"homePlayerPointDiff":0,"homePlayerLastUpdate":"","awayPlayerName":"Maxx Crosby","awayIncomingPlayerName":"Maxx Crosby","awayPlayerPosition":"DE","awayPlayerPoints":0,"awayIncomingPlayerPoints":0,"awayPlayerPointDiff":0,"awayPlayerLastUpdate":"","isStarter":true},{"homePlayerName":"Tre\'Davious White","homeIncomingPlayerName":"Tre\'Davious White","homePlayerPosition":"CB","homePlayerPoints":0,"homeIncomingPlayerPoints":0,"homePlayerPointDiff":0,"homePlayerLastUpdate":"","awayPlayerName":"Dallis Flowers","awayIncomingPlayerName":"Dallis Flowers","awayPlayerPosition":"CB","awayPlayerPoints":0,"awayIncomingPlayerPoints":0,"awayPlayerPointDiff":0,"awayPlayerLastUpdate":"","isStarter":true},{"homePlayerName":"Marco Wilson","homeIncomingPlayerName":"Marco Wilson","homePlayerPosition":"CB","homePlayerPoints":0,"homeIncomingPlayerPoints":0,"homePlayerPointDiff":0,"homePlayerLastUpdate":"","awayPlayerName":"Keisean Nixon","awayIncomingPlayerName":"Keisean Nixon","awayPlayerPosition":"CB","awayPlayerPoints":0,"awayIncomingPlayerPoints":0,"awayPlayerPointDiff":0,"awayPlayerLastUpdate":"","isStarter":true},{"homePlayerName":"Talanoa Hufanga","homeIncomingPlayerName":"Talanoa Hufanga","homePlayerPosition":"S","homePlayerPoints":11,"homeIncomingPlayerPoints":17,"homePlayerPointDiff":11,"homePlayerLastUpdate":"10:18:48 PM","awayPlayerName":"Jalen Pitre","awayIncomingPlayerName":"Jalen Pitre","awayPlayerPosition":"S","awayPlayerPoints":0,"awayIncomingPlayerPoints":0,"awayPlayerPointDiff":0,"awayPlayerLastUpdate":"","isStarter":true},{"homePlayerName":"Jeremy Chinn","homeIncomingPlayerName":"Jeremy Chinn","homePlayerPosition":"S","homePlayerPoints":0,"homeIncomingPlayerPoints":0,"homePlayerPointDiff":0,"homePlayerLastUpdate":"","awayPlayerName":"Eddie Jackson","awayIncomingPlayerName":"Eddie Jackson","awayPlayerPosition":"S","awayPlayerPoints":0,"awayIncomingPlayerPoints":0,"awayPlayerPointDiff":0,"awayPlayerLastUpdate":"","isStarter":true},{"homePlayerName":"Kyzir White","homeIncomingPlayerName":"Kyzir White","homePlayerPosition":"LB","homePlayerPoints":0,"homeIncomingPlayerPoints":0,"homePlayerPointDiff":0,"homePlayerLastUpdate":"","awayPlayerName":"Frankie Luvu","awayIncomingPlayerName":"Frankie Luvu","awayPlayerPosition":"LB","awayPlayerPoints":0,"awayIncomingPlayerPoints":0,"awayPlayerPointDiff":0,"awayPlayerLastUpdate":"","isStarter":true},{"homePlayerName":"Troy Andersen","homeIncomingPlayerName":"Troy Andersen","homePlayerPosition":"LB","homePlayerPoints":0,"homeIncomingPlayerPoints":0,"homePlayerPointDiff":0,"homePlayerLastUpdate":"","awayPlayerName":"Jamin Davis","awayIncomingPlayerName":"Jamin Davis","awayPlayerPosition":"LB","awayPlayerPoints":0,"awayIncomingPlayerPoints":0,"awayPlayerPointDiff":0,"awayPlayerLastUpdate":"","isStarter":true},{"homePlayerName":"Dolphins D/ST","homeIncomingPlayerName":"Dolphins D/ST","homePlayerPosition":"D/ST","homePlayerPoints":0,"homeIncomingPlayerPoints":0,"homePlayerPointDiff":0,"homePlayerLastUpdate":"","awayPlayerName":"Browns D/ST","awayIncomingPlayerName":"Browns D/ST","awayPlayerPosition":"D/ST","awayPlayerPoints":0,"awayIncomingPlayerPoints":0,"awayPlayerPointDiff":0,"awayPlayerLastUpdate":"","isStarter":true},{"homePlayerName":"Jason Myers","homeIncomingPlayerName":"Jason Myers","homePlayerPosition":"K","homePlayerPoints":0,"homeIncomingPlayerPoints":0,"homePlayerPointDiff":0,"homePlayerLastUpdate":"","awayPlayerName":"Brandon McManus","awayIncomingPlayerName":"Brandon McManus","awayPlayerPosition":"K","awayPlayerPoints":0,"awayIncomingPlayerPoints":0,"awayPlayerPointDiff":0,"awayPlayerLastUpdate":"","isStarter":true}]}';
        let newMatchupData = JSON.parse(json);

        matchupData = newMatchupData;
    }

    return matchupData;
}