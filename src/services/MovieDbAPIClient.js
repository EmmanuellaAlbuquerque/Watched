/**
* Movie DB API Client
* Created by Emmanuella Albuquerque on 2023/01/30.
*/

import { getFormedURL } from './MovieDbAPIConfig'; 

const language = 'pt-BR';

export async function getTrendingTVShows() {

  const path = '/trending/tv/day';
  let response = await fetch(getFormedURL(path, language), { method: 'GET' });
  let json = await response.json();

  let trending = json.results;
  return trending;
}
