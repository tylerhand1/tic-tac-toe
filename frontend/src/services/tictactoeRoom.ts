import axios, { AxiosResponse } from 'axios';
import { CreateRoomResponse } from '@/types';

axios.defaults.timeout = 5 * 1000;

export const createRoom = async (): Promise<AxiosResponse<CreateRoomResponse>['data']> => {
  const baseUrl = 'http://localhost:3000/api/create-room';
  const response: AxiosResponse<CreateRoomResponse> = await axios.post(baseUrl);
  return response.data;
};