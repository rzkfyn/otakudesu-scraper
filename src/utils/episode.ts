import axios from 'axios';
import episodes from './episodes.js';
import scrapeEpisode from '../lib/scrapeEpisode.js';

const { BASEURL } = process.env;
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
  const result = scrapeEpisode(data);

  return result;
};

export default episode;
