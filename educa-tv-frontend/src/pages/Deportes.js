import React, { useEffect, useState } from 'react';
import { obtenerDeportes } from '../services/deportesService';

function Deportes() {
    const [deportes, setDeportes] = useState([]);

    useEffect(() => {
        const fetchDeportes = async () => {
            const data = await obtenerDeportes();
            console.log(data); // Verifica si `imagen` contiene la URL correcta
            setDeportes(data);
        };
        fetchDeportes();
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">EducaTV Deportes</h1>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {deportes.map((deporte) => (
                <div
                    key={deporte.id}
                    className="relative bg-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                    style={{
                        backgroundImage: `url(http://localhost:5000${deporte.imagen})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '200px',
                    }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-50 p-4 flex flex-col justify-between">
                        <h3 className="text-white font-bold text-lg mb-2">{deporte.titulo}</h3>
                        <p className="text-white text-sm">{deporte.contenido}</p>
                        <p className="text-gray-300 text-xs mt-2">Categoría: {deporte.categoria}</p>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
}

export default Deportes;
