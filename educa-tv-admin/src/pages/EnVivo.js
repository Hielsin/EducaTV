// src/pages/EnVivo.js
import React, { useEffect, useState } from 'react';
import { obtenerEnVivo, crearEnVivo, actualizarEnVivo, eliminarEnVivo } from '../services/enVivoService';
import { toast } from 'react-toastify';

function EnVivo() {
    const [enVivo, setEnVivo] = useState([]);
    const [nuevoEnVivo, setNuevoEnVivo] = useState({ titulo: '', url: '', estado: 'inactivo' });

    useEffect(() => {
        const fetchEnVivo = async () => {
            const data = await obtenerEnVivo();
            setEnVivo(data);
        };
        fetchEnVivo();
    }, []);

    const handleDelete = async (id) => {
        try {
            await eliminarEnVivo(id);
            setEnVivo(enVivo.filter((stream) => stream.id !== id));
            toast.success('Transmisión eliminada correctamente');
        } catch (error) {
            toast.error('Error al eliminar la transmisión');
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const nuevoStream = await crearEnVivo(nuevoEnVivo);
            setEnVivo([...enVivo, nuevoStream]);
            setNuevoEnVivo({ titulo: '', url: '', estado: 'inactivo' });
            toast.success('Transmisión creada correctamente');
        } catch (error) {
            toast.error('Error al crear la transmisión');
        }
    };

    return (
        <div>
            <h1>Gestión de Transmisiones en Vivo</h1>
            <form onSubmit={handleCreate}>
                <input type="text" placeholder="Título" value={nuevoEnVivo.titulo} onChange={(e) => setNuevoEnVivo({ ...nuevoEnVivo, titulo: e.target.value })} />
                <input type="text" placeholder="URL" value={nuevoEnVivo.url} onChange={(e) => setNuevoEnVivo({ ...nuevoEnVivo, url: e.target.value })} />
                <select value={nuevoEnVivo.estado} onChange={(e) => setNuevoEnVivo({ ...nuevoEnVivo, estado: e.target.value })}>
                    <option value="inactivo">Inactivo</option>
                    <option value="activo">Activo</option>
                </select>
                <button type="submit">Crear Transmisión</button>
            </form>
            <ul>
                {enVivo.map((stream) => (
                    <li key={stream.id}>
                        <h2>{stream.titulo}</h2>
                        <a href={stream.url} target="_blank" rel="noopener noreferrer">Ver en Vivo</a>
                        <p>Estado: {stream.estado}</p>
                        <button onClick={() => handleDelete(stream.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EnVivo;
