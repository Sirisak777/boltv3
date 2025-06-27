import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';
import { ThemeContext } from '../../contexts/ThemeContext';

const Layout: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`min-h-screen ${
        theme === 'dark'
          ? 'bg-gray-900'
          : 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 text-gray-900'
      }`}
    >
      <Header />
      <div className="flex">
        <Navigation />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
