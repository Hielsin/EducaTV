import React, { useEffect, useState } from 'react';
import { obtenerVideos, crearVideo, actualizarVideo, eliminarVideo } from '../services/videosService';
import { toast } from 'react-toastify';

function Videos() {
    const [videos, setVideos] = useState([]);
    const [nuevoVideo, setNuevoVideo] = useState({ titulo: '', descripcion: '', categoria: '', video: null });
    const [editandoVideo, setEditandoVideo] = useState(null);

    useEffect(() => {
        const fetchVideos = async () => {
            const data = await obtenerVideos();
            setVideos(data);
        };
        fetchVideos();
    }, []);

    const handleDelete = async (id) => {
        try {
            await eliminarVideo(id);
            setVideos(videos.filter((video) => video.id !== id));
            toast.success('Video eliminado correctamente');
        } catch (error) {
            toast.error('Error al eliminar el video');
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('titulo', nuevoVideo.titulo);
            formData.append('descripcion', nuevoVideo.descripcion);
            formData.append('categoria', nuevoVideo.categoria);
            if (nuevoVideo.video) {
                formData.append('video', nuevoVideo.video);
            }
            const nuevoVideoCreado = await crearVideo(formData);
            setVideos([...videos, nuevoVideoCreado]);
            setNuevoVideo({ titulo: '', descripcion: '', categoria: '', video: null });
            toast.success('Video creado correctamente');
        } catch (error) {
            toast.error('Error al crear el video');
        }
    };
    

    const handleEdit = (video) => {
        setEditandoVideo(video);
        setNuevoVideo(video);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('titulo', nuevoVideo.titulo);
            formData.append('descripcion', nuevoVideo.descripcion);
            formData.append('categoria', nuevoVideo.categoria);
            if (nuevoVideo.video) {
                formData.append('video', nuevoVideo.video);
            }
            const videoActualizado = await actualizarVideo(editandoVideo.id, formData);
            setVideos(videos.map((video) => (video.id === videoActualizado.id ? videoActualizado : video)));
            setEditandoVideo(null);
            setNuevoVideo({ titulo: '', descripcion: '', categoria: '', video: null });
            toast.success('Video actualizado correctamente');
        } catch (error) {
            toast.error('Error al actualizar el video');
        }
    };

    const handleFileChange = (e) => {
        const { files } = e.target;
        setNuevoVideo({ ...nuevoVideo, video: files[0] });
    };
    

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Gestión de Videos</h1>
            
            <form onSubmit={editandoVideo ? handleUpdate : handleCreate} className="mb-6 bg-white p-4 rounded shadow-md">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Título</label>
                    <input
                        type="text"
                        className="mt-1 p-2 w-full border rounded"
                        placeholder="Título del video"
                        value={nuevoVideo.titulo}
                        onChange={(e) => setNuevoVideo({ ...nuevoVideo, titulo: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Descripción</label>
                    <textarea
                        className="mt-1 p-2 w-full border rounded"
                        placeholder="Descripción del video"
                        value={nuevoVideo.descripcion}
                        onChange={(e) => setNuevoVideo({ ...nuevoVideo, descripcion: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Categoría</label>
                    <input
                        type="text"
                        className="mt-1 p-2 w-full border rounded"
                        placeholder="Categoría del video"
                        value={nuevoVideo.categoria}
                        onChange={(e) => setNuevoVideo({ ...nuevoVideo, categoria: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Archivo de Video</label>
                    <input
                        type="file"
                        name="video"
                        className="mt-1"
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                    {editandoVideo ? 'Actualizar Video' : 'Crear Video'}
                </button>
            </form>

            <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
                <thead>
                    <tr>
                        <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                        <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                        <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                        <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Video</th>
                        <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {videos.map((video) => (
                        <tr key={video.id} className="border-b hover:bg-gray-100">
                            <td className="px-4 py-2 text-sm font-medium text-gray-700">{video.titulo}</td>
                            <td className="px-4 py-2 text-sm text-gray-600">{video.descripcion}</td>
                            <td className="px-4 py-2 text-sm text-gray-600">{video.categoria}</td>
                            <td className="px-4 py-2 text-sm text-gray-600">
                                {video.video ? (
                                    <a href={`http://localhost:5000${video.video}`} target="_blank" rel="noopener noreferrer">Ver video</a>
                                ) : (
                                    'Sin video'
                                )}
                            </td>
                            <td className="px-4 py-2 text-sm">
                                <button onClick={() => handleEdit(video)} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600">
                                    Editar
                                </button>
                                <button onClick={() => handleDelete(video.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
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

export default Videos;
