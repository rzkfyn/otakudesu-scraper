import { load } from 'cheerio';
import type { episode_list } from '../types/types.js';

const { BASEURL } = process.env;
const scrapeAnimeEpisodes = (html: string): episode_list[] | undefined => {
  const result: episode_list[] = [];
  let $ = load(html);
  $ = load(`<div> ${$('.episodelist').toString()}</div>`);
  const episodeList = $('.episodelist:nth-child(2) ul').html()?.split('</li>').filter(item => item.trim() !== '').map(item => `${item}</li>`);

  if (!episodeList) return undefined;

  for (const episode of episodeList) {
    const $ = load(episode);
    result.unshift({
      episode: $('li span:first a')?.text(),
      slug: $('li span:first a')?.attr('href')?.replace(`${BASEURL}/episode/`, '').replace('/', ''),
      otakudesu_url: $('li span:first a')?.attr('href')
    });
  }

  return result;
};

export default scrapeAnimeEpisodes;
