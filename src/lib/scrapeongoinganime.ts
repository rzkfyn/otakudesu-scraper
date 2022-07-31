import { load } from 'cheerio';
import { BASEURL } from '../../config.js';
import { ongoingAnime } from '../types/types.js';

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
      currentEpisode: $('.detpost .epz').text().trim(),
      releaseDay: $('.detpost .epztipe').text().trim(),
      newestReleaseDate: $('.detpost .newnime').text(),
      url: $('.detpost .thumb a').attr('href')
    });
  });

  return result;
}

export default scrapeOngoingAnime;
