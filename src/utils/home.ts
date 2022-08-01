import axios from 'axios';
import { load } from 'cheerio';
import { BASEURL } from '../../config.js';
import scrapeOngoingAnime from '../lib/scrapeongoinganime.js';
import scrapeCompleteAnime from '../lib/scrapecompleteanime.js';
import { 
  ongoingAnime as ongoingAnimeType, 
  completeAnime as completeAnimeType 
} from '../types/types.js';

const home = async (): Promise<{ ongoingAnime: ongoingAnimeType[], completeAnime: completeAnimeType[] }> => {
  const { data } = await axios.get(BASEURL)
  const $ = load(data);
  const ongoingAnimeEls = $('.venutama .rseries .rapi:first .venz ul li').toString();
  const completeAnimeEls = $('.venutama .rseries .rapi:last .venz ul li').toString();
  const ongoingAnime = scrapeOngoingAnime(ongoingAnimeEls);
  const completeAnime = scrapeCompleteAnime(completeAnimeEls);

  return {
    ongoingAnime,
    completeAnime
  };
}

export default home;
