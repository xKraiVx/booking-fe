import axios, { type AxiosInstance } from "axios";

export class ApiClient {
  readonly instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_APP_API_URL,
    });
  }
}
