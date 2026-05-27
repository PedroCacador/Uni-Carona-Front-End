import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

export const NavLink: React.FC<NavLinkProps> = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`
        relative px-1 py-2 text-[15px] font-medium transition-colors duration-300
        ${isActive ? 'text-primary' : 'text-slate-500 hover:text-primary'}
        after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300
        ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'}
      `}
    >
      {children}
    </Link>
  );
};
