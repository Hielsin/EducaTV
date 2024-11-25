import React, { useEffect, useState } from 'react';
import { obtenerVideos } from '../services/videosService';

function Videos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const data = await obtenerVideos();
      setVideos(data);
    };
    fetchVideos();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">EducaTV Videos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
  );
}

export default Videos;
