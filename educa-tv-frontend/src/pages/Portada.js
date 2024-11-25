import React, { useEffect, useState } from 'react';
import Carrusel from '../components/Carrusel';
import { obtenerNoticias } from '../services/noticiasService';
import { obtenerVideos } from '../services/videosService';
import { obtenerDeportes } from '../services/deportesService';
import { obtenerProgramacion } from '../services/programacionService';

function Portada() {
    const [noticias, setNoticias] = useState([]);
    const [videos, setVideos] = useState([]);
    const [deportes, setDeportes] = useState([]);
    const [programacion, setProgramacion] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const noticiasData = await obtenerNoticias();
            const videosData = await obtenerVideos();
            const deportesData = await obtenerDeportes();
            const programacionData = await obtenerProgramacion();

            setNoticias(noticiasData);
            setVideos(videosData);
            setDeportes(deportesData);
            setProgramacion(programacionData);
        };
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-[#d30000] text-white flex flex-col items-center">
            <Carrusel />
            <div className="container mx-auto px-4 py-12 text-center">
                <h1 className="text-5xl font-bold mb-8">Bienvenido a EducaTV</h1>
                <p className="text-lg mb-12">Explora nuestras secciones</p>
                {/* Sección de Noticias Destacadas */}
                <div className="bg-white text-[#d30000] p-8 rounded-lg shadow-md mb-12">
                    <h2 className="text-3xl font-bold mb-6">Noticias Destacadas</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

                {/* Sección de Programación Destacada */}
                <div className="bg-white text-[#d30000] p-8 rounded-lg shadow-md mb-12">
                    <h2 className="text-3xl font-bold mb-6">Programación Destacada</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {programacion.map((programa) => (
                            <div
                                key={programa.id}
                                className="relative bg-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                                style={{
                                    backgroundImage: `url(http://localhost:5000${programa.imagen})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    height: '200px',
                                }}
                            >
                                <div className="absolute inset-0 bg-black bg-opacity-50 p-4 flex flex-col justify-between">
                                    <h3 className="text-white font-bold text-lg mb-2">{programa.titulo}</h3>
                                    <p className="text-white text-sm">{programa.descripcion}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sección de Videos Destacados */}
                <div className="bg-white text-[#d30000] p-8 rounded-lg shadow-md mb-12">
                    <h2 className="text-3xl font-bold mb-6">Videos Destacados</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {videos.map((video) => (
                            <div
                                key={video.id}
                                className="relative bg-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                            >
                                <div className="absolute inset-0 bg-black bg-opacity-50 p-4 flex flex-col justify-between">
                                    <h3 className="text-white font-bold text-lg mb-2">{video.titulo}</h3>
                                    <p className="text-white text-sm">{video.descripcion}</p>
                                </div>
                                {video.video ? (
                                    <video
                                        controls
                                        className="w-full h-full object-cover"
                                    >
                                        <source src={`http://localhost:5000${video.video}`} type="video/mp4" />
                                        Tu navegador no soporta videos HTML5.
                                    </video>
                                ) : (
                                    <p className="text-gray-500 italic p-4">Sin video disponible</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sección de Deportes Destacados */}
                <div className="bg-white text-[#d30000] p-8 rounded-lg shadow-md mb-12">
                    <h2 className="text-3xl font-bold mb-6">Deportes Destacados</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            </div>
        </div>
    );
}

export default Portada;
