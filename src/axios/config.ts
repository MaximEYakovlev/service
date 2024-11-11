import { AxiosRequestConfig } from 'axios';
import 'dotenv/config';

export const config: AxiosRequestConfig = {
  method: 'get',
  baseURL: 'https://common-api.wildberries.ru/api/v1/tariffs',
  headers: {
    Authorization: `Bearer ${process.env.TOKEN}`,
  },
};
