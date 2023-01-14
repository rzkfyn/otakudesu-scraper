import { load } from 'cheerio';
import { BASEURL } from '../../config.js';
import mapGenres from './mapGenres.js';
import scrapeAnimeEpisodes from './scrapeAnimeEpisodes.js';
import type { anime, episode_list } from '../types/types.js';

const scrapeSingleAnime = (html: string) => {
  const $ = load(html);
  const result = createAnimeData(
    html,
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
  const title = $('.infozin .infozingle p:first span').text()?.replace('Judul: ', '');
  const japanese_title = $('.infozin .infozingle p:nth-child(2) span').text()?.replace('Japanese: ', '');
  const rating = $('.infozin .infozingle p:nth-child(3) span').text()?.replace('Skor: ', '');
  const produser = $('.infozin .infozingle p:nth-child(4) span').text()?.replace('Produser: ', '');
  const type = $('.infozin .infozingle p:nth-child(5) span').text()?.replace('Tipe: ', '');
  const status = $('.infozin .infozingle p:nth-child(6) span').text()?.replace('Status: ', '');
  const episode_count = $('.infozin .infozingle p:nth-child(7) span').text()?.replace('Total Episode: ', '');
  const duration = $('.infozin .infozingle p:nth-child(8) span').text()?.replace('Durasi: ', '');
  const release_date = $('.infozin .infozingle p:nth-child(9) span').text()?.replace('Tanggal Rilis: ', '');
  const studio = $('.infozin .infozingle p:nth-child(10) span').text()?.replace('Studio: ', '');
  const genres = mapGenres($('.infozin .infozingle p:last span a').toString());
  const batch = getBatch($('.venser #serieslist ~ .episodelist ul li:first-child').toString());

  if(!episode_lists) return undefined;

  return {
    title, japanese_title, poster, rating, produser, type, status, episode_count, duration, release_date, studio, genres, synopsis, batch, episode_lists
  };
};

const getSynopsis = (html: string) => {
  const $ = load(html);
  const sinopsis = $('.sinopc').text().split('<p>').map(item => item.replace('</p>', '\n').replace('&nbsp', '')).join('');
  return sinopsis;
};

const getBatch = (html: string) => {
  const $ = load(html);
  console.log($().toString());
  const batch = $('span:first-child a').attr('href');
  const uploaded_at = $('span.zeebr:first').text();

  return {
    slug: batch?.replace(`${BASEURL}/batch/`, '').replace('/', ''),
    otakudesu_url: batch,
    uploaded_at
  };
};

const getPoster = (html: string): string | undefined => {
  const $ = load(html);
  const poster = $('.fotoanime img').attr('src');
  return poster;
};

export default scrapeSingleAnime;
