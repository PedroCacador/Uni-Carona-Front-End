import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiSearch, FiMapPin, FiShield, FiStar, FiBell, FiUsers,
  FiCheck, FiArrowRight, FiChevronDown,
} from 'react-icons/fi';
import { Footer } from '../../components/Footer';

const services = [
  {
    id: 'buscar',
    icon: FiSearch,
    title: 'Buscar Caronas',
    tagline: 'Encontre sua carona em segundos',
    description:
      'Filtre por origem, destino e data e veja todas as caronas disponíveis em tempo real. Nossa busca inteligente prioriza as rotas mais próximas do seu trajeto habitual.',
    features: [
      'Filtros por origem, destino e data',
      'Resultados em tempo real',
      'Visualização de vagas disponíveis',
      'Perfil e avaliação do motorista',
    ],
    accent: '#0A44B1',
    bgLight: 'bg-[#0A44B1]/6',
    borderHover: 'hover:border-[#0A44B1]/30',
    shadowHover: 'hover:shadow-[0_20px_48px_rgba(10,68,177,0.12)]',
  },
  {
    id: 'oferecer',
    icon: FiMapPin,
    title: 'Oferecer Carona',
    tagline: 'Compartilhe a viagem, divida os custos',
    description:
      'Cadastre sua rota, defina o número de vagas e o valor por passageiro. Com poucos cliques você ajuda colegas e ainda reduz seus gastos com combustível e pedágio.',
    features: [
      'Cadastro rápido de rota',
      'Controle de vagas disponíveis',
      'Definição de valor por passageiro',
      'Histórico de caronas oferecidas',
    ],
    accent: '#0A44B1',
    bgLight: 'bg-[#0A44B1]/6',
    borderHover: 'hover:border-[#0A44B1]/30',
    shadowHover: 'hover:shadow-[0_20px_48px_rgba(10,68,177,0.12)]',
  },
  {
    id: 'verificacao',
    icon: FiShield,
    title: 'Verificação de Estudantes',
    tagline: 'Só quem é da comunidade entra',
    description:
      'Exigimos vínculo ativo com instituição de ensino para todos os usuários. Motoristas passam por validação extra de documentos e CNH, garantindo uma comunidade 100% confiável.',
    features: [
      'Validação de matrícula ativa',
      'Verificação de CNH para motoristas',
      'Perfil vinculado à universidade',
      'Comunidade fechada e segura',
    ],
    accent: '#0A44B1',
    bgLight: 'bg-[#0A44B1]/6',
    borderHover: 'hover:border-[#0A44B1]/30',
    shadowHover: 'hover:shadow-[0_20px_48px_rgba(10,68,177,0.12)]',
  },
  {
    id: 'avaliacoes',
    icon: FiStar,
    title: 'Sistema de Avaliações',
    tagline: 'Transparência em cada carona',
    description:
      'Após cada viagem, passageiros e motoristas se avaliam mutuamente. A média pública gera confiança na plataforma e incentiva boas práticas entre os membros.',
    features: [
      'Avaliação bidirecional (5 estrelas)',
      'Comentários públicos pós-viagem',
      'Média acumulada visível no perfil',
      'Histórico completo de avaliações',
    ],
    accent: '#0A44B1',
    bgLight: 'bg-[#0A44B1]/6',
    borderHover: 'hover:border-[#0A44B1]/30',
    shadowHover: 'hover:shadow-[0_20px_48px_rgba(10,68,177,0.12)]',
  },
  {
    id: 'notificacoes',
    icon: FiBell,
    title: 'Notificações em Tempo Real',
    tagline: 'Nunca perca sua carona',
    description:
      'Receba alertas instantâneos quando uma nova carona compatível com seu trajeto for cadastrada, quando sua vaga for confirmada ou quando houver atualizações na rota.',
    features: [
      'Alertas de novas caronas',
      'Confirmação de reserva',
      'Aviso de alterações de rota',
      'Lembretes antes da partida',
    ],
    accent: '#0A44B1',
    bgLight: 'bg-[#0A44B1]/6',
    borderHover: 'hover:border-[#0A44B1]/30',
    shadowHover: 'hover:shadow-[0_20px_48px_rgba(10,68,177,0.12)]',
  },
  {
    id: 'comunidade',
    icon: FiUsers,
    title: 'Comunidade Universitária',
    tagline: 'Uma rede que vai além da carona',
    description:
      'Conecte-se com estudantes da sua universidade, construa reputação e faça parte de uma rede de confiança que cresce a cada semestre.',
    features: [
      'Perfis verificados por instituição',
      'Rede de contatos universitários',
      'Reputação construída ao longo do tempo',
      'Suporte direto pela plataforma',
    ],
    accent: '#0A44B1',
    bgLight: 'bg-[#0A44B1]/6',
    borderHover: 'hover:border-[#0A44B1]/30',
    shadowHover: 'hover:shadow-[0_20px_48px_rgba(10,68,177,0.12)]',
  },
];

