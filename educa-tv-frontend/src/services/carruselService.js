import api from './api';

export const obtenerImagenesCarrusel = async () => {
    const response = await api.get('/carrusel');
    return response.data;
};
