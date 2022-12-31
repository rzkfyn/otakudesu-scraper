import express from 'express';
import routes from './routes/routes.js';
import cors from 'cors';
import axios from 'axios';
import { writeFileSync } from 'fs';

const app = express();
const port = 3000;

axios.get('http://localhost:3000/api/v1/anime/kuzu-honkai-subtitle-indonesia/episodes/1').then(response => {
  writeFileSync('./data.json', JSON.stringify(response.data));
});

app.use(cors());
app.use(routes);

app.listen(port, () => {
  console.log(`App is listening on port ${port}, http://localhost:${port}`);
});
