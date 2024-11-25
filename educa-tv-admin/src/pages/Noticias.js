// src/pages/Noticias.js
import React, { useEffect, useState } from 'react';
import { obtenerNoticias, crearNoticia, actualizarNoticia, eliminarNoticia } from '../services/noticiasService';
import { toast } from 'react-toastify';

function Noticias() {
    const [noticias, setNoticias] = useState([]);
    const [nuevaNoticia, setNuevaNoticia] = useState({ titulo: '', contenido: '', categoria: '', portada: null, video: null });
    const [editandoNoticia, setEditandoNoticia] = useState(null);

    useEffect(() => {
        const fetchNoticias = async () => {
            const data = await obtenerNoticias();
            setNoticias(data);
        };
        fetchNoticias();
    }, []);

    const handleDelete = async (id) => {
        try {
            await eliminarNoticia(id);
            setNoticias(noticias.filter((noticia) => noticia.id !== id));
            toast.success('Noticia eliminada correctamente');
        } catch (error) {
            toast.error('Error al eliminar la noticia');
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('titulo', nuevaNoticia.titulo);
            formData.append('contenido', nuevaNoticia.contenido);
            formData.append('categoria', nuevaNoticia.categoria);
            if (nuevaNoticia.portada) {
                formData.append('portada', nuevaNoticia.portada);
            }
            if (nuevaNoticia.video) {
                formData.append('video', nuevaNoticia.video);
            }
            const nuevaNoticiaCreada = await crearNoticia(formData);
            setNoticias([...noticias, nuevaNoticiaCreada]);
            setNuevaNoticia({ titulo: '', contenido: '', categoria: '', portada: null, video: null });
            toast.success('Noticia creada correctamente');
        } catch (error) {
            toast.error('Error al crear la noticia');
        }
    };

    const handleEdit = (noticia) => {
        setEditandoNoticia(noticia);
        setNuevaNoticia(noticia);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('titulo', nuevaNoticia.titulo);
            formData.append('contenido', nuevaNoticia.contenido);
            formData.append('categoria', nuevaNoticia.categoria);
            if (nuevaNoticia.portada) {
                formData.append('portada', nuevaNoticia.portada);
            }
            if (nuevaNoticia.video) {
                formData.append('video', nuevaNoticia.video);
            }
            const noticiaActualizada = await actualizarNoticia(editandoNoticia.id, formData);
            setNoticias(noticias.map((noticia) => (noticia.id === noticiaActualizada.id ? noticiaActualizada : noticia)));
            setEditandoNoticia(null);
            setNuevaNoticia({ titulo: '', contenido: '', categoria: '', portada: null, video: null });
            toast.success('Noticia actualizada correctamente');
        } catch (error) {
            toast.error('Error al actualizar la noticia');
        }
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setNuevaNoticia({ ...nuevaNoticia, [name]: files[0] });
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Gestión de Noticias</h1>
            
            <form onSubmit={editandoNoticia ? handleUpdate : handleCreate} className="mb-6 bg-white p-4 rounded shadow-md">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Título</label>
                    <input
                        type="text"
                        className="mt-1 p-2 w-full border rounded"
                        placeholder="Título de la noticia"
                        value={nuevaNoticia.titulo}
                        onChange={(e) => setNuevaNoticia({ ...nuevaNoticia, titulo: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Contenido</label>
                    <textarea
                        className="mt-1 p-2 w-full border rounded"
                        placeholder="Contenido de la noticia"
                        value={nuevaNoticia.contenido}
                        onChange={(e) => setNuevaNoticia({ ...nuevaNoticia, contenido: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Categoría</label>
                    <input
                        type="text"
                        className="mt-1 p-2 w-full border rounded"
                        placeholder="Categoría de la noticia"
                        value={nuevaNoticia.categoria}
                        onChange={(e) => setNuevaNoticia({ ...nuevaNoticia, categoria: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Portada</label>
                    <input
                        type="file"
                        name="portada"
                        className="mt-1"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Video</label>
                    <input
                        type="file"
                        name="video"
                        className="mt-1"
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                    {editandoNoticia ? 'Actualizar Noticia' : 'Crear Noticia'}
                </button>
            </form>

            <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
                <thead>
                    <tr>
                        <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                        <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contenido</th>
                        <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                        <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Portada</th>
                        <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Video</th>
                        <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {noticias.map((noticia) => (
                        <tr key={noticia.id} className="border-b hover:bg-gray-100">
                            <td className="px-4 py-2 text-sm font-medium text-gray-700">{noticia.titulo}</td>
                            <td className="px-4 py-2 text-sm text-gray-600">{noticia.contenido}</td>
                            <td className="px-4 py-2 text-sm text-gray-600">{noticia.categoria}</td>
                            <td className="px-4 py-2 text-sm text-gray-600">
                                {noticia.portada ? (
                                    <img
                                        src={`http://localhost:5000${noticia.portada}`}
                                        alt="Portada"
                                        className="object-cover rounded-md"
                                        style={{ width: '80px', height: '80px' }}
                                    />
                                ) : (
                                    'Sin portada'
                                )}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-600">
                                {noticia.video ? (
                                    <a href={`http://localhost:5000${noticia.video}`} target="_blank" rel="noopener noreferrer">Ver video</a>
                                ) : (
                                    'Sin video'
                                )}
                            </td>
                            <td className="px-4 py-2 text-sm">
                                <button onClick={() => handleEdit(noticia)} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600">
                                    Editar
                                </button>
                                <button onClick={() => handleDelete(noticia.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Noticias;
