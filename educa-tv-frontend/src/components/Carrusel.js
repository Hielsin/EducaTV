import React, { useEffect, useState } from 'react';
import { obtenerImagenesCarrusel } from '../services/carruselService';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Carrusel() {
  const [imagenes, setImagenes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImagenes = async () => {
      try {
        const data = await obtenerImagenesCarrusel();
        setImagenes(data);
      } catch (error) {
        console.error('Error al cargar las imágenes del carrusel:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImagenes();
  }, []);

  useEffect(() => {
    if (imagenes.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === imagenes.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [imagenes.length]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === imagenes.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? imagenes.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  if (isLoading) {
    return (
      <div className="w-full bg-gray-800 h-[500px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (imagenes.length === 0) {
    return (
      <div className="w-full bg-gray-800 h-[500px] flex items-center justify-center">
        <p className="text-xl text-gray-400">No hay contenido destacado disponible.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-800">
      <div className="max-w-[2000px] mx-auto px-4 py-8">
        <h2 className="text-4xl font-bold mb-8 text-white text-center">
          Contenido Destacado
        </h2>
        
        <div className="relative h-[500px] overflow-hidden rounded-lg">
          {/* Contenedor principal con efecto de transición */}
          <div 
            className="absolute w-full h-full flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {imagenes.map((imagen) => (
              <div
                key={imagen.id}
                className="w-full h-full flex-shrink-0"
                style={{ flex: '0 0 100%' }}
              >
                <div className="relative w-full h-full overflow-hidden group">
                  <img
                    src={`http://localhost:5000${imagen.imagen}`}
                    alt={imagen.titulo}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/1920x1080?text=Imagen+no+disponible';
                    }}
                  />
                  {/* Overlay con gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 transform transition-transform duration-300">
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {imagen.titulo}
                      </h3>
                      <p className="text-gray-200 text-lg md:text-xl max-w-3xl">
                        {imagen.descripcion}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Botones de navegación más grandes */}
          <button 
            onClick={goToPrevious}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 md:p-4 rounded-full transition-colors duration-300 z-10"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          
          <button 
            onClick={goToNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 md:p-4 rounded-full transition-colors duration-300 z-10"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Indicadores de posición más grandes */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
            {imagenes.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-4 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? 'bg-white w-8' 
                    : 'bg-white/50 hover:bg-white/75 w-4'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carrusel;