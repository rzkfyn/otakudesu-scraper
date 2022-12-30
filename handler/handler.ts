import { Request, Response } from 'express';
import otakudesu from '../src/otakudesu.js';
import type { anime as animeType, ongoingAnime, searchResultAnime } from '../src/types/types.js';

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
  let data: { ongoingAnime: ongoingAnime[] };
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

export default {
  searchAnimeHandler,
  homeHandler,
  ongoingAnimeHandler,
  completeAnimeHandler,
  singleAnimeHandler
};
