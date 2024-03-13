import Axios, { AxiosRequestConfig } from 'axios';

const http = Axios.create({
  baseURL: 'https://apigwdev-maximo.gaf.com' //process.env.REACT_APP_URL,
});

http.interceptors.request.use((config: AxiosRequestConfig):any => {
  const token = window.localStorage.getItem('token');

   // default headers
   config.headers = {
    'properties': 'wonum,assetnum,workorderid',
    'maxauth': 'R0lOVE1BWEFQSTpNYXhpbW8yMDI0IQ==',
    'Content-Type': 'application/json',
  }
  if (!token) return config;
  if (config?.headers) {
    config.headers = { Authorization: `Bearer ${token}` };
  }
    
  return config;
});

http.interceptors.response.use(
  (value) => {
    return Promise.resolve(value);
  },
  (error) => {
    const { isAxiosError = false, response = null } = error;

    if (isAxiosError && response && response.status === 401) {
      return Promise.reject(error);
    }
    if (isAxiosError && response && response.status === 403) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

let counter = 1;

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response.status >= 500 &&
      counter < Number(process.env.REACT_APP_RETRY)
    ) {
      counter++;
      return http.request(error.config);
    }
    counter = 1;
    return Promise.reject(error);
  }
);

export default http;