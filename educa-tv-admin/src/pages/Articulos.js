import React, { useEffect, useState } from 'react';
import { obtenerArticulos, crearArticulo, actualizarArticulo, eliminarArticulo } from '../services/articulosService';
import { toast } from 'react-toastify';

function Articulos() {
    const [articulos, setArticulos] = useState([]);
    const [nuevoArticulo, setNuevoArticulo] = useState({ titulo: '', descripcion: '', autor: '', fecha: '', imagen: null });
    const [editandoArticulo, setEditandoArticulo] = useState(null);

    useEffect(() => {
        const fetchArticulos = async () => {
            const data = await obtenerArticulos();
            setArticulos(data);
        };
        fetchArticulos();
    }, []);

    const handleDelete = async (id) => {
        try {
            await eliminarArticulo(id);
            setArticulos(articulos.filter((articulo) => articulo.id !== id));
            toast.success('Artículo eliminado correctamente');
        } catch (error) {
            toast.error('Error al eliminar el artículo');
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('titulo', nuevoArticulo.titulo);
            formData.append('descripcion', nuevoArticulo.descripcion);
            formData.append('autor', nuevoArticulo.autor);
            formData.append('fecha', nuevoArticulo.fecha);
            if (nuevoArticulo.imagen) {
                formData.append('imagen', nuevoArticulo.imagen);
            }
            const articuloCreado = await crearArticulo(formData);
            setArticulos([...articulos, articuloCreado]);
            setNuevoArticulo({ titulo: '', descripcion: '', autor: '', fecha: '', imagen: null });
            toast.success('Artículo creado correctamente');
        } catch (error) {
            toast.error('Error al crear el artículo');
        }
    };

    const handleEdit = (articulo) => {
        setEditandoArticulo(articulo);
        setNuevoArticulo(articulo);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('titulo', nuevoArticulo.titulo);
            formData.append('descripcion', nuevoArticulo.descripcion);
            formData.append('autor', nuevoArticulo.autor);
            formData.append('fecha', nuevoArticulo.fecha);
            if (nuevoArticulo.imagen) {
                formData.append('imagen', nuevoArticulo.imagen);
            }
            const articuloActualizado = await actualizarArticulo(editandoArticulo.id, formData);
            setArticulos(articulos.map((articulo) => (articulo.id === articuloActualizado.id ? articuloActualizado : articulo)));
            setEditandoArticulo(null);
            setNuevoArticulo({ titulo: '', descripcion: '', autor: '', fecha: '', imagen: null });
            toast.success('Artículo actualizado correctamente');
        } catch (error) {
            toast.error('Error al actualizar el artículo');
        }
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setNuevoArticulo({ ...nuevoArticulo, [name]: files[0] });
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Gestión de Artículos</h1>
            
            <form onSubmit={editandoArticulo ? handleUpdate : handleCreate} className="mb-6 bg-white p-4 rounded shadow-md">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Título</label>
                    <input
                        type="text"
                        className="mt-1 p-2 w-full border rounded"
                        placeholder="Título del artículo"
                        value={nuevoArticulo.titulo}
                        onChange={(e) => setNuevoArticulo({ ...nuevoArticulo, titulo: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Descripción</label>
                    <textarea
                        className="mt-1 p-2 w-full border rounded"
                        placeholder="Descripción del artículo"
                        value={nuevoArticulo.descripcion}
                        onChange={(e) => setNuevoArticulo({ ...nuevoArticulo, descripcion: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Autor</label>
                    <input
                        type="text"
                        className="mt-1 p-2 w-full border rounded"
                        placeholder="Autor del artículo"
                        value={nuevoArticulo.autor}
                        onChange={(e) => setNuevoArticulo({ ...nuevoArticulo, autor: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Fecha</label>
                    <input
                        type="date"
                        className="mt-1 p-2 w-full border rounded"
                        value={nuevoArticulo.fecha}
                        onChange={(e) => setNuevoArticulo({ ...nuevoArticulo, fecha: e.target.value })}
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
                    {editandoArticulo ? 'Actualizar Artículo' : 'Crear Artículo'}
                </button>
            </form>

            <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Título</th>
                        <th className="px-4 py-2">Descripción</th>
                        <th className="px-4 py-2">Autor</th>
                        <th className="px-4 py-2">Fecha</th>
                        <th className="px-4 py-2">Imagen</th>
                        <th className="px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {articulos.map((articulo) => (
                        <tr key={articulo.id} className="border-b hover:bg-gray-100">
                            <td className="px-4 py-2">{articulo.titulo}</td>
                            <td className="px-4 py-2">{articulo.descripcion}</td>
                            <td className="px-4 py-2">{articulo.autor}</td>
                            <td className="px-4 py-2">{articulo.fecha}</td>
                            <td className="px-4 py-2">
                                {articulo.imagen ? (
                                    <img src={`http://localhost:5000${articulo.imagen}`} alt="Imagen" className="w-16 h-16"/>
                                ) : (
                                    'Sin imagen'
                                )}
                            </td>
                            <td className="px-4 py-2">
                                <button onClick={() => handleEdit(articulo)} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">Editar</button>
                                <button onClick={() => handleDelete(articulo.id)} className="bg-red-500 text-white px-3 py-1 rounded">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Articulos;
