import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiShield, FiUser, FiStar, FiEye, FiAlertTriangle,
  FiPhone, FiMapPin, FiLock, FiArrowRight, FiCheck,
} from 'react-icons/fi';
import { Footer } from '../../components/Footer';

const pillars = [
  {
    icon: FiUser,
    title: 'Perfis verificados',
    description:
      'Todo usuário é validado com vínculo ativo em instituição de ensino. Motoristas passam por verificação adicional de CNH e documentos pessoais antes de oferecer caronas.',
  },
  {
    icon: FiStar,
    title: 'Sistema de avaliações',
    description:
      'Após cada carona, passageiros e motoristas avaliam a experiência mutuamente. Histórico público e transparente que gera confiança e responsabilidade na comunidade.',
  },
  {
    icon: FiEye,
    title: 'Comunidade fechada',
    description:
      'O UniCarona é exclusivo para estudantes universitários. Esse filtro natural cria um ambiente de maior confiança e facilita a identificação dos membros.',
  },
  {
    icon: FiLock,
    title: 'Dados protegidos',
    description:
      'Seus dados pessoais nunca são expostos publicamente. As informações de contato só são compartilhadas após a confirmação de uma reserva.',
  },
];

const dicasPassageiro = [
  'Confirme o nome do motorista e a placa do carro antes de entrar no veículo.',
  'Avise um amigo ou familiar sobre seu trajeto, horário e dados da carona.',
  'Prefira caronas com motoristas bem avaliados e com histórico na plataforma.',
  'Fique num lugar visível ao aguardar a carona — nunca em locais isolados.',
  'Se sentir desconforto durante a viagem, peça para ser deixado em local seguro e movimentado.',
  'Mantenha seu celular carregado e com dados móveis disponíveis durante o trajeto.',
];

const dicasMotorista = [
  'Verifique o perfil e as avaliações do passageiro antes de confirmar a vaga.',
  'Combine o ponto de encontro em local público e de fácil acesso.',
  'Informe alguém de confiança sobre a rota e os passageiros antes de partir.',
  'Nunca aceite bagagens ou pacotes de desconhecidos para transportar.',
  'Mantenha o carro em boas condições: freios, pneus e iluminação revisados.',
  'Em caso de comportamento suspeito, encerre a viagem em local seguro e registre o ocorrido.',
];

const alertas = [
  {
    icon: FiPhone,
    title: 'Emergências',
    desc: 'SAMU 192 · Bombeiros 193 · Polícia 190',
    color: 'bg-red-50 border-red-200 text-red-700',
    iconColor: 'text-red-500',
  },
  {
    icon: FiAlertTriangle,
    title: 'Situação suspeita?',
    desc: 'Reporte imediatamente pelo nosso canal de suporte dentro da plataforma.',
    color: 'bg-[#E8EE3B]/15 border-[#E8EE3B]/50 text-[#6b5e00]',
    iconColor: 'text-[#b8a800]',
  },
  {
    icon: FiMapPin,
    title: 'Compartilhe sua rota',
    desc: 'Use apps como Google Maps para compartilhar localização em tempo real com alguém de confiança.',
    color: 'bg-[#0A44B1]/6 border-[#0A44B1]/15 text-[#0A44B1]',
    iconColor: 'text-[#0A44B1]',
  },
];

