import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { veiculoApi, type Veiculo } from '../../services/veiculoApi';
import { caronaApi, type CaronaResponse } from '../../services/caronaApi';
import { reservaApi, type Reserva } from '../../services/reservaApi';
import { Link, useNavigate } from 'react-router-dom';
import { FiTruck, FiPlus, FiMapPin, FiCalendar, FiUsers, FiTrash2, FiEdit3, FiX, FiClock, FiDollarSign, FiAlertCircle, FiCheckCircle, FiXCircle, FiUser } from 'react-icons/fi';

type Tab = 'veiculos' | 'caronas' | 'criar-carona';

const statusLabels: Record<string, { label: string; color: string }> = {
  AGENDADA: { label: 'Agendada', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  EM_ANDAMENTO: { label: 'Em Andamento', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  FINALIZADA: { label: 'Finalizada', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  CANCELADA: { label: 'Cancelada', color: 'bg-red-100 text-red-700 border-red-200' },
};

const Motorista: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('veiculos');

  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [loadingVeiculos, setLoadingVeiculos] = useState(true);
  const [modalVeiculo, setModalVeiculo] = useState(false);
  const [editVeiculo, setEditVeiculo] = useState<Veiculo | null>(null);
  const [vPlaca, setVPlaca] = useState('');
  const [vMarca, setVMarca] = useState('');
  const [vModelo, setVModelo] = useState('');
  const [vCor, setVCor] = useState('');
  const [salvandoVeiculo, setSalvandoVeiculo] = useState(false);

  const [caronas, setCaronas] = useState<CaronaResponse[]>([]);
  const [loadingCaronas, setLoadingCaronas] = useState(true);

  const [cOrigem, setCOrigem] = useState('');
  const [cDestino, setCDestino] = useState('');
  const [cDataHora, setCDataHora] = useState('');
  const [cAssentos, setCAssentos] = useState(1);
  const [cValor, setCValor] = useState('');
  const [cVeiculoId, setCVeiculoId] = useState('');
  const [salvandoCarona, setSalvandoCarona] = useState(false);

  const [passageirosModal, setPassageirosModal] = useState(false);
  const [passageiros, setPassageiros] = useState<Reserva[]>([]);
  const [loadingPassageiros, setLoadingPassageiros] = useState(false);
  const [caronaSelecionada, setCaronaSelecionada] = useState<any>(null);
  const [atualizandoReserva, setAtualizandoReserva] = useState<string | null>(null);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    carregarVeiculos();
    carregarCaronas();
  }, [user]);

  const carregarVeiculos = async () => {
    if (!user) return;
    setLoadingVeiculos(true);
    try {
      const data = await veiculoApi.buscarVeiculosPorMotorista(user.id);
      setVeiculos(data);
    } catch (err) { console.error(err); }
    finally { setLoadingVeiculos(false); }
  };

  const carregarCaronas = async () => {
    if (!user) return;
    setLoadingCaronas(true);
    try {
      const data = await caronaApi.buscarCaronasPorMotorista(user.id);
      setCaronas(data);
    } catch (err) { console.error(err); }
    finally { setLoadingCaronas(false); }
  };

  const abrirModalVeiculo = (v?: Veiculo) => {
    if (v) {
      setEditVeiculo(v);
      setVPlaca(v.placa); setVMarca(v.marca); setVModelo(v.modelo); setVCor(v.cor);
    } else {
      setEditVeiculo(null);
      setVPlaca(''); setVMarca(''); setVModelo(''); setVCor('');
    }
    setModalVeiculo(true);
  };

  const salvarVeiculo = async () => {
    if (!user) return;
    if (!vPlaca.trim() || !vMarca.trim() || !vModelo.trim() || !vCor.trim()) {
      alert('Preencha todos os campos do veículo.'); return;
    }
    setSalvandoVeiculo(true);
    try {
      if (editVeiculo) {
        await veiculoApi.atualizarVeiculo(editVeiculo.id, { placa: vPlaca, marca: vMarca, modelo: vModelo, cor: vCor });
      } else {
        await veiculoApi.criarVeiculo({ placa: vPlaca, marca: vMarca, modelo: vModelo, cor: vCor, motoristaId: user.id });
      }
      setModalVeiculo(false);
      carregarVeiculos();
    } catch (err: any) { alert(err.message || 'Erro ao salvar veículo.'); }
    finally { setSalvandoVeiculo(false); }
  };

  const deletarVeiculo = async (id: string) => {
    if (!confirm('Deseja realmente excluir este veículo?')) return;
    try {
      await veiculoApi.deletarVeiculo(id);
      carregarVeiculos();
    } catch (err: any) { alert(err.message || 'Erro ao excluir veículo.'); }
  };

  const criarCarona = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!cOrigem || !cDestino || !cDataHora || !cVeiculoId) {
      alert('Preencha todos os campos obrigatórios.'); return;
    }
    setSalvandoCarona(true);
    try {
      await caronaApi.criarCarona({
        motoristaId: user.id,
        veiculoId: cVeiculoId,
        origem: cOrigem,
        destino: cDestino,
        dataHoraSaida: new Date(cDataHora).toISOString(),
        assentosDisponiveis: cAssentos,
        valorAjuda: parseFloat(cValor) || 0,
        status: 'AGENDADA',
      } as any);
      alert('Carona criada com sucesso!');
      setCOrigem(''); setCDestino(''); setCDataHora(''); setCAssentos(1); setCValor(''); setCVeiculoId('');
      setTab('caronas');
      carregarCaronas();
    } catch (err: any) { alert(err.message || 'Erro ao criar carona.'); }
    finally { setSalvandoCarona(false); }
  };

  const cancelarCarona = async (id: string) => {
    if (!confirm('Deseja realmente cancelar esta carona?')) return;
    try {
      await caronaApi.cancelarCarona(id);
      carregarCaronas();
    } catch (err: any) { alert(err.message || 'Erro ao cancelar carona.'); }
  };

  const verPassageiros = async (carona: any) => {
    setCaronaSelecionada(carona);
    setPassageirosModal(true);
    setLoadingPassageiros(true);
    try {
      const data = await reservaApi.findByCaronaId(carona.id);
      setPassageiros(data);
    } catch (err) { console.error(err); setPassageiros([]); }
    finally { setLoadingPassageiros(false); }
  };

  const atualizarStatusReserva = async (reservaId: string, status: 'CONFIRMADA' | 'CANCELADA') => {
    setAtualizandoReserva(reservaId);
    try {
      await reservaApi.atualizarStatus(reservaId, status);
      if (caronaSelecionada) verPassageiros(caronaSelecionada);
    } catch (err: any) { alert(err.message || 'Erro ao atualizar reserva.'); }
    finally { setAtualizandoReserva(null); }
  };

  if (!user) return null;

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'veiculos', label: 'Meus Veículos', icon: <FiTruck size={16} /> },
    { key: 'caronas', label: 'Minhas Caronas', icon: <FiMapPin size={16} /> },
    { key: 'criar-carona', label: 'Criar Carona', icon: <FiPlus size={16} /> },
  ];

  const inputCls = 'w-full px-4 py-3 text-[14px] text-slate-800 border-2 border-neutral-200 outline-none rounded-xl bg-white focus:border-[#0A44B1] transition-colors font-medium';
  const labelCls = 'text-[13px] font-bold text-slate-700 uppercase tracking-wide';

  return (
    <div className="min-h-screen bg-[#FAFAF7] pb-20">
      {}
      <div className="w-full bg-[#0A44B1] relative overflow-hidden pt-12 pb-32">
        <div className="absolute top-[-60px] right-[-40px] w-[320px] h-[320px] rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="max-w-[1000px] mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Área do Motorista</h1>
          <p className="text-[#E8EE3B] mt-2 font-medium">Gerencie seus veículos e caronas.</p>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-6 -mt-20 relative z-20">
        {}
        <div className="bg-white rounded-[24px] border-2 border-neutral-100 shadow-xl p-2 mb-8 flex gap-2 overflow-x-auto">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-[14px] transition-all whitespace-nowrap ${tab === t.key ? 'bg-[#0A44B1] text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {}
        {tab === 'veiculos' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-extrabold text-slate-800">Meus Veículos</h3>
              <button onClick={() => abrirModalVeiculo()}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#0A44B1] text-white rounded-xl font-bold text-[14px] hover:bg-[#08368d] transition-colors shadow-md">
                <FiPlus size={16} /> Adicionar Veículo
              </button>
            </div>

            {loadingVeiculos ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1,2].map(i => (
                  <div key={i} className="bg-white rounded-[24px] border-2 border-neutral-100 p-6 animate-pulse">
                    <div className="h-6 bg-slate-200 rounded-lg w-1/2 mb-4" />
                    <div className="h-4 bg-slate-100 rounded-lg w-3/4" />
                  </div>
                ))}
              </div>
            ) : veiculos.length === 0 ? (
              <div className="bg-white rounded-[24px] border-2 border-dashed border-neutral-200 p-12 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 mx-auto text-slate-300"><FiTruck size={28} /></div>
                <h4 className="text-[18px] font-bold text-slate-700">Nenhum veículo cadastrado</h4>
                <p className="text-slate-400 mt-1 max-w-sm mx-auto">Cadastre um veículo para começar a oferecer caronas.</p>
                <button onClick={() => abrirModalVeiculo()} className="mt-6 bg-[#0A44B1]/10 text-[#0A44B1] font-bold px-6 py-3 rounded-xl hover:bg-[#0A44B1]/20 transition-colors">
                  <FiPlus className="inline mr-2" /> Cadastrar Veículo
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {veiculos.map(v => (
                  <div key={v.id} className="bg-white rounded-[24px] border-2 border-neutral-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-[#0A44B1]/10 flex items-center justify-center"><FiTruck className="text-[#0A44B1]" size={20} /></div>
                        <div>
                          <div className="text-[16px] font-bold text-slate-800">{v.marca} {v.modelo}</div>
                          <div className="text-[13px] text-slate-500 font-medium">{v.placa}</div>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-[12px] font-bold">{v.cor}</span>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button onClick={() => abrirModalVeiculo(v)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border-2 border-neutral-200 rounded-xl text-slate-600 font-semibold text-[13px] hover:border-[#0A44B1]/30 hover:text-[#0A44B1] transition-colors">
                        <FiEdit3 size={14} /> Editar
                      </button>
                      <button onClick={() => deletarVeiculo(v.id)} className="flex items-center justify-center gap-1.5 px-4 py-2.5 border-2 border-red-200 rounded-xl text-red-500 font-semibold text-[13px] hover:bg-red-50 transition-colors">
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {}
        {tab === 'caronas' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-extrabold text-slate-800">Minhas Caronas</h3>
              <button onClick={() => setTab('criar-carona')} className="flex items-center gap-2 px-5 py-2.5 bg-[#0A44B1] text-white rounded-xl font-bold text-[14px] hover:bg-[#08368d] transition-colors shadow-md">
                <FiPlus size={16} /> Nova Carona
              </button>
            </div>

            {loadingCaronas ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1,2,3].map(i => (
                  <div key={i} className="bg-white rounded-[24px] border-2 border-neutral-100 p-6 animate-pulse">
                    <div className="h-6 bg-slate-200 rounded-lg w-3/4 mb-3" />
                    <div className="h-4 bg-slate-100 rounded-lg w-1/2 mb-2" />
                    <div className="h-4 bg-slate-100 rounded-lg w-1/3" />
                  </div>
                ))}
              </div>
            ) : caronas.length === 0 ? (
              <div className="bg-white rounded-[24px] border-2 border-dashed border-neutral-200 p-12 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 mx-auto text-slate-300"><FiMapPin size={28} /></div>
                <h4 className="text-[18px] font-bold text-slate-700">Nenhuma carona criada</h4>
                <p className="text-slate-400 mt-1">Crie sua primeira carona e ajude outros estudantes!</p>
                <button onClick={() => setTab('criar-carona')} className="mt-6 bg-[#0A44B1]/10 text-[#0A44B1] font-bold px-6 py-3 rounded-xl hover:bg-[#0A44B1]/20 transition-colors">
                  <FiPlus className="inline mr-2" /> Criar Carona
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {caronas.map((c: any) => {
                  const d = new Date(c.dataHoraSaida);
                  const sl = statusLabels[c.status] || statusLabels.AGENDADA;
                  return (
                    <div key={c.id} className="bg-white rounded-[24px] border-2 border-neutral-100 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[12px] font-bold ${sl.color}`}>
                          <FiCheckCircle size={12} /> {sl.label}
                        </span>
                        <span className="text-[13px] text-slate-400 font-medium flex items-center gap-1"><FiCalendar size={12} /> {d.toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex items-center gap-3 mb-3 bg-[#FAFAF7] p-3 rounded-xl">
                        <div className="flex flex-col items-center gap-0.5">
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          <div className="w-px h-6 bg-neutral-200" />
                          <div className="w-2 h-2 rounded-full bg-[#0A44B1]" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="text-[14px] font-bold text-slate-800 leading-none">{c.origem}</span>
                          <span className="text-[14px] font-bold text-[#0A44B1] leading-none">{c.destino}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-[13px] text-slate-500 font-medium mb-4">
                        <span className="flex items-center gap-1"><FiClock size={12} /> {d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                        <span className="flex items-center gap-1"><FiUsers size={12} /> {c.assentosDisponiveis || 0} vagas</span>
                        <span className="flex items-center gap-1"><FiDollarSign size={12} /> R$ {parseFloat(c.valorAjuda || 0).toFixed(2)}</span>
                      </div>
                      <div className="flex gap-2 mt-auto pt-2">
                        {(c.status === 'AGENDADA' || c.status === 'EM_ANDAMENTO') && (
                          <button onClick={() => cancelarCarona(c.id)}
                            className="flex-1 border-2 border-red-200 text-red-500 py-2.5 rounded-xl font-bold text-[13px] flex items-center justify-center gap-2 hover:bg-red-50 transition-colors">
                            <FiX size={14} /> Cancelar
                          </button>
                        )}
                        <button onClick={() => verPassageiros(c)}
                          className="flex-1 border-2 border-[#0A44B1] text-[#0A44B1] py-2.5 rounded-xl font-bold text-[13px] flex items-center justify-center gap-2 hover:bg-[#0A44B1] hover:text-white transition-colors">
                          <FiUsers size={14} /> Passageiros
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {}
        {tab === 'criar-carona' && (
          <div className="max-w-[600px]">
            <h3 className="text-2xl font-extrabold text-slate-800 mb-6">Criar Nova Carona</h3>

            {veiculos.length === 0 ? (
              <div className="bg-amber-50 border-2 border-amber-200 rounded-[24px] p-8 text-center">
                <FiAlertCircle size={32} className="text-amber-500 mx-auto mb-3" />
                <h4 className="text-[18px] font-bold text-amber-800">Cadastre um veículo primeiro</h4>
                <p className="text-amber-600 mt-1 text-[14px]">Você precisa ter pelo menos um veículo cadastrado para criar uma carona.</p>
                <button onClick={() => { setTab('veiculos'); setTimeout(() => abrirModalVeiculo(), 300); }}
                  className="mt-4 bg-amber-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-amber-600 transition-colors">
                  <FiPlus className="inline mr-2" /> Cadastrar Veículo
                </button>
              </div>
            ) : (
              <form onSubmit={criarCarona} className="bg-white rounded-[24px] border-2 border-neutral-100 shadow-xl p-8 flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className={labelCls}>Origem *</label>
                    <input type="text" placeholder="De onde você sai?" value={cOrigem} onChange={e => setCOrigem(e.target.value)} className={inputCls} required />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className={labelCls}>Destino *</label>
                    <input type="text" placeholder="Para onde você vai?" value={cDestino} onChange={e => setCDestino(e.target.value)} className={inputCls} required />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className={labelCls}>Data e Hora *</label>
                    <input type="datetime-local" value={cDataHora} onChange={e => setCDataHora(e.target.value)}
                      min={new Date().toISOString().slice(0, 16)} className={inputCls} required />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className={labelCls}>Veículo *</label>
                    <select value={cVeiculoId} onChange={e => setCVeiculoId(e.target.value)} className={inputCls} required>
                      <option value="">Selecione...</option>
                      {veiculos.map(v => (
                        <option key={v.id} value={v.id}>{v.marca} {v.modelo} ({v.placa})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className={labelCls}>Assentos Disponíveis</label>
                    <input type="number" min={1} max={8} value={cAssentos} onChange={e => setCAssentos(parseInt(e.target.value) || 1)} className={inputCls} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className={labelCls}>Valor de Ajuda (R$)</label>
                    <input type="number" step="0.01" min={0} placeholder="0.00" value={cValor} onChange={e => setCValor(e.target.value)} className={inputCls} />
                  </div>
                </div>

                <button type="submit" disabled={salvandoCarona}
                  className="mt-2 w-full bg-[#0A44B1] text-white py-4 rounded-2xl font-bold text-[16px] hover:bg-[#08368d] transition-all disabled:opacity-60 flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(10,68,177,0.22)]">
                  {salvandoCarona ? (
                    <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Criando...</>
                  ) : (
                    <><FiPlus size={18} /> Criar Carona</>
                  )}
                </button>
              </form>
            )}
          </div>
        )}
      </div>

      {}
      {modalVeiculo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => !salvandoVeiculo && setModalVeiculo(false)} />
          <div className="relative w-full max-w-[480px] bg-white rounded-[32px] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100 bg-slate-50/50">
              <h3 className="text-[18px] font-extrabold text-slate-800 flex items-center gap-2">
                <FiTruck className="text-[#0A44B1]" /> {editVeiculo ? 'Editar Veículo' : 'Novo Veículo'}
              </h3>
              <button onClick={() => setModalVeiculo(false)} disabled={salvandoVeiculo} className="text-slate-400 hover:text-slate-600 p-1"><FiX size={20} /></button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>Placa *</label>
                <input type="text" placeholder="ABC-1234" value={vPlaca} onChange={e => setVPlaca(e.target.value.toUpperCase())} className={inputCls} maxLength={8} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>Marca *</label>
                  <input type="text" placeholder="Ex: Fiat" value={vMarca} onChange={e => setVMarca(e.target.value)} className={inputCls} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>Modelo *</label>
                  <input type="text" placeholder="Ex: Uno" value={vModelo} onChange={e => setVModelo(e.target.value)} className={inputCls} />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>Cor *</label>
                <input type="text" placeholder="Ex: Branco" value={vCor} onChange={e => setVCor(e.target.value)} className={inputCls} />
              </div>
            </div>
            <div className="p-6 bg-slate-50 border-t border-neutral-100">
              <button onClick={salvarVeiculo} disabled={salvandoVeiculo}
                className="w-full bg-[#0A44B1] text-white py-3.5 rounded-xl font-bold text-[15px] hover:bg-[#08368d] transition-all flex items-center justify-center gap-2 disabled:opacity-60">
                {salvandoVeiculo ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Salvando...</> : (editVeiculo ? 'Salvar Alterações' : 'Cadastrar Veículo')}
              </button>
            </div>
          </div>
        </div>
      )}

      {}
      {passageirosModal && caronaSelecionada && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setPassageirosModal(false)} />
          <div className="relative w-full max-w-[520px] bg-white rounded-[32px] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100 bg-slate-50/50">
              <h3 className="text-[18px] font-extrabold text-slate-800 flex items-center gap-2">
                <FiUsers className="text-[#0A44B1]" /> Passageiros
              </h3>
              <button onClick={() => setPassageirosModal(false)} className="text-slate-400 hover:text-slate-600 p-1"><FiX size={20} /></button>
            </div>
            <div className="px-6 py-3 bg-[#FAFAF7] border-b border-neutral-100">
              <div className="flex items-center gap-2 text-[13px] text-slate-500 font-medium">
                <FiMapPin size={12} className="text-emerald-500" /> {caronaSelecionada.origem}
                <span className="text-slate-300">→</span>
                <FiMapPin size={12} className="text-[#0A44B1]" /> {caronaSelecionada.destino}
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {loadingPassageiros ? (
                <div className="flex flex-col gap-3">
                  {[1,2].map(i => <div key={i} className="h-16 bg-slate-100 rounded-xl animate-pulse" />)}
                </div>
              ) : passageiros.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-3 mx-auto text-slate-300"><FiUsers size={22} /></div>
                  <p className="text-slate-500 font-medium">Nenhuma reserva para esta carona.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {passageiros.map(r => {
                    const nome = r.usuario?.nome || 'Passageiro';
                    const initials = nome.split(' ').slice(0,2).map((n: string) => n[0]).join('').toUpperCase();
                    return (
                      <div key={r.id} className="flex items-center justify-between bg-[#FAFAF7] p-4 rounded-xl border border-neutral-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#0A44B1]/10 flex items-center justify-center text-[#0A44B1] text-[12px] font-extrabold">{initials}</div>
                          <div>
                            <div className="text-[14px] font-bold text-slate-800">{nome}</div>
                            <div className="text-[12px] text-slate-400">{r.quantidadePessoas} pessoa{r.quantidadePessoas > 1 ? 's' : ''}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {r.status === 'PENDENTE' && (
                            <>
                              <button onClick={() => atualizarStatusReserva(r.id, 'CONFIRMADA')} disabled={atualizandoReserva === r.id}
                                className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center hover:bg-emerald-200 transition-colors disabled:opacity-50">
                                <FiCheckCircle size={16} />
                              </button>
                              <button onClick={() => atualizarStatusReserva(r.id, 'CANCELADA')} disabled={atualizandoReserva === r.id}
                                className="w-8 h-8 rounded-lg bg-red-100 text-red-500 flex items-center justify-center hover:bg-red-200 transition-colors disabled:opacity-50">
                                <FiXCircle size={16} />
                              </button>
                            </>
                          )}
                          {r.status === 'CONFIRMADA' && <span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full text-[11px] font-bold">Confirmada</span>}
                          {r.status === 'CANCELADA' && <span className="bg-red-100 text-red-600 px-2.5 py-1 rounded-full text-[11px] font-bold">Cancelada</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Motorista;
