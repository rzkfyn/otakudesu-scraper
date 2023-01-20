import { load } from 'cheerio';
import mapGenres from './mapGenres.js';
import scrapeAnimeEpisodes from './scrapeAnimeEpisodes.js';
import getBatch from './getBatch.js';
import type { anime, episode_list } from '../types/types.js';

const { BASEURL } = process.env;
const scrapeSingleAnime = (html: string) => {
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
  const batch = getBatch(html);
  const recommendations = getRecomendations($('#recommend-anime-series .isi-recommend-anime-series .isi-konten').toString());

  if(!episode_lists) return undefined;

  return {
    title, japanese_title, poster, rating, produser, type, status, episode_count, duration, release_date, studio, genres, synopsis, batch, episode_lists, recommendations
  };
};

const getSynopsis = (html: string) => {
  const $ = load(html);
  const synopsis = $('.sinopc').text().split('<p>').map(item => item.replace('</p>', '\n').replace('&nbsp', '')).join('');
  return synopsis;
};

const getPoster = (html: string): string | undefined => {
  const $ = load(html);
  const poster = $('.fotoanime img').attr('src');
  return poster;
};

const getRecomendations = (html: string) => {
  const result: {
    title: string | undefined,
    slug: string | undefined,
    poster: string | undefined,
    otakudesu_url: string | undefined
  }[] = [];
  const animeEls = html.split('</div></div></div>')
    .filter((el) => el.trim() !== '')
    .map((el) => `${el}</div></div></div>`);

  animeEls.forEach((el) => {
    const $ = load(el);
    const title = $('.judul-anime').text();
    const poster = $('.isi-anime img').attr('src');
    const otakudesu_url = $('.isi-anime a').attr('href');
    const slug = otakudesu_url?.replace(`${BASEURL}/anime/`, '').replace('/', '');
    result.push({
      title,
      slug,
      poster,
      otakudesu_url
    });
  });

  return result;
};

export default scrapeSingleAnime;