const Seguranca: React.FC = () => {
  const [aba, setAba] = useState<'passageiro' | 'motorista'>('passageiro');
  const dicas = aba === 'passageiro' ? dicasPassageiro : dicasMotorista;

  return (
    <>
      <div className="bg-[#FAFAF7]">

        <section className="relative bg-[#0A44B1] overflow-hidden">
          <div className="absolute top-[-80px] right-[-60px] w-[400px] h-[400px] rounded-full bg-white/5 pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-[-50px] left-[6%] w-[260px] h-[260px] rounded-full bg-[#E8EE3B]/8 pointer-events-none" aria-hidden="true" />
          <div className="absolute inset-0 opacity-[0.035] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} aria-hidden="true" />

          <div className="max-w-[900px] mx-auto px-6 py-16 md:py-24 relative text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-[22px] bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                <FiShield size={30} className="text-[#E8EE3B]" aria-hidden="true" />
              </div>
            </div>
            <span className="inline-flex items-center gap-2 bg-[#E8EE3B]/20 border border-[#E8EE3B]/40 text-[#E8EE3B] text-[12px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
              Segurança em primeiro lugar
            </span>
            <h1 className="text-[2.6rem] md:text-[3.6rem] font-extrabold text-white leading-[1.08] mb-5">
              Viajar bem começa<br />
              <span className="text-[#E8EE3B]">com precaução</span>
            </h1>
            <p className="text-white/65 text-[1.05rem] leading-relaxed max-w-[580px] mx-auto">
              O UniCarona foi construído com segurança como prioridade. Mas a melhor proteção é a informação — saiba como aproveitar ao máximo a plataforma com responsabilidade.
            </p>
          </div>
        </section>

        <section className="max-w-[1000px] mx-auto px-6 -mt-8 mb-20 relative z-10">
          <div className="bg-white border border-neutral-200/60 rounded-[28px] shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {pillars.map((p) => (
              <div key={p.title} className="flex flex-col gap-3 group">
                <div className="w-11 h-11 rounded-2xl bg-[#0A44B1]/8 flex items-center justify-center group-hover:bg-[#0A44B1]/15 transition-colors duration-300">
                  <p.icon size={20} className="text-[#0A44B1]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-[14px] font-extrabold text-slate-900 mb-1">{p.title}</h3>
                  <p className="text-slate-500 text-[12.5px] leading-relaxed">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-[1000px] mx-auto px-6 mb-20">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 bg-[#E8EE3B]/25 border border-[#E8EE3B]/60 text-[#6b5e00] text-[12px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
              Dicas práticas
            </span>
            <h2 className="text-[1.9rem] md:text-[2.4rem] font-extrabold text-slate-900 leading-tight">
              Cuidados essenciais<br />
              <span className="text-[#0A44B1]">antes e durante a carona</span>
            </h2>
          </div>

          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-white border-2 border-neutral-200 rounded-2xl p-1.5 gap-1">
              {(['passageiro', 'motorista'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setAba(t)}
                  id={`tab-${t}`}
                  className={`px-6 py-2.5 rounded-xl font-bold text-[14px] transition-all duration-200
                    ${aba === t
                      ? 'bg-[#0A44B1] text-white shadow-[0_4px_12px_rgba(10,68,177,0.22)]'
                      : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                  {t === 'passageiro' ? 'Sou passageiro' : 'Sou motorista'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dicas.map((dica, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-white border-2 border-neutral-200/70 rounded-[20px] p-5 hover:border-[#0A44B1]/25 hover:shadow-[0_8px_24px_rgba(10,68,177,0.08)] transition-all duration-300 group"
              >
                <span className="w-7 h-7 rounded-full bg-[#0A44B1] text-white text-[13px] font-extrabold flex items-center justify-center flex-shrink-0 shadow-[0_4px_10px_rgba(10,68,177,0.2)] group-hover:scale-110 transition-transform duration-300">
                  {i + 1}
                </span>
                <p className="text-slate-600 text-[14px] leading-relaxed font-medium">{dica}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-[1000px] mx-auto px-6 mb-20">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 bg-[#E8EE3B]/25 border border-[#E8EE3B]/60 text-[#6b5e00] text-[12px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
              Atenção
            </span>
            <h2 className="text-[1.9rem] md:text-[2.2rem] font-extrabold text-slate-900 leading-tight">
              Em caso de <span className="text-[#0A44B1]">emergência</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {alertas.map((a) => (
              <div key={a.title} className={`flex flex-col gap-3 p-6 rounded-[24px] border-2 ${a.color}`}>
                <div className={`w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center`}>
                  <a.icon size={18} className={a.iconColor} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-extrabold text-[15px] mb-1">{a.title}</h3>
                  <p className="text-[13px] leading-relaxed opacity-80 font-medium">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-[1000px] mx-auto px-6 mb-0 pb-0">
          <div className="relative overflow-hidden rounded-[36px] bg-[#0A44B1] px-8 md:px-14 py-12 md:py-14">
            <div className="absolute top-0 right-0 w-[320px] h-[320px] rounded-full bg-white/4 -translate-y-1/2 translate-x-1/3 pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 w-[240px] h-[240px] rounded-full bg-[#E8EE3B]/8 translate-y-1/2 -translate-x-1/4 pointer-events-none" aria-hidden="true" />
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} aria-hidden="true" />

            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-[#E8EE3B]/20 border border-[#E8EE3B]/30 text-[#E8EE3B] text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                  Nosso compromisso
                </div>
                <h2 className="text-[1.6rem] md:text-[2rem] font-extrabold text-white leading-tight mb-3">
                  Segurança é responsabilidade de todos
                </h2>
                <div className="flex flex-col gap-2 mt-4">
                  {[
                    'Verificamos todos os usuários da plataforma',
                    'Mantemos histórico de avaliações público',
                    'Canal de suporte e denúncias disponível',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-white/75 text-[14px] font-medium">
                      <span className="w-5 h-5 rounded-full bg-[#E8EE3B]/20 border border-[#E8EE3B]/40 flex items-center justify-center flex-shrink-0">
                        <FiCheck size={11} className="text-[#E8EE3B]" aria-hidden="true" />
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center gap-3 flex-shrink-0">
                <Link
                  to="/cadastro"
                  id="seguranca-cta"
                  className="inline-flex items-center gap-2.5 bg-[#E8EE3B] text-slate-900 px-7 py-4 rounded-2xl font-extrabold text-[15px] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_12px_36px_rgba(232,238,59,0.45)] hover:brightness-105 active:scale-95 no-underline group shadow-[0_4px_20px_rgba(232,238,59,0.3)]"
                >
                  Criar conta segura
                  <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
                <Link
                  to="/servicos"
                  className="text-white/55 text-[13px] font-medium hover:text-white transition-colors no-underline"
                >
                  Conheça todos os serviços
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default Seguranca;
