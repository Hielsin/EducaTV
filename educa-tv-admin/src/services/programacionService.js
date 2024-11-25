// src/services/programacionService.js
import api from './api';

export const obtenerProgramacion = async () => {
    const response = await api.get('/programacion');
    return response.data;
};

export const crearProgramacion = async (data) => {
    const response = await api.post('/programacion', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

export const actualizarProgramacion = async (id, data) => {
    const response = await api.put(`/programacion/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

export const eliminarProgramacion = async (id) => {
    const response = await api.delete(`/programacion/${id}`);
    return response.data;
};
