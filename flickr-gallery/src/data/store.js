import axios from 'axios';

export default function fetchResults(url) {
  return axios.get(url);
}
