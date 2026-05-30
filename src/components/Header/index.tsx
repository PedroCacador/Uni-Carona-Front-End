import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from './NavLink';
import { MobileMenu } from './MobileMenu';
import { useAuth } from '../../contexts/AuthContext';

export const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };
  return (
    <div className="fixed top-6 left-0 right-0 px-4 z-50 pointer-events-none">
      <header className="max-w-[1280px] mx-auto bg-white/90 backdrop-blur-md border border-white/20 shadow-premium rounded-[32px] px-6 md:px-10 h-16 md:h-20 flex items-center justify-between pointer-events-auto">
        
        {}
        <Link to="/" className="flex items-center group">
          <span className="text-xl md:text-2xl font-bold text-primary tracking-tight transition-transform group-hover:scale-[1.02]">
            UniCarona
          </span>
          {}
          <div className="w-1.5 h-1.5 rounded-full bg-accent ml-1 mt-1 animate-pulse" />
        </Link>

        {}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12">
          <NavLink to="/servicos">Serviços</NavLink>
          <NavLink to="/caronas">Caronas</NavLink>
          <NavLink to="/sobre">Sobre nós</NavLink>
          <NavLink to="/seguranca">Segurança</NavLink>
        </nav>

        {}
        <div className="flex items-center gap-4">
          {isAuthenticated && user ? (
            <div className="hidden sm:flex items-center gap-3">
              <Link to="/perfil" className="flex items-center gap-2 text-[14px] font-medium text-slate-600 hover:text-[#0A44B1] transition-colors no-underline">
                <div className="w-8 h-8 rounded-full bg-[#0A44B1]/10 flex items-center justify-center text-[#0A44B1] text-[11px] font-extrabold">
                  {user.nome.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()}
                </div>
                <span className="max-w-[140px] truncate">{user.nome.split(' ')[0]}</span>
              </Link>
              <div className="w-px h-6 bg-slate-200" />
              <button 
                onClick={handleLogout}
                className="text-[13px] font-semibold text-red-500 hover:text-red-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50"
              >
                Sair
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <Link
                to="/login"
                className="inline-flex items-center justify-center text-slate-600 hover:text-primary font-semibold text-[15px] px-2 py-2.5 transition-colors"
              >
                Entrar
              </Link>
              <Link 
                to="/cadastro" 
                className="inline-flex items-center justify-center bg-primary text-white px-6 md:px-8 py-2.5 md:py-3 rounded-2xl font-semibold text-[15px] transition-all duration-300 hover:bg-primary-hover hover:scale-[1.03] hover:shadow-xl hover:shadow-primary/20 active:scale-95"
              >
                Primeira viagem
              </Link>
            </div>
          )}
          
          <MobileMenu />
        </div>
      </header>
    </div>
  );
};
