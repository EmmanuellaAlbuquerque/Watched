/**
* Movie DB API Config
* Created by Emmanuella Albuquerque on 2023/01/30.
*/

export const { THEMOVIEDB_APIKEY } = process.env;
export const base_URL = 'https://api.themoviedb.org/3';
export const images_URL = 'https://image.tmdb.org/t/p/original';

export function getFormedURL(path, language) {
  return `${base_URL}${path}?api_key=${THEMOVIEDB_APIKEY}&language=${language}`;
}