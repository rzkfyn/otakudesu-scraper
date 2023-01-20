import axios from 'axios';
import getBatch from '../lib/getBatch.js';
import scrapeBatch from '../lib/scrapeBatch.js';

const { BASEURL } = process.env;
const batch = async ({ batchSlug, animeSlug }: {
  batchSlug?: string, animeSlug?: string
}) => {
  let batch: string | undefined = batchSlug;

  if (animeSlug) {
    const response = await axios.get(`${BASEURL}/anime/${animeSlug}`);
    const batchData = getBatch(response.data);
    batch = batchData?.slug;
  }
  if (!batch) return false;

  const response = await axios.get(`${BASEURL}/batch/${batch}`);
  const result = scrapeBatch(response.data);

  return result;
};

export default batch;
