import axios from 'axios';
import 'dotenv/config';
import scrapeGenreLists from '../lib/scrapeGenreLists.js';
import type { genre as genreType } from '../types/types.js';

const { BASEURL } = process.env;
const genreLists = async (): Promise<genreType[]> => {
  const response = await axios.get(`${BASEURL}/genre-list`);
  const result = scrapeGenreLists(response.data);

  return result;
};

export default genreLists;
