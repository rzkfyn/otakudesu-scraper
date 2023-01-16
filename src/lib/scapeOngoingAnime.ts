import { load } from 'cheerio';
import type { ongoingAnime } from '../types/types.js';

const { BASEURL } = process.env;
const scrapeOngoingAnime = (html: string): ongoingAnime[] => {
  const result: ongoingAnime[] = [];
  const animes = html.split('</li>')
    .filter(item => item.trim() !== '')
    .map(item => `${item}</li>`);

  animes.forEach(anime => {
    const $ = load(anime);

    result.push({
      title: $('.detpost .thumb .thumbz .jdlflm').text(),
      slug: $('.detpost .thumb a').attr('href')?.replace(`${BASEURL}/anime/`, '').replace('/', ''),
      poster: $('.detpost .thumb .thumbz img').attr('src'),
      current_episode: $('.detpost .epz').text().trim(),
      release_day: $('.detpost .epztipe').text().trim(),
      newest_release_date: $('.detpost .newnime').text(),
      otakudesu_url: $('.detpost .thumb a').attr('href')
    });
  });

  return result;
};

export default scrapeOngoingAnime;
