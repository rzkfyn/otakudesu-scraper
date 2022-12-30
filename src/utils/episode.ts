import axios from 'axios';
import { BASEURL } from '../../config.js';
import episodes from './episodes.js';
import scrapeEpisode from '../lib/scrapeEpisode.js';

const episode = async ({ episodeSlug, animeSlug, episodeNumber }: {
  episodeSlug?: string | undefined, animeSlug?: string | undefined, episodeNumber?: number | undefined
}) => {
  let slug = '';

  if (episodeSlug) slug = episodeSlug;
  if (animeSlug) {
    const episodeLists = await episodes(animeSlug);
    if (!episodeLists || !episodeLists[episodeNumber as number]) return undefined;
    slug = episodeLists[episodeNumber as number].slug as string;
  }

  const { data } = await axios.get(`${BASEURL}/episode/${slug}`);
  const result = await scrapeEpisode(data);

  return result;
};

export default episode;
