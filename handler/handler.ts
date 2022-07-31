import { Request, Response } from 'express';
import otakudesu from '../src/otakudesu.js';
import { ongoingAnime, searchResultAnime } from '../src/types/types.js';

const searchAnimeHandler = async (req: Request, res: Response) => {
  const { keyword } = req.params;

  let data: searchResultAnime[];
  try{
    data = await otakudesu.search(keyword);
  } catch(e) {
    console.log(e);
    return res.status(500).json({
      status: 'Error',
      message: 'Internal server error'
    });
  }

  return res.status(200).json({
    status: 'Ok',
    message: 'Otakudesu unofficial api, made by rzkfyn with <3',
    data
  });
}

const homeHandler = async (_: Request, res: Response)  => {
  let data: { ongoingAnime: ongoingAnime[] };
  try {
    data = await otakudesu.home();
  } catch(e) {
    console.log(e);
    return res.status(500).json({
      status: 'Error',
      message: 'Internal server error'
    });
  }

  return res.status(200).json({
    status: 'Ok',
    message: 'Otakudesu unofficial api, made by rzkfyn with <3',
    data
  });
}

export default {
  searchAnimeHandler,
  homeHandler
}
