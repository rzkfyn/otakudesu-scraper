import axios from 'axios';
import scrapeBatch from '../lib/scrapeBatch.js';

const { BASEURL } = process.env;
const batch = async (batch: string) => {
  const response = await axios.get(`${BASEURL}/batch/${batch}`);
  const result = scrapeBatch(response.data);

  return result;
};

export default batch;