const faqs = [
  {
    q: 'O UniCarona é pago?',
    a: 'Não. A plataforma é totalmente gratuita para estudantes. O único valor envolvido é o combinado diretamente entre passageiro e motorista para divisão dos custos da viagem.',
  },
  {
    q: 'Preciso ser estudante para usar?',
    a: 'Sim. O UniCarona é exclusivo para membros de instituições de ensino. Exigimos validação do vínculo acadêmico no cadastro para garantir a segurança da comunidade.',
  },
  {
    q: 'Como funciona a reserva de vaga?',
    a: 'Você encontra uma carona disponível, clica em "Ver detalhes" e solicita a vaga. O motorista recebe a notificação e confirma (ou recusa) a solicitação. Simples assim.',
  },
  {
    q: 'E se o motorista cancelar na última hora?',
    a: 'O sistema notifica imediatamente todos os passageiros e o cancelamento é registrado no histórico do motorista, impactando sua avaliação. Valorizamos o compromisso de todos.',
  },
  {
    q: 'Posso oferecer carona com qualquer carro?',
    a: 'Sim, desde que você possua CNH válida e o veículo esteja em condições regulares. A verificação de documentos faz parte do nosso processo de validação de motoristas.',
  },
];

const comparison = [
  { feature: 'Gratuito para estudantes', unicarona: true, outros: false },
  { feature: 'Verificação universitária', unicarona: true, outros: false },
  { feature: 'Sistema de avaliações', unicarona: true, outros: true },
  { feature: 'Foco 100% universitário', unicarona: true, outros: false },
  { feature: 'Comunidade fechada e segura', unicarona: true, outros: false },
  { feature: 'Divisão de custos transparente', unicarona: true, outros: true },
];

