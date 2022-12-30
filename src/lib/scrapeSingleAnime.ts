import { load } from 'cheerio';
import mapGenres from './mapGenres.js';
import scrapeAnimeEpisodes from './scrapeAnimeEpisodes.js';
import type { anime, episode_list } from '../types/types.js';

const scrapeSingleAnime = (html: string) => {
  const $ = load(html);
  const result = createAnimeData(
    $('.infozin .infozingle').toString(),
    getPoster(html),
    getSynopsis(html),
    scrapeAnimeEpisodes(html)
  );
  return result;
};

const createAnimeData = (
  html: string, poster: string | undefined, synopsis: string | undefined, episode_lists: episode_list[] | undefined
): anime | undefined => {
  const $ = load(html);
  const title = $('p:first span').text()?.replace('Judul: ', '');
  const japanese_title = $('p:nth-child(2) span').text()?.replace('Japanese: ', '');
  const rating = $('p:nth-child(3) span').text()?.replace('Skor: ', '');
  const produser = $('p:nth-child(4) span').text()?.replace('Produser: ', '');
  const type = $('p:nth-child(5) span').text()?.replace('Tipe: ', '');
  const status = $('p:nth-child(6) span').text()?.replace('Status: ', '');
  const episode_count = $('p:nth-child(7) span').text()?.replace('Total Episode: ', '');
  const duration = $('p:nth-child(8) span').text()?.replace('Durasi: ', '');
  const release_date = $('p:nth-child(9) span').text()?.replace('Tanggal Rilis: ', '');
  const studio = $('p:nth-child(10) span').text()?.replace('Studio: ', '');
  const genres = mapGenres($('p:last span a').toString());  

  if(!episode_lists) return undefined;

  return {
    title, japanese_title, poster, rating, produser, type, status, episode_count, duration, release_date, studio, genres, synopsis, episode_lists
  };
};

const getSynopsis = (html: string) => {
  const $ = load(html);
  const sinopsis = $('.sinopc').text().split('<p>').map(item => item.replace('</p>', '\n').replace('&nbsp', '')).join('');
  return sinopsis;
};

const getPoster = (html: string): string | undefined => {
  const $ = load(html);
  const poster = $('.fotoanime img').attr('src');
  return poster;
};

export default scrapeSingleAnime;
