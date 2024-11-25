// src/pages/Noticias.js
import React, { useEffect, useState } from 'react';
import { obtenerNoticias } from '../services/noticiasService';

function Noticias() {
    const [noticias, setNoticias] = useState([]);

    useEffect(() => {
        const fetchNoticias = async () => {
            const data = await obtenerNoticias();
            console.log(data); // Verifica aquí si `portada` contiene el nombre correcto de la imagen
            setNoticias(data);
        };
        fetchNoticias();
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">EducaTV Noticias</h1>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {noticias.map((noticia) => (
            <div
                key={noticia.id}
                className="relative bg-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                style={{
                    backgroundImage: `url(http://localhost:5000${noticia.portada})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '200px',
                }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50 p-4 flex flex-col justify-between">
                    <h3 className="text-white font-bold text-lg mb-2">{noticia.titulo}</h3>
                    <p className="text-white text-sm">{noticia.contenido}</p>
                    <p className="text-gray-300 text-xs mt-2">Categoría: {noticia.categoria}</p>
                </div>
            </div>
                ))}
            </div>
        </div>
    );
}

export default Noticias;
