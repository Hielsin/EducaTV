import api from './api';

export const obtenerArticulos = async () => {
    const response = await api.get('/articulos');
    return response.data;
};

export const crearArticulo = async (data) => {
    const response = await api.post('/articulos', data, {
        headers: {
            'Content-Type': 'multipart/form-data', // Para manejo de archivos
        },
    });
    return response.data;
};

export const actualizarArticulo = async (id, data) => {
    const response = await api.put(`/articulos/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const eliminarArticulo = async (id) => {
    const response = await api.delete(`/articulos/${id}`);
    return response.data;
};
