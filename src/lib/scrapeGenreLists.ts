import { load } from 'cheerio';
import type { genre as genreType } from '../types/types';

const { BASEURL } = process.env;
const scrapeGenreLists = (html: string): genreType[] => {
  const $ = load(html);
  const result: genreType[] = [];
  const genres = $('#venkonten .vezone ul.genres li a').toString()
    .split('</a>')
    .filter((el) => el.trim() !== '')
    .map((el) => `${el}</a>`);

  genres.forEach((genre) => {
    const $ = load(genre);
    result.push({
      name: $('a').text(),
      slug: $('a').attr('href')?.replace('/genres/', '').replace('/', ''),
      otakudesu_url: `${BASEURL}${$('a').attr('href')}`
    });
  });

  return result;
};

export default scrapeGenreLists;
