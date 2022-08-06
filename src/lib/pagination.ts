import { load } from 'cheerio';

const pagination = (html: string): false | {
  currentPage: number;
  lastPage: number;
  isHasNextPage: boolean;
  nextPage: number | null;
  isHasPreviousPage: boolean;
  previousPage: number | null;
} => {
  const $ = load(html);

  const currentPage = parseInt($('.pagination .pagenavix .page-numbers.current').text());
  const lastPage = parseInt($('.pagination .pagenavix .page-numbers:last').prev('a.page-numbers').text());
  const nextPage = currentPage < lastPage ? currentPage + 1 : null;
  const previousPage = currentPage > 1 ? currentPage - 1 : null;
  const isHasNextPage = currentPage < lastPage;
  const isHasPreviousPage = currentPage > 1;

  if (!currentPage) return false;

  return {
    currentPage,
    lastPage: currentPage < lastPage ? lastPage : currentPage,
    isHasNextPage,
    nextPage,
    isHasPreviousPage,
    previousPage    
  }
}

export default pagination;
