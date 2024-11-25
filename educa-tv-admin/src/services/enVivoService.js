// src/services/enVivoService.js
import api from './api';

export const obtenerEnVivo = async () => {
    const response = await api.get('/en_vivo');
    return response.data;
};

export const crearEnVivo = async (data) => {
    const response = await api.post('/en_vivo', data);
    return response.data;
};

export const actualizarEnVivo = async (id, data) => {
    const response = await api.put(`/en_vivo/${id}`, data);
    return response.data;
};

export const eliminarEnVivo = async (id) => {
    const response = await api.delete(`/en_vivo/${id}`);
    return response.data;
};
