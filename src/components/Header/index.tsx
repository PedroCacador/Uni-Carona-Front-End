import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from './NavLink';
import { MobileMenu } from './MobileMenu';

export const Header: React.FC = () => {
  const userEmail = localStorage.getItem('userEmail');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('user');
    window.location.href = '/';
  };
  return (
    <div className="fixed top-6 left-0 right-0 px-4 z-50 pointer-events-none">
      <header className="max-w-[1280px] mx-auto bg-white/90 backdrop-blur-md border border-white/20 shadow-premium rounded-[32px] px-6 md:px-10 h-16 md:h-20 flex items-center justify-between pointer-events-auto">
        
        {/* Lado Esquerdo: Logo */}
        <Link to="/" className="flex items-center group">
          <span className="text-xl md:text-2xl font-bold text-primary tracking-tight transition-transform group-hover:scale-[1.02]">
            UniCarona
          </span>
          {/* Detalhe sutil em amarelo */}
          <div className="w-1.5 h-1.5 rounded-full bg-accent ml-1 mt-1 animate-pulse" />
        </Link>

        {/* Centro: Navegação Desktop */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12">
          <NavLink to="/servicos">Serviços</NavLink>
          <NavLink to="/caronas">Caronas</NavLink>
          <NavLink to="/sobre">Sobre nós</NavLink>
          <NavLink to="/seguranca">Segurança</NavLink>
        </nav>

        {/* Lado Direito: CTA & Mobile Menu */}
        <div className="flex items-center gap-4">
          {userEmail ? (
            <div className="hidden sm:flex items-center gap-4">
              <Link to="/perfil" className="text-[14px] font-medium text-slate-600 border-r border-slate-200 pr-4 hover:text-[#0A44B1] transition-colors">
                {userEmail}
              </Link>
              <button 
                onClick={handleLogout}
                className="text-[14px] font-semibold text-red-500 hover:text-red-600 transition-colors"
              >
                Sair
              </button>
            </div>
          ) : (
            <Link 
              to="/cadastro" 
              className="hidden sm:inline-flex items-center justify-center bg-primary text-white px-6 md:px-8 py-2.5 md:py-3 rounded-2xl font-semibold text-[15px] transition-all duration-300 hover:bg-primary-hover hover:scale-[1.03] hover:shadow-xl hover:shadow-primary/20 active:scale-95"
            >
              Primeira viagem
            </Link>
          )}
          
          <MobileMenu />
        </div>
      </header>
    </div>

  );
};
