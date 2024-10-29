
import { AuthService } from './authService';
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import { API_BASE_URL } from './api';


export class HttpClient {
  private static instance: AxiosInstance;
  
  private static getInstance(): AxiosInstance
  {
        if (!this.instance)
        {
            this.instance = axios.create({
                baseURL: `${API_BASE_URL}`,
                headers: {
                'Content-Type': 'application/json',
                },
            });

            // Add request interceptor for auth token
            this.instance.interceptors.request.use(
                (config) => {
                    const token = AuthService.getToken();
                    if (token) {
                        config.headers.Authorization = `Bearer ${token}`;
                    }
                    return config;
                },
                (error) => {
                    return Promise.reject(error);
                }
            );

            // Add response interceptor for error handling
            this.instance.interceptors.response.use(
                (response) => response,
                (error) => {
                    if (error.response?.status === 401)
                    {
                        // Handle unauthorized access (e.g., token expired)
                        AuthService.logout();
                        window.location.href = '/login';
                    }
                    return Promise.reject(error);
                });
            }
        return this.instance;
  }

  static async get<T = Document>(url: string, config?: AxiosRequestConfig): Promise<T>
  {
        try
        {
            const response: AxiosResponse<T> = await this.getInstance().get(url, config);
            return response.data;
        }
        catch (error)
        {
            throw this.handleError(error);
        }
  }

  static async post<T = Document>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
  {
        try
        {
            const response: AxiosResponse<T> = await this.getInstance().post(url, data, config);
            return response.data;
        }
        catch (error)
        {
            throw this.handleError(error);
        }
  }

  static async put<T = Document>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
  {
        try
        {
            const response: AxiosResponse<T> = await this.getInstance().put(url, data, config);
            return response.data;
        }
        catch (error)
        {
            throw this.handleError(error);
        }
  }

  private static handleError(error: any): Error
  {
    if (axios.isAxiosError(error))
    {
      // Handle specific error cases
        if (error.response)
        { // Server responded with error status
            const message = error.response.data?.message || error.message;
            return new Error(`API Error: ${message}`);
        }
        else if (error.request)
        { // Request made but no response received
            return new Error('No response received from server');
        }
    }
    
    return new Error('An unexpected error occurred');// Generic error
  }
}