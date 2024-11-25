import React, { useEffect, useState } from 'react';
import { obtenerProgramacion } from '../services/programacionService';

function Programacion() {
  const [programacion, setProgramacion] = useState([]);

  useEffect(() => {
    const fetchProgramacion = async () => {
      const data = await obtenerProgramacion();
      setProgramacion(data);
    };
    fetchProgramacion();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">EducaTV Programación</h1>
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
              <h2 className="text-white font-bold text-lg mb-2">{programa.titulo}</h2>
              <p className="text-white text-sm">{programa.descripcion}</p>
              <p className="text-gray-300 text-xs mt-2">Fecha: {programa.fecha}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Programacion;
