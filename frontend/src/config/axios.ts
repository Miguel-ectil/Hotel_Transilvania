import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

axios.defaults.withCredentials = true;

const mainBaseURL = process.env.NEXT_PUBLIC_API_URL!;

const createInstance = (baseURL: string): AxiosInstance => {
    const instance = axios.create({ baseURL });

    instance.interceptors.request.use((config) => {
        const authToken = Cookies.get('token');
        if (authToken) {
            config.headers = config.headers || {};
            (config.headers as Record<string, string>).Authorization = `Bearer ${authToken}`.replace(/\"/g, "");
        }
        return config;
    });

    return instance;
};

export const httpClient = createInstance(mainBaseURL);