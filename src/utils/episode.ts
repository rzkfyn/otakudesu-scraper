import axios from 'axios';
import episodes from './episodes.js';
import scrapeEpisode from '../lib/scrapeEpisode.js';

const { BASEURL } = process.env;
const episode = async ({ episodeSlug, animeSlug, episodeNumber }: {
  episodeSlug?: string | undefined, animeSlug?: string | undefined, episodeNumber?: number | undefined
}) => {
  let slug = '';

  if (episodeSlug) slug = episodeSlug;
  if (animeSlug && episodeNumber) {
    const episodeLists = await episodes(animeSlug);
    if (!episodeLists) return undefined;

    const splittedEpisodeSlug = episodeLists[0].slug?.split('-episode-') as string[];
    const prefixEpisodeSlug = splittedEpisodeSlug[0];
    const firstEpisodeNumber = splittedEpisodeSlug[1].replace('-sub-indo', '');

    slug = `${prefixEpisodeSlug}-episode-${episodeNumber - (parseInt(firstEpisodeNumber) == 0 ? 1 : 0)}-sub-indo`;
  }

  const { data } = await axios.get(`${BASEURL}/episode/${slug}`);
  const result = scrapeEpisode(data);

  return result;
};

export default episode;
