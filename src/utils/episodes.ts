import axios from 'axios';
import { BASEURL } from '../../config.js';
import scrapeAnimeEpisodes from '../lib/scrapeAnimeEpisodes.js';
import type { episode_list } from '../types/types.js';

const episodes = async (slug: string): Promise<episode_list[] | undefined> => {
  const { data } = await axios.get(`${BASEURL}/anime/${slug}`);
  const result = scrapeAnimeEpisodes(data);

  return result;
};

export default episodes;
