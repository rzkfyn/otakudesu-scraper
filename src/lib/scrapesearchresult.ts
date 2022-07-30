import { load } from 'cheerio';
import { BASEURL } from '../../config.js';
import { genre as genreType, searchResultAnime } from '../types/types.js';

const scrapesearchresult = (html: string): searchResultAnime[] => {
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
}

const mapGenres = (html: string): genreType[] => {
  const result: genreType[] = [];
  const genres = html.split('</a>')
  .filter(item => item.trim() !== '')
  .map(item => `${item}</a>`);

  genres.forEach(genre => {
    const $ = load(genre);

    result.push({
      name: $('a').text(),
      slug: $('a').attr('href')?.replace(`${BASEURL}/genres/`, '').replace('/', ''),
      url: $('a').attr('href')
    });
  });

  return result;
}

export default scrapesearchresult;
