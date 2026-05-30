import React from 'react';

interface Testimonial {
  name: string;
  university: string;
  role: string;
  text: string;
  rating: number;
  initials: string;
  color: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Mariana Costa',
    university: 'USP — São Paulo',
    role: 'Estudante de Medicina',
    text: 'O UniCarona transformou minha rotina. Economizo R$300 por mês e ainda conheci pessoas incríveis da minha faculdade. A segurança de viajar com estudantes verificados me deixa muito mais tranquila.',
    rating: 5,
    initials: 'MC',
    color: '#0A44B1',
  },
  {
    name: 'Rafael Andrade',
    university: 'UNICAMP — Campinas',
    role: 'Estudante de Engenharia',
    text: 'Ofereço carona há 4 meses e já cobri boa parte do meu combustível mensal. O app é super intuitivo, e a comunidade é muito respeitosa. Recomendo para todo universitário.',
    rating: 5,
    initials: 'RA',
    color: '#0A44B1',
  },
  {
    name: 'Juliana Ferreira',
    university: 'PUC-SP — São Paulo',
    role: 'Estudante de Direito',
    text: 'Nunca imaginei que encontrar carona seria tão fácil. Em 2 minutos já achei uma vaga e no dia seguinte já estava viajando com a Ana, que virou uma grande amiga. Plataforma incrível!',
    rating: 5,
    initials: 'JF',
    color: '#0A44B1',
  },
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex gap-0.5" aria-label={`Avaliação: ${rating} de 5 estrelas`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-[#E8EE3B]' : 'text-slate-200'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

export const Testimonials: React.FC = () => {
  return (
    <section className="w-full px-4 py-20" id="depoimentos">
      <div className="max-w-[1200px] mx-auto">
        {}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 bg-[#E8EE3B]/25 border border-[#E8EE3B]/60 text-[#6b5e00] text-[12px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
            Depoimentos
          </span>
          <h2 className="text-[2.2rem] md:text-[2.8rem] font-extrabold text-slate-900 leading-tight mb-4">
            O que dizem nossos{' '}
            <span className="text-[#0A44B1]">estudantes</span>
          </h2>
          <p className="text-slate-500 text-[1.05rem] max-w-[480px] mx-auto leading-relaxed">
            Mais de 500 universitários já transformaram sua rotina com o UniCarona.
          </p>
        </div>

        {}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <article
              key={t.name}
              className="group relative bg-white border border-neutral-200/70 rounded-[28px] p-8 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(10,68,177,0.10)] hover:border-[#0A44B1]/20 cursor-default"
              style={{
                animationDelay: `${i * 120}ms`,
              }}
            >
              {}
              <div className="w-10 h-10 rounded-2xl bg-[#0A44B1]/6 flex items-center justify-center group-hover:bg-[#0A44B1]/12 transition-colors duration-300">
                <svg className="w-5 h-5 text-[#0A44B1]/60" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <StarRating rating={t.rating} />

              <p className="text-slate-600 text-[15px] leading-relaxed flex-1">
                "{t.text}"
              </p>

              {}
              <div className="flex items-center gap-3 pt-2 border-t border-neutral-100">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white text-[14px] font-bold flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${t.color}, #1a5cd8)` }}
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-[14px] font-bold text-slate-800">{t.name}</div>
                  <div className="text-[12px] text-slate-400">{t.role}</div>
                  <div className="text-[12px] text-[#0A44B1] font-medium">{t.university}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
