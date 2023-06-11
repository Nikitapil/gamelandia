import axios from 'axios';
import { getToken, setToken } from '../utils/token-helpers';

const $api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL
});

$api.interceptors.request.use((config) => {
  config.headers!.Authorization = `Bearer ${getToken()}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      // eslint-disable-next-line no-underscore-dangle
      !error.config._isRetry
    ) {
      try {
        // eslint-disable-next-line no-underscore-dangle
        originalRequest._isRetry = true;
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/refresh`, {
          withCredentials: true
        });
        setToken(response.data.accessToken);
        return await $api.request(originalRequest);
      } catch (e) {
        throw error;
      }
    }
    throw error;
  }
);

export default $api;
