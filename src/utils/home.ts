import axios from 'axios';
import { load } from 'cheerio';
import { BASEURL } from '../../config.js';
import scrapeOngoingAnime from '../lib/scrapeongoinganime.js';
import { ongoingAnime as ongoingAnimeType } from '../types/types.js';

const home = async (): Promise<{ ongoingAnime: ongoingAnimeType[] }> => {
  const { data } = await axios.get(BASEURL)
  const $ = load(data);
  const ongoingAnimeEls = $('.venutama .rseries .rapi .venz ul li').toString();
  const ongoingAnime = scrapeOngoingAnime(ongoingAnimeEls);

  return {
    ongoingAnime
  };
}

export default home;
