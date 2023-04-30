import axios from 'axios';
import { load } from 'cheerio';
import scrapeOngoingAnime from '../lib/scapeOngoingAnime.js';
import scrapeCompleteAnime from '../lib/scrapeCompleteAnime.js';
import { 
  ongoingAnime as ongoingAnimeType, 
  completeAnime as completeAnimeType 
} from '../types/types.js';

const { BASEURL } = process.env;
console.log(BASEURL);
const home = async (): Promise<{ ongoing_anime: ongoingAnimeType[], complete_anime: completeAnimeType[] }> => {
  const { data } = await axios.get(BASEURL as string);
  const $ = load(data);
  const ongoingAnimeEls = $('.venutama .rseries .rapi:first .venz ul li').toString();
  const completeAnimeEls = $('.venutama .rseries .rapi:last .venz ul li').toString();
  const ongoing_anime = scrapeOngoingAnime(ongoingAnimeEls);
  const complete_anime = scrapeCompleteAnime(completeAnimeEls);

  return {
    ongoing_anime,
    complete_anime
  };
};

export default home;
