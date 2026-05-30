import React, { useState } from 'react';
import { FiMapPin, FiCalendar, FiClock, FiUsers, FiStar, FiArrowRight, FiAlertCircle } from 'react-icons/fi';

export interface Carona {
  id: string;
  motorista: {
    id?: string;
    nome: string;
    universidade: string;
    avaliacao?: number;
    avaliacaoMedia?: number;
  };
  origem: string;
  destino: string;
  data: string;
  horario?: string;
  horarioPartida?: string;
  vagas?: number;
  vagasDisponiveis?: number;
  preco: number;
  observacoes?: string;
  status?: 'ativa' | 'completa' | 'cancelada';
}

interface CardCaronaProps {
  carona: Carona;
  onVerDetalhes: (id: string) => void;
}

const CardCarona: React.FC<CardCaronaProps> = ({ carona, onVerDetalhes }) => {
  const [hovered, setHovered] = useState(false);

  const getVagas = () => carona.vagas ?? carona.vagasDisponiveis ?? 0;
  const getAvaliacao = () => carona.motorista.avaliacao ?? carona.motorista.avaliacaoMedia ?? 0;
  const getHorario = () => carona.horario ?? carona.horarioPartida ?? '';

  const formatarData = (data: string) => {
    try {
      return new Date(data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch {
      return data;
    }
  };

  const isDisponivel = () => {
    if (carona.status === 'cancelada' || carona.status === 'completa') return false;
    return getVagas() > 0;
  };

  const vagas = getVagas();
  const avaliacao = getAvaliacao();
  const horario = getHorario();

  const statusConfig = {
    ativa: { label: 'Disponível', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
    completa: { label: 'Completa', bg: 'bg-slate-100', text: 'text-slate-500', border: 'border-slate-200', dot: 'bg-slate-400' },
    cancelada: { label: 'Cancelada', bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', dot: 'bg-red-500' },
  };
  const status = carona.status ?? 'ativa';
  const sc = statusConfig[status] ?? statusConfig.ativa;

  const initials = carona.motorista.nome
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <article
      className={`relative bg-white rounded-[24px] border-2 flex flex-col transition-all duration-300 cursor-default overflow-hidden
        ${hovered && isDisponivel() ? 'border-[#0A44B1]/30 shadow-[0_16px_48px_rgba(10,68,177,0.12)] -translate-y-1' : 'border-neutral-200/70 shadow-[0_4px_16px_rgba(0,0,0,0.06)]'}
      `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {}
      <div className={`h-1 w-full transition-all duration-300 ${hovered && isDisponivel() ? 'bg-[#0A44B1]' : 'bg-transparent'}`} />

      <div className="p-6 flex flex-col gap-5 flex-1">
        {}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0A44B1] to-[#1a5cd8] flex items-center justify-center flex-shrink-0 text-white text-[15px] font-extrabold shadow-[0_4px_12px_rgba(10,68,177,0.2)]">
              {initials}
            </div>
            <div>
              <div className="text-[15px] font-bold text-slate-900 leading-tight">{carona.motorista.nome}</div>
              <div className="text-[12px] text-[#0A44B1] font-semibold mt-0.5">{carona.motorista.universidade}</div>
              {avaliacao > 0 && (
                <div className="flex items-center gap-1 mt-1">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FiStar
                        key={i}
                        size={11}
                        className={i < Math.floor(avaliacao) ? 'text-[#E8EE3B] fill-[#E8EE3B]' : 'text-slate-200 fill-slate-200'}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">({avaliacao.toFixed(1)})</span>
                </div>
              )}
            </div>
          </div>

          {}
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[12px] font-semibold flex-shrink-0 ${sc.bg} ${sc.text} ${sc.border}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
            {sc.label}
          </div>
        </div>

        {}
        <div className="flex flex-col gap-0 bg-[#FAFAF7] rounded-2xl px-4 py-3 border border-neutral-100">
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white shadow-sm" />
              <div className="w-px h-5 bg-neutral-300" />
              <FiMapPin size={12} className="text-[#0A44B1]" />
            </div>
            <div className="flex flex-col gap-3 flex-1 min-w-0">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Saída</span>
                <div className="text-[14px] font-semibold text-slate-800 truncate">{carona.origem}</div>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Chegada</span>
                <div className="text-[14px] font-semibold text-[#0A44B1] truncate">{carona.destino}</div>
              </div>
            </div>
          </div>
        </div>

        {}
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center gap-1.5 bg-[#FAFAF7] rounded-xl p-2.5 border border-neutral-100">
            <FiCalendar size={14} className="text-[#0A44B1]" />
            <span className="text-[11px] font-semibold text-slate-500 text-center leading-tight">{formatarData(carona.data)}</span>
          </div>
          {horario && (
            <div className="flex flex-col items-center gap-1.5 bg-[#FAFAF7] rounded-xl p-2.5 border border-neutral-100">
              <FiClock size={14} className="text-[#0A44B1]" />
              <span className="text-[11px] font-semibold text-slate-500">{horario}</span>
            </div>
          )}
          <div className={`flex flex-col items-center gap-1.5 rounded-xl p-2.5 border ${vagas > 0 ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'} ${!horario ? 'col-span-2' : ''}`}>
            <FiUsers size={14} className={vagas > 0 ? 'text-emerald-600' : 'text-red-500'} />
            <span className={`text-[11px] font-bold ${vagas > 0 ? 'text-emerald-700' : 'text-red-600'}`}>
              {vagas > 0 ? `${vagas} vaga${vagas > 1 ? 's' : ''}` : 'Esgotado'}
            </span>
          </div>
        </div>

        {}
        {carona.observacoes && (
          <div className="flex items-start gap-2 bg-[#0A44B1]/4 rounded-xl px-3 py-2.5 border border-[#0A44B1]/10">
            <FiAlertCircle size={13} className="text-[#0A44B1] flex-shrink-0 mt-0.5" />
            <span className="text-[12px] text-slate-600 leading-snug">{carona.observacoes}</span>
          </div>
        )}

        {}
        {carona.status === 'cancelada' && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5">
            <span className="text-red-500 text-[12px] font-semibold">⚠ Esta carona foi cancelada</span>
          </div>
        )}

        {}
        <div className="flex items-center justify-between pt-3 border-t border-neutral-100 mt-auto">
          <div>
            <span className="text-[11px] text-slate-400 font-medium block">Por pessoa</span>
            <span className="text-[1.6rem] font-extrabold text-[#0A44B1] leading-none">
              R$ {carona.preco.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => isDisponivel() && onVerDetalhes(carona.id)}
            disabled={!isDisponivel()}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-[14px] transition-all duration-300 
              ${isDisponivel()
                ? 'bg-[#0A44B1] text-white hover:bg-[#08368d] hover:scale-[1.04] hover:shadow-[0_8px_20px_rgba(10,68,177,0.28)] active:scale-95 shadow-[0_4px_12px_rgba(10,68,177,0.2)]'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
          >
            {isDisponivel() ? (
              <>
                Ver detalhes
                <FiArrowRight size={15} className={`transition-transform duration-300 ${hovered ? 'translate-x-0.5' : ''}`} />
              </>
            ) : (
              'Indisponível'
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

export default CardCarona;