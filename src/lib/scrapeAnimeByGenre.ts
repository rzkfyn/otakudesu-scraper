import { load } from 'cheerio';
import pagination from './pagination.js';
import mapGenres from './mapGenres.js';
import type { genre } from '../types/types.js';

const { BASEURL } = process.env;
const scrapeAnimeByGenre = (html: string) => {
  const $ = load(html);
  const animeElements = $('.venser .page .col-anime-con').toString()
    .split('<div class="col-md-4 col-anime-con genre_2 genre_3 genre_4 genre_9 ">')
    .filter((element) => element.trim() !== '')
    .map((element) => `<div class="col-md-4 col-anime-con genre_2 genre_3 genre_4 genre_9 ">${element}`);

  const result: {
    title: string | undefined,
    slug: string | undefined,
    poster: string | undefined,
    rating: string | undefined,
    episode_count: string | null,
    season: string | undefined,
    studio: string | undefined,
    genres: genre[],
    synopsis: string | undefined,
    otakudesu_url: string | undefined
  }[] = [];

  animeElements.forEach((animeEl) => {
    const $ = load(animeEl);
    const episodeCount = $('.col-anime .col-anime-eps').text().replace(/[A-z]/g, '').trim();
    const genres = mapGenres($('.col-anime .col-anime-genre a').toString());

    result.push({
      title: $('.col-anime .col-anime-title a').text(),
      slug: $('.col-anime .col-anime-trailer a').attr('href')?.replace(`${BASEURL}/anime/`, '').replace('/', ''),
      poster: $('.col-anime .col-anime-cover img').attr('src'),
      rating: $('.col-anime .col-anime-rating').text() ?? null,
      episode_count: episodeCount === '' ? null : episodeCount,
      season: $('.col-anime .col-anime-date').text(),
      studio: $('.col-anime .col-anime-studio').text(),
      genres,
      synopsis: $('.col-anime .col-synopsis p').text(),
      otakudesu_url: $('.col-anime .col-anime-trailer a').attr('href')
    });
  });

  return {
    anime: result,
    pagination: pagination(html)
  };
};

export default scrapeAnimeByGenre;
