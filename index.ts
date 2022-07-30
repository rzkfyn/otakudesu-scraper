import express from 'express';
import routes from './routes/routes.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(routes);

app.listen(port, () => {
  console.log(`App is listening on port ${port}, http://localhost:${port}`);
});
