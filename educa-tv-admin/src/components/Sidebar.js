// src/components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Newspaper, Video, Calendar, Radio, Activity, FileText, Users } from 'lucide-react';

const routes = [
    { path: '/', name: 'Inicio', icon: Home },
    { path: '/noticias', name: 'Noticias', icon: Newspaper },
    { path: '/videos', name: 'Videos', icon: Video },
    { path: '/programacion', name: 'Programación', icon: Calendar },
    { path: '/en-vivo', name: 'En Vivo', icon: Radio },
    { path: '/deportes', name: 'Deportes', icon: Activity },
    { path: '/articulos', name: 'Artículos', icon: FileText },
    { path: '/contactos', name: 'Contactos', icon: Users },
    { path: '/carrusel', name: 'Carrusel', icon: Users },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <aside
            className={`fixed inset-y-0 left-0 w-64 bg-blue-800 dark:bg-gray-900 text-white transform ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            } transition-transform lg:relative lg:translate-x-0 lg:block p-4`}
        >
            <div className="text-2xl font-bold mb-6">
                <span className="text-white">Educa</span>TV
            </div>
            <nav className="space-y-4">
                {routes.map((route) => (
                    <NavLink
                        key={route.path}
                        to={route.path}
                        onClick={toggleSidebar}
                        className={({ isActive }) =>
                            `flex items-center px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-gray-700 ${
                                isActive ? 'bg-blue-700 dark:bg-gray-700' : 'bg-transparent'
                            }`
                        }
                    >
                        <route.icon className="h-5 w-5 mr-3" />
                        <span>{route.name}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
