import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiHeart, FiTarget, FiUsers, FiZap, FiArrowRight } from 'react-icons/fi';
import { Footer } from '../../components/Footer';

const team = [
  {
    name: 'Thiago Gonçalves',
    role: 'XXXXX',
    description: 'XXXXX',
    initials: 'TG',
    color: 'from-[#0A44B1] to-[#1a5cd8]',
    badge: 'XXXXX',
    badgeColor: 'bg-slate-100 text-slate-600 border-slate-200',
    github: '#',
    linkedin: '#',
  },
  {
    name: 'Gabriel Bianquini',
    role: 'XXXXX',
    description: 'XXXXX',
    initials: 'GB',
    color: 'from-[#0A44B1] to-[#0d3a96]',
    badge: 'XXXXX',
    badgeColor: 'bg-slate-100 text-slate-600 border-slate-200',
    github: '#',
    linkedin: '#',
  },
  {
    name: 'Pedro Caçador',
    role: 'XXXXX',
    description: 'XXXXX',
    initials: 'PC',
    color: 'from-[#0A44B1] to-[#1565C0]',
    badge: 'XXXXX',
    badgeColor: 'bg-slate-100 text-slate-600 border-slate-200',
    github: 'https://github.com/PedroCacador',
    linkedin: '#',
  },
  {
    name: 'Arthur Silvino',
    role: 'XXXXX',
    description: 'XXXXX',
    initials: 'AS',
    color: 'from-[#0A44B1] to-[#283593]',
    badge: 'XXXXX',
    badgeColor: 'bg-slate-100 text-slate-600 border-slate-200',
    github: '#',
    linkedin: '#',
  },
];

const values = [
  {
    icon: FiHeart,
    title: 'Comunidade',
    description: 'Nascemos de dentro da universidade para servir a universidade. Cada decisão é tomada pensando nos estudantes.',
  },
  {
    icon: FiTarget,
    title: 'Propósito',
    description: 'Não é só um app, é um movimento por mobilidade mais inteligente, acessível e sustentável no meio acadêmico.',
  },
  {
    icon: FiUsers,
    title: 'Inclusão',
    description: 'Acreditamos que toda carona deve ser segura, transparente e acessível — independente de onde você mora.',
  },
  {
    icon: FiZap,
    title: 'Inovação',
    description: 'Usamos tecnologia de ponta para criar soluções simples e elegantes para problemas reais do dia a dia universitário.',
  },
];

const timeline = [
  { year: '2024', label: 'A ideia nasce', desc: 'Durante uma conversa sobre os altos custos de transporte no campus da Faminas, os quatro fundadores decidiram que algo precisava mudar.' },
  { year: 'Jan 2025', label: 'Primeiro código', desc: 'Com as aulas no intervalo e as madrugadas livres, o primeiro protótipo do UniCarona começou a ganhar forma com React e Node.js.' },
  { year: 'Mar 2025', label: 'MVP lançado', desc: 'O MVP foi apresentado como projeto acadêmico e recebeu feedback entusiasmado de professores e colegas de curso.' },
  { year: 'Mai 2025', label: 'Hoje', desc: 'O UniCarona está em crescimento contínuo, com a missão de expandir para outras universidades e impactar cada vez mais estudantes.' },
];

const stats = [
  { value: '4', label: 'Fundadores', sub: 'Alunos da Faminas' },
  { value: '+500', label: 'Caronas', sub: 'Já realizadas' },
  { value: '20+', label: 'Universidades', sub: 'No mapa' },
  { value: '100%', label: 'Gratuito', sub: 'Para estudantes' },
];

