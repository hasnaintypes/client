/**
 * @file axios-client.ts
 * @summary Axios client configuration for TeamSync API requests.
 * @remarks
 * Sets up base URL, credentials, timeout, and response interceptors for API calls.
 */
import axios from "axios";

/**
 * The base URL for API requests, loaded from environment variables.
 * @type {string}
 */
const baseURL = import.meta.env.VITE_API_BASE_URL;

/**
 * Axios client options including base URL, credentials, and timeout.
 * @type {object}
 */
const options = {
  baseURL,
  withCredentials: true,
  timeout: 10000,
};

/**
 * Axios API client instance for making HTTP requests.
 * @type {import('axios').AxiosInstance}
 */
const API = axios.create(options);

/**
 * Response interceptor to handle unauthorized errors globally.
 * Redirects to home page if 401 Unauthorized is detected.
 */
API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { data, status } = error.response;
    if (data === "Unauthorized" && status === 401) {
      window.location.href = "/";
    }
    return Promise.reject({
      ...data,
    });
  }
);

/**
 * Default export of the configured Axios API client.
 */
export default API;
