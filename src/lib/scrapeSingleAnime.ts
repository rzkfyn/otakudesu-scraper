import { load } from 'cheerio';
import { BASEURL } from '../../config.js';
import mapGenres from './mapGenres.js';
import type { anime, episode_list } from '../types/types.js';

const scrapeSingleAnime = (html: string) => {
  const $ = load(html);
  const result = createAnimeData(
    $('.infozin .infozingle').toString(),
    getPoster(html),
    getSynopsis(html),
    getEpisodeLists(html)
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

const getEpisodeLists = (html: string): episode_list[] | undefined => {
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

export default scrapeSingleAnime;
