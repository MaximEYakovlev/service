import axios from 'axios';
import { config } from './config';

export const instance = axios.create(config);
