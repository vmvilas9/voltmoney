import axios from 'axios';
const BASE_URL = 'https://api.shutterstock.com/v2/images/';

export async function getRequest(
  url: string,
  page: number,
  query?: string,
): Promise<any> {
  return await axios.get(`${BASE_URL}/${url}?query=${query}&page=${page}`);
}
