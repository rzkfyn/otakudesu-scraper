import axios from 'axios';
import { BASEURL } from '../../config.js';
import scrapeSingleAnime from '../lib/scrapeSingleAnime.js';
import type { anime as animeType } from '../types/types.js';

const anime = async (slug: string): Promise<animeType | undefined> => {
  const { data } = await axios.get(`${BASEURL}/anime/${slug}`);
  const result = scrapeSingleAnime(data);

  return result;
};

export default anime;