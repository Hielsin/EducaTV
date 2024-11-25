// src/pages/Contactos.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { MapPin, Phone, Mail } from 'lucide-react';

function Contactos() {
  const socialLinks = [
    { name: 'Facebook', url: 'https://facebook.com/educatv', icon: faFacebook, color: 'text-blue-600' },
    { name: 'Twitter', url: 'https://twitter.com/educatv', icon: faTwitter, color: 'text-blue-400' },
    { name: 'Instagram', url: 'https://instagram.com/educatv', icon: faInstagram, color: 'text-pink-600' },
    { name: 'YouTube', url: 'https://youtube.com/educatv', icon: faYoutube, color: 'text-red-600' },
    { name: 'TikTok', url: 'https://tiktok.com/@educatv', icon: faTiktok, color: 'text-black' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Mensaje enviado con éxito');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        {/* Mapa Section */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-8 transition-all duration-300 hover:shadow-xl">
          <div className="p-6 bg-white border-b">
            <h2 className="text-2xl font-bold text-gray-800">Nuestra Ubicación</h2>
            <p className="text-gray-600 mt-1">Visítanos en nuestras instalaciones</p>
          </div>
          <iframe
            title="Ubicación de EducaTV"
            className="w-full h-96"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3838.4565326360844!2d-70.01943059999999!3d-15.832585100000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915d69bc337f93ad%3A0xcd77de93567aa800!2sFlorida%20155%2C%20Puno%2021001!5e0!3m2!1ses!2spe!4v1731784468117!5m2!1ses!2spe"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario */}
          <div className="lg:col-span-2 bg-white shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Envíanos tus comentarios</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Nombres y apellidos *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Tu nombre completo"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Tu correo electrónico"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Asunto *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Motivo del mensaje"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Mensaje *
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 min-h-[120px]"
                  placeholder="Escribe tu mensaje aquí"
                  required
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border border-gray-300 rounded focus:ring-blue-500"
                  required
                />
                <label className="ml-2 text-gray-700">
                  No soy un robot
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Enviar mensaje
              </button>
            </form>
          </div>

          {/* Información de Contacto */}
          <div className="bg-white shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-xl">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Datos de contacto</h2>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-600" />
                <p>Florida N° 155, Puno</p>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-gray-600" />
                <p>(51) 967211538</p>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-gray-600" />
                <a href="mailto:corporacioneducatv@gmail.com" className="text-blue-600 hover:underline">
                  corporacioneducatv@gmail.com
                </a>
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-800 mt-6 mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={social.icon} className={`w-5 h-5 ${social.color}`} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contactos;
