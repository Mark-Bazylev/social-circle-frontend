import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { authService } from 'src/services/http-services/auth.service';

class HttpService {
  private service: AxiosInstance;
  constructor() {

    const service = axios.create({
      baseURL: process.env.BASE_URL,
    });
    this.service = service;
  }
  setAuthToken(token: string | null) {
    const common = this.service.defaults.headers.common;
    common.Authorization = token ? `Bearer ${token}` : '';
  }

  get<T = any>(url: string, config?: AxiosRequestConfig<any>) {
    return this.service.get<T>(url, config);
  }
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig<any>) {
    return this.service.post<T>(url, data, config);
  }
  delete<T = any>(url: string, config?: AxiosRequestConfig<any>) {
    return this.service.delete<T>(url, config);
  }
}
export const httpService = new HttpService();
