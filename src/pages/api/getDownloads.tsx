import { JSDOM } from 'jsdom'
import { NextApiRequest, NextApiResponse } from 'next';

const getDownloads = async (req: NextApiRequest, res: NextApiResponse) => {
    //recieve input from request body, parse from json
    const {input} = JSON.parse(req.body);
    console.log('input', input);

    const response = await fetch(`https://www.npmjs.com/package/${input}`);
    const html = await response.text();

    const dom = new JSDOM(html);
    const document = dom.window.document;

    const downloads = document.querySelector('._9ba9a726')?.textContent;

    console.log('downloads', downloads);
    //send downloads back to client

    res.status(200).json({downloads});
}

export default getDownloads