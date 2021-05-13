import checkCache from './checkCache';
import fetchQuote from './fetchQuote';

export const getRoutes = () => {
  let routes = [checkCache, fetchQuote];
  return routes;
};

export default getRoutes();