const SobreNos: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <>
      <div className="bg-[#FAFAF7]">

        <section className="relative bg-[#0A44B1] overflow-hidden">
          <div className="absolute top-[-80px] right-[-60px] w-[420px] h-[420px] rounded-full bg-white/5 pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-[-60px] left-[8%] w-[280px] h-[280px] rounded-full bg-[#E8EE3B]/8 pointer-events-none" aria-hidden="true" />
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }}
            aria-hidden="true"
          />

          <div className="max-w-[1100px] mx-auto px-6 py-20 md:py-28 relative text-center">
            <span className="inline-flex items-center gap-2 bg-[#E8EE3B]/20 border border-[#E8EE3B]/40 text-[#E8EE3B] text-[12px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">
              Nossa história
            </span>
            <h1 className="text-[2.8rem] md:text-[4rem] font-extrabold text-white leading-[1.08] mb-6">
              Feito por estudantes,<br />
              <span className="text-[#E8EE3B]">para estudantes</span>
            </h1>
            <p className="text-white/65 text-[1.1rem] md:text-[1.2rem] leading-relaxed max-w-[640px] mx-auto">
              O UniCarona nasceu de um problem real vivido por quatro alunos da Faminas que cansaram de gastar caro e viajar sozinhos para a faculdade.
            </p>
          </div>
        </section>

        <section className="max-w-[1100px] mx-auto px-6 -mt-8 mb-20 relative z-10">
          <div className="bg-white border border-neutral-200/60 rounded-[28px] shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-6 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
            {stats.map((s, i) => (
              <React.Fragment key={s.label}>
                <div className="flex flex-col items-center gap-1 text-center">
                  <span className="text-[2.2rem] font-extrabold text-[#0A44B1] leading-none">{s.value}</span>
                  <span className="text-[15px] font-bold text-slate-800">{s.label}</span>
                  <span className="text-[12px] text-slate-400 font-medium">{s.sub}</span>
                </div>
                {i < stats.length - 1 && (
                  <div className="hidden md:block w-px bg-neutral-200 justify-self-center h-full" aria-hidden="true" />
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        <section className="max-w-[1100px] mx-auto px-6 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              <div>
                <span className="inline-flex items-center gap-2 bg-[#E8EE3B]/25 border border-[#E8EE3B]/60 text-[#6b5e00] text-[12px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
                  A origem
                </span>
                <h2 className="text-[2rem] md:text-[2.5rem] font-extrabold text-slate-900 leading-tight mt-3">
                  Uma ideia nascida<br />
                  <span className="text-[#0A44B1]">num papo de faculdade</span>
                </h2>
              </div>
              <p className="text-slate-500 text-[1.05rem] leading-relaxed">
                Era 2024 e Thiago, Gabriel, Pedro e Arthur tinham um problema em comum: o deslocamento até o campus da Faminas era caro, cansativo e solitário. Eles sabiam que dezenas de colegas enfrentavam o mesmo trajeto — e que muitas cadeiras de carro ficavam vazias todo dia.
              </p>
              <p className="text-slate-500 text-[1.05rem] leading-relaxed">
                A solução parecia óbvia: criar uma plataforma onde estudantes pudessem se encontrar, compartilhar caronas e dividir os custos. Mas não um app genérico — um sistema pensado 100% para o universo universitário, com verificação de vínculo acadêmico e foco em segurança e confiança.
              </p>
              <p className="text-slate-500 text-[1.05rem] leading-relaxed">
                Em poucos meses de desenvolvimento paralelo aos estudos, o UniCarona saiu do papel e virou realidade. Hoje, o projeto é mais do que um trabalho acadêmico: é a prova de que tecnologia feita com propósito transforma comunidades.
              </p>

              <div className="flex items-center gap-3 p-4 bg-[#E8EE3B]/15 border border-[#E8EE3B]/40 rounded-2xl">
                <span className="text-2xl">Info</span>
                <p className="text-[14px] text-[#6b5e00] font-medium leading-snug">
                  <strong>Curiosidade:</strong> o nome "UniCarona" surgiu literalmente durante uma carona — quando Pedro estava no carro do Thiago a caminho da faculdade.
                </p>
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="relative w-full max-w-[400px]">
                <div className="absolute inset-0 bg-[#0A44B1]/6 rounded-[40px] blur-[40px] scale-110" aria-hidden="true" />

                <div className="relative bg-white rounded-[32px] border-2 border-neutral-200/60 shadow-[0_20px_60px_rgba(10,68,177,0.10)] p-8 flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#0A44B1] flex items-center justify-center shadow-[0_4px_12px_rgba(10,68,177,0.3)]">
                      <span className="text-white text-xl font-extrabold">U</span>
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900 text-[16px]">UniCarona</div>
                      <div className="text-[12px] text-[#0A44B1] font-semibold">Projeto Acadêmico · Faminas</div>
                    </div>
                    <div className="ml-auto">
                      <div className="w-2 h-2 rounded-full bg-[#E8EE3B] animate-pulse" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Faculdade', value: 'Faminas' },
                      { label: 'Turma', value: 'ADS 2024' },
                      { label: 'Início', value: 'Out 2024' },
                      { label: 'Status', value: 'Ativo' },
                    ].map((item) => (
                      <div key={item.label} className="bg-[#FAFAF7] rounded-2xl p-3 border border-neutral-100">
                        <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wide">{item.label}</div>
                        <div className="text-[14px] font-bold text-slate-800 mt-0.5">{item.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 bg-[#0A44B1]/5 rounded-2xl p-3 border border-[#0A44B1]/10">
                    <FiHeart className="text-[#0A44B1] flex-shrink-0" size={15} />
                    <span className="text-[13px] text-slate-600 font-medium">
                      Desenvolvido com muito cafe e muita dedicacao
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#0A44B1] relative overflow-hidden py-20 mb-24">
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} aria-hidden="true" />

          <div className="max-w-[1100px] mx-auto px-6 relative">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 bg-[#E8EE3B]/20 border border-[#E8EE3B]/40 text-[#E8EE3B] text-[12px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
                Nossa jornada
              </span>
              <h2 className="text-[2rem] md:text-[2.5rem] font-extrabold text-white leading-tight">
                Do sonho ao código
              </h2>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/15 hidden md:block" aria-hidden="true" />

              <div className="flex flex-col gap-10">
                {timeline.map((item, i) => (
                  <div
                    key={item.year}
                    className={`flex flex-col md:flex-row items-center gap-6 md:gap-12 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                  >
                    <div className={`flex-1 ${i % 2 !== 0 ? 'md:text-right' : ''}`}>
                      <div className="bg-white/10 border border-white/15 backdrop-blur-sm rounded-[24px] p-6 hover:bg-white/15 transition-colors duration-300">
                        <div className="inline-flex items-center gap-2 bg-[#E8EE3B]/20 border border-[#E8EE3B]/30 text-[#E8EE3B] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                          {item.year}
                        </div>
                        <h3 className="text-[1.15rem] font-extrabold text-white mb-2">{item.label}</h3>
                        <p className="text-white/60 text-[14px] leading-relaxed">{item.desc}</p>
                      </div>
                    </div>

                    <div className="hidden md:flex w-5 h-5 rounded-full bg-[#E8EE3B] border-4 border-[#0A44B1] shadow-[0_0_0_4px_rgba(232,238,59,0.3)] flex-shrink-0 z-10" aria-hidden="true" />

                    <div className="flex-1 hidden md:block" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-[1100px] mx-auto px-6 mb-24">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 bg-[#E8EE3B]/25 border border-[#E8EE3B]/60 text-[#6b5e00] text-[12px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
              Nossos valores
            </span>
            <h2 className="text-[2rem] md:text-[2.5rem] font-extrabold text-slate-900 leading-tight">
              O que nos <span className="text-[#0A44B1]">move</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <div
                key={v.title}
                className="group bg-white border-2 border-neutral-200/70 rounded-[24px] p-6 flex flex-col gap-4 hover:-translate-y-1.5 hover:border-[#0A44B1]/25 hover:shadow-[0_16px_40px_rgba(10,68,177,0.10)] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#0A44B1]/8 flex items-center justify-center group-hover:bg-[#0A44B1]/15 transition-colors duration-300">
                  <v.icon className="text-[#0A44B1] text-[22px]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-[1rem] font-extrabold text-slate-900 mb-2">{v.title}</h3>
                  <p className="text-slate-500 text-[13px] leading-relaxed">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-[1100px] mx-auto px-6 mb-24" id="equipe">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 bg-[#E8EE3B]/25 border border-[#E8EE3B]/60 text-[#6b5e00] text-[12px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
              A equipe
            </span>
            <h2 className="text-[2rem] md:text-[2.5rem] font-extrabold text-slate-900 leading-tight">
              Conheça os <span className="text-[#0A44B1]">fundadores</span>
            </h2>
            <p className="text-slate-500 text-[1.05rem] mt-4 max-w-[480px] mx-auto leading-relaxed">
              Quatro estudantes de Análise e Desenvolvimento de Sistemas da Faminas que transformaram uma ideia em realidade.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <article
                key={member.name}
                className={`group relative bg-white border-2 rounded-[28px] flex flex-col overflow-hidden transition-all duration-350 cursor-default
                  ${activeCard === i ? 'border-[#0A44B1]/40 shadow-[0_20px_50px_rgba(10,68,177,0.14)] -translate-y-2' : 'border-neutral-200/70 shadow-[0_4px_16px_rgba(0,0,0,0.06)]'}
                `}
                onMouseEnter={() => setActiveCard(i)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className={`h-1.5 w-full bg-gradient-to-r ${member.color} transition-all duration-300 ${activeCard === i ? 'h-2' : ''}`} />

                <div className="p-6 flex flex-col gap-4 flex-1">
                  <div className="flex items-start justify-between">
                    <div className={`w-16 h-16 rounded-[20px] bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-[22px] font-extrabold shadow-[0_8px_20px_rgba(10,68,177,0.25)] transition-transform duration-300 ${activeCard === i ? 'scale-110' : ''}`}>
                      {member.initials}
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${member.badgeColor}`}>
                      {member.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-[15px] font-extrabold text-slate-900 leading-tight">{member.name}</h3>
                    <div className="text-[12px] text-[#0A44B1] font-semibold mt-0.5">{member.role}</div>
                    <div className="text-[11px] text-slate-400 font-medium mt-0.5">Faminas · ADS</div>
                  </div>

                  <p className="text-slate-500 text-[12.5px] leading-relaxed flex-1">{member.description}</p>

                  <div className="flex items-center gap-2 pt-3 border-t border-neutral-100">
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`GitHub de ${member.name}`}
                      className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-[#0A44B1] hover:text-white transition-all duration-200"
                    >
                      <FiGithub size={14} />
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`LinkedIn de ${member.name}`}
                      className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-[#0A44B1] hover:text-white transition-all duration-200"
                    >
                      <FiLinkedin size={14} />
                    </a>
                    <span className="ml-auto text-[11px] text-slate-300 font-medium">Faminas · {['23', '24', '24', '23'][i]}o periodo</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="max-w-[1100px] mx-auto px-6 mb-0 pb-0">
          <div className="relative overflow-hidden rounded-[40px] bg-[#0A44B1] px-8 md:px-16 py-14 md:py-16 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-white/4 -translate-y-1/2 translate-x-1/3 pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 w-[280px] h-[280px] rounded-full bg-[#E8EE3B]/8 translate-y-1/2 -translate-x-1/4 pointer-events-none" aria-hidden="true" />
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} aria-hidden="true" />

            <div className="relative text-center md:text-left">
              <h2 className="text-[1.8rem] md:text-[2.2rem] font-extrabold text-white leading-tight mb-3">
                Faça parte desta história
              </h2>
              <p className="text-white/65 text-[1rem] leading-relaxed max-w-[460px]">
                Junte-se à comunidade UniCarona e ajude a construir uma forma mais inteligente e solidária de se locomover até a faculdade.
              </p>
            </div>

            <div className="relative flex flex-col items-center gap-3 flex-shrink-0">
              <Link
                to="/cadastro"
                id="sobre-cta-button"
                className="inline-flex items-center gap-2.5 bg-[#E8EE3B] text-slate-900 px-8 py-4 rounded-2xl font-extrabold text-[16px] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_12px_36px_rgba(232,238,59,0.45)] hover:brightness-105 active:scale-95 no-underline group shadow-[0_4px_20px_rgba(232,238,59,0.3)]"
              >
                Criar conta grátis
                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                to="/caronas"
                className="text-white/60 text-[14px] font-medium hover:text-white transition-colors no-underline"
              >
                Ou explore as caronas →
              </Link>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default SobreNos;
