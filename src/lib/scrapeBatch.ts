import { load } from 'cheerio';
import type { batch as batchType } from '../types/types.js';

const scrapeBatch = (html: string): batchType => {
  const $ = load(html);
  const batch = $('.download2 .batchlink h4').text();
  const urlGroups = $('.download2 .batchlink ul li').toString()
    .split('</li>')
    .filter((item) => item.trim() !== '')
    .map((item) => `${item}<li>`);
  const urls: {
    provider: string | undefined,
    url: string | undefined
  }[] = [];
  const download_urls: {
    resolution: string | undefined,
    file_size: string | undefined,
    urls: typeof urls
  }[] = [];

  urlGroups.forEach((urlGroup) => {
    const $ = load(urlGroup);
    const providers = $('a').toString()
      .split('</a>')
      .filter((item) => item.trim() !== '')
      .map((item) => `${item}</a>`);

    providers.forEach((provider) => {
      const $ = load(provider);
      urls.push({
        provider: $('a').text(),
        url: $('a').attr('href')
      });
    });

    download_urls.push({
      resolution: $('li strong').text().replace(/([A-z][A-z][0-9] )/, ''),
      file_size: $('li i').text(),
      urls
    });
  });
  
  return {
    batch,
    download_urls
  };
};

export default scrapeBatch;
