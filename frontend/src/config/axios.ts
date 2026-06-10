import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

axios.defaults.withCredentials = true;

const mainBaseURL = process.env.NEXT_PUBLIC_API_URL!;

let sessionExpiredShown = false;

const handleSessionExpired = (reason: 'EXPIRED_TOKEN' | 'INVALID_TOKEN' | 'MISSING_TOKEN') => {
    if (sessionExpiredShown) return;
    sessionExpiredShown = true;

    Cookies.remove('token');

    const isExpired = reason === 'EXPIRED_TOKEN';

    Swal.fire({
        icon: 'warning',
        title: isExpired ? 'Sessão expirada' : 'Sessão inválida',
        text: isExpired
            ? 'Seu token expirou. Faça login novamente para continuar.'
            : 'Sua sessão é inválida. Faça login novamente.',
        confirmButtonText: 'Login',
        confirmButtonColor: '#dc2626',
        allowOutsideClick: false,
        allowEscapeKey: false,
    }).then(() => {
        sessionExpiredShown = false;
        window.location.href = '/login';
    });
};

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

    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            const status = error?.response?.status;
            const code = error?.response?.data?.code;

            if (status === 401 && (code === 'EXPIRED_TOKEN' || code === 'INVALID_TOKEN' || code === 'MISSING_TOKEN')) {
                handleSessionExpired(code);
            }

            return Promise.reject(error);
        }
    );

    return instance;
};

export const httpClient = createInstance(mainBaseURL);