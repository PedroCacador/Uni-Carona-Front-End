import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiUsers, FiMapPin, FiShield } from 'react-icons/fi';

const stats = [
  { icon: FiMapPin, value: '+500', label: 'Caronas realizadas' },
  { icon: FiUsers, value: '20+', label: 'Universidades parceiras' },
  { icon: FiShield, value: '100%', label: 'Motoristas verificados' },
];

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden px-4 pt-8 pb-16 flex flex-col items-center text-center">
      {/* Decorative background orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-80px] left-[10%] w-[420px] h-[420px] rounded-full bg-[#0A44B1]/8 blur-[100px]" />
        <div className="absolute top-[60px] right-[5%] w-[280px] h-[280px] rounded-full bg-[#E8EE3B]/20 blur-[80px]" />
        <div className="absolute top-[180px] left-[30%] w-[200px] h-[200px] rounded-full bg-[#0A44B1]/5 blur-[60px]" />
      </div>

      {/* Pill badge */}
      <div className="relative mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <span className="inline-flex items-center gap-2 bg-[#E8EE3B]/25 border border-[#E8EE3B]/60 text-[#6b5e00] text-[13px] font-semibold px-4 py-1.5 rounded-full tracking-wide">
          <span className="w-2 h-2 rounded-full bg-[#E8EE3B] shadow-[0_0_8px_#E8EE3B]" />
          Mobilidade universitária inteligente
        </span>
      </div>

      {/* Main headline */}
      <h1 className="relative max-w-[820px] text-[2.8rem] md:text-[4rem] lg:text-[4.8rem] font-extrabold leading-[1.08] tracking-tight text-slate-900 mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
        Sua carona
        <span className="relative inline-block mx-3 text-[#0A44B1]">
          universitária
          <svg
            className="absolute -bottom-2 left-0 w-full"
            viewBox="0 0 300 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M2 9 C60 3, 150 2, 298 7"
              stroke="#E8EE3B"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </span>
        <br />
        começa aqui
      </h1>

      {/* Subtitle */}
      <p className="relative max-w-[560px] text-[1.1rem] md:text-[1.2rem] text-slate-500 leading-relaxed mb-10 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
        Conectamos estudantes de forma segura e econômica. 
        Encontre ou ofereça caronas entre campus com total transparência.
      </p>

      {/* CTA Buttons */}
      <div className="relative flex flex-col sm:flex-row items-center gap-4 mb-16 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
        <Link
          to="/caronas"
          className="inline-flex items-center gap-2 bg-[#0A44B1] text-white px-8 py-4 rounded-2xl font-bold text-[16px] transition-all duration-300 hover:bg-[#08368d] hover:scale-[1.03] hover:shadow-[0_12px_32px_rgba(10,68,177,0.28)] active:scale-95 shadow-[0_4px_16px_rgba(10,68,177,0.22)] no-underline group"
          id="hero-cta-buscar"
        >
          Buscar caronas
          <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
        <Link
          to="/cadastro"
          className="inline-flex items-center gap-2 bg-white border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-semibold text-[16px] transition-all duration-300 hover:border-[#0A44B1] hover:text-[#0A44B1] hover:scale-[1.02] active:scale-95 no-underline"
          id="hero-cta-cadastro"
        >
          Criar conta grátis
        </Link>
      </div>

      {/* Stats bar */}
      <div className="relative w-full max-w-[680px] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-500">
        <div className="bg-white/90 backdrop-blur-sm border border-neutral-200/60 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] px-6 py-5 flex flex-col sm:flex-row items-center justify-around gap-6 sm:gap-0">
          {stats.map((stat, i) => (
            <React.Fragment key={stat.label}>
              <div className="flex flex-col items-center gap-1 group">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-xl bg-[#0A44B1]/8 flex items-center justify-center transition-colors duration-300 group-hover:bg-[#0A44B1]/15">
                    <stat.icon className="text-[#0A44B1] text-[16px]" />
                  </div>
                </div>
                <span className="text-[1.6rem] font-extrabold text-[#0A44B1] leading-none">{stat.value}</span>
                <span className="text-[12px] font-medium text-slate-400 text-center">{stat.label}</span>
              </div>
              {i < stats.length - 1 && (
                <div className="hidden sm:block w-px h-12 bg-neutral-200/80" aria-hidden="true" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
