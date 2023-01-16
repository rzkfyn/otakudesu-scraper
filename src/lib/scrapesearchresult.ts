import { load } from 'cheerio';
import mapGenres from './mapGenres.js';
import type { searchResultAnime } from '../types/types.js';

const { BASEURL } = process.env;
const scrapeSearchResult = (html: string): searchResultAnime[] => {
  const $ = load(html);
  const animes = $('.chivsrc li').toString()
    .split('</li>')
    .filter(item => item.trim() !== '')
    .map(item => `${item}</li>`);
  const searchResult: searchResultAnime[] = [];

  animes.forEach(anime => {
    const $ = load(anime);
    const genres = mapGenres($('.set:nth-child(3)')?.html()?.toString()
      .replace('<b>Genres</b> : ', '') as string);

    searchResult.push({
      title: $('h2 a').text(),
      slug: $('h2 a').attr('href')?.replace(`${BASEURL}/anime/`, '').replace('/', ''),
      poster: $('img').attr('src'),
      genres,
      status: $('.set:nth-child(4)').text()?.replace('Status : ', ''),
      rating: $('.set:last-child').text()?.replace('Rating : ', ''),
      url: $('h2 a').attr('href')
    });
  });

  return searchResult;
};

export default scrapeSearchResult;
