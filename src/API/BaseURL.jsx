import axios from 'axios';

export const MainAPI = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const EmailAPI = axios.create({
    baseURL: import.meta.env.VITE_API_EMAIL,
    headers: {
        'Content-Type': 'application/json',
    },
});