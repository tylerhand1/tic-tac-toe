import axios from 'axios';

axios.defaults.timeout = 5 * 1000;

export const createRoom = async () => {
  const baseUrl = 'http://localhost:3000/api/create-room';
  const response = await axios.post(baseUrl);
  return response.data;
}