/**
* Movie DB API Config
* Created by Emmanuella Albuquerque on 2023/01/30.
*/

export const { THEMOVIEDB_APIKEY } = process.env;
export const base_URL = 'https://api.themoviedb.org/3';
export const images_URL = 'https://image.tmdb.org/t/p/original';

export function buildURL(path, language, extra) {
  let querys = [];

  if (extra) {
    for (const property in extra) {
      if (Object.hasOwnProperty.call(extra, property)) {
        const query = `&${property}=${encodeURI(extra[property])}`;
        querys.push(query);
      }
    }
  }

  let url = `${base_URL}${path}?api_key=${THEMOVIEDB_APIKEY}&language=${language}`;
  
  querys.forEach(query => {
    url = url.concat(query);  
  });

  return url;
}
