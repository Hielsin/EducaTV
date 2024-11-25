import React, { useEffect, useState } from 'react';
import { obtenerImagenesCarrusel, crearImagenCarrusel, eliminarImagenCarrusel } from '../services/carruselService';
import { toast } from 'react-toastify';

function Carrusel() {
    const [imagenes, setImagenes] = useState([]);
    const [nuevaImagen, setNuevaImagen] = useState({ titulo: '', descripcion: '', imagen: null });

    useEffect(() => {
        const fetchImagenes = async () => {
            try {
                const data = await obtenerImagenesCarrusel();
                setImagenes(data);
            } catch (error) {
                toast.error('Error al cargar las imágenes del carrusel');
            }
        };
        fetchImagenes();
    }, []);

    const handleFileChange = (e) => {
        const { files } = e.target;
        setNuevaImagen({ ...nuevaImagen, imagen: files[0] });
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('titulo', nuevaImagen.titulo);
            formData.append('descripcion', nuevaImagen.descripcion);
            if (nuevaImagen.imagen) {
                formData.append('imagen', nuevaImagen.imagen);
            }

            const nuevaImagenCreada = await crearImagenCarrusel(formData);
            setImagenes([...imagenes, nuevaImagenCreada]); // Actualiza la lista
            setNuevaImagen({ titulo: '', descripcion: '', imagen: null }); // Limpia el formulario
            toast.success('Imagen subida correctamente');
        } catch (error) {
            toast.error('Error al subir la imagen');
        }
    };

    const handleDelete = async (id) => {
        try {
            await eliminarImagenCarrusel(id);
            setImagenes(imagenes.filter((imagen) => imagen.id !== id));
            toast.success('Imagen eliminada correctamente');
        } catch (error) {
            toast.error('Error al eliminar la imagen');
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Gestión del Carrusel</h1>

            <form onSubmit={handleCreate} className="mb-6 bg-white p-4 rounded shadow-md">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Título</label>
                    <input
                        type="text"
                        className="mt-1 p-2 w-full border rounded"
                        placeholder="Título de la imagen"
                        value={nuevaImagen.titulo}
                        onChange={(e) => setNuevaImagen({ ...nuevaImagen, titulo: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Descripción</label>
                    <textarea
                        className="mt-1 p-2 w-full border rounded"
                        placeholder="Descripción de la imagen"
                        value={nuevaImagen.descripcion}
                        onChange={(e) => setNuevaImagen({ ...nuevaImagen, descripcion: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Imagen</label>
                    <input
                        type="file"
                        name="imagen"
                        className="mt-1"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                    Subir Imagen
                </button>
            </form>

            <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Título</th>
                        <th className="px-4 py-2">Descripción</th>
                        <th className="px-4 py-2">Imagen</th>
                        <th className="px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {imagenes.map((imagen) => (
                        <tr key={imagen.id} className="border-b hover:bg-gray-100">
                            <td className="px-4 py-2">{imagen.titulo}</td>
                            <td className="px-4 py-2">{imagen.descripcion}</td>
                            <td className="px-4 py-2">
                                {imagen.imagen ? (
                                    <img src={`http://localhost:5000${imagen.imagen}`} alt="Imagen" className="w-16 h-16" />
                                ) : (
                                    'Sin imagen'
                                )}
                            </td>
                            <td className="px-4 py-2">
                                <button
                                    onClick={() => handleDelete(imagen.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                >
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

export default Carrusel;
