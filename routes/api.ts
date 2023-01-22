import { Router } from 'express';
import handler from '../handler/handler.js';

const api = Router();

api.get('/', (_, res) =>  res.status(200).json({ status: 'OK', message: 'Otakudesu unofficial API, made by rzkfyn with <3' }));
api.get('/home', handler.homeHandler);
api.get('/search/:keyword', handler.searchAnimeHandler);
api.get('/ongoing-anime/:page?', handler.ongoingAnimeHandler);
api.get('/complete-anime/:page?', handler.completeAnimeHandler);
api.get('/anime/:slug', handler.singleAnimeHandler);
api.get('/anime/:slug/episodes', handler.episodesHandler);
api.get('/anime/:slug/episodes/:episode', handler.episodeByEpisodeNumberHandler);
api.get('/episode/:slug', handler.episodeByEpisodeSlugHandler);
api.get('/batch/:slug', handler.batchByBatchSlugHandler);
api.get('/anime/:slug/batch', handler.batchHandler);
api.get('/genres', handler.genreListsHandler);
api.get('/genres/:slug/:page?', handler.animeByGenreHandler);

export default api;
