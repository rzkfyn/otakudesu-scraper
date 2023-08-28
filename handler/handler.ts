import { Request, Response } from 'express';
import otakudesu from '../src/otakudesu.js';
import type {
  anime as animeType,
  ongoingAnime,
  completeAnime,
  episode_list,
  searchResultAnime
} from '../src/types/types.js';

const searchAnimeHandler = async (req: Request, res: Response) => {
  const { keyword } = req.params;

  let data: searchResultAnime[];
  try{
    data = await otakudesu.search(keyword);
  } catch(e) {
    console.log(e);
    return res.status(500).json({ status: 'Error', message: 'Internal server error' });
  }

  return res.status(200).json({ status: 'Ok', data });
};

const homeHandler = async (_: Request, res: Response)  => {
  let data: { ongoing_anime: ongoingAnime[], complete_anime: completeAnime[] };
  try {
    data = await otakudesu.home();
  } catch(e) {
    console.log(e);
    return res.status(500).json({ status: 'Error', message: 'Internal server error' });
  }

  return res.status(200).json({ status: 'Ok', data });
};

const ongoingAnimeHandler = async (req: Request, res: Response) => {
  const { page } = req.params;
  if (page) {
    if (!parseInt(page)) return res.status(400).json({ status: 'Error', message: 'The page parameter must be a number!' });
    if (parseInt(page) < 1) return res.status(400).json({ status: 'Error', message: 'The page parameter must be greater than 0!' });
  }
  
  let result;
  try {
    result = page ? await otakudesu.ongoingAnime(parseInt(page)) : await otakudesu.ongoingAnime();
  } catch(e) {
    console.log(e);
    return res.status(500).json({ status: 'Error', message: 'Internal server error' });
  }
  const { paginationData, ongoingAnimeData } = result;

  if (!paginationData) return res.status(404).json({ status: 'Error', message: 'There\'s nothing here ;_;' });
  return res.status(200).json({ status: 'Ok', data: ongoingAnimeData, pagination: paginationData });
};

const completeAnimeHandler = async (req: Request, res: Response) => {
  const { page } = req.params;
  if (page) {
    if (!parseInt(page)) return res.status(400).json({ status: 'Error', message: 'The page parameter must be a number!' });
    if (parseInt(page) < 1) return res.status(400).json({ status: 'Error', message: 'The page parameter must be greater than 0!' });
  }
  
  let result;
  try {
    result = page ? await otakudesu.completeAnime(parseInt(page)) : await otakudesu.completeAnime();
  } catch(e) {
    console.log(e);
    return res.status(500).json({ status: 'Error', message: 'Internal server error' });
  }
  const { paginationData, completeAnimeData } = result;

  if (!paginationData) return res.status(404).json({ status: 'Error', message: 'There\'s nothing here ;_;' });
  return res.status(200).json({ status: 'Ok', data: completeAnimeData, pagination: paginationData });
};

const singleAnimeHandler = async (req: Request, res: Response) => {
  const { slug } = req.params;

  let data: animeType | undefined;
  try {
    data = await otakudesu.anime(slug);
  } catch(e) {
    console.log(e);
    return res.status(500).json({ status: 'Error', message: 'Internal server error' });
  }

  if (!data) return res.status(404).json({ status: 'Error', message: 'There\'s nothing here ;_;' });
  return res.status(200).json({ status: 'Ok', data });
};

const episodesHandler = async (req: Request, res: Response) => {
  const { slug } = req.params;

  let data: episode_list[] | undefined;
  try {
    data = await otakudesu.episodes(slug);
  } catch(e) {
    console.log(e);
    return res.status(500).json({ status: 'Error', message: 'Internal server error' });
  }

  if (!data) return res.status(404).json({ status: 'Error', message: 'There\'s nothing here ;_;' });
  return res.status(200).json({ status: 'Ok', data });
};

const episodeByEpisodeSlugHandler = async (req: Request, res: Response) => {
  const { slug } = req.params;

  let data;
  try {
    data = await otakudesu.episode({ episodeSlug:  slug });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ status: 'Ok', message: 'Internal server error' });
  }

  if (!data) return res.status(404).json({ status: 'Error', message: 'There\'s nothing here ;_;' });
  return res.status(200).json({ status: 'Ok', data });
};

const episodeByEpisodeNumberHandler = async (req: Request, res: Response) => {
  const { slug: animeSlug, episode } = req.params;
  if (!parseInt(episode)) return res.status(400).json({ status: 'Error', message: 'The episode NUMBER parameter must be a NUMBER!' });
  if (parseInt(episode) < 1) return res.status(400).json({ status: 'Error', message: 'The episode number parameter must be greater than 0!' });

  let data;
  try {
    data = await otakudesu.episode({ animeSlug, episodeNumber: parseInt(episode) });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ status: 'Error', message: 'Internal server error' });
  }

  if (!data) return res.status(404).json({ status: 'Error', message: 'There\'s nothing here ;_;' });
  return res.status(200).json({ status: 'Ok', data });
};

const batchByBatchSlugHandler = async (req: Request, res: Response) => {
  const { slug } = req.params;

  let data;
  try {
    data = await otakudesu.batch({ batchSlug: slug });
  } catch(e) {
    console.log(e);
    return res.status(500).json({ status: 'Error', message: 'Internal server error' });
  }

  return res.status(200).json({ status: 'Ok', data });
};

const batchHandler = async (req: Request, res: Response) => {
  const { slug } = req.params;
  
  let data;
  try {
    data = await otakudesu.batch({ animeSlug: slug });
  } catch(e) {
    console.log(e);
    return res.status(500).json({ status: 'Error', message: 'Internal server error' });
  }

  return data ? res.status(200).json({ status: 'Ok', data }) : res.status(404).json({
    status: 'Error',
    message: 'This anime doesn\'t have a batch yet ;_;'
  });
};


const genreListsHandler = async (_: Request, res: Response) => {
  let data;
  try {
    data = await otakudesu.genreLists();
  } catch(e) {
    console.log(e);
    return res.status(500).json({ status: 'Error', message: 'Internal server error' });
  }

  return res.status(200).json({ status: 'Ok', data });
};

const animeByGenreHandler = async (req: Request, res: Response) => {
  const { slug, page } = req.params;

  if (page) {
    if (!parseInt(page)) return res.status(400).json({ status: 'Error', message: 'The page parameter must be a number!' });
    if (parseInt(page) < 1) return res.status(400).json({ status: 'Error', message: 'The page parameter must be greater than 0!' });
  }

  let data;
  try {
    data = await otakudesu.animeByGenre(slug, page);
  } catch(e) {
    console.log(e);
    return res.status(500).json({ status: 'Error', message: 'Internal server error' });
  }

  return res.status(200).json({ status: 'Ok', data });
};

export default {
  searchAnimeHandler,
  homeHandler,
  singleAnimeHandler,
  episodesHandler,
  ongoingAnimeHandler,
  completeAnimeHandler,
  episodeByEpisodeSlugHandler,
  episodeByEpisodeNumberHandler,
  batchByBatchSlugHandler,
  batchHandler,
  genreListsHandler,
  animeByGenreHandler
};
