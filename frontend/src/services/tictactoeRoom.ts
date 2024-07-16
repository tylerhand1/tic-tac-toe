import axios from 'axios';

const baseUrl = 'http://localhost:3000/api/tictactoeroom';

axios.defaults.timeout = 5 * 1000;

export const requestRoom = async () => {
  const response = await axios.post(baseUrl);
  return response.data;
}