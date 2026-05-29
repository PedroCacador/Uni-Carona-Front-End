import React from 'react';
import { Link } from 'react-router-dom';
import { FiShield, FiLock, FiCheckCircle } from 'react-icons/fi';
import type { IconType } from 'react-icons';

export interface BrandingHighlight {
  icon: IconType;
  text: string;
}

interface AuthBrandingPanelProps {
  badge: string;
  title: React.ReactNode;
  subtitle: string;
  highlights?: BrandingHighlight[];
  footerNote?: string;
}

const defaultHighlights: BrandingHighlight[] = [
  { icon: FiShield, text: 'Recuperação 100% segura' },
  { icon: FiLock, text: 'Seus dados sempre protegidos' },
  { icon: FiCheckCircle, text: 'Acesso restaurado em minutos' },
];

const AuthBrandingPanel: React.FC<AuthBrandingPanelProps> = ({
  badge,
  title,
  subtitle,
  highlights = defaultHighlights,
  footerNote,
}) => {
  return (
    <div className="hidden lg:flex lg:w-[48%] bg-[#0A44B1] flex-col justify-between p-12 relative overflow-hidden">
      <div className="absolute top-[-100px] right-[-80px] w-[380px] h-[380px] rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute bottom-[-60px] left-[-60px] w-[280px] h-[280px] rounded-full bg-[#E8EE3B]/10 pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      <Link to="/" className="flex items-center gap-1 no-underline w-fit group">
        <span className="text-2xl font-extrabold text-white tracking-tight group-hover:scale-[1.02] transition-transform">UniCarona</span>
        <div className="w-2 h-2 rounded-full bg-[#E8EE3B] ml-0.5 mt-1 animate-pulse" />
      </Link>

      <div className="flex flex-col gap-8">
        <div>
          <span className="inline-flex items-center gap-2 bg-[#E8EE3B]/20 border border-[#E8EE3B]/40 text-[#E8EE3B] text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            {badge}
          </span>
          <h1 className="text-[2.8rem] font-extrabold text-white leading-[1.1] mt-4">
            {title}
          </h1>
          <p className="text-white/60 text-[1rem] mt-4 leading-relaxed max-w-[340px]">
            {subtitle}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {highlights.map((h) => (
            <div key={h.text} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <h.icon className="text-[#E8EE3B] text-[16px]" />
              </div>
              <span className="text-white/75 text-[14px] font-medium">{h.text}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-white/30 text-[13px]">{footerNote ?? `© ${new Date().getFullYear()} UniCarona`}</p>
    </div>
  );
};

export default AuthBrandingPanel;
