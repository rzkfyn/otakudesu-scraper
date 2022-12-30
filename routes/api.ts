import { Router } from 'express';
import handler from '../handler/handler.js';

const api = Router();

api.get('/', (_, res) =>  res.status(200).json({ status: 'OK', message: 'Otakudesu unofficial API, made by rzkfyn with <3' }));

api.get('/home', handler.homeHandler);

api.get('/search/:keyword', handler.searchAnimeHandler);

api.get('/ongoing-anime/:page?', handler.ongoingAnimeHandler);

api.get('/complete-anime/:page?', handler.completeAnimeHandler);

api.get('/anime/:slug', handler.singleAnimeHandler);

export default api;
