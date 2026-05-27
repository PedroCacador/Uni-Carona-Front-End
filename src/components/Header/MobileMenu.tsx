import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

export const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { label: 'Serviços', path: '/servicos' },
    { label: 'Caronas', path: '/caronas' },
    { label: 'Sobre nós', path: '/sobre' },
    { label: 'Segurança', path: '/seguranca' },
  ];

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="p-2 text-slate-600 hover:text-primary transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {isOpen && (
        <div className="absolute top-20 left-4 right-4 bg-white rounded-2xl shadow-premium border border-slate-100 p-6 flex flex-col gap-4 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-slate-600 hover:text-primary transition-colors py-2 border-b border-slate-50 last:border-0"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/cadastro"
            onClick={() => setIsOpen(false)}
            className="mt-2 w-full bg-primary text-white py-3 rounded-xl font-semibold text-center hover:bg-primary-hover transition-all active:scale-95 shadow-lg shadow-primary/20"
          >
            Primeira viagem
          </Link>
        </div>
      )}
    </div>
  );
};
