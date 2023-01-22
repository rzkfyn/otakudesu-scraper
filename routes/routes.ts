import { Router } from 'express';
import api from './api.js';

const routes = Router();

routes.get('/', (_, res) => res.status(200).json({ status: 'Ok', message: 'Otakudesu unofficial API, made by rzkfyn with <3' }));

routes.use('/api/v1', api);
routes.use((_, res) => res.status(404).json({ status: 'Error', message: 'There\'s nothing here ;_;' }));

export default routes;
