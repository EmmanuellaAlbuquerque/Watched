/**
* Movie DB API Client
* Created by Emmanuella Albuquerque on 2023/01/30.
*/

import { buildURL } from './MovieDbAPIConfig';
import { get, post } from '../utils/Network';

const language = 'pt-BR';

export async function getTrendingTVShows() {

  const path = '/trending/tv/day';
  return get(buildURL(path, language), 'results');
}

// Authentication
// GET - New Token
export async function getNewToken() {
  const path = '/authentication/token/new';
  return get(buildURL(path, language), 'request_token');
}

// POST - Login
export async function validateWithLogin(username, password, request_token) {
  const json_body = {
    "username": username,
    "password": password,
    "request_token": request_token
  };

  const path = '/authentication/token/validate_with_login';
  return post(buildURL(path, language), 'success', json_body);
}

// POST - Create Session
export async function createSession(request_token) {
  const json = {
    "request_token": request_token
  }

  const path = '/authentication/session/new';
  return post(buildURL(path, language), 'session_id', json);
}

// GET - Obtain Account ID
export async function getAccountInfo(session_id) {
  const path = '/account';
  return get(buildURL(path, language, { session_id }), 'id');
}

// GET - Obtain Favorites
export async function getWatched(session_id, account_id, media_type) {
  const path = `/account/${account_id}/favorite/${media_type}`;
  return get(buildURL(path, language, { session_id }), 'results');
}
