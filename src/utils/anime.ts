import axios from 'axios';
import { BASEURL } from '../../config.js';
import scrapeSingleAnime from '../lib/scrapeSingleAnime.js';
import type { anime as animeType } from '../types/types.js';

const anime = async (slug: string): Promise<animeType | undefined> => {
  const res = await axios.get(`${BASEURL}/anime/${slug}`);
  const result = scrapeSingleAnime(res.data);

  return result;
};

export default anime;