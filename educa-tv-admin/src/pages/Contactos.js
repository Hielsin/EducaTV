import React, { useEffect, useState } from 'react';
import { obtenerContactos, crearContacto, actualizarContacto } from '../services/contactosService';
import { toast } from 'react-toastify';

function ContactoAdmin() {
    const [contacto, setContacto] = useState({
        direccion: '',
        telefono: '',
        email: '',
        facebook: '',
        twitter: '',
        instagram: '',
        youtube: ''
    });
    const [editando, setEditando] = useState(false);

    useEffect(() => {
        const fetchContacto = async () => {
            const data = await obtenerContactos();
            if (data.length > 0) {
                setContacto(data[0]); // Cargar el primer registro de contacto (si existe)
                setEditando(true); // Marcar como en modo de edición
            }
        };
        fetchContacto();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContacto({ ...contacto, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editando) {
                await actualizarContacto(contacto.id, contacto); // Actualizar contacto existente
                toast.success('Información de contacto actualizada correctamente');
            } else {
                await crearContacto(contacto); // Crear nuevo contacto
                toast.success('Información de contacto creada correctamente');
                setEditando(true);
            }
        } catch (error) {
            console.error("Error al guardar la información de contacto:", error); // Log para depuración
            toast.error('Error al guardar la información de contacto');
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Gestión de Información de Contacto</h1>
            
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Dirección</label>
                    <input
                        type="text"
                        name="direccion"
                        value={contacto.direccion}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded"
                        placeholder="Dirección de la empresa"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                    <input
                        type="text"
                        name="telefono"
                        value={contacto.telefono}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded"
                        placeholder="Teléfono de contacto"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={contacto.email}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded"
                        placeholder="Correo electrónico de contacto"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Facebook</label>
                    <input
                        type="text"
                        name="facebook"
                        value={contacto.facebook}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded"
                        placeholder="Perfil de Facebook"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Twitter</label>
                    <input
                        type="text"
                        name="twitter"
                        value={contacto.twitter}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded"
                        placeholder="Perfil de Twitter"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Instagram</label>
                    <input
                        type="text"
                        name="instagram"
                        value={contacto.instagram}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded"
                        placeholder="Perfil de Instagram"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">YouTube</label>
                    <input
                        type="text"
                        name="youtube"
                        value={contacto.youtube}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded"
                        placeholder="Canal de YouTube"
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                    {editando ? 'Actualizar Información' : 'Guardar Información'}
                </button>
            </form>
        </div>
    );
}

export default ContactoAdmin;
