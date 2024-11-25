// src/components/Navbar.js
import React from 'react';
import { Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    return (
        <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md">
            <button onClick={toggleSidebar} className="lg:hidden text-gray-800 dark:text-white">
                <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">EducaTV Dashboard</h1>
            <button onClick={handleLogout} className="text-gray-800 dark:text-white">
                Cerrar Sesión
            </button>
        </header>
    );
};

export default Navbar;
