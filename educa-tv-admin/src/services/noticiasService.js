// src/services/noticiasService.js
import api from './api';

export const obtenerNoticias = async () => {
    const response = await api.get('/noticias');
    return response.data;
};

export const crearNoticia = async (data) => {
    const response = await api.post('/noticias', data, {
        headers: {
            'Content-Type': 'multipart/form-data', // Aseguramos que se envíe como FormData
        },
    });
    return response.data;
};

export const actualizarNoticia = async (id, data) => {
    const response = await api.put(`/noticias/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data', // También se configura para actualizaciones
        },
    });
    return response.data;
};

export const eliminarNoticia = async (id) => {
    const response = await api.delete(`/noticias/${id}`);
    return response.data;
};
