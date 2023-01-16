import { load } from 'cheerio';
import type { genre as genreType } from '../types/types.js';

const { BASEURL } = process.env;
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
      otakudesu_url: $('a').attr('href')
    });
  });

  return result;
};

export default mapGenres;