import React, { useState, useEffect } from 'react';
import CardCarona, { type Carona } from '../../components/CardCarona';
import { caronaApi, type CaronaFilters } from '../../services/caronaApi';
import { reservaApi } from '../../services/reservaApi';
import { FiMapPin, FiCalendar, FiUsers, FiSearch, FiX, FiAlertCircle, FiStar, FiClock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ListagemCaronas: React.FC = () => {
  const [caronasFiltradas, setCaronasFiltradas] = useState<Carona[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [data, setData] = useState('');
  const [apenasComVagas, setApenasComVagas] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  const [selectedCarona, setSelectedCarona] = useState<Carona | null>(null);
  const [reservaLoading, setReservaLoading] = useState(false);
  const navigate = useNavigate();

  const temFiltrosAtivos = origem || destino || data || apenasComVagas;

  const buscarCaronas = async () => {
    setLoading(true);
    setErro('');
    try {
      const filters: CaronaFilters = {};
      if (origem) filters.origem = origem;
      if (destino) filters.destino = destino;
      if (apenasComVagas) filters.status = 'ATIVA';

      const caronasApi = await caronaApi.buscarCaronas(filters);

      const caronasConvertidas: Carona[] = caronasApi.map((c: any) => {
        const d = new Date(c.dataHoraSaida);
        const dataFormatada = d.toLocaleDateString('pt-BR');
        const horarioFormatado = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        
        return {
          id: c.id,
          motorista: { 
            nome: c.motorista?.nome || 'Desconhecido', 
            universidade: c.motorista?.curso || 'Faminas', 
            avaliacao: c.motorista?.mediaAvaliacao || 5.0 
          },
          origem: c.origem,
          destino: c.destino,
          data: dataFormatada,
          horario: horarioFormatado,
          vagas: c.assentosDisponiveis,
          preco: c.valorAjuda ? parseFloat(c.valorAjuda) : 0,
          observacoes: c.observacoes || '',
          status: c.status === 'AGENDADA' ? 'ativa' : c.status.toLowerCase() as 'ativa' | 'completa' | 'cancelada',
        };
      });

      let resultados = caronasConvertidas;
      if (data) resultados = resultados.filter((c) => c.data === data);
      if (apenasComVagas) resultados = resultados.filter((c) => (c.vagas ?? 0) > 0);

      setCaronasFiltradas(resultados);
    } catch {
      setErro('Não foi possível carregar as caronas. Verifique sua conexão e tente novamente.');
      setCaronasFiltradas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarCaronas();
  }, [origem, destino, data, apenasComVagas]);

  const handleVerDetalhes = (id: string) => {
    const carona = caronasFiltradas.find(c => c.id === id);
    if (carona) setSelectedCarona(carona);
  };

  const handleReservar = async () => {
    if (!selectedCarona) return;

    const userStr = localStorage.getItem('user');
    if (!userStr) {
      alert('Você precisa estar logado para reservar uma carona.');
      navigate('/login');
      return;
    }

    setReservaLoading(true);
    try {
      const user = JSON.parse(userStr);
      await reservaApi.criarReserva(selectedCarona.id, user.id, 1); // Quantidade fixa de 1 pessoa por padrão
      alert('Reserva solicitada com sucesso! Acompanhe no seu Perfil.');
      setSelectedCarona(null);
      // Opcional: Atualizar a lista de caronas para refletir a vaga como pendente, 
      // mas como ela só subtrai ao confirmar, não precisa recarregar obrigatoriamente.
    } catch (error: any) {
      alert(error.message || 'Erro ao realizar reserva.');
    } finally {
      setReservaLoading(false);
    }
  };

  const limparFiltros = () => {
    setOrigem('');
    setDestino('');
    setData('');
    setApenasComVagas(false);
  };

  const fieldClass = (field: string) =>
    `relative flex items-center border-2 rounded-2xl transition-all duration-200 bg-white ${
      focusedField === field
        ? 'border-[#0A44B1] shadow-[0_0_0_4px_rgba(10,68,177,0.08)]'
        : 'border-neutral-200 hover:border-neutral-300'
    }`;

  const iconClass = (field: string) =>
    `absolute left-3.5 text-[16px] transition-colors pointer-events-none ${
      focusedField === field ? 'text-[#0A44B1]' : 'text-slate-400'
    }`;

  return (
    <div className="min-h-screen bg-[#FAFAF7] pb-20">
      {/* ── Page header ──────────────────────────────── */}
      <div className="w-full bg-[#0A44B1] relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-[-60px] right-[-40px] w-[320px] h-[320px] rounded-full bg-white/5 pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-[-40px] left-[10%] w-[200px] h-[200px] rounded-full bg-[#E8EE3B]/8 pointer-events-none" aria-hidden="true" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}
          aria-hidden="true"
        />

        <div className="max-w-[1200px] mx-auto px-6 py-12 relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 bg-[#E8EE3B]/20 border border-[#E8EE3B]/40 text-[#E8EE3B] text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
                <FiSearch size={11} />
                Busca em tempo real
              </span>
              <h1 className="text-[2.2rem] md:text-[2.8rem] font-extrabold text-white leading-tight">
                Caronas disponíveis
              </h1>
              <p className="text-white/60 text-[1rem] mt-2">
                Encontre sua carona universitária perfeita
              </p>
            </div>

            {!loading && (
              <div className="bg-white/10 border border-white/20 rounded-2xl px-5 py-3 text-white text-center flex-shrink-0 backdrop-blur-sm">
                <div className="text-[2rem] font-extrabold leading-none">{caronasFiltradas.length}</div>
                <div className="text-white/60 text-[13px] font-medium mt-0.5">
                  {caronasFiltradas.length === 1 ? 'carona encontrada' : 'caronas encontradas'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        {/* ── Filters ──────────────────────────────────── */}
        <div className="bg-white border border-neutral-200/60 rounded-[28px] shadow-[0_8px_32px_rgba(0,0,0,0.06)] p-5 -mt-6 relative z-10 mb-8">
          <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3">
            {/* Origem */}
            <div className={`${fieldClass('origem')} flex-1 min-w-[180px]`}>
              <FiMapPin className={iconClass('origem')} />
              <input
                id="filter-origem"
                type="text"
                placeholder="Origem"
                value={origem}
                onChange={(e) => setOrigem(e.target.value)}
                onFocus={() => setFocusedField('origem')}
                onBlur={() => setFocusedField(null)}
                className="w-full pl-10 pr-4 py-3 bg-transparent text-[14px] text-slate-800 placeholder:text-slate-300 outline-none font-medium"
              />
              {origem && (
                <button onClick={() => setOrigem('')} className="absolute right-3 text-slate-400 hover:text-slate-600 transition-colors">
                  <FiX size={14} />
                </button>
              )}
            </div>

            {/* Arrow divider */}
            <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-[#0A44B1]/6 flex-shrink-0">
              <svg className="w-4 h-4 text-[#0A44B1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>

            {/* Destino */}
            <div className={`${fieldClass('destino')} flex-1 min-w-[180px]`}>
              <FiMapPin className={`${iconClass('destino')} text-[#0A44B1]`} />
              <input
                id="filter-destino"
                type="text"
                placeholder="Destino"
                value={destino}
                onChange={(e) => setDestino(e.target.value)}
                onFocus={() => setFocusedField('destino')}
                onBlur={() => setFocusedField(null)}
                className="w-full pl-10 pr-4 py-3 bg-transparent text-[14px] text-slate-800 placeholder:text-slate-300 outline-none font-medium"
              />
              {destino && (
                <button onClick={() => setDestino('')} className="absolute right-3 text-slate-400 hover:text-slate-600 transition-colors">
                  <FiX size={14} />
                </button>
              )}
            </div>

            {/* Data */}
            <div className={`${fieldClass('data')} min-w-[180px]`}>
              <FiCalendar className={iconClass('data')} />
              <input
                id="filter-data"
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={data}
                onChange={(e) => setData(e.target.value)}
                onFocus={() => setFocusedField('data')}
                onBlur={() => setFocusedField(null)}
                className="w-full pl-10 pr-4 py-3 bg-transparent text-[14px] text-slate-600 outline-none font-medium"
              />
            </div>

            {/* Vagas toggle */}
            <label
              htmlFor="filter-vagas"
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex-shrink-0 font-semibold text-[14px] ${
                apenasComVagas
                  ? 'border-[#0A44B1] bg-[#0A44B1]/5 text-[#0A44B1]'
                  : 'border-neutral-200 text-slate-500 hover:border-neutral-300 bg-white'
              }`}
            >
              <input
                id="filter-vagas"
                type="checkbox"
                className="sr-only"
                checked={apenasComVagas}
                onChange={(e) => setApenasComVagas(e.target.checked)}
              />
              <FiUsers size={15} />
              Com vagas
            </label>

            {/* Clear filters */}
            {temFiltrosAtivos && (
              <button
                onClick={limparFiltros}
                id="filter-clear"
                className="flex items-center gap-1.5 px-4 py-3 rounded-2xl border-2 border-neutral-200 text-slate-500 hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition-all duration-200 text-[14px] font-semibold flex-shrink-0"
              >
                <FiX size={14} />
                Limpar
              </button>
            )}
          </div>
        </div>

        {/* ── Active filters pills ──────────────────────── */}
        {temFiltrosAtivos && (
          <div className="flex flex-wrap gap-2 mb-6">
            {origem && (
              <span className="inline-flex items-center gap-1.5 bg-[#0A44B1]/8 text-[#0A44B1] text-[12px] font-semibold px-3 py-1.5 rounded-full border border-[#0A44B1]/15">
                <FiMapPin size={11} /> De: {origem}
                <button onClick={() => setOrigem('')} className="ml-0.5 hover:opacity-60 transition-opacity"><FiX size={11} /></button>
              </span>
            )}
            {destino && (
              <span className="inline-flex items-center gap-1.5 bg-[#0A44B1]/8 text-[#0A44B1] text-[12px] font-semibold px-3 py-1.5 rounded-full border border-[#0A44B1]/15">
                <FiMapPin size={11} /> Para: {destino}
                <button onClick={() => setDestino('')} className="ml-0.5 hover:opacity-60 transition-opacity"><FiX size={11} /></button>
              </span>
            )}
            {data && (
              <span className="inline-flex items-center gap-1.5 bg-[#0A44B1]/8 text-[#0A44B1] text-[12px] font-semibold px-3 py-1.5 rounded-full border border-[#0A44B1]/15">
                <FiCalendar size={11} /> {new Date(data).toLocaleDateString('pt-BR')}
                <button onClick={() => setData('')} className="ml-0.5 hover:opacity-60 transition-opacity"><FiX size={11} /></button>
              </span>
            )}
            {apenasComVagas && (
              <span className="inline-flex items-center gap-1.5 bg-[#E8EE3B]/30 text-[#6b5e00] text-[12px] font-semibold px-3 py-1.5 rounded-full border border-[#E8EE3B]/60">
                <FiUsers size={11} /> Apenas com vagas
                <button onClick={() => setApenasComVagas(false)} className="ml-0.5 hover:opacity-60 transition-opacity"><FiX size={11} /></button>
              </span>
            )}
          </div>
        )}

        {/* ── Content ──────────────────────────────────── */}
        {loading ? (
          // Loading skeleton
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-[24px] border-2 border-neutral-100 p-6 flex flex-col gap-4 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-200" />
                  <div className="flex flex-col gap-2 flex-1">
                    <div className="h-4 bg-slate-200 rounded-lg w-3/4" />
                    <div className="h-3 bg-slate-100 rounded-lg w-1/2" />
                  </div>
                </div>
                <div className="h-24 bg-slate-100 rounded-2xl" />
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-14 bg-slate-100 rounded-xl" />
                  <div className="h-14 bg-slate-100 rounded-xl" />
                  <div className="h-14 bg-slate-100 rounded-xl" />
                </div>
                <div className="h-12 bg-slate-200 rounded-2xl mt-auto" />
              </div>
            ))}
          </div>
        ) : erro ? (
          // Error state
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-red-50 border-2 border-red-100 flex items-center justify-center">
              <FiAlertCircle size={28} className="text-red-400" />
            </div>
            <div>
              <h3 className="text-[1.1rem] font-bold text-slate-700 mb-1">Ops! Algo deu errado</h3>
              <p className="text-slate-400 text-[14px] max-w-[360px]">{erro}</p>
            </div>
            <button
              onClick={buscarCaronas}
              className="mt-2 px-6 py-3 bg-[#0A44B1] text-white rounded-2xl font-semibold text-[14px] hover:bg-[#08368d] hover:scale-[1.02] transition-all duration-200 shadow-[0_4px_12px_rgba(10,68,177,0.2)]"
            >
              Tentar novamente
            </button>
          </div>
        ) : caronasFiltradas.length === 0 ? (
          // Empty state
          <div className="flex flex-col items-center gap-5 py-20 text-center">
            <div className="w-20 h-20 rounded-3xl bg-[#0A44B1]/6 border-2 border-[#0A44B1]/10 flex items-center justify-center">
              <svg className="w-9 h-9 text-[#0A44B1]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 1h8l2-1zM17 16V9l-3-3h-1" />
              </svg>
            </div>
            <div>
              <h3 className="text-[1.3rem] font-extrabold text-slate-800 mb-2">Nenhuma carona encontrada</h3>
              <p className="text-slate-400 text-[15px] max-w-[360px] leading-relaxed">
                {temFiltrosAtivos
                  ? 'Tente ajustar os filtros para encontrar mais resultados.'
                  : 'Não há caronas disponíveis no momento. Volte mais tarde.'}
              </p>
            </div>
            {temFiltrosAtivos && (
              <button
                onClick={limparFiltros}
                className="mt-1 px-6 py-3 border-2 border-[#0A44B1] text-[#0A44B1] rounded-2xl font-semibold text-[14px] hover:bg-[#0A44B1] hover:text-white transition-all duration-200"
              >
                Limpar filtros
              </button>
            )}
          </div>
        ) : (
          // Cards grid
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {caronasFiltradas.map((carona) => (
              <CardCarona key={carona.id} carona={carona} onVerDetalhes={handleVerDetalhes} />
            ))}
          </div>
        )}
      </div>

      {/* ── Modal de Detalhes da Carona ───────────────── */}
      {selectedCarona && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => !reservaLoading && setSelectedCarona(null)}
          />
          
          {/* Modal Content */}
          <div className="relative w-full max-w-[520px] bg-white rounded-[32px] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-neutral-100">
              <h3 className="text-xl font-extrabold text-slate-800">Detalhes da Carona</h3>
              <button 
                onClick={() => setSelectedCarona(null)}
                disabled={reservaLoading}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 flex flex-col gap-6 overflow-y-auto max-h-[70vh]">
              {/* Motorista Info */}
              <div className="flex items-center gap-4 bg-[#FAFAF7] p-4 rounded-2xl border border-neutral-100">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0A44B1] to-[#1a5cd8] flex items-center justify-center flex-shrink-0 text-white text-[18px] font-extrabold shadow-sm">
                  {selectedCarona.motorista.nome.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()}
                </div>
                <div>
                  <div className="text-[16px] font-bold text-slate-900">{selectedCarona.motorista.nome}</div>
                  <div className="text-[13px] text-[#0A44B1] font-semibold">{selectedCarona.motorista.universidade}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <FiStar size={12} className="text-[#E8EE3B] fill-[#E8EE3B]" />
                    <span className="text-[12px] font-bold text-slate-700">
                      {(selectedCarona.motorista.avaliacao ?? 5.0).toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Rota */}
              <div className="flex flex-col gap-0 relative">
                <div className="absolute left-[19px] top-[30px] bottom-[30px] w-0.5 bg-neutral-200" />
                
                <div className="flex items-start gap-4 relative z-10 bg-white">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 border-2 border-emerald-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <div className="pb-6">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Origem</span>
                    <div className="text-[16px] font-semibold text-slate-800">{selectedCarona.origem}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 relative z-10 bg-white">
                  <div className="w-10 h-10 rounded-full bg-[#0A44B1]/10 border-2 border-[#0A44B1]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <FiMapPin size={16} className="text-[#0A44B1]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Destino</span>
                    <div className="text-[16px] font-semibold text-[#0A44B1]">{selectedCarona.destino}</div>
                  </div>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1 bg-[#FAFAF7] p-3.5 rounded-2xl border border-neutral-100">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase">Data da viagem</span>
                  <div className="flex items-center gap-2 text-slate-800 font-bold">
                    <FiCalendar className="text-[#0A44B1]" /> {selectedCarona.data}
                  </div>
                </div>
                <div className="flex flex-col gap-1 bg-[#FAFAF7] p-3.5 rounded-2xl border border-neutral-100">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase">Horário de saída</span>
                  <div className="flex items-center gap-2 text-slate-800 font-bold">
                    <FiClock className="text-[#0A44B1]" /> {selectedCarona.horario || 'Combinar'}
                  </div>
                </div>
                <div className="flex flex-col gap-1 bg-[#FAFAF7] p-3.5 rounded-2xl border border-neutral-100">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase">Vagas livres</span>
                  <div className="flex items-center gap-2 text-slate-800 font-bold">
                    <FiUsers className="text-[#0A44B1]" /> {selectedCarona.vagas} lugares
                  </div>
                </div>
                <div className="flex flex-col gap-1 bg-[#FAFAF7] p-3.5 rounded-2xl border border-neutral-100">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase">Valor por pessoa</span>
                  <div className="flex items-center gap-2 text-[#0A44B1] font-extrabold text-[16px]">
                    R$ {selectedCarona.preco.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Observações */}
              {selectedCarona.observacoes && (
                <div className="bg-[#0A44B1]/5 p-4 rounded-2xl border border-[#0A44B1]/10">
                  <div className="flex items-center gap-2 mb-1">
                    <FiAlertCircle size={14} className="text-[#0A44B1]" />
                    <span className="text-[12px] font-bold text-[#0A44B1] uppercase">Avisos do Motorista</span>
                  </div>
                  <p className="text-[14px] text-slate-700 leading-relaxed">
                    {selectedCarona.observacoes}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-slate-50 border-t border-neutral-100">
              <button
                onClick={handleReservar}
                disabled={reservaLoading || !selectedCarona.vagas}
                className="w-full py-4 rounded-2xl bg-[#0A44B1] text-white font-bold text-[16px] flex items-center justify-center gap-2 hover:bg-[#08368d] hover:shadow-lg hover:shadow-[#0A44B1]/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {reservaLoading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                    Processando reserva...
                  </>
                ) : (
                  'Reservar Carona'
                )}
              </button>
              <p className="text-center text-[12px] text-slate-400 font-medium mt-3">
                Você será notificado assim que o motorista confirmar.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListagemCaronas;