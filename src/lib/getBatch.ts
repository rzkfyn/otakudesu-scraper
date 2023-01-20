import { load } from 'cheerio';

const { BASEURL } = process.env;
const getBatch = (html: string) => {
  const $ = load(html);
  const batch = $('.venser #serieslist ~ .episodelist ul li:first-child span:first-child a').attr('href');
  const uploaded_at = $('.venser #serieslist ~ .episodelist ul li:first-child span.zeebr:first').text();

  return batch?.match('episode') ? null : {
    slug: batch?.replace(`${BASEURL}/batch/`, '').replace('/', ''),
    otakudesu_url: batch,
    uploaded_at
  };
};

export default getBatch;