const Servicos: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeService, setActiveService] = useState<number | null>(null);

  return (
    <>
      <div className="bg-[#FAFAF7]">

        <section className="relative bg-[#0A44B1] overflow-hidden">
          <div className="absolute top-[-100px] right-[-80px] w-[460px] h-[460px] rounded-full bg-white/5 pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-[-60px] left-[6%] w-[300px] h-[300px] rounded-full bg-[#E8EE3B]/8 pointer-events-none" aria-hidden="true" />
          <div className="absolute inset-0 opacity-[0.035] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} aria-hidden="true" />

          <div className="max-w-[1100px] mx-auto px-6 py-20 md:py-28 relative text-center">
            <span className="inline-flex items-center gap-2 bg-[#E8EE3B]/20 border border-[#E8EE3B]/40 text-[#E8EE3B] text-[12px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">
              O que oferecemos
            </span>
            <h1 className="text-[2.8rem] md:text-[4rem] font-extrabold text-white leading-[1.08] mb-6">
              Tudo que você precisa<br />
              <span className="text-[#E8EE3B]">numa só plataforma</span>
            </h1>
            <p className="text-white/65 text-[1.1rem] leading-relaxed max-w-[580px] mx-auto mb-10">
              Do cadastro à carona realizada, o UniCarona cuida de cada etapa com segurança, transparência e zero custo para estudantes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/cadastro"
                className="inline-flex items-center gap-2.5 bg-[#E8EE3B] text-slate-900 px-8 py-4 rounded-2xl font-extrabold text-[16px] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_36px_rgba(232,238,59,0.4)] hover:brightness-105 active:scale-95 no-underline group shadow-[0_4px_20px_rgba(232,238,59,0.3)]"
                id="servicos-cta-top"
              >
                Começar grátis
                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                to="/caronas"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white font-semibold text-[15px] transition-colors no-underline group"
              >
                Ver caronas disponíveis
                <FiArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </section>

        <section className="max-w-[1100px] mx-auto px-6 -mt-8 mb-20 relative z-10">
          <div className="bg-white border border-neutral-200/60 rounded-[28px] shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-neutral-100">
            {[
              { value: '100%', label: 'Gratuito', sub: 'Sem taxa de uso' },
              { value: '6', label: 'Funcionalidades', sub: 'Integradas' },
              { value: '+500', label: 'Caronas', sub: 'Realizadas' },
              { value: '24h', label: 'Disponível', sub: 'A qualquer hora' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1 text-center px-4">
                <span className="text-[2.2rem] font-extrabold text-[#0A44B1] leading-none">{s.value}</span>
                <span className="text-[15px] font-bold text-slate-800">{s.label}</span>
                <span className="text-[12px] text-slate-400 font-medium">{s.sub}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-[1100px] mx-auto px-6 mb-24">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 bg-[#E8EE3B]/25 border border-[#E8EE3B]/60 text-[#6b5e00] text-[12px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
              Nossos serviços
            </span>
            <h2 className="text-[2rem] md:text-[2.6rem] font-extrabold text-slate-900 leading-tight">
              Cada detalhe pensado<br />
              <span className="text-[#0A44B1]">para você</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <article
                key={s.id}
                className={`group relative bg-white border-2 rounded-[28px] p-7 flex flex-col gap-5 transition-all duration-300 cursor-default
                  ${activeService === i
                    ? 'border-[#0A44B1]/35 shadow-[0_20px_48px_rgba(10,68,177,0.13)] -translate-y-1.5'
                    : 'border-neutral-200/70 shadow-[0_4px_16px_rgba(0,0,0,0.05)]'}
                `}
                onMouseEnter={() => setActiveService(i)}
                onMouseLeave={() => setActiveService(null)}
                id={`service-${s.id}`}
              >
                <div className={`w-14 h-14 rounded-2xl ${s.bgLight} flex items-center justify-center transition-all duration-300 ${activeService === i ? 'bg-[#0A44B1]/12 scale-110' : ''}`}>
                  <s.icon className="text-[#0A44B1] text-[24px]" aria-hidden="true" />
                </div>

                <div>
                  <h3 className="text-[1.1rem] font-extrabold text-slate-900 mb-1">{s.title}</h3>
                  <p className="text-[12px] text-[#0A44B1] font-bold uppercase tracking-wide mb-3">{s.tagline}</p>
                  <p className="text-slate-500 text-[13.5px] leading-relaxed">{s.description}</p>
                </div>

                <ul className="flex flex-col gap-2 mt-auto">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-[13px] text-slate-600 font-medium">
                      <span className="w-5 h-5 rounded-full bg-[#0A44B1]/10 flex items-center justify-center flex-shrink-0">
                        <FiCheck size={11} className="text-[#0A44B1]" aria-hidden="true" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className={`absolute bottom-0 left-8 right-8 h-0.5 bg-[#0A44B1] rounded-full transition-all duration-300 ${activeService === i ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true" />
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#0A44B1] relative overflow-hidden py-20 mb-24">
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} aria-hidden="true" />
          <div className="absolute top-[-60px] right-[-40px] w-[340px] h-[340px] rounded-full bg-white/5 pointer-events-none" aria-hidden="true" />

          <div className="max-w-[860px] mx-auto px-6 relative">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 bg-[#E8EE3B]/20 border border-[#E8EE3B]/40 text-[#E8EE3B] text-[12px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
                Por que UniCarona?
              </span>
              <h2 className="text-[2rem] md:text-[2.5rem] font-extrabold text-white leading-tight">
                Diferente de tudo<br />que você já viu
              </h2>
            </div>

            <div className="bg-white/10 border border-white/15 rounded-[28px] overflow-hidden">
              <div className="grid grid-cols-3 bg-white/10">
                <div className="px-6 py-4 text-white/50 text-[12px] font-bold uppercase tracking-wide">Funcionalidade</div>
                <div className="px-6 py-4 text-center">
                  <span className="inline-flex items-center gap-1.5 bg-[#E8EE3B] text-slate-900 text-[13px] font-extrabold px-4 py-1.5 rounded-full">
                    UniCarona
                  </span>
                </div>
                <div className="px-6 py-4 text-center text-white/50 text-[13px] font-semibold">Outros apps</div>
              </div>

              {comparison.map((row, i) => (
                <div key={row.feature} className={`grid grid-cols-3 items-center border-t border-white/10 ${i % 2 === 0 ? 'bg-white/4' : ''}`}>
                  <div className="px-6 py-4 text-white/80 text-[14px] font-medium">{row.feature}</div>
                  <div className="px-6 py-4 flex justify-center">
                    {row.unicarona ? (
                      <span className="w-7 h-7 rounded-full bg-[#E8EE3B]/20 border border-[#E8EE3B]/40 flex items-center justify-center">
                        <FiCheck size={14} className="text-[#E8EE3B]" />
                      </span>
                    ) : (
                      <span className="w-7 h-7 rounded-full bg-red-500/15 border border-red-400/30 flex items-center justify-center text-red-400 text-[16px] font-bold">×</span>
                    )
                    }
                  </div>
                  <div className="px-6 py-4 flex justify-center">
                    {row.outros ? (
                      <span className="w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                        <FiCheck size={14} className="text-white/50" />
                      </span>
                    ) : (
                      <span className="w-7 h-7 rounded-full bg-red-500/15 border border-red-400/30 flex items-center justify-center text-red-400 text-[16px] font-bold">×</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-[780px] mx-auto px-6 mb-24">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-[#E8EE3B]/25 border border-[#E8EE3B]/60 text-[#6b5e00] text-[12px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
              Dúvidas frequentes
            </span>
            <h2 className="text-[2rem] md:text-[2.5rem] font-extrabold text-slate-900 leading-tight">
              Perguntas <span className="text-[#0A44B1]">frequentes</span>
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`bg-white border-2 rounded-[20px] overflow-hidden transition-all duration-300
                  ${openFaq === i ? 'border-[#0A44B1]/30 shadow-[0_8px_28px_rgba(10,68,177,0.08)]' : 'border-neutral-200/70'}
                `}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  id={`faq-${i}`}
                >
                  <span className="text-[15px] font-bold text-slate-900">{faq.q}</span>
                  <FiChevronDown
                    size={18}
                    className={`text-[#0A44B1] flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <div className="h-px bg-neutral-100 mb-4" />
                    <p className="text-slate-500 text-[14px] leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-[1100px] mx-auto px-6 pb-0 mb-0">
          <div className="relative overflow-hidden rounded-[40px] bg-[#0A44B1] px-8 md:px-16 py-14 md:py-16 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="absolute top-0 right-0 w-[360px] h-[360px] rounded-full bg-white/4 -translate-y-1/2 translate-x-1/3 pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 w-[260px] h-[260px] rounded-full bg-[#E8EE3B]/8 translate-y-1/2 -translate-x-1/4 pointer-events-none" aria-hidden="true" />
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} aria-hidden="true" />

            <div className="relative text-center md:text-left">
              <h2 className="text-[1.8rem] md:text-[2.2rem] font-extrabold text-white leading-tight mb-3">
                Pronto para começar?
              </h2>
              <p className="text-white/65 text-[1rem] leading-relaxed max-w-[440px]">
                Crie sua conta grátis, explore as caronas disponíveis e faça parte da comunidade que está mudando a mobilidade universitária.
              </p>
            </div>

            <div className="relative flex flex-col items-center gap-3 flex-shrink-0">
              <Link
                to="/cadastro"
                id="servicos-cta-bottom"
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

export default Servicos;
