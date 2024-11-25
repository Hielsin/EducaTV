// src/pages/Programacion.js
import React, { useEffect, useState } from 'react';
import { obtenerProgramacion, crearProgramacion, actualizarProgramacion, eliminarProgramacion } from '../services/programacionService';
import { toast } from 'react-toastify';

function Programacion() {
    const [programacion, setProgramacion] = useState([]);
    const [nuevaProgramacion, setNuevaProgramacion] = useState({
        titulo: '',
        descripcion: '',
        fecha: '',
        hora_inicio: '',
        hora_fin: '',
        categoria: '',
        imagen: null
    });
    const [editandoProgramacion, setEditandoProgramacion] = useState(null);

    useEffect(() => {
        const fetchProgramacion = async () => {
            const data = await obtenerProgramacion();
            setProgramacion(data);
        };
        fetchProgramacion();
    }, []);

    const handleDelete = async (id) => {
        try {
            await eliminarProgramacion(id);
            setProgramacion(programacion.filter((item) => item.id !== id));
            toast.success('Programación eliminada correctamente');
        } catch (error) {
            toast.error('Error al eliminar la programación');
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            Object.keys(nuevaProgramacion).forEach((key) => {
                formData.append(key, nuevaProgramacion[key]);
            });

            const nuevaProgramacionCreada = await crearProgramacion(formData);
            setProgramacion([...programacion, nuevaProgramacionCreada]);
            setNuevaProgramacion({
                titulo: '',
                descripcion: '',
                fecha: '',
                hora_inicio: '',
                hora_fin: '',
                categoria: '',
                imagen: null
            });
            toast.success('Programación creada correctamente');
        } catch (error) {
            toast.error('Error al crear la programación');
        }
    };

    const handleEdit = (programacionItem) => {
        setEditandoProgramacion(programacionItem);
        setNuevaProgramacion(programacionItem);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            Object.keys(nuevaProgramacion).forEach((key) => {
                formData.append(key, nuevaProgramacion[key]);
            });

            const programacionActualizada = await actualizarProgramacion(editandoProgramacion.id, formData);
            setProgramacion(programacion.map((item) =>
                item.id === programacionActualizada.id ? programacionActualizada : item
            ));
            setEditandoProgramacion(null);
            setNuevaProgramacion({
                titulo: '',
                descripcion: '',
                fecha: '',
                hora_inicio: '',
                hora_fin: '',
                categoria: '',
                imagen: null
            });
            toast.success('Programación actualizada correctamente');
        } catch (error) {
            toast.error('Error al actualizar la programación');
        }
    };

    const handleFileChange = (e) => {
        setNuevaProgramacion({ ...nuevaProgramacion, imagen: e.target.files[0] });
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Gestión de Programación</h1>

            <form onSubmit={editandoProgramacion ? handleUpdate : handleCreate} className="mb-6 bg-white p-4 rounded shadow-md">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Título</label>
                    <input
                        type="text"
                        className="mt-1 p-2 w-full border rounded"
                        placeholder="Título del programa"
                        value={nuevaProgramacion.titulo}
                        onChange={(e) => setNuevaProgramacion({ ...nuevaProgramacion, titulo: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Descripción</label>
                    <textarea
                        className="mt-1 p-2 w-full border rounded"
                        placeholder="Descripción del programa"
                        value={nuevaProgramacion.descripcion}
                        onChange={(e) => setNuevaProgramacion({ ...nuevaProgramacion, descripcion: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Fecha</label>
                    <input
                        type="date"
                        className="mt-1 p-2 w-full border rounded"
                        value={nuevaProgramacion.fecha}
                        onChange={(e) => setNuevaProgramacion({ ...nuevaProgramacion, fecha: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Hora Inicio</label>
                    <input
                        type="time"
                        className="mt-1 p-2 w-full border rounded"
                        value={nuevaProgramacion.hora_inicio}
                        onChange={(e) => setNuevaProgramacion({ ...nuevaProgramacion, hora_inicio: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Hora Fin</label>
                    <input
                        type="time"
                        className="mt-1 p-2 w-full border rounded"
                        value={nuevaProgramacion.hora_fin}
                        onChange={(e) => setNuevaProgramacion({ ...nuevaProgramacion, hora_fin: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Categoría</label>
                    <input
                        type="text"
                        className="mt-1 p-2 w-full border rounded"
                        placeholder="Categoría del programa"
                        value={nuevaProgramacion.categoria}
                        onChange={(e) => setNuevaProgramacion({ ...nuevaProgramacion, categoria: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Imagen</label>
                    <input
                        type="file"
                        className="mt-1"
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                    {editandoProgramacion ? 'Actualizar Programación' : 'Crear Programación'}
                </button>
            </form>

            <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
                <thead>
                    <tr>
                        <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                        <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                        <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                        <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora Inicio</th>
                        <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora Fin</th>
                        <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                        <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imagen</th>
                        <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {programacion.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-gray-100">
                            <td className="px-4 py-2 text-sm font-medium text-gray-700">{item.titulo}</td>
                            <td className="px-4 py-2 text-sm text-gray-600">{item.descripcion}</td>
                            <td className="px-4 py-2 text-sm text-gray-600">{item.fecha}</td>
                            <td className="px-4 py-2 text-sm text-gray-600">{item.hora_inicio}</td>
                            <td className="px-4 py-2 text-sm text-gray-600">{item.hora_fin}</td>
                            <td className="px-4 py-2 text-sm text-gray-600">{item.categoria}</td>
                            <td className="px-4 py-2 text-sm text-gray-600">
                                {item.imagen ? (
                                    <img src={`http://localhost:5000${item.imagen}`} alt={item.titulo} className="h-16 w-16 object-cover"/>
                                ) : (
                                    'Sin imagen'
                                )}
                            </td>
                            <td className="px-4 py-2 text-sm">
                                <button onClick={() => handleEdit(item)} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600">
                                    Editar
                                </button>
                                <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
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

export default Programacion;
