import { Page } from "puppeteer";
import fs from 'fs'

export function delay(time: any) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
  }

export async function loadCookies(page: Page) {
    const loadedCookie = fs.readFile("E:/Source/Repos/cookies.txt", (err) => {
        if (err)
          console.log(err);
        else {
        }
      });
      if(loadedCookie != null){
        const parsedCookie = JSON.parse(loadedCookie);
        await page.setCookie(...parsedCookie);
      }
      console.log('cookies loaded')
}

export async function openPage(page: Page, url: string)
{
    page.goto(url, {
      timeout: 15 * 1000,
      waitUntil: ['domcontentloaded'],
  });
}

export async function saveCookies(page: Page){
    const cookies = await page.cookies();
    await fs.writeFile("E:/Source/Repos/cookies.txt", JSON.stringify(cookies), (err) => {
      if (err)
        console.log(err);
      else {
      }
    });
}