// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple, faGooglePlay, faFacebook, faTwitter, faInstagram, faYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons';
import logo from './EDUCATV BLANCO.png';
import Portada from './pages/Portada';
import Noticias from './pages/Noticias';
import Videos from './pages/Videos';
import Programacion from './pages/Programacion';
import EnVivo from './pages/EnVivo';
import Deportes from './pages/Deportes';
import Articulos from './pages/Articulos';
import Contactos from './pages/Contactos';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const socialLinks = [
    { name: 'Facebook', url: 'https://facebook.com/educatv', icon: faFacebook, color: 'text-blue-600' },
    { name: 'Twitter', url: 'https://twitter.com/educatv', icon: faTwitter, color: 'text-blue-400' },
    { name: 'Instagram', url: 'https://instagram.com/educatv', icon: faInstagram, color: 'text-pink-600' },
    { name: 'YouTube', url: 'https://www.youtube.com/@EDUCATVPRODUCTORAAUDIOVISUAL', icon: faYoutube, color: 'text-red-600' },
    { name: 'TikTok', url: 'https://tiktok.com/@educatv', icon: faTiktok, color: 'text-black' }
  ];

  const handleSearch = () => {
    alert(`Buscando: ${searchTerm}`);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Main Header */}
        <header className="bg-[#d30000] text-white">
          <div className="border-b border-[#b30000] py-4">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center h-24">
                <Link to="/" className="text-4xl font-bold flex items-center">
                <img 
                  src={logo} 
                  alt="EducaTV Logo" 
                  className="h-20 w-auto object-contain mx-auto" 
                />
                </Link>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Buscar..."
                      className="bg-[#b30000] text-white px-4 py-3 rounded-full w-72 focus:outline-none focus:ring-2 focus:ring-[#d30000]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="absolute right-4 top-3.5 text-gray-400" onClick={handleSearch}>
                      Buscar
                    </button>
                  </div>
                  <button className="p-3 hover:bg-[#b30000] rounded-full" aria-label="Menu" onClick={toggleMenu}>
                    <span className="block w-7 h-0.5 bg-white mb-1"></span>
                    <span className="block w-7 h-0.5 bg-white mb-1"></span>
                    <span className="block w-7 h-0.5 bg-white"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="bg-[#b30000] text-white p-4">
              <Link to="/" className="block py-2">Inicio</Link>
              <Link to="/noticias" className="block py-2">Noticias</Link>
              <Link to="/videos" className="block py-2">Videos</Link>
              <Link to="/programacion" className="block py-2">Programación</Link>
              <Link to="/en-vivo" className="block py-2">En Vivo</Link>
              <Link to="/deportes" className="block py-2">Deportes</Link>
              <Link to="/articulos" className="block py-2">Artículos</Link>
              <Link to="/contactos" className="block py-2">Contactos</Link>
            </div>
          )}

          {/* Navigation Menu */}
          <nav className="bg-[#b30000]">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center h-14">
                <div className="flex space-x-6">
                  <Link to="/noticias" className="bg-red-700 text-white px-4 py-2 rounded-full text-md font-medium hover:bg-red-800 transition duration-300">Noticias</Link>
                  <Link to="/videos" className="bg-red-700 text-white px-4 py-2 rounded-full text-md font-medium hover:bg-red-800 transition duration-300">Videos</Link>
                  <Link to="/programacion" className="bg-red-700 text-white px-4 py-2 rounded-full text-md font-medium hover:bg-red-800 transition duration-300">Programación</Link>
                  <Link to="/en-vivo" className="bg-red-700 text-white px-4 py-2 rounded-full text-md font-medium hover:bg-red-800 transition duration-300">En Vivo</Link>
                  <Link to="/deportes" className="bg-red-700 text-white px-4 py-2 rounded-full text-md font-medium hover:bg-red-800 transition duration-300">Deportes</Link>
                  <Link to="/articulos" className="bg-red-700 text-white px-4 py-2 rounded-full text-md font-medium hover:bg-red-800 transition duration-300">Artículos</Link>
                  <Link to="/contactos" className="bg-red-700 text-white px-4 py-2 rounded-full text-md font-medium hover:bg-red-800 transition duration-300">Contactos</Link>
                </div>
                <button className="bg-red-800 text-white px-4 py-2 rounded-full text-md font-medium hover:bg-red-900 transition duration-300">
                  SEÑAL EN VIVO
                </button>
              </div>
            </div>
          </nav>
        </header>
        {/* Main Content */}
        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Portada />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/programacion" element={<Programacion />} />
            <Route path="/en-vivo" element={<EnVivo />} />
            <Route path="/deportes" element={<Deportes />} />
            <Route path="/articulos" element={<Articulos />} />
            <Route path="/contactos" element={<Contactos />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Contáctenos</h3>
                <div className="space-y-2 text-gray-400">
                  <p className="flex items-center">
                    <span className="mr-2">📍</span>
                    <span>Urb. La Unión calle. Florida N° 155, Puno</span>
                  </p>
                  <p className="flex items-center">
                    <span className="mr-2">📞</span>
                    <span>(51) 967211538</span>
                  </p>
                  <p className="flex items-center">
                    <span className="mr-2">📧</span>
                    <a href="mailto:contact@educatv.com" className="hover:text-white">
                    corporacioneducatv@gmail.com 
                    </a>
                  </p>
                </div>
              </div>

              {/* More Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Más información</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link to="/institucional" className="hover:text-white transition-colors">
                      Información institucional
                    </Link>
                  </li>
                  <li>
                    <Link to="/comercial" className="hover:text-white transition-colors">
                      Área comercial
                    </Link>
                  </li>
                  <li>
                    <Link to="/terminos" className="hover:text-white transition-colors">
                      Términos y condiciones
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
                <div className="flex space-x-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-8 h-8 ${social.color} rounded-full flex items-center justify-center transition-colors`}
                      aria-label={social.name}
                    >
                      <FontAwesomeIcon icon={social.icon} size="2x" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Mobile App */}
              <div>
                <h3 className="text-lg font-semibold mb-4">EducaTV en tu móvil</h3>
                <div className="flex flex-col space-y-3">
                  <a 
                    href="https://apps.apple.com/app/educatv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gradient-to-b from-gray-800 to-black text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity border border-gray-700"
                    style={{ minWidth: '160px' }}
                  >
                    <FontAwesomeIcon icon={faApple} size="2x" />
                    <div className="flex flex-col leading-tight">
                      <span className="text-xs">Download on the</span>
                      <span className="text-xl font-semibold -mt-1">App Store</span>
                    </div>
                  </a>

                  <a 
                    href="https://play.google.com/store/apps/details?id=com.educatv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity border border-gray-700"
                    style={{ minWidth: '160px' }}
                  >
                    <div className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-lg p-1">
                      <FontAwesomeIcon icon={faGooglePlay} size="lg" />
                    </div>
                    <div className="flex flex-col leading-tight">
                      <span className="text-xs">GET IT ON</span>
                      <span className="text-xl font-semibold -mt-1">Google Play</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
              <p>© {new Date().getFullYear()} EducaTV - Todos los derechos reservados | Alexander Hielsin Quispe Quispe</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
