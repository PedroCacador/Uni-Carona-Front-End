import React from 'react';
import { FiSearch, FiCheckCircle, FiNavigation } from 'react-icons/fi';
import step1Img from '../assets/images/image1.jpg';
import step2Img from '../assets/images/image2.png';
import step3Img from '../assets/images/image3.png';

const steps = [
  {
    number: '01',
    icon: FiSearch,
    title: 'Encontre uma carona',
    description:
      'Descubra motoristas da sua universidade indo para o mesmo destino. Filtre por data, horário e preço com nossa busca inteligente.',
    image: step1Img,
    imageAlt: 'Encontre uma carona',
    accent: '#0A44B1',
  },
  {
    number: '02',
    icon: FiCheckCircle,
    title: 'Reserve sua vaga',
    description:
      'Escolha o melhor horário, confirme sua participação e garanta seu lugar com poucos cliques. Rápido e sem complicação.',
    image: step2Img,
    imageAlt: 'Reserve sua vaga',
    accent: '#0A44B1',
  },
  {
    number: '03',
    icon: FiNavigation,
    title: 'Vá com segurança',
    description:
      'Viaje com pessoas verificadas da sua instituição. Perfis confirmados, avaliações reais e total transparência na jornada.',
    image: step3Img,
    imageAlt: 'Vá com segurança',
    accent: '#0A44B1',
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section className="w-full px-4 py-20" id="como-funciona">
      <div className="max-w-[1100px] mx-auto">

        {/* Section header */}
        <div className="text-center mb-20">
          <span className="inline-flex items-center gap-2 bg-[#E8EE3B]/25 border border-[#E8EE3B]/60 text-[#6b5e00] text-[12px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
            Como funciona
          </span>
          <h2 className="text-[2.2rem] md:text-[2.8rem] font-extrabold text-slate-900 leading-tight">
            Simples assim, em{' '}
            <span className="text-[#0A44B1]">3 passos</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-24">
          {steps.map((step, i) => {
            const isReverse = i % 2 !== 0;
            return (
              <div
                key={step.number}
                className={`flex flex-col ${isReverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-16`}
                style={{
                  animationTimeline: 'view()',
                  animationRange: 'entry 10% cover 40%',
                } as React.CSSProperties}
              >
                {/* Image side */}
                <div className="flex-1 w-full group">
                  <div className="relative rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(10,68,177,0.10)] border border-neutral-200/50 transition-transform duration-500 group-hover:-translate-y-2">
                    {/* Number overlay */}
                    <div className="absolute top-5 left-5 z-10 w-12 h-12 rounded-2xl bg-[#0A44B1] flex items-center justify-center shadow-[0_4px_16px_rgba(10,68,177,0.35)]">
                      <span className="text-white text-[15px] font-extrabold">{step.number}</span>
                    </div>
                    <img
                      src={step.image}
                      alt={step.imageAlt}
                      className="w-full h-[280px] md:h-[340px] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    {/* subtle overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A44B1]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>

                {/* Text side */}
                <div className={`flex-1 flex flex-col gap-5 text-center md:text-left ${isReverse ? 'md:items-end md:text-right' : 'md:items-start'}`}>
                  {/* Icon badge */}
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0A44B1]/8 border border-[#0A44B1]/12 mx-auto md:mx-0 transition-colors duration-300 hover:bg-[#0A44B1]/15">
                    <step.icon className="text-[#0A44B1] text-[24px]" aria-hidden="true" />
                  </div>

                  {/* Step number pill */}
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#0A44B1] uppercase tracking-widest">
                    <span className="w-5 h-[2px] bg-[#E8EE3B] rounded-full inline-block" />
                    Passo {i + 1}
                  </span>

                  <h3 className="text-[1.8rem] md:text-[2.1rem] font-extrabold text-slate-900 leading-tight">
                    {step.title}
                  </h3>

                  <p className="text-slate-500 text-[1.05rem] leading-relaxed max-w-[420px]">
                    {step.description}
                  </p>

                  {/* Connector line (visible only on desktop) */}
                  {i < steps.length - 1 && (
                    <div className="hidden md:flex items-center gap-2 mt-2">
                      <div className="w-10 h-[2px] bg-[#E8EE3B] rounded-full" />
                      <div className="w-2 h-2 rounded-full bg-[#0A44B1]" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
