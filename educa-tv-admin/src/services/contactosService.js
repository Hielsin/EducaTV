// src/services/contactosService.js
import api from './api';

export const obtenerContactos = async () => {
    try {
        const response = await api.get('/contactos');
        return response.data;
    } catch (error) {
        console.error("Error al obtener los contactos:", error);
        throw error;
    }
};

export const crearContacto = async (data) => {
    try {
        const response = await api.post('/contactos', data);
        return response.data;
    } catch (error) {
        console.error("Error al crear el contacto:", error);
        throw error;
    }
};

export const actualizarContacto = async (id, data) => {
    try {
        const response = await api.put(`/contactos/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el contacto:", error);
        throw error;
    }
};

export const eliminarContacto = async (id) => {
    try {
        const response = await api.delete(`/contactos/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar el contacto:", error);
        throw error;
    }
};
