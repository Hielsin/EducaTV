// src/services/videosService.js
import api from './api';

export const obtenerVideos = async () => {
    const response = await api.get('/videos');
    return response.data;
};

export const crearVideo = async (formData) => {
    const response = await fetch('http://localhost:5000/api/videos', {
        method: 'POST',
        body: formData,
    });
    return response.json();
};

export const actualizarVideo = async (id, data) => {
    const response = await api.put(`/videos/${id}`, data);
    return response.data;
};

export const eliminarVideo = async (id) => {
    const response = await api.delete(`/videos/${id}`);
    return response.data;
};
