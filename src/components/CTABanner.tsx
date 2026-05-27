import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiStar } from 'react-icons/fi';

export const CTABanner: React.FC = () => {
  return (
    <section className="w-full px-4 py-12 mb-0" id="cta-banner">
      <div className="max-w-[1200px] mx-auto">
        <div className="relative overflow-hidden rounded-[40px] bg-[#0A44B1] px-8 md:px-16 py-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-10">
          
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-white/4 -translate-y-1/2 translate-x-1/3 pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 w-[320px] h-[320px] rounded-full bg-[#E8EE3B]/8 translate-y-1/2 -translate-x-1/4 pointer-events-none" aria-hidden="true" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/3 rounded-full blur-[80px] pointer-events-none" aria-hidden="true" />

          {/* Dot grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
            aria-hidden="true"
          />

          {/* Text side */}
          <div className="relative text-center md:text-left max-w-[540px]">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-[12px] font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">
              <FiStar className="text-[#E8EE3B]" aria-hidden="true" />
              Grátis para estudantes
            </div>
            <h2 className="text-[2rem] md:text-[2.8rem] font-extrabold text-white leading-tight mb-4">
              Pronto para começar <br className="hidden md:block" />
              sua primeira carona?
            </h2>
            <p className="text-white/70 text-[1.05rem] leading-relaxed">
              Junte-se a centenas de estudantes que já economizam tempo e dinheiro. 
              Crie sua conta em menos de 2 minutos.
            </p>
          </div>

          {/* CTA side */}
          <div className="relative flex flex-col items-center gap-4 flex-shrink-0">
            <Link
              to="/cadastro"
              id="cta-banner-button"
              className="inline-flex items-center gap-3 bg-[#E8EE3B] text-slate-900 px-9 py-4 rounded-2xl font-extrabold text-[17px] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_12px_36px_rgba(232,238,59,0.45)] hover:brightness-105 active:scale-95 shadow-[0_4px_20px_rgba(232,238,59,0.3)] no-underline group"
            >
              Criar conta grátis
              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <span className="text-white/50 text-[13px]">
              Sem cartão de crédito · 100% gratuito
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
