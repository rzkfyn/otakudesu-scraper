import { load } from 'cheerio';
import { BASEURL } from '../../config.js';
import { completeAnime } from '../types/types.js';

const scrapeCompleteAnime = (html: string): completeAnime[] => {
  const result: completeAnime[] = [];
  const animes = html.split('</li>')
  .filter(item => item.trim() !== '')
  .map(item => `${item}</li>`);

  animes.forEach(anime => {
    const $ = load(anime);

    result.push({
      title: $('.detpost .thumb .thumbz .jdlflm').text(),
      slug: $('.detpost .thumb a').attr('href')?.replace(`${BASEURL}/anime/`, '').replace('/', ''),
      poster: $('.detpost .thumb .thumbz img').attr('src'),
      episodeCount: $('.detpost .epz').text().trim(),
      rating: $('.detpost .epztipe').text().trim(),
      lastReleaseDate: $('.detpost .newnime').text(),
      url: $('.detpost .thumb a').attr('href')
    });
  });

  return result;
}

export default scrapeCompleteAnime;
