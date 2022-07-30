import axios from 'axios';
import { BASEURL } from '../../config.js';
import scrapesearchresult from '../lib/scrapesearchresult.js';
import { searchResultAnime } from '../types/types.js';

const search = async (keyword: string): Promise<searchResultAnime[]> => {
  const response = await axios.get(`${BASEURL}/?s=${keyword}&post_type=anime`);
  const html = response.data;
  const searchResult = scrapesearchresult(html);
  return searchResult;
}

export default search;
