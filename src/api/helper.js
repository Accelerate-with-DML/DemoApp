import axios from 'axios';
import {API_KEY, BASE_URL} from './constants';

// Common helper funtion for get method
export function getDataFromApi(url) {
  return axios
    .get(`${BASE_URL}?key=${API_KEY}${url}`)
    .then(response => response)
    .catch(error => error);
}
