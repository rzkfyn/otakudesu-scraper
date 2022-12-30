import axios from 'axios';
import { BASEURL } from '../../config.js';
import scrapeEpisode from '../lib/scrapeEpisode.js';

const episode = async (slug?: string | undefined) => {
  const { data } = await axios.get(`${BASEURL}/episode/${slug}`);
  const result = await scrapeEpisode(data);

  return result;
};

export default episode;
