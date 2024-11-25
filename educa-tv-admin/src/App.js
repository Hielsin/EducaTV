// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Noticias from './pages/Noticias';
import Videos from './pages/Videos';
import Programacion from './pages/Programacion';
import EnVivo from './pages/EnVivo';
import Deportes from './pages/Deportes';
import Articulos from './pages/Articulos';
import Contactos from './pages/Contactos';
import Carrusel from './pages/Carrusel';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <Router>
            <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
                {/* Sidebar */}
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    {/* Navbar */}
                    <Navbar toggleSidebar={toggleSidebar} />

                    {/* Page Content */}
                    <main className="flex-1 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mx-4 my-4">
                        <Routes>
                            {/* Ruta pública */}
                            <Route path="/login" element={<Login />} />

                            {/* Rutas protegidas */}
                            <Route
                                path="/"
                                element={
                                    <ProtectedRoute>
                                        <DashboardWelcome />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/noticias"
                                element={
                                    <ProtectedRoute>
                                        <Noticias />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/videos"
                                element={
                                    <ProtectedRoute>
                                        <Videos />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/programacion"
                                element={
                                    <ProtectedRoute>
                                        <Programacion />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/en-vivo"
                                element={
                                    <ProtectedRoute>
                                        <EnVivo />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/deportes"
                                element={
                                    <ProtectedRoute>
                                        <Deportes />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/articulos"
                                element={
                                    <ProtectedRoute>
                                        <Articulos />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/contactos"
                                element={
                                    <ProtectedRoute>
                                        <Contactos />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/carrusel"
                                element={
                                    <ProtectedRoute>
                                        <Carrusel />
                                    </ProtectedRoute>
                                }
                            />
                            <Route path="*" element={<Navigate to="/login" />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    );
}

const DashboardWelcome = () => (
    <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Bienvenido al Dashboard de EducaTV</h2>
        <p className="text-gray-600 dark:text-gray-300">
            Selecciona una opción del menú para comenzar.
        </p>
    </div>
);

export default App;
