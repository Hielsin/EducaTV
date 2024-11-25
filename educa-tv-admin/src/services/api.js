// src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // URL base de tu backend
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
