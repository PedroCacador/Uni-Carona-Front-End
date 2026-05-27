import React, { useState, useEffect } from 'react';
import { FiUser, FiMail, FiBook, FiStar, FiMapPin, FiCalendar, FiCheckCircle, FiXCircle, FiClock, FiX, FiEdit3, FiLock, FiAlertCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { reservaApi, type Reserva } from '../../services/reservaApi';
import { caronaApi } from '../../services/caronaApi';
import { authApi } from '../../services/authApi';

const Perfil: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal Avaliacao State
  const [avaliarModalAberto, setAvaliarModalAberto] = useState(false);
  const [reservaParaAvaliar, setReservaParaAvaliar] = useState<Reserva | null>(null);
  const [nota, setNota] = useState(0);
  const [comentario, setComentario] = useState('');
  const [enviandoAvaliacao, setEnviandoAvaliacao] = useState(false);

  // Modal Edição State
  const [editModalAberto, setEditModalAberto] = useState(false);
  const [editNome, setEditNome] = useState('');
  const [editCurso, setEditCurso] = useState('');
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');
  const [salvandoEdicao, setSalvandoEdicao] = useState(false);
  const [erroEdicao, setErroEdicao] = useState('');

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const u = JSON.parse(userStr);
      setUser(u);
      carregarReservas(u.id);
    } else {
      setLoading(false);
    }
  }, []);

  const carregarReservas = async (usuarioId: string) => {
    try {
      const data = await reservaApi.findByUsuarioId(usuarioId);
      // Sort: Pendentes first, then Confirmadas, then others, and by data
      setReservas(data.reverse());
    } catch (error) {
      console.error('Erro ao buscar reservas', error);
    } finally {
      setLoading(false);
    }
  };

  const abrirModalAvaliacao = (reserva: Reserva) => {
    setReservaParaAvaliar(reserva);
    setNota(0);
    setComentario('');
    setAvaliarModalAberto(true);
  };

  const enviarAvaliacao = async () => {
    if (!reservaParaAvaliar || !user) return;
    if (nota === 0) {
      alert('Por favor, dê uma nota de 1 a 5 estrelas.');
      return;
    }
    
    setEnviandoAvaliacao(true);
    try {
      await reservaApi.avaliarMotorista(
        reservaParaAvaliar.caronaId,
        user.id,
        reservaParaAvaliar.carona.motoristaId,
        nota,
        comentario
      );
      alert('Avaliação enviada com sucesso! Obrigado.');
      setAvaliarModalAberto(false);
    } catch (error: any) {
      alert(error.message || 'Erro ao enviar avaliação.');
    } finally {
      setEnviandoAvaliacao(false);
    }
  };

  const abrirModalEdicao = () => {
    setEditNome(user.nome);
    setEditCurso(user.curso || '');
    setSenhaAtual('');
    setNovaSenha('');
    setConfirmarNovaSenha('');
    setErroEdicao('');
    setEditModalAberto(true);
  };

  const salvarEdicao = async () => {
    setErroEdicao('');
    if (!editNome.trim()) {
      setErroEdicao('O nome não pode ser vazio.');
      return;
    }

    if (novaSenha) {
      if (novaSenha !== confirmarNovaSenha) {
        setErroEdicao('A nova senha e a confirmação não conferem.');
        return;
      }
      if (!senhaAtual) {
        setErroEdicao('Para alterar a senha, digite a senha atual.');
        return;
      }
    }

    setSalvandoEdicao(true);
    try {
      // Se for trocar a senha, precisamos validar a senha atual
      if (novaSenha) {
        try {
          await authApi.login({ email: user.email, senha: senhaAtual });
        } catch {
          throw new Error('A senha atual está incorreta.');
        }
      }

      // Atualiza no backend
      const dadosUpdate: any = { nome: editNome, curso: editCurso };
      if (novaSenha) {
        dadosUpdate.senha = novaSenha;
      }

      const userAtualizado = await authApi.updateUser(user.id, dadosUpdate);
      
      // Atualiza local state e local storage
      const novoUser = { ...user, ...userAtualizado };
      setUser(novoUser);
      localStorage.setItem('user', JSON.stringify(novoUser));
      
      alert('Informações atualizadas com sucesso!');
      setEditModalAberto(false);
    } catch (error: any) {
      setErroEdicao(error.message || 'Erro ao atualizar informações.');
    } finally {
      setSalvandoEdicao(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <div className="w-12 h-12 border-4 border-[#0A44B1] border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-medium">Carregando seu perfil...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-[32px] border-2 border-neutral-100 shadow-xl max-w-md w-full text-center">
          <div className="w-16 h-16 bg-[#0A44B1]/10 text-[#0A44B1] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FiUser size={32} />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Ops, você não está logado!</h2>
          <p className="text-slate-500 mb-8">Faça login para acessar suas informações e reservas.</p>
          <Link to="/login" className="block w-full bg-[#0A44B1] text-white py-4 rounded-2xl font-bold hover:bg-[#08368d] transition-colors">
            Fazer Login
          </Link>
        </div>
      </div>
    );
  }

  const initials = user.nome.split(' ').slice(0, 2).map((n: string) => n[0]).join('').toUpperCase();

  return (
    <div className="min-h-screen bg-[#FAFAF7] pb-20">
      <div className="w-full bg-[#0A44B1] relative overflow-hidden pt-12 pb-32">
        <div className="absolute top-[-60px] right-[-40px] w-[320px] h-[320px] rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        
        <div className="max-w-[1000px] mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Meu Perfil</h1>
          <p className="text-[#E8EE3B] mt-2 font-medium">Gerencie suas viagens e informações.</p>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-6 -mt-20 relative z-20">
        {/* Info Card */}
        <div className="bg-white rounded-[32px] border-2 border-neutral-100 shadow-xl p-8 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative">
          <div className="flex items-center gap-6 w-full">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-[24px] bg-gradient-to-br from-[#0A44B1] to-[#1a5cd8] flex items-center justify-center flex-shrink-0 text-white text-[28px] font-extrabold shadow-lg">
              {initials}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800">{user.nome}</h2>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-2">
                <span className="flex items-center gap-1.5 text-slate-500 font-medium text-[14px]">
                  <FiMail className="text-[#0A44B1]" /> {user.email}
                </span>
                <span className="flex items-center gap-1.5 text-slate-500 font-medium text-[14px]">
                  <FiBook className="text-[#0A44B1]" /> {user.curso || 'Curso não informado'}
                </span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={abrirModalEdicao}
            className="md:absolute top-8 right-8 flex items-center gap-2 px-5 py-2.5 bg-slate-50 text-slate-600 hover:text-[#0A44B1] hover:bg-[#0A44B1]/10 rounded-xl font-bold text-[14px] border border-neutral-200 transition-colors shrink-0"
          >
            <FiEdit3 /> Editar Informações
          </button>
        </div>

        {/* Reservas */}
        <h3 className="text-2xl font-extrabold text-slate-800 mb-6">Minhas Reservas</h3>
        
        {reservas.length === 0 ? (
          <div className="bg-white rounded-[24px] border-2 border-dashed border-neutral-200 p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 text-slate-300">
              <FiMapPin size={24} />
            </div>
            <h4 className="text-[18px] font-bold text-slate-700">Nenhuma reserva encontrada</h4>
            <p className="text-slate-400 mt-1 max-w-sm">Você ainda não reservou nenhuma carona. Que tal buscar a sua primeira viagem?</p>
            <Link to="/caronas" className="mt-6 bg-[#0A44B1]/10 text-[#0A44B1] font-bold px-6 py-3 rounded-xl hover:bg-[#0A44B1]/20 transition-colors">
              Buscar Caronas
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reservas.map(reserva => {
              const carona = reserva.carona;
              const isFinalizada = carona?.status === 'FINALIZADA';
              const d = carona ? new Date(carona.dataHoraSaida) : new Date();

              return (
                <div key={reserva.id} className="bg-white rounded-[24px] border-2 border-neutral-100 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      {reserva.status === 'CONFIRMADA' && <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[12px] font-bold flex items-center gap-1"><FiCheckCircle /> Confirmada</span>}
                      {reserva.status === 'PENDENTE' && <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[12px] font-bold flex items-center gap-1"><FiClock /> Pendente</span>}
                      {reserva.status === 'CANCELADA' && <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-[12px] font-bold flex items-center gap-1"><FiXCircle /> Cancelada</span>}
                    </div>
                    {isFinalizada && (
                      <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-[12px] font-bold">Viagem Finalizada</span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mb-4 bg-[#FAFAF7] p-3 rounded-xl">
                    <div className="flex flex-col items-center gap-0.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <div className="w-px h-6 bg-neutral-200" />
                      <div className="w-2 h-2 rounded-full bg-[#0A44B1]" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-[14px] font-bold text-slate-800 leading-none">{carona?.origem || 'Origem'}</span>
                      <span className="text-[14px] font-bold text-[#0A44B1] leading-none">{carona?.destino || 'Destino'}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[13px] text-slate-500 font-medium mb-5">
                    <span className="flex items-center gap-1"><FiCalendar /> {d.toLocaleDateString('pt-BR')}</span>
                    <span className="flex items-center gap-1"><FiClock /> {d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>

                  {isFinalizada && reserva.status !== 'CANCELADA' && (
                    <button 
                      onClick={() => abrirModalAvaliacao(reserva)}
                      className="mt-auto w-full border-2 border-[#0A44B1] text-[#0A44B1] py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#0A44B1] hover:text-white transition-colors"
                    >
                      <FiStar /> Avaliar Motorista
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal de Avaliação */}
      {avaliarModalAberto && reservaParaAvaliar && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => !enviandoAvaliacao && setAvaliarModalAberto(false)} />
          <div className="relative w-full max-w-[400px] bg-white rounded-[32px] shadow-2xl p-8 flex flex-col items-center animate-in fade-in zoom-in-95 duration-300">
            <button onClick={() => setAvaliarModalAberto(false)} disabled={enviandoAvaliacao} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600">
              <FiX size={20} />
            </button>
            
            <div className="w-16 h-16 bg-[#E8EE3B]/20 text-[#0A44B1] rounded-full flex items-center justify-center mb-4">
              <FiStar size={32} className="fill-[#E8EE3B]" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-800 text-center">Como foi a viagem?</h3>
            <p className="text-slate-500 text-center text-[14px] mt-2 mb-6">Avalie o motorista para ajudar a manter a qualidade da comunidade.</p>
            
            {/* Estrelas */}
            <div className="flex gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star} 
                  onClick={() => setNota(star)}
                  className={`transition-transform hover:scale-110 active:scale-95 ${nota >= star ? 'text-[#E8EE3B]' : 'text-slate-200'}`}
                >
                  <FiStar size={40} className={nota >= star ? 'fill-[#E8EE3B]' : 'fill-slate-200'} />
                </button>
              ))}
            </div>

            <textarea 
              placeholder="Deixe um comentário (opcional)..."
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              className="w-full bg-[#FAFAF7] border-2 border-neutral-100 rounded-xl p-4 text-[14px] outline-none focus:border-[#0A44B1]/30 transition-colors mb-6 resize-none min-h-[100px]"
            />

            <button
              onClick={enviarAvaliacao}
              disabled={enviandoAvaliacao || nota === 0}
              className="w-full bg-[#0A44B1] text-white py-4 rounded-xl font-bold hover:bg-[#08368d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {enviandoAvaliacao ? 'Enviando...' : 'Enviar Avaliação'}
            </button>
          </div>
        </div>
      )}

      {/* Modal de Edição de Perfil */}
      {editModalAberto && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => !salvandoEdicao && setEditModalAberto(false)} />
          <div className="relative w-full max-w-[500px] bg-white rounded-[32px] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            {/* Header Modal */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100 bg-slate-50/50">
              <h3 className="text-[18px] font-extrabold text-slate-800 flex items-center gap-2">
                <FiEdit3 className="text-[#0A44B1]" /> Editar Perfil
              </h3>
              <button onClick={() => setEditModalAberto(false)} disabled={salvandoEdicao} className="text-slate-400 hover:text-slate-600 transition-colors p-1">
                <FiX size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {erroEdicao && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 mb-5 text-[13px] font-medium">
                  <FiAlertCircle size={16} />
                  {erroEdicao}
                </div>
              )}

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Nome Completo</label>
                  <div className="relative flex items-center border-2 border-neutral-200 rounded-xl bg-white focus-within:border-[#0A44B1]">
                    <FiUser className="absolute left-3.5 text-slate-400" />
                    <input type="text" value={editNome} onChange={e => setEditNome(e.target.value)} disabled={salvandoEdicao} className="w-full pl-10 pr-4 py-3 text-[14px] text-slate-800 outline-none rounded-xl bg-transparent" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Curso / Universidade</label>
                  <div className="relative flex items-center border-2 border-neutral-200 rounded-xl bg-white focus-within:border-[#0A44B1]">
                    <FiBook className="absolute left-3.5 text-slate-400" />
                    <input type="text" value={editCurso} onChange={e => setEditCurso(e.target.value)} disabled={salvandoEdicao} className="w-full pl-10 pr-4 py-3 text-[14px] text-slate-800 outline-none rounded-xl bg-transparent" />
                  </div>
                </div>

                <div className="h-px bg-neutral-100 my-2" />
                
                <h4 className="text-[14px] font-extrabold text-slate-800 flex items-center gap-2">
                  <FiLock className="text-[#0A44B1]" /> Alterar Senha <span className="text-slate-400 text-[12px] font-medium">(Opcional)</span>
                </h4>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-slate-700">Nova Senha</label>
                  <input type="password" value={novaSenha} onChange={e => setNovaSenha(e.target.value)} disabled={salvandoEdicao} placeholder="Digite apenas se quiser alterar" className="w-full px-4 py-3 text-[14px] text-slate-800 border-2 border-neutral-200 outline-none rounded-xl bg-white focus:border-[#0A44B1]" />
                </div>

                {novaSenha && (
                  <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] font-bold text-slate-700">Confirmar Nova Senha</label>
                      <input type="password" value={confirmarNovaSenha} onChange={e => setConfirmarNovaSenha(e.target.value)} disabled={salvandoEdicao} placeholder="Repita a nova senha" className="w-full px-4 py-3 text-[14px] text-slate-800 border-2 border-neutral-200 outline-none rounded-xl bg-white focus:border-[#0A44B1]" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] font-bold text-slate-700 text-[#0A44B1]">Senha Atual (obrigatória para salvar a nova senha)</label>
                      <input type="password" value={senhaAtual} onChange={e => setSenhaAtual(e.target.value)} disabled={salvandoEdicao} placeholder="Digite sua senha atual" className="w-full px-4 py-3 text-[14px] text-slate-800 border-2 border-neutral-200 outline-none rounded-xl bg-white focus:border-[#0A44B1]" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-neutral-100">
              <button onClick={salvarEdicao} disabled={salvandoEdicao} className="w-full bg-[#0A44B1] text-white py-3.5 rounded-xl font-bold text-[15px] hover:bg-[#08368d] transition-all flex items-center justify-center gap-2">
                {salvandoEdicao ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Salvando...
                  </>
                ) : 'Salvar Alterações'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Perfil;
