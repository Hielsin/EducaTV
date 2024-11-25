import React, { useEffect, useState } from 'react';
import { obtenerDeportes, crearDeporte, actualizarDeporte, eliminarDeporte } from '../services/deportesService';
import { toast } from 'react-toastify';

function Deportes() {
    const [deportes, setDeportes] = useState([]);
    const [nuevoDeporte, setNuevoDeporte] = useState({ titulo: '', descripcion: '', fecha: '', categoria: '', destacada: false, imagen: null });
    const [editandoDeporte, setEditandoDeporte] = useState(null);

    useEffect(() => {
        const fetchDeportes = async () => {
            const data = await obtenerDeportes();
            setDeportes(data);
        };
        fetchDeportes();
    }, []);

    const handleDelete = async (id) => {
        try {
            await eliminarDeporte(id);
            setDeportes(deportes.filter((deporte) => deporte.id !== id));
            toast.success('Noticia eliminada correctamente');
        } catch (error) {
            toast.error('Error al eliminar la noticia');
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('titulo', nuevoDeporte.titulo);
            formData.append('descripcion', nuevoDeporte.descripcion);
            formData.append('fecha', nuevoDeporte.fecha);
            formData.append('categoria', nuevoDeporte.categoria);
            formData.append('destacada', nuevoDeporte.destacada);
            if (nuevoDeporte.imagen) {
                formData.append('imagen', nuevoDeporte.imagen);
            }
    
            // Debugging
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }
    
            const nuevaNoticia = await crearDeporte(formData);
            setDeportes([...deportes, nuevaNoticia]);
            setNuevoDeporte({ titulo: '', descripcion: '', fecha: '', categoria: '', destacada: false, imagen: null });
            toast.success('Noticia creada correctamente');
        } catch (error) {
            toast.error('Error al crear la noticia');
        }
    };
    

    const handleEdit = (deporte) => {
        setEditandoDeporte(deporte);
        setNuevoDeporte({
            ...deporte,
            imagen: null, // No llevamos la imagen en el estado porque será un archivo seleccionado por el usuario
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('titulo', nuevoDeporte.titulo);
            formData.append('descripcion', nuevoDeporte.descripcion);
            formData.append('fecha', nuevoDeporte.fecha);
            formData.append('categoria', nuevoDeporte.categoria);
            formData.append('destacada', nuevoDeporte.destacada);
            if (nuevoDeporte.imagen) {
                formData.append('imagen', nuevoDeporte.imagen);
            }
            const noticiaActualizada = await actualizarDeporte(editandoDeporte.id, formData);
            setDeportes(deportes.map((deporte) => (deporte.id === noticiaActualizada.id ? noticiaActualizada : deporte)));
            setEditandoDeporte(null);
            setNuevoDeporte({ titulo: '', descripcion: '', fecha: '', categoria: '', destacada: false, imagen: null });
            toast.success('Noticia actualizada correctamente');
        } catch (error) {
            toast.error('Error al actualizar la noticia');
        }
    };

    const handleFileChange = (e) => {
        const { files } = e.target;
        setNuevoDeporte({ ...nuevoDeporte, imagen: files[0] });
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Gestión de Noticias de Deportes</h1>
            
            <form onSubmit={editandoDeporte ? handleUpdate : handleCreate} className="mb-6 bg-white p-4 rounded shadow-md">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Título</label>
                    <input
                        type="text"
                        className="mt-1 p-2 w-full border rounded"
                        placeholder="Título de la noticia"
                        value={nuevoDeporte.titulo}
                        onChange={(e) => setNuevoDeporte({ ...nuevoDeporte, titulo: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Descripción</label>
                    <textarea
                        className="mt-1 p-2 w-full border rounded"
                        placeholder="Descripción de la noticia"
                        value={nuevoDeporte.descripcion}
                        onChange={(e) => setNuevoDeporte({ ...nuevoDeporte, descripcion: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Fecha</label>
                    <input
                        type="date"
                        className="mt-1 p-2 w-full border rounded"
                        value={nuevoDeporte.fecha}
                        onChange={(e) => setNuevoDeporte({ ...nuevoDeporte, fecha: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Categoría</label>
                    <input
                        type="text"
                        className="mt-1 p-2 w-full border rounded"
                        placeholder="Categoría de la noticia"
                        value={nuevoDeporte.categoria}
                        onChange={(e) => setNuevoDeporte({ ...nuevoDeporte, categoria: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Destacada</label>
                    <input
                        type="checkbox"
                        className="mt-1"
                        checked={nuevoDeporte.destacada}
                        onChange={(e) => setNuevoDeporte({ ...nuevoDeporte, destacada: e.target.checked })}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Imagen</label>
                    <input
                        type="file"
                        name="imagen"
                        className="mt-1"
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                    {editandoDeporte ? 'Actualizar Noticia' : 'Crear Noticia'}
                </button>
            </form>

            <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Título</th>
                        <th className="px-4 py-2">Descripción</th>
                        <th className="px-4 py-2">Fecha</th>
                        <th className="px-4 py-2">Categoría</th>
                        <th className="px-4 py-2">Destacada</th>
                        <th className="px-4 py-2">Imagen</th>
                        <th className="px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {deportes.map((deporte) => (
                        <tr key={deporte.id} className="border-b hover:bg-gray-100">
                            <td className="px-4 py-2">{deporte.titulo}</td>
                            <td className="px-4 py-2">{deporte.descripcion}</td>
                            <td className="px-4 py-2">{deporte.fecha}</td>
                            <td className="px-4 py-2">{deporte.categoria}</td>
                            <td className="px-4 py-2">{deporte.destacada ? 'Sí' : 'No'}</td>
                            <td className="px-4 py-2">
                                {deporte.imagen ? (
                                    <img src={`http://localhost:5000${deporte.imagen}`} alt="Imagen" className="w-16 h-16"/>
                                ) : (
                                    'Sin imagen'
                                )}
                            </td>
                            <td className="px-4 py-2">
                                <button onClick={() => handleEdit(deporte)} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">Editar</button>
                                <button onClick={() => handleDelete(deporte.id)} className="bg-red-500 text-white px-3 py-1 rounded">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Deportes;
