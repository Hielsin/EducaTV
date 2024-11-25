import api from './api';

export const obtenerImagenesCarrusel = async () => {
    const response = await api.get('/carrusel');
    return response.data;
};

export const crearImagenCarrusel = async (data) => {
    const response = await api.post('/carrusel', data, {
        headers: {
            'Content-Type': 'multipart/form-data', // Asegúrate de usar multipart
        },
    });
    return response.data;
};

export const eliminarImagenCarrusel = async (id) => {
    const response = await api.delete(`/carrusel/${id}`);
    return response.data;
};

