// src/services/deportesService.js
import api from './api';

export const obtenerDeportes = async () => {
    const response = await api.get('/deportes');
    return response.data;
};

export const crearDeporte = async (data) => {
    const response = await api.post('/deportes', data, {
        headers: {
            'Content-Type': 'multipart/form-data', // Asegura que se use multipart
        },
    });
    return response.data;
};


export const actualizarDeporte = async (id, data) => {
    const response = await api.put(`/deportes/${id}`, data);
    return response.data;
};

export const eliminarDeporte = async (id) => {
    const response = await api.delete(`/deportes/${id}`);
    return response.data;
};